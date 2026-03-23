import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/" }),
  endpoints: (builder) => ({
    getProductsByIds: builder.query({
      async queryFn(ids, _queryApi, _extraOptions, fetchWithBaseQuery) {
        // await new Promise((resolve) => setTimeout(resolve, 6000));
        if (!ids.length) return { data: [] };
        const results =
          (await Promise.all(
            ids.map((id) => fetchWithBaseQuery(`products/${id}`)),
          )) || [];

        
        const error = results.find((res) => res.error);
        if (error) return { error: error.error };

       
        return { data: results.map((res) => res.data) };
      },
    }),
  }),
});

export const { useGetProductsByIdsQuery } = productApi;
