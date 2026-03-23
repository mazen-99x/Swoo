import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  tagTypes: ["UserCart", "UserWishlist"],
  endpoints: (builder) => ({

    updateCart: builder.mutation({
      query: ({ userId, cartItems }) => ({
        url: `users/${userId}`,
        method: "PATCH",
        body: { cart: cartItems }, 
      }),
      invalidatesTags: ["UserCart"],
    }),


    updateWishlist: builder.mutation({
      query: ({ userId, wishlistItems }) => ({
        url: `users/${userId}`,
        method: "PATCH",
        body: { wishlist: wishlistItems },
      }),
      invalidatesTags: ["UserWishlist"],
    }),

    
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
