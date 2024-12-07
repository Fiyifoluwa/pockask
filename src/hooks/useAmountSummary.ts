import {useCallback} from 'react';
import {performanceUtils} from '../utils/performance';
import {CartItem} from '../types';
import {calculateTax} from '../utils/config';

export const useCartCalculations = (items: CartItem[]) => {
  const calculateTotals = useCallback(async () => {
    // Run heavy calculations after interactions
    return performanceUtils.runAfterInteractions(async () => {
      const totals = await performanceUtils.processInChunks(
        items,
        async item => ({
          itemTotal: item.price * item.quantity,
          taxAmount: calculateTax(item.price, item.quantity),
        }),
        10,
      );

      return totals.reduce(
        (acc, curr) => ({
          subtotal: acc.subtotal + curr.itemTotal,
          tax: acc.tax + curr.taxAmount,
        }),
        {subtotal: 0, tax: 0},
      );
    });
  }, [items]);

  return {calculateTotals};
};
