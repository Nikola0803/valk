import { triggerDcodeReloadWorkaround } from "@/lib/affiliate";
import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/feature/Navbar";
import FooterSection from "@/pages/home/components/FooterSection";
import { useCart } from "@/hooks/useCart";
import { createOrder, validateCoupon, type WCOrderPayload } from "@/lib/woocommerce";
import { createPaymentSession } from "@/lib/circoflows";
import { getAttributionMetaData } from "@/lib/attribution";
import { getSession } from "@/lib/wcAuth";
import {
  getTaxRate, SHIPPING_RATE, PAYMENT_LABELS, getPaymentHandle, isManualPaymentMethod,
  EMAIL_RE, type PaymentMethod,
} from "@/pages/order/orderData";
import type { OrderForm } from "@/pages/order/components/ShippingStep";
import OrderEmptyCart from "@/pages/order/components/OrderEmptyCart";
import OrderSuccess   from "@/pages/order/components/OrderSuccess";
import OrderPaymentConfirming, { CARD_UNAVAILABLE_KEY, type PendingCardDetails } from "@/pages/order/components/OrderPaymentConfirming";
import OrderPageHero  from "@/pages/order/components/OrderPageHero";
import OrderProgress  from "@/pages/order/components/OrderProgress";
import ShippingStep   from "@/pages/order/components/ShippingStep";
import PaymentStep    from "@/pages/order/components/PaymentStep";
import ReviewStep     from "@/pages/order/components/ReviewStep";
import OrderSidebar   from "@/pages/order/components/OrderSidebar";

// Set just before redirecting to CircoFlows's hosted card page so the
// confirmation view (after the customer is redirected back) can show the same
// email/amount breakdown OrderSuccess shows, without relying on component state
// that doesn't survive the full-page redirect round trip.
const PENDING_CARD_DETAILS_KEY = "vk_pending_card_details";

// Keeps the shipping form filled in across the full-page reload that happens after a
// card decline (goToManualCheckout() in OrderPaymentConfirming reloads "/order" so the
// cardUnavailable/method state re-reads fresh from sessionStorage) - without this, a
// customer who gets declined has to retype their entire shipping form to try again with
// a manual payment method. sessionStorage (not localStorage) so it clears itself once
// this browser tab closes, same lifetime as CARD_UNAVAILABLE_KEY.
const SHIPPING_FORM_DRAFT_KEY = "vk_shipping_form_draft";

const BLANK_ORDER_FORM: OrderForm = {
  firstName: "", lastName: "", email: "",
  phone: "", address: "", city: "",
  state: "", zip: "", notes: "",
};

