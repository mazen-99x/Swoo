import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import UseGetProducts from "../Hooks/UseGetProducts";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";


const FILTERS_KEY = "selectedFilters";
const PAGE_CONFIG_KEY = "pageSizePreference";
const PAGE_SIZES = [8, 12, 16, 24];

const UseProducts = () => {
  const { t } = useTranslation();
  const isRtl = i18n.language === "ar";
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 50000]);

 
  const initialData = useMemo(() => {
    const saved = localStorage.getItem(FILTERS_KEY);
    const parsed = saved ? JSON.parse(saved) : null;

    return {
      category:
        searchParams.get("category") || parsed?.categories?.join(",") || "",
      rating: searchParams.get("rating") || parsed?.rating || null,
      page: parseInt(searchParams.get("page") || "1"),
      size: parseInt(
        searchParams.get("size") ||
          localStorage.getItem(PAGE_CONFIG_KEY) ||
          PAGE_SIZES[0],
      ),
    };
  }, [searchParams]); 


  const categoryParam = initialData.category;
  const ratingParam = initialData.rating;
  const currentPage = initialData.page;
  const itemsPerPage = initialData.size;

  const [rating, setRating] = useState(
    ratingParam ? Number(ratingParam) : null,
  );
  const [viewMode, setViewMode] = useState(
    () => localStorage.getItem("viewMode") || "grid",
  );

  const selectedCategories = useMemo(
    () => (categoryParam ? categoryParam.split(",") : []),
    [categoryParam],
  );


  const { products, isLoading, isFetching } =
    UseGetProducts(selectedCategories);
  const isWorking = isFetching || isLoading;

  
  const updateQueryParams = useCallback(
    (updates) => {
      const params = new URLSearchParams(searchParams);

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

    
      if (
        !updates.page &&
        (updates.category !== undefined ||
          updates.rating !== undefined ||
          updates.size !== undefined)
      ) {
        params.delete("page");
      }

      setSearchParams(params);
    },
    [searchParams, setSearchParams],
  );


  const handlePageChange = (newPage) => {
    const pageVal =
      typeof newPage === "function" ? newPage(currentPage) : newPage;
    updateQueryParams({ page: pageVal });
  };

  const handlePageSizeChange = (newSize) => {
    localStorage.setItem(PAGE_CONFIG_KEY, newSize);
    updateQueryParams({ size: newSize });
  };

  const handleCategoryChange = (slug) => {
    const updated = selectedCategories.includes(slug)
      ? selectedCategories.filter((c) => c !== slug)
      : [...selectedCategories, slug];

    updateQueryParams({ category: updated.join(",") });
    localStorage.setItem(
      FILTERS_KEY,
      JSON.stringify({ categories: updated, rating }),
    );
  };

  const handleRatingChange = (value) => {
    setRating(value);
    updateQueryParams({ rating: value });
    localStorage.setItem(
      FILTERS_KEY,
      JSON.stringify({ categories: selectedCategories, rating: value }),
    );
  };

  const handleClearFilters = () => {
    setSearchParams({});
    setRating(null);
    setPriceRange([0, 50000]);
    localStorage.removeItem(FILTERS_KEY);
  };


  const filteredProducts = useMemo(() => {
    let result = products || [];
    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }
    return result.filter(
      (p) =>
        p.price >= priceRange[0] &&
        p.price <= priceRange[1] &&
        (rating ? p.rating >= rating : true),
    );
  }, [products, selectedCategories, priceRange, rating]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts?.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  const totalPages = Math.ceil((filteredProducts?.length || 0) / itemsPerPage);

  const getVisiblePages = () => {
    const pages = [];
    const maxVisible = 5;
    if (totalPages <= maxVisible)
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    pages.push(1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (!pages.includes(totalPages)) pages.push(totalPages);
    return pages;
  };


  useEffect(() => {
    localStorage.setItem("viewMode", viewMode);
  }, [viewMode]);

  
  useEffect(() => {
    const hasUrlParams =
      searchParams.get("category") || searchParams.get("rating");
    if (!hasUrlParams && (categoryParam || ratingParam)) {
      updateQueryParams({ category: categoryParam, rating: ratingParam });
    }
  }, [searchParams, categoryParam, ratingParam, updateQueryParams]);


  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return {
    products: paginatedProducts,
    allFilteredProducts: filteredProducts,
    isLoading: isWorking,
    currentPage,
    totalPages,
    itemsPerPage,
    visiblePages: getVisiblePages(),
    selectedCategories,
    rating,
    priceRange,
    viewMode,
    isFilterOpen,
    isRtl,
    setIsFilterOpen,
    setViewMode,
    setPriceRange,
    handlePageChange,
    handlePageSizeChange,
    handleCategoryChange,
    handleRatingChange,
    handleClearFilters,
    t,
  };
};

export default UseProducts;
