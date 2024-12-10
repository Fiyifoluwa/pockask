import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Product} from '../../types/api';

interface SavedState {
  items: Product[];
}

const initialState: SavedState = {
  items: [],
};

const savedSlice = createSlice({
  name: 'saved',
  initialState,
  reducers: {
    addToSaved: (state, action: PayloadAction<Product>) => {
      const exists = state.items.some(item => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
      }
    },
    removeFromSaved: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
});

export const {addToSaved, removeFromSaved} = savedSlice.actions;

export const selectSavedItems = (state: {saved: SavedState}) =>
  state.saved.items;

export default savedSlice.reducer;
