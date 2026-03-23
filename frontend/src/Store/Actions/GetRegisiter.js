import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    checkUserEmail: builder.query({
      query: (email) => `users?email=${email}`,
      providesTags: ["User"],
    }),
    getUsers: builder.query({
      query: () => "users",
      providesTags: ["User"],
    }),
    deleteAccount: builder.mutation({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    getUserCount: builder.query({
      query: () => "users", 
      providesTags: ["User"],
      transformResponse: (response) => {
        return response.length;
      },
    }),
    getProductCount: builder.query({
      query: () => "products",

      transformResponse: (response) => {
        return response.length;
      },
    }),
    registerUser: builder.mutation({
      query: (formData) => ({
        url: "users",
        method: "POST",
        body: {
          id: Date.now().toString(),
          ...formData,
          role: "user",
          createdAt: new Date().toISOString(),
        },
      }),
      invalidatesTags: ["User"],
    }),
    updateProfile: builder.mutation({
      query: ({ id, name }) => ({
        url: `users/${id}`,
        method: "PATCH",
        body: { name },
      }),
      invalidatesTags: ["User"],
    }),
    updateAdminUser: builder.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `users/${id}`,
        method: "PATCH",
        body: updatedData,
      }),
      invalidatesTags: ["User"],
    }),
    changePassword: builder.mutation({
      query: ({ id, password }) => ({
        url: `users/${id}`,
        method: "PATCH",
        body: { password },
      }),
      invalidatesTags: ["User"],
    }),
  }),
});
export const {
  useRegisterUserMutation,
  useGetUsersQuery,
  useLazyCheckUserEmailQuery,
  useGetUserCountQuery,
  useGetProductCountQuery,
  useDeleteAccountMutation,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useUpdateAdminUserMutation,
} = authApi;
