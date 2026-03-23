import { useQueries } from "@tanstack/react-query";
import axios from "axios";

const fetchProduct = async (category) => {
  if (!category) {
    const res = await axios.get(`https://dummyjson.com/products`);
    return res.data.products;
  } else {
    const res = await axios.get(
      `https://dummyjson.com/products/category/${category}`,
    );
    return res.data.products;
  }
};

const useGetProducts = (categories = []) => {
  const finalCategories = categories.length ? categories : [null];

  const queries = useQueries({
    queries: finalCategories.map((category) => ({
      queryKey: ["products", category],

      queryFn: () => fetchProduct(category),

      staleTime: 1000 * 60 * 5,

      gcTime: 1000 * 60 * 10,

      refetchOnWindowFocus: false,

      retry: 2,
    })),
  });

  const products = queries.flatMap((q) => q.data || []);

  const isLoading = queries.some((q) => q.isLoading);
  const isFetching = queries.some((q) => q.isFetching);

  const error = queries.find((q) => q.error)?.error || null;

  return { products, isLoading, isFetching, error };
};

export default useGetProducts;
