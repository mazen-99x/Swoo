import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useCallback, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router";

const pageSize = 12;
const UseSearch = () => {
  const [searchParam, setSearchParams] = useSearchParams();
  const getPage = parseInt(searchParam.get("page") || "1");
  const getQuery = searchParam.get("query") || "";

  const {
    data: searchProduct,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["searchPage", getQuery],
    queryFn: async () => {
      const res = await axios.get(
        `https://dummyjson.com/products/search?q=${getQuery}`,
      );
      return res.data.products;
    },
    enabled: !!getQuery,
    staleTime: 1000 * 60 * 5,
  });

  const updateQueryParams = useCallback(
    (updates) => {
      const params = new URLSearchParams(searchParam);

      
      Object.keys(updates).forEach((key) => {
        const value = updates[key];

        if (
          value === null ||
          value === "" ||
          (key === "page" && String(value) === "1")
        ) {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });

      setSearchParams(params);
    },
    [searchParam, setSearchParams],
  );
  const handlePageChange = (newPage) => {
    const pageVal = typeof newPage === "function" ? getPage(newPage) : newPage;
    updateQueryParams({ page: pageVal });
  };
  const paginatedProducts = useMemo(() => {
    const startIndex = (getPage - 1) * pageSize;
    return searchProduct?.slice(startIndex, startIndex + pageSize);
  }, [searchProduct, getPage]);
  const totalPages = Math.ceil((searchProduct?.length || 0) / pageSize);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [getPage]);
  return {
    totalPages,
    paginatedProducts,
    handlePageChange,
    isLoading,
    isError,
    getQuery,
    searchProduct,
    getPage,
  };
};

export default UseSearch;
