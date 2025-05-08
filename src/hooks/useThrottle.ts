import { useState, useEffect, useRef } from 'react';

/**
 * A hook that throttles a value, only updating at most once per specified interval
 * Useful for scroll events, resize events, and other high-frequency events
 * 
 * @param value The value to throttle
 * @param limit The minimum time between updates in milliseconds
 * @returns The throttled value
 */
function useThrottle<T>(value: T, limit: number = 200): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastRan = useRef<number>(Date.now());

  useEffect(() => {
    const handler = setTimeout(() => {
      if (Date.now() - lastRan.current >= limit) {
        setThrottledValue(value);
        lastRan.current = Date.now();
      }
    }, limit - (Date.now() - lastRan.current));

    return () => {
      clearTimeout(handler);
    };
  }, [value, limit]);

  return throttledValue;
}

export default useThrottle;
