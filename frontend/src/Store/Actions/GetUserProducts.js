import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  tagTypes: ["UserCart", "UserWishlist"],
  endpoints: (builder) => ({
    // Update Cart: Only sends the new cart array to the specific user ID
    updateCart: builder.mutation({
      query: ({ userId, cartItems }) => ({
        url: `users/${userId}`,
        method: "PATCH",
        body: { cart: cartItems }, // json-server will only update the "cart" field
      }),
      invalidatesTags: ["UserCart"],
    }),

    // Update Wishlist: Only sends the new wishlist array
    updateWishlist: builder.mutation({
      query: ({ userId, wishlistItems }) => ({
        url: `users/${userId}`,
        method: "PATCH",
        body: { wishlist: wishlistItems },
      }),
      invalidatesTags: ["UserWishlist"],
    }),

    // Get specific user data (including their cart/wishlist)
    getUserData: builder.query({
      query: (userId) => `users/${userId}`,
      providesTags: ["UserCart", "UserWishlist"],
    }),
  }),
});

export const {
  useUpdateCartMutation,
  useUpdateWishlistMutation,
  useGetUserDataQuery,
} = userApi;
