<?php
/**
 * Server-side enforcement that a sale (GLP Sale) or BOGO can't be stacked
 * with a coupon or the manual-payment discount - "35% off, we can't give
 * them more than that." A coupon/referral code is still allowed on the
 * order (still attributed - GoAffPro still sees it and credits the
 * affiliate), it just can't reduce the price any further once this
 * specific order already benefits from the GLP sale or BOGO. The 5%
 * Zelle/Venmo/Cash App discount (see ALT_PAYMENT_DISCOUNT_RATE in
 * orderData.ts) still shows on checkout either way, but its real effect is
 * zero while locked too.
 *
 * This is the authoritative check - independent of anything the client
 * sends. Every fee line this plugin knows about is stripped and
 * recalculated from scratch here; nothing the client sent is trusted.
 *
 * Only covers the manual-payment order-creation path (POST /wc/v3/orders -
 * see OrderPage.tsx), the only order-creation path this plugin controls.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class VROUTER_Discount_Lock {

	const ALT_PAYMENT_RATE          = 5; // percent - keep in sync with ALT_PAYMENT_DISCOUNT_RATE in src/pages/order/orderData.ts
	const ALT_PAYMENT_METHODS       = [ 'zelle', 'venmo', 'cashapp' ];
	const COUPON_LOCK_FEE_LABEL     = 'Coupon discounts paused during sale';

	public static function init() {
		add_action( 'woocommerce_rest_insert_shop_order_object', [ __CLASS__, 'strip_untrusted_fees' ], 8, 3 );
		add_action( 'woocommerce_rest_insert_shop_order_object', [ __CLASS__, 'apply_alt_payment_discount' ], 15, 3 );
		add_action( 'woocommerce_rest_insert_shop_order_object', [ __CLASS__, 'neutralize_coupon_during_lock' ], 20, 3 );
	}

	/**
	 * True once this order actually benefits from the GLP sale, BOGO, OR any
	 * plain WooCommerce on-sale product (regular_price > sale_price set
	 * directly on the product in wp-admin - e.g. the older GP line, which is
	 * NOT on the GLP_Sale prefix list at all). Checking the product's own
	 * regular vs. current price, instead of only recognizing the GLP sale by
	 * slug prefix, is what actually makes this "nothing stacks on top of any
	 * live discount" rather than "nothing stacks on top of THIS ONE sale
	 * mechanism" - a GP-3 order with a 20% coupon previously sailed straight
	 * through this check because "gp-3" never matched the glp-1/2/3/cagril
	 * prefixes, so the coupon applied in full on top of GP-3's own sale
	 * price with zero enforcement.
	 */
	private static function order_is_locked( WC_Order $order ): bool {
		if ( class_exists( 'VROUTER_Bogo' ) && VROUTER_Bogo::is_active() && VROUTER_Bogo::calc_order_discount( $order ) > 0 ) {
			return true;
		}
		$glp_active = class_exists( 'VROUTER_Glp_Sale' ) && VROUTER_Glp_Sale::is_active();
		foreach ( $order->get_items( 'line_item' ) as $item ) {
			$product = $item->get_product();
			if ( ! $product ) {
				continue;
			}
			if ( $glp_active && VROUTER_Glp_Sale::product_qualifies( $product ) ) {
				return true;
			}
			$regular_price = (float) $product->get_regular_price();
			$qty           = max( 1, (int) $item->get_quantity() );
			$unit_total    = (float) $item->get_subtotal() / $qty; // pre-coupon per-unit price, so a coupon itself never falsely triggers this
			if ( $regular_price > 0 && $unit_total < $regular_price - 0.004 ) {
				return true;
			}
		}
		return false;
	}

	/**
	 * Nothing the client sends is trusted - any fee line matching a label
	 * this plugin itself would add (BOGO, alt-payment, the coupon-lock fee)
	 * is removed before the authoritative hooks below recalculate and
	 * re-add whichever of them actually apply.
	 */
	public static function strip_untrusted_fees( $order, $request, $creating ) {
		if ( ! $creating || ! $order instanceof WC_Order ) {
			return;
		}
		$known_labels = [];
		if ( class_exists( 'VROUTER_Bogo' ) ) {
			$known_labels[] = VROUTER_Bogo::FEE_LABEL;
		}
		$known_labels[] = self::COUPON_LOCK_FEE_LABEL;

		$stripped = false;
		foreach ( $order->get_items( 'fee' ) as $fee_item ) {
			$name = $fee_item->get_name();
			if ( in_array( $name, $known_labels, true ) || str_contains( $name, '% off -' ) ) {
				$order->remove_item( $fee_item->get_id() );
				$stripped = true;
			}
		}
		if ( $stripped ) {
			$order->calculate_totals( false );
			$order->save();
		}
	}

	/**
	 * Matches the client-side formula (totalPrice * rate / 100, where
	 * totalPrice = subtotal - coupon discount - BOGO discount): sum of each
	 * item's current total already nets out the coupon (WooCommerce applies
	 * coupon_lines before any of our hooks fire), and
	 * VROUTER_Bogo::calc_order_discount() mirrors whatever
	 * VROUTER_Bogo::apply_order_discount() already put on this order as a
	 * fee (priority 10, before this one).
	 */
	public static function apply_alt_payment_discount( $order, $request, $creating ) {
		if ( ! $creating || ! $order instanceof WC_Order ) {
			return;
		}
		if ( ! in_array( $order->get_payment_method(), self::ALT_PAYMENT_METHODS, true ) ) {
			return;
		}
		if ( self::order_is_locked( $order ) ) {
			return;
		}

		$items = $order->get_items( 'line_item' );
		if ( empty( $items ) ) {
			return;
		}

		$post_coupon_total = 0.0;
		foreach ( $items as $item ) {
			$post_coupon_total += (float) $item->get_total();
		}
		$bogo_discount        = class_exists( 'VROUTER_Bogo' ) ? VROUTER_Bogo::calc_order_discount( $order ) : 0.0;
		$post_coupon_and_bogo = max( 0.0, $post_coupon_total - $bogo_discount );
		$total_discount       = round( $post_coupon_and_bogo * ( self::ALT_PAYMENT_RATE / 100 ), 2 );

		if ( $total_discount <= 0 || $post_coupon_total <= 0 ) {
			return;
		}

		// Allocate across line items proportional to each item's current
		// share of $post_coupon_total, same dollar amount subtracted from
		// both subtotal and total - last item absorbs the rounding
		// remainder so the per-item amounts always sum to exactly
		// $total_discount.
		$allocated = 0.0;
		$count     = count( $items );
		$i         = 0;
		foreach ( $items as $item ) {
			$i++;
			$item_total = (float) $item->get_total();
			if ( $i === $count ) {
				$item_discount = round( $total_discount - $allocated, 2 );
			} else {
				$item_discount = round( $total_discount * ( $item_total / $post_coupon_total ), 2 );
			}
			$allocated += $item_discount;
			if ( $item_discount <= 0 ) {
				continue;
			}
			$item->set_subtotal( round( (float) $item->get_subtotal() - $item_discount, 2 ) );
			$item->set_total( round( $item_total - $item_discount, 2 ) );
			$item->save();
		}

		$order->calculate_totals( false );
		$order->save();
	}

	/**
	 * A coupon is still ALLOWED on the order - still tags/credits the
	 * affiliate - but its dollar effect is neutralized to exactly $0 once
	 * this order actually benefits from the GLP sale or BOGO, by adding a
	 * fee equal to whatever discount the coupon just gave, canceling it
	 * back out to the cent. An order that doesn't actually earn any sale/
	 * BOGO discount is NOT touched here - a regular coupon on a regular
	 * purchase behaves exactly as it did before, promo window or not.
	 */
	public static function neutralize_coupon_during_lock( $order, $request, $creating ) {
		if ( ! $creating || ! $order instanceof WC_Order ) {
			return;
		}
		if ( ! self::order_is_locked( $order ) ) {
			return;
		}

		$coupon_discount = (float) $order->get_discount_total();
		if ( $coupon_discount > 0.004 ) {
			$fee = new WC_Order_Item_Fee();
			$fee->set_name( self::COUPON_LOCK_FEE_LABEL );
			$amount = round( $coupon_discount, 2 );
			$fee->set_amount( $amount );
			$fee->set_total( $amount );
			$fee->set_tax_class( '' );
			$fee->set_tax_status( 'none' );
			$order->add_item( $fee );
			$order->calculate_totals( false );
			$order->save();
		}
	}
}
