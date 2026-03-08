import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { FaFilter } from "react-icons/fa";

import FilterPanel from "./FilterPanel";
import OutlineButton from "../../Components/OutlineButton";
import ViewModeToggle from "./ViewToggle";
import DisplayDropdown from "./DisplayOptions";
import Product from "../../Components/Product/Product";
import ProductSkeleton from "../../Components/Skeletons/ProductSkeleton";

import UseGetProducts from "../../Hooks/UseGetProducts";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
// keys to use in localStorage to save user filter chooses
const FILTERS_KEY = "selectedFilters";
const PAGE_CONFIG_KEY = "pageSizePreference";
const PAGE_SIZES = [8, 12, 16, 24];

const Products = () => {
  const { t } = useTranslation();
  const isRtl = i18n.language === "ar";
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 50000]);

  // --- 1. GET STATES FROM URL TO STILL BE SAVE EVEN USER GO TO OTHER PAGES ---
  const categoryParam = searchParams.get("category");
  const ratingParam = searchParams.get("rating");
  const currentPage = parseInt(searchParams.get("page") || "1");

  // Size priority: URL -> LocalStorage -> Default (8)
  const itemsPerPage = parseInt(
    searchParams.get("size") ||
      localStorage.getItem(PAGE_CONFIG_KEY) ||
      PAGE_SIZES[0],
  );

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

  // --- 2. API DATA ---
  const { products, isLoading, isFetching } =
    UseGetProducts(selectedCategories);
  const isWorking = isFetching || isLoading;

  // --- 3. PERSISTENCE HELPERS ---

  // Updates URL and handles side effects like resetting page to 1
  const updateQueryParams = useCallback(
    (updates) => {
      const params = new URLSearchParams(searchParams);

      // Apply all updates to URL
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

      // logic: If we are changing filters/size, we MUST go back to page 1
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

  // --- 4. EVENT HANDLERS ---

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
    let updated = selectedCategories.includes(slug)
      ? selectedCategories.filter((c) => c !== slug)
      : [...selectedCategories, slug];

    const catString = updated.join(",");
    updateQueryParams({ category: catString });

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

  // --- 5. DATA PROCESSING (Filtering & Pagination) ---

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

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts?.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  const totalPages = Math.ceil((filteredProducts?.length || 0) / itemsPerPage);
  const getVisiblePages = () => {
    const pages = [];

    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    pages.push(1); // always show first

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (!pages.includes(totalPages)) {
      pages.push(totalPages); // always show last
    }

    return pages;
  };
  // Persistence for View Mode
  useEffect(() => {
    localStorage.setItem("viewMode", viewMode);
  }, [viewMode]);

  // Restore filters from localStorage on first mount ONLY
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
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [currentPage]);
  return (
    <section className="min-h-screen my-6">
      <div className="lg:grid lg:grid-cols-[16rem_1fr] gap-6">
        {/* Desktop Filter */}
        <aside className="hidden lg:block">
          <div className="rounded-lg shadow-md h-fit overflow-y-auto">
            <FilterPanel
              selectedCategories={selectedCategories}
              onCategoryChange={handleCategoryChange}
              onRatingChange={handleRatingChange}
              onClear={handleClearFilters}
              setIsFilterOpen={setIsFilterOpen}
              isFilterOpen={isFilterOpen}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              rating={rating}
              setRating={setRating}
            />
          </div>
        </aside>

        <main>
          {/* Top Controls */}
          <div
            className="bg-(--white-color) dark:bg-(--dark-alt-color) rounded-lg shadow-md p-4 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4"
            dir={isRtl ? "rtl" : "ltr"}
          >
            <OutlineButton
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="lg:hidden flex items-center gap-2"
            >
              {/* Icon direction usually stays the same for filters, but labels translate */}
              <FaFilter /> <span>{t("product.filters")}</span>
            </OutlineButton>

            {/* Changed ml-auto to ms-auto (Logical Property) */}
            <div className="flex items-center gap-4 ms-auto">
              <div className="hidden lg:flex items-center gap-4">
                <DisplayDropdown
                  pageSize={itemsPerPage}
                  setPageSize={handlePageSizeChange}
                  setPage={handlePageChange}
                />
                <ViewModeToggle
                  viewMode={viewMode}
                  handleViewModeChange={setViewMode}
                />
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div
            className={`grid gap-4 mb-8 ${
              viewMode === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "grid-cols-1 sm:grid-cols-2"
            }`}
          >
            {isWorking ? (
              // 1. If loading, show skeletons
              Array(8)
                .fill(0)
                .map((_, i) => <ProductSkeleton key={i} />)
            ) : paginatedProducts?.length > 0 ? (
              // 2. If not loading AND we have products, show them
              paginatedProducts.map((product) => (
                <Product key={product.id} product={product} />
              ))
            ) : (
              // 3. If not loading AND length is 0, show "No products"
              <div className="col-span-full flex flex-col items-center justify-center py-10">
                <div className="text-6xl mb-4">🔍</div>
                <p className="text-lg font-medium mb-1">No products found</p>
                <p className="text-sm text-gray-500">
                  Try adjusting your filters
                </p>
              </div>
            )}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-3 mt-8 flex-wrap">
              {/* Prev */}
              <OutlineButton
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="px-4 py-2"
              >
                {t("product.preview")}
              </OutlineButton>

              <div className="sm:hidden px-4 py-2 rounded-xl bg-(--main-color) text-white font-medium shadow">
                {currentPage} / {totalPages}
              </div>

              <div className="hidden sm:flex gap-2">
                {getVisiblePages().map((page) => {
                  let label = page;

                  if (page === totalPages) label = "End";

                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`
              min-w-11 h-10 px-3 rounded-xl cursor-pointer font-medium 
              transition-all duration-200 
              ${
                currentPage === page
                  ? "bg-(--main-color) text-white shadow-md shadow-(--main-color)/30 scale-105"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-(--main-color) hover:text-white hover:scale-105"
              }
            `}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>

              {/* Next */}
              <OutlineButton
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="px-4 py-2"
              >
                {t("product.next")}
              </OutlineButton>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filter Panel Overlay */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${isFilterOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        <div
          className="absolute inset-0 bg-black/60"
          onClick={() => setIsFilterOpen(false)}
        />
        <div
          className={`absolute left-0 top-0 h-full w-80 dark:bg-(--dark-secondary-color) bg-(--gray-color) shadow-xl transform transition-transform duration-300 ${isFilterOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <FilterPanel
            selectedCategories={selectedCategories}
            onCategoryChange={handleCategoryChange}
            onRatingChange={handleRatingChange}
            onClear={handleClearFilters}
            setIsFilterOpen={setIsFilterOpen}
            isFilterOpen={isFilterOpen}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            rating={rating}
            setRating={setRating}
          />
        </div>
      </div>
    </section>
  );
};

export default Products;
