import { useEffect } from 'react';

export const useDebounce = (func: () => void, dependencies: any[]) => {
  useEffect(() => {
    const timeoutId = setTimeout(func, 1000);

    return () => clearTimeout(timeoutId);
  }, dependencies);
};