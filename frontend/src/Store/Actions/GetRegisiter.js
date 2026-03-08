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
    deleteAccount: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
    }),
    registerUser: builder.mutation({
      query: (formData) => ({
        url: "users",
        method: "POST",
        body: {
          id: Date.now().toString(),
          ...formData,
        },
      }),
    }),
    updateProfile: builder.mutation({
      query: ({ id, name }) => ({
        url: `users/${id}`,
        method: "PATCH", // PATCH only updates the fields you send
        body: { name },
      }),
      invalidatesTags: ["User"],
    }),

    // --- NEW: Change Password (Reset Simulation) ---
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
  useLazyCheckUserEmailQuery,
  useDeleteAccountMutation,
  useUpdateProfileMutation,
  useChangePasswordMutation,
} = authApi;
