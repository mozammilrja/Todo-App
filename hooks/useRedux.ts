import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { useCallback } from 'react';
import type { RootState, AppDispatch } from '@/redux/store';

// Typed hooks for Redux
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Custom hook for dispatching actions with loading states
export const useAppAction = () => {
  const dispatch = useAppDispatch();
  
  const dispatchAction = useCallback(
    async (action: any) => {
      try {
        return await dispatch(action);
      } catch (error) {
        console.error('Action dispatch error:', error);
        throw error;
      }
    },
    [dispatch]
  );
  
  return dispatchAction;
};

// Custom hook for selecting data with memoization
export const useAppData = <T>(
  selector: (state: RootState) => T,
  equalityFn?: (left: T, right: T) => boolean
) => {
  return useAppSelector(selector, equalityFn);
};

// Hook for getting multiple selectors at once
export const useMultipleSelectors = <T extends Record<string, (state: RootState) => any>>(
  selectors: T
): { [K in keyof T]: ReturnType<T[K]> } => {
  const results = {} as { [K in keyof T]: ReturnType<T[K]> };
  
  Object.keys(selectors).forEach((key) => {
    results[key as keyof T] = useAppSelector(selectors[key as keyof T]);
  });
  
  return results;
};