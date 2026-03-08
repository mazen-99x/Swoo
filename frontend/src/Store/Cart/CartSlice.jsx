import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  items: {},
};
const CartSlice = createSlice({
  initialState,
  name: "cart",
  reducers: {
    addToCart: (state, action) => {
      const { id, stock } = action.payload;
      const currentQty = state.items[id] || 0;
      const maxAllowed = Math.min(5, stock);

      if (currentQty < maxAllowed) {
        state.items[id] = currentQty + 1;
      }
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      if (state.items[id] > 1) {
        state.items[id] -= 1;
      } else {
        delete state.items[id];
      }
    },
    clearCart: (state) => {
      state.items = {};
    },
  },
});
export const { addToCart, removeFromCart, clearCart } = CartSlice.actions;
export default CartSlice.reducer;
