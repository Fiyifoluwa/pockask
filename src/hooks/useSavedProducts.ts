import {useCallback} from 'react';
import {
  addToSaved,
  removeFromSaved,
  selectSavedItems,
} from '../store/slices/savedSlice';
import {Product} from '../types/api';
import {useAppDispatch, useAppSelector} from '../store/store';

export const useSavedProducts = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectSavedItems);

  const isProductSaved = useCallback(
    (productId: number) => {
      return items.some(item => item.id === productId);
    },
    [items],
  );

  const toggleSaveProduct = useCallback(
    (product: Product) => {
      const isSaved = isProductSaved(product.id);

      if (isSaved) {
        dispatch(removeFromSaved(product.id));
      } else {
        dispatch(addToSaved(product));
      }
    },
    [dispatch, isProductSaved],
  );

  return {
    isProductSaved,
    toggleSaveProduct,
  } as const;
};
