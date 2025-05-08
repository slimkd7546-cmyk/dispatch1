import { useCallback, useRef, useEffect } from 'react';

/**
 * A hook that memoizes a callback function and ensures it's stable across renders
 * while still having access to the latest props/state
 * 
 * @param callback The function to memoize
 * @param dependencies The dependencies array for the callback
 * @returns A memoized version of the callback that's stable across renders
 */
function useMemoizedCallback<T extends (...args: any[]) => any>(
  callback: T,
  dependencies: React.DependencyList
): T {
  // Store the latest callback in a ref
  const callbackRef = useRef<T>(callback);

  // Update the ref whenever the callback changes
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Create a stable callback that uses the ref
  return useCallback(
    ((...args: any[]) => {
      return callbackRef.current(...args);
    }) as T,
    dependencies
  );
}

export default useMemoizedCallback;
