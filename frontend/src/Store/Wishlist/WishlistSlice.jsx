import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  wishItems: [],
};
const WishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleWishlist: (state, action) => {
      const id = action.payload;
      if (state.wishItems.includes(id)) {
        state.wishItems = state.wishItems.filter((item) => item !== id);
      } else {
        state.wishItems.push(id);
      }
    },
    clearWishList: (state) => {
      state.wishItems = [];
    },
  },
});

export const { toggleWishlist, clearWishList } = WishlistSlice.actions;
export default WishlistSlice.reducer;
