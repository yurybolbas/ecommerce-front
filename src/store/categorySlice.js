import { createSlice } from '@reduxjs/toolkit';

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    selectedCategory: null,
		categories: [],
  },
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
		setCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
});

export const { setSelectedCategory, setCategories } = categorySlice.actions;
export default categorySlice.reducer;
