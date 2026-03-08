import { useQueries } from "@tanstack/react-query";
import axios from "axios";

/**
 * HELPER FUNCTION: fetchProduct
 * This is the actual network request logic.
 * We separate it from the hook to keep the code clean and testable.
 */
const fetchProduct = async (category) => {
  // Logic: If category is null/undefined, fetch the general "all products" list
  if (!category) {
    const res = await axios.get(`https://dummyjson.com/products`);
    return res.data.products;
  } else {
    // If a category exists, hit the specific endpoint for that category
    const res = await axios.get(
      `https://dummyjson.com/products/category/${category}`,
    );
    return res.data.products;
  }
};

/**
 * CUSTOM HOOK: useGetProducts
 * Why use a hook? To share this logic across different components (Home, Shop, etc.)
 */
const useGetProducts = (categories = []) => {
  // 1. DATA PREPARATION
  // If categories is empty [], we still want to fetch "all".
  // We force an array with [null] so the .map() below runs at least once.
  const finalCategories = categories.length ? categories : [null];

  // 2. THE MULTI-QUERY ENGINE
  // Why useQueries? Because React Hooks cannot be called inside loops.
  // useQueries allows us to fetch an UNKNOWN number of categories in parallel.
  const queries = useQueries({
    queries: finalCategories.map((category) => ({
      // queryKey: Unique fingerprint for this specific data.
      // If the user selects "smartphones" twice, it loads instantly from cache.
      queryKey: ["products", category],

      // queryFn: The function that returns the promise.
      queryFn: () => fetchProduct(category),

      // Professional touch: Keep data fresh for 5 minutes to reduce API calls
      staleTime: 1000 * 60 * 5,
      // 2. GARBAGE COLLECTION: How long to keep data in RAM after user leaves? (10 minutes)
      // Even if they uncheck a category, keep it in memory so checking it again is instant.
      gcTime: 1000 * 60 * 10,

      // 3. SMOOTH TRANSITION: This prevents the "Hard Loading" skeleton
      // when data is already in the cache.
      refetchOnWindowFocus: false,

      // 4. RETRY LOGIC: If the API fails, try 2 more times automatically.
      retry: 2,
    })),
  });

  // 3. DATA TRANSFORMATION (The "Mashing" Phase)
  // useQueries returns an array of objects: [{data: [...], isLoading: false}, {...}]
  // We need to turn that back into a single flat list of products.

  // .flatMap merges several arrays into one.
  // Example: [[Laptop1], [Phone1]] -> [Laptop1, Phone1]

  const products = queries.flatMap((q) => q.data || []);

  // 4. COMBINED LOADING STATE
  // Logic: If ANY of the queries are still loading, the whole page is "Loading"
  const isLoading = queries.some((q) => q.isLoading);
  const isFetching = queries.some((q) => q.isFetching);

  // 5. ERROR HANDLING
  // Logic: Find the first query that failed (if any) and return that error.
  const error = queries.find((q) => q.error)?.error || null;

  // Return everything the component needs to know
  return { products, isLoading,isFetching, error };
};

export default useGetProducts;
