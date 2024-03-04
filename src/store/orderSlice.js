import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { sendOrder } from './orderData';

export const postOrder = createAsyncThunk(
  'order/postOrderStatus',
  async (placeOrder) => {
    const response = await sendOrder(placeOrder)
    return response
  }
)

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orderNumber: null,
		loading: 'idle'
  },
  reducers: {
    setOrderNumber: (state, action) => {
			state.orderNumber = action.payload;
    },
    clearOrderNumber: (state) => {
      state.orderNumber = null;
    },
  },
	extraReducers: (builder) => {
		builder.addCase(postOrder.fulfilled, (state, action) => {
			state.orderNumber = action.payload
		})
	}
});

export const { setOrderNumber, clearOrderNumber } = orderSlice.actions;
export default orderSlice.reducer;
