import { createSlice } from '@reduxjs/toolkit';

const categoryProductsSlice = createSlice({
  name: 'categoryProducts',
  initialState: {
		products: [],
  },
  reducers: {
		setCategoryProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { setCategoryProducts } = categoryProductsSlice.actions;
export default categoryProductsSlice.reducer;
