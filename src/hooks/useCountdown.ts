import { useEffect, useState } from "react";

export interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
}

function diffToCountdown(target: Date): Countdown {
  const ms = target.getTime() - Date.now();
  if (ms <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  }
  const totalSeconds = Math.floor(ms / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    expired: false,
  };
}

/** Ticks down to `target` every second. `target` is a fixed Date - don't recreate it on every render (define it as a module-level constant). */
export function useCountdown(target: Date): Countdown {
  const [countdown, setCountdown] = useState(() => diffToCountdown(target));

  useEffect(() => {
    const interval = setInterval(() => setCountdown(diffToCountdown(target)), 1000);
    return () => clearInterval(interval);
  }, [target]);

  return countdown;
}
