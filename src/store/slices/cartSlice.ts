import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Product} from '../../types/api';

interface CartItem extends Product {
  quantity: number;
  originalPrice: number;
  discountedPrice: number;
}

interface CartState {
  items: CartItem[];
  total: number;
  savedAmount: number;
}

const calculateDiscountedPrice = (
  price: number,
  discountPercentage: number = 0,
) => {
  const discount = price * (discountPercentage / 100);
  return price - discount;
};

const initialState: CartState = {
  items: [],
  total: 0,
  savedAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(
        item => item.id === action.payload.id,
      );
      const discountedPrice = calculateDiscountedPrice(
        action.payload.price,
        action.payload.discountPercentage,
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1,
          originalPrice: action.payload.price,
          discountedPrice,
        });
      }

      state.total = state.items.reduce(
        (sum, item) => sum + item.discountedPrice * item.quantity,
        0,
      );
      state.savedAmount = state.items.reduce(
        (sum, item) =>
          sum + (item.originalPrice - item.discountedPrice) * item.quantity,
        0,
      );
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.total = state.items.reduce(
        (sum, item) => sum + item.discountedPrice * item.quantity,
        0,
      );
      state.savedAmount = state.items.reduce(
        (sum, item) =>
          sum + (item.originalPrice - item.discountedPrice) * item.quantity,
        0,
      );
    },
    updateQuantity: (
      state,
      action: PayloadAction<{id: number; quantity: number}>,
    ) => {
      const {id, quantity} = action.payload;
      const item = state.items.find(item => item.id === id);

      if (item) {
        item.quantity = Math.max(1, quantity);
        state.total = state.items.reduce(
          (sum, item) => sum + item.discountedPrice * item.quantity,
          0,
        );
        state.savedAmount = state.items.reduce(
          (sum, item) =>
            sum + (item.originalPrice - item.discountedPrice) * item.quantity,
          0,
        );
      }
    },
  },
});

export const {addToCart, removeFromCart, updateQuantity} = cartSlice.actions;
export default cartSlice.reducer;
