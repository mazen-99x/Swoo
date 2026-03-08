import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchSeller = async () => {
  const res = await axios.get("http://localhost:5000/products");

  return res.data;
};

const UseGetSeller = () => {
  return useQuery({
    queryKey: ["seller"],
    queryFn: () => fetchSeller(),
    staleTime: 1000 * 60 * 5,
  });
};

export default UseGetSeller;
