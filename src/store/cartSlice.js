import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Array of objects with info about products in a cart
  },
  reducers: {
    addToCart: (state, action) => {
			const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);

      if (existingItemIndex !== -1) {
        // Update quantity if product exist already in the cart
        state.items[existingItemIndex].quantityToOrder += action.payload.quantityToOrder;
      } else {
        // The product is not yet in the cart, add a new item
        state.items.push(action.payload);
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
    updateCartItemQuantity: (state, action) => {
      const { itemId, newQuantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === itemId);

      if (existingItem) {
        existingItem.quantityToOrder = newQuantity;
      }
    },
    removeCartItem: (state, action) => {
      const itemIdToRemove = action.payload;
      state.items = state.items.filter((item) => item.id !== itemIdToRemove);
    },
  },
});

export const { addToCart, clearCart, updateCartItemQuantity, removeCartItem } = cartSlice.actions;
export default cartSlice.reducer;
