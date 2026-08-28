import { useState } from "react";
import { Link } from "react-router-dom";
import { useCountdown } from "@/hooks/useCountdown";
import { GP_SALE_END } from "@/lib/sale";

/**
 * This top strip normally promotes the standing veterans discount. While the
 * GP line sale is live (see GP_SALE_END in lib/sale.ts), it swaps to the sale
 * message instead - and swaps itself back automatically once GP_SALE_END
 * passes, so nobody has to remember to revert the veterans copy by hand.
 */
export default function MilitaryBanner() {
  const [visible, setVisible] = useState(true);
  const countdown = useCountdown(GP_SALE_END);
  const saleLive = !countdown.expired;

  if (!visible) return null;

  return (
    <div
      className="relative z-50 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 px-6 pr-12 py-2 sm:py-0"
      style={{ background: "#555555", minHeight: 52 }}
    >
      {saleLive ? (
        <>
          <p className="text-center text-sm text-white">
            <strong className="text-white font-bold">GP Sale Live Now!</strong>{" "}
            Stock Up Before They Take It Away!{" "}
            <strong className="text-white font-bold">30% Off — Sale Ends Sunday!</strong>
          </p>
          <Link
            to="/shop"
            className="shrink-0 rounded-full bg-white text-[#555555] text-sm font-bold px-4 py-1.5 hover:bg-white/90 transition-colors"
          >
            Shop Now
          </Link>
        </>
      ) : (
        <>
          <p className="text-center text-sm text-white">
            <strong className="text-white font-bold">
              Active Military, Veterans &amp; First Responders:
            </strong>{" "}
            <strong className="text-white font-bold">20% Off for Life.</strong>{" "}
            Contact us for your personal code.
          </p>
          <Link
            to="/veterans"
            className="shrink-0 rounded-full bg-white text-[#555555] text-sm font-bold px-4 py-1.5 hover:bg-white/90 transition-colors"
          >
            Contact Us
          </Link>
        </>
      )}
      <button
        onClick={() => setVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white text-sm font-bold cursor-pointer w-6 h-6 flex items-center justify-center"
        aria-label="Close"
      >
        <i className="ri-close-line" />
      </button>
    </div>
  );
}

