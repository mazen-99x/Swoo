import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const UseGetCategories = () => {
  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axios.get(`https://dummyjson.com/products/categories`);
      return res.data;
    },

    staleTime: 1000 * 60 * 5,
  });
  return { categories, isLoading };
};

export default UseGetCategories;