export default function OrderPage() {
  const { items, totalPrice, subtotal, discountAmount, appliedCoupon, setCoupon, clearCart } = useCart();
  const [searchParams] = useSearchParams();

  // Present after a full-page redirect back from CircoFlows's hosted card page.
  // Takes over rendering entirely - not proof of payment, just tells us to poll.
  const returningCardRef = searchParams.get("ref");

  // Logged-in customer's WC id, if any - threaded through to both payment paths so an
  // order actually links to the account it was placed under. Previously neither path
  // set this, so every order (card or manual) was created as a guest order regardless of
  // login state - My Account's order history queries GET /wc/v3/orders?customer={id},
  // which can never match a guest order. See Valkyrie_Task_Tracker.md, "No Orders
  // Showing for Users." Left undefined for guest checkout - that must keep working.
  const customerId = getSession()?.customer.id;

  // Card is the primary/default payment method - unless a card attempt already
  // declined/failed earlier this session, in which case it's taken off the table
  // and a manual method is the default instead. Computed once at mount (lazy
  // initializer) since the "return to checkout after a decline" flow uses a full
  // page reload specifically so this re-reads fresh.
  const [cardUnavailable] = useState<boolean>(() => sessionStorage.getItem(CARD_UNAVAILABLE_KEY) === "1");
  const [method, setMethod] = useState<PaymentMethod>(() =>
    sessionStorage.getItem(CARD_UNAVAILABLE_KEY) === "1" ? "zelle" : "card"
  );
  const [step, setStep]                     = useState<1 | 2 | 3>(1);
  const [submitting, setSubmitting]         = useState(false);
  const [submitError, setSubmitError]       = useState<string | null>(null);
  const [submitted, setSubmitted]           = useState(false);
  const [orderId, setOrderId]               = useState<string | null>(null);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [bacAcknowledged, setBacAcknowledged]   = useState(false);
  const [orderTotal, setOrderTotal]         = useState(0);
  const [orderTax, setOrderTax]             = useState(0);
  const [fieldError, setFieldError]         = useState("");

  // Coupon state
  const [couponCode, setCouponCode]     = useState("");
  const [couponStatus, setCouponStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [couponMsg, setCouponMsg]       = useState("");

  const [form, setForm] = useState<OrderForm>(() => {
    try {
      const raw = sessionStorage.getItem(SHIPPING_FORM_DRAFT_KEY);
      if (raw) return { ...BLANK_ORDER_FORM, ...JSON.parse(raw) } as OrderForm;
    } catch { /* fall through to a blank form */ }
    return BLANK_ORDER_FORM;
  });

  // Persist on every keystroke so a card decline's full-page reload doesn't force the
  // customer to retype everything - see SHIPPING_FORM_DRAFT_KEY above.
  useEffect(() => {
    sessionStorage.setItem(SHIPPING_FORM_DRAFT_KEY, JSON.stringify(form));
  }, [form]);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Same reload workaround as opening the cart - if they reached checkout
    // without the affiliate coupon ever resolving, give it the one refresh
    // that's confirmed to fix it (no-ops if already applied or already fired
    // once this tab).
    if (!appliedCoupon) {
      triggerDcodeReloadWorkaround();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync coupon UI state when an affiliate coupon is auto-applied via cart context
  useEffect(() => {
    if (appliedCoupon && couponStatus === "idle") {
      setCouponCode(appliedCoupon.coupon.code);
      setCouponStatus("success");
      setCouponMsg(
        appliedCoupon.coupon.discount_type === "percent" || appliedCoupon.coupon.discount_type === "percentage"
          ? `${appliedCoupon.coupon.amount}% discount applied`
          : `$${appliedCoupon.discountAmount.toFixed(2)} discount applied`
      );
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appliedCoupon]);

  const taxRate    = useMemo(() => getTaxRate(form.state), [form.state]);
  const taxAmount  = useMemo(() => Math.round(totalPrice * (taxRate / 100) * 100) / 100, [totalPrice, taxRate]);
  const grandTotal = useMemo(() => Math.round((totalPrice + taxAmount + SHIPPING_RATE) * 100) / 100, [totalPrice, taxAmount]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (fieldError) setFieldError("");
  };

  const handleApplyCoupon = async () => {
    const code = couponCode.trim();
    if (!code) return;
    setCouponStatus("loading");
    setCouponMsg("");
    const result = await validateCoupon(code, subtotal);
    if (result.valid === true) {
      setCoupon({ coupon: result.coupon, discountAmount: result.discountAmount });
      setCouponStatus("success");
      setCouponMsg(
        result.coupon.discount_type === "percent" || result.coupon.discount_type === "percentage"
          ? `${result.coupon.amount}% discount applied`
          : `$${result.discountAmount.toFixed(2)} discount applied`
      );
    } else {
      setCouponStatus("error");
      setCouponMsg(result.message);
    }
  };

  const handleRemoveCoupon = () => {
    setCoupon(null);
    setCouponCode("");
    setCouponStatus("idle");
    setCouponMsg("");
  };

  const requiredFields = ["firstName", "lastName", "email", "phone", "address", "city", "state", "zip"] as const;

  const handleStep1Continue = () => {
    const empty = requiredFields.find((f) => !form[f].trim());
    if (empty) { setFieldError("Please fill in all required fields."); return; }
    if (!EMAIL_RE.test(form.email)) { setFieldError("Please enter a valid email address."); return; }
    setFieldError("");
    setStep(2);
    window.scrollTo(0, 0);
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bacAcknowledged || submitting) return;
    if (isManualPaymentMethod(method) && !paymentConfirmed) return;
    setSubmitting(true);
    setSubmitError(null);

    // Card path: create the pending order + CircoFlows hosted session server-side,
    // then redirect - the webhook (not this response) is what marks it paid.
    if (method === "card") {
      try {
        const result = await createPaymentSession({
          first_name: form.firstName, last_name: form.lastName,
          email: form.email, phone: form.phone,
          address_1: form.address, city: form.city,
          state: form.state, postcode: form.zip, country: "US",
          line_items: items.map((item) => ({ product_id: item.id, quantity: item.quantity })),
          customer_note: form.notes || undefined,
          coupon_code: appliedCoupon ? appliedCoupon.coupon.code : undefined,
          customer_id: customerId,
        });
        const pendingDetails: PendingCardDetails = {
          email: form.email, orderTotal: grandTotal, orderTax: taxAmount, taxRate,
        };
        localStorage.setItem(PENDING_CARD_DETAILS_KEY, JSON.stringify(pendingDetails));
        window.location.href = result.card_url;
        // Full-page redirect - intentionally don't reset `submitting`, the page is navigating away.
      } catch (err) {
        setSubmitError(`Could not start card payment: ${(err as Error).message}\n\nPlease try again or use another payment method.`);
        setSubmitting(false);
      }
      return;
    }

    const methodTitle = `${PAYMENT_LABELS[method]} (${getPaymentHandle(method)})`;
    const payload: WCOrderPayload = {
      payment_method: method,
      payment_method_title: methodTitle,
      set_paid: false,
      status: "on-hold",
      customer_id: customerId,
      billing: {
        first_name: form.firstName, last_name: form.lastName,
        email: form.email, phone: form.phone,
        address_1: form.address, city: form.city,
        state: form.state, postcode: form.zip, country: "US",
      },
      shipping: {
        first_name: form.firstName, last_name: form.lastName,
        address_1: form.address, city: form.city,
        state: form.state, postcode: form.zip, country: "US",
      },
      line_items: items.map((item) => ({ product_id: item.id, quantity: item.quantity, name: item.name })),
      coupon_lines: appliedCoupon ? [{ code: appliedCoupon.coupon.code }] : undefined,
      shipping_lines: [{ method_title: "Flat Rate", method_id: "flat_rate", total: SHIPPING_RATE.toFixed(2) }],
      customer_note: form.notes || undefined,
      meta_data: [
        { key: "_payment_sent_confirmed", value: "yes" },
        { key: "_payment_method_detail",  value: methodTitle },
        { key: "_customer_phone",         value: form.phone },
        { key: "_tax_rate",               value: `${taxRate}%` },
        { key: "_tax_amount",             value: taxAmount.toFixed(2) },
        { key: "_shipping_amount",        value: SHIPPING_RATE.toFixed(2) },
        { key: "_grand_total",            value: grandTotal.toFixed(2) },
        ...(appliedCoupon ? [
          { key: "_coupon_code",     value: appliedCoupon.coupon.code },
          { key: "_coupon_discount", value: appliedCoupon.discountAmount.toFixed(2) },
        ] : []),
        ...getAttributionMetaData(),
      ],
    };
    try {
      const order = await createOrder(payload);
      setOrderTotal(grandTotal);
      setOrderTax(taxAmount);
      setOrderId(order.number ?? String(order.id));
      clearCart();
      sessionStorage.removeItem(SHIPPING_FORM_DRAFT_KEY);
      setSubmitted(true);
    } catch (err) {
      setSubmitError(`Could not create your order: ${(err as Error).message}\n\nPlease contact us directly to complete your purchase.`);
    } finally {
      setSubmitting(false);
    }
  };

  // Returning from CircoFlows's hosted card page - takes priority over the empty-cart
  // check below, since the cart may legitimately be empty/stale by the time they're back.
  if (returningCardRef) {
    let pendingDetails: PendingCardDetails = { email: "", orderTotal: 0, orderTax: 0, taxRate: 0 };
    try {
      const raw = localStorage.getItem(PENDING_CARD_DETAILS_KEY);
      if (raw) pendingDetails = JSON.parse(raw) as PendingCardDetails;
    } catch { /* fall back to the zeroed default above */ }

    return (
      <OrderPaymentConfirming
        merchantTransactionId={returningCardRef}
        details={pendingDetails}
        onConfirmed={() => {
          localStorage.removeItem(PENDING_CARD_DETAILS_KEY);
          sessionStorage.removeItem(SHIPPING_FORM_DRAFT_KEY);
          clearCart();
        }}
      />
    );
  }

  // Empty cart
  if (items.length === 0 && !submitted) return <OrderEmptyCart />;

  // Success
  if (submitted) return (
    <OrderSuccess
      orderId={orderId}
      method={method}
      email={form.email}
      orderTotal={orderTotal}
      orderTax={orderTax}
      taxRate={taxRate}
    />
  );

  // Main checkout
  return (
    <div className="min-h-screen" style={{ background: "#f8f7f5" }}>
      <div className="fixed top-0 left-0 right-0 z-50"><Navbar /></div>
      <div style={{ paddingTop: 64 }}>
        <OrderPageHero />
        <OrderProgress step={step} />

        <div className="max-w-[1100px] mx-auto px-4 md:px-8 py-8 md:py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {step === 1 && (
              <ShippingStep
                form={form}
                handleChange={handleChange}
                setForm={setForm}
                fieldError={fieldError}
                setFieldError={setFieldError}
                taxRate={taxRate}
                taxAmount={taxAmount}
                handleStep1Continue={handleStep1Continue}
              />
            )}
            {step === 2 && (
              <PaymentStep
                method={method}
                setMethod={setMethod}
                grandTotal={grandTotal}
                setStep={setStep}
                cardDisabled={cardUnavailable}
              />
            )}
            {step === 3 && (
              <ReviewStep
                form={form}
                handleChange={handleChange}
                method={method}
                grandTotal={grandTotal}
                paymentConfirmed={paymentConfirmed}
                setPaymentConfirmed={setPaymentConfirmed}
                bacAcknowledged={bacAcknowledged}
                setBacAcknowledged={setBacAcknowledged}
                submitting={submitting}
                submitError={submitError}
                handleSubmitOrder={handleSubmitOrder}
                setStep={setStep}
              />
            )}
          </div>

          <div className="lg:col-span-1">
            <OrderSidebar
              items={items}
              subtotal={subtotal}
              discountAmount={discountAmount}
              appliedCoupon={appliedCoupon}
              couponCode={couponCode}
              setCouponCode={setCouponCode}
              couponStatus={couponStatus}
              setCouponStatus={setCouponStatus}
              couponMsg={couponMsg}
              setCouponMsg={setCouponMsg}
              handleApplyCoupon={handleApplyCoupon}
              handleRemoveCoupon={handleRemoveCoupon}
              taxRate={taxRate}
              taxAmount={taxAmount}
              grandTotal={grandTotal}
              stateInput={form.state}
            />
          </div>
        </div>
      </div>
      <FooterSection />
    </div>
  );
}
