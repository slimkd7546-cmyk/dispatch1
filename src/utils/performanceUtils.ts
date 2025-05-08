/**
 * Utility functions for performance optimization
 */

/**
 * Checks if the browser supports the requestIdleCallback API
 * Falls back to setTimeout if not supported
 */
export const requestIdleCallbackPolyfill = (callback: IdleRequestCallback, options?: IdleRequestOptions) => {
  if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
    return window.requestIdleCallback(callback, options);
  }
  return setTimeout(() => callback({ didTimeout: false, timeRemaining: () => 50 }), 1);
};

/**
 * Cancels a previously scheduled requestIdleCallback
 */
export const cancelIdleCallbackPolyfill = (id: number) => {
  if (typeof window !== 'undefined' && 'cancelIdleCallback' in window) {
    window.cancelIdleCallback(id);
  } else {
    clearTimeout(id);
  }
};

/**
 * Optimizes animations by using requestAnimationFrame
 */
export const optimizedAnimation = (callback: FrameRequestCallback) => {
  let ticking = false;
  
  return () => {
    if (!ticking) {
      window.requestAnimationFrame((time) => {
        callback(time);
        ticking = false;
      });
      ticking = true;
    }
  };
};

/**
 * Splits a heavy computation into smaller chunks to avoid blocking the main thread
 */
export const chunkedComputation = <T, R>(
  items: T[],
  processor: (item: T) => R,
  chunkSize: number = 5,
  delayBetweenChunks: number = 0
): Promise<R[]> => {
  return new Promise((resolve) => {
    const results: R[] = [];
    let index = 0;

    const processChunk = () => {
      const chunk = items.slice(index, index + chunkSize);
      index += chunkSize;

      for (const item of chunk) {
        results.push(processor(item));
      }

      if (index < items.length) {
        if (delayBetweenChunks > 0) {
          setTimeout(processChunk, delayBetweenChunks);
        } else {
          requestIdleCallbackPolyfill(processChunk);
        }
      } else {
        resolve(results);
      }
    };

    processChunk();
  });
};

/**
 * Optimizes image loading by creating a preloaded image
 */
export const preloadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

/**
 * Measures the execution time of a function
 */
export const measurePerformance = <T>(fn: () => T, label: string): T => {
  const start = performance.now();
  const result = fn();
  const end = performance.now();
  console.log(`${label} took ${end - start}ms`);
  return result;
};
