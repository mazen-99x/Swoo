/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
// React core hooks
import { useCallback, useEffect, useMemo, useState } from "react";

// React Router hook that lets us read & write URL query parameters
// This makes the URL our "source of truth"
import { useSearchParams } from "react-router";

import { FaFilter } from "react-icons/fa";

// Custom & UI Components
import FilterPanel from "./FilterPanel";
import OutlineButton from "../../Components/OutlineButton";
import ViewModeToggle from "./ViewToggle";
import DisplayDropdown from "./DisplayOptions";
import Product from "../../Components/Product/Product";
import ProductSkeleton from "../../Components/Skeletons/ProductSkeleton";

// Custom data fetching hook
import UseGetProducts from "../../Hooks/UseGetProducts";

// Keys used for saving user preferences in localStorage
const FILTERS_KEY = "selectedFilters"; // saves filters (category + rating)
const PAGE_CONFIG_KEY = "pageSizePreference"; // saves page size
const PAGE_SIZES = [8, 12, 16, 24]; // allowed page size options

const Products = () => {
  // This gives us access to the current URL query params
  // and a function to update them.
  // Example URL:
  // /products?category=phones&page=2&rating=4
  const [searchParams, setSearchParams] = useSearchParams();

  // Local UI state — controls mobile filter drawer visibility.
  // Not stored in URL because it’s purely visual.
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Local UI state — controls price slider.
  // Not stored in URL in your version.
  const [priceRange, setPriceRange] = useState([0, 50000]);

  // ===============================
  // 1️⃣ DERIVED STATE FROM URL
  // ===============================

  // We read values from the URL.
  // URL is treated as the single source of truth.
  const categoryParam = searchParams.get("category"); // string like "phones,laptops"
  const ratingParam = searchParams.get("rating"); // string like "4"
  const currentPage = parseInt(searchParams.get("page") || "1"); // default page 1

  // Page size priority:
  // 1️⃣ URL (highest priority)
  // 2️⃣ localStorage (user preference)
  // 3️⃣ Default (8)
  const itemsPerPage = parseInt(
    searchParams.get("size") ||
      localStorage.getItem(PAGE_CONFIG_KEY) ||
      PAGE_SIZES[0],
  );

  // Rating stored in state because UI needs instant response.
  // But it stays synced with URL.
  const [rating, setRating] = useState(
    ratingParam ? Number(ratingParam) : null,
  );

  // View mode (grid/list)
  // Lazy initialization: function runs only once on mount.
  const [viewMode, setViewMode] = useState(
    () => localStorage.getItem("viewMode") || "grid",
  );

  // Convert category string → array
  // Example:
  // "phones,laptops" → ["phones", "laptops"]
  // useMemo prevents recalculating unless categoryParam changes.
  const selectedCategories = useMemo(
    () => (categoryParam ? categoryParam.split(",") : []),
    [categoryParam],
  );

  // ===============================
  // 2️⃣ FETCH DATA
  // ===============================

  // Custom hook fetches products.
  // If categories change → hook can refetch.
  const { products, isLoading } = UseGetProducts(selectedCategories);

  // ===============================
  // 3️⃣ CENTRAL URL UPDATE FUNCTION
  // ===============================

  // This function updates URL safely and intelligently.
  // useCallback prevents recreation on every render.
  const updateQueryParams = useCallback(
    (updates) => {
      // Clone current URL parameters
      const params = new URLSearchParams(searchParams);

      // Apply all updates
      Object.keys(updates).forEach((key) => {
        if (updates[key] === null || updates[key] === "") {
          params.delete(key); // remove empty values from URL
        } else {
          params.set(key, updates[key]);
        }
      });

      // UX Rule:
      // If filters or page size change,
      // reset page to 1 automatically.
      if (
        !updates.page &&
        (updates.category !== undefined ||
          updates.rating !== undefined ||
          updates.size !== undefined)
      ) {
        params.set("page", "1");
      }

      // Apply updated URL
      setSearchParams(params);
    },
    [searchParams, setSearchParams],
  );

  // ===============================
  // 4️⃣ EVENT HANDLERS
  // ===============================

  // Handles page switching.
  // Accepts number or function (like React setState).
  const handlePageChange = (newPage) => {
    const pageVal =
      typeof newPage === "function" ? newPage(currentPage) : newPage;

    updateQueryParams({ page: pageVal });
  };

  // Handles page size change.
  // Saves preference and updates URL.
  const handlePageSizeChange = (newSize) => {
    localStorage.setItem(PAGE_CONFIG_KEY, newSize);
    updateQueryParams({ size: newSize });
  };

  // Category toggle logic (add/remove).
  // Uses immutable updates (never mutate array directly).
  const handleCategoryChange = (slug) => {
    let updated = selectedCategories.includes(slug)
      ? selectedCategories.filter((c) => c !== slug) // remove
      : [...selectedCategories, slug]; // add

    updateQueryParams({ category: updated.join(",") });

    // Persist in localStorage
    localStorage.setItem(
      FILTERS_KEY,
      JSON.stringify({ categories: updated, rating }),
    );
  };

  // Rating update
  const handleRatingChange = (value) => {
    setRating(value); // update UI state
    updateQueryParams({ rating: value }); // sync with URL

    localStorage.setItem(
      FILTERS_KEY,
      JSON.stringify({ categories: selectedCategories, rating: value }),
    );
  };

  // Clear everything
  const handleClearFilters = () => {
    setSearchParams({}); // reset URL
    setRating(null);
    setPriceRange([0, 50000]);
    localStorage.removeItem(FILTERS_KEY);
  };

  // ===============================
  // 5️⃣ FILTERING (MEMOIZED)
  // ===============================

  const filteredProducts = useMemo(() => {
    return (
      selectedCategories.length
        ? products?.filter((p) => selectedCategories.includes(p.category))
        : products
    )?.filter(
      (p) =>
        p.price >= priceRange[0] &&
        p.price <= priceRange[1] &&
        (rating ? p.rating >= rating : true),
    );
  }, [products, selectedCategories, priceRange, rating]);

  // ===============================
  // 6️⃣ PAGINATION (MEMOIZED)
  // ===============================

  const paginatedProducts = useMemo(() => {
    // Calculate slice window
    const startIndex = (currentPage - 1) * itemsPerPage;

    return filteredProducts?.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  const totalPages = Math.ceil((filteredProducts?.length || 0) / itemsPerPage);

  // ===============================
  // 7️⃣ SIDE EFFECTS
  // ===============================

  // Persist view mode whenever it changes
  useEffect(() => {
    localStorage.setItem("viewMode", viewMode);
  }, [viewMode]);

  // Restore filters from localStorage (only if URL empty)
  useEffect(() => {
    const saved = localStorage.getItem(FILTERS_KEY);

    if (saved && !categoryParam && !ratingParam) {
      const { categories, rating: savedRating } = JSON.parse(saved);

      updateQueryParams({
        category: categories.join(","),
        rating: savedRating,
      });

      if (savedRating) setRating(savedRating);
    }
  }, [categoryParam, ratingParam, updateQueryParams]);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [currentPage]);
};
