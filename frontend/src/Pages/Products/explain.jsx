import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { FaFilter } from "react-icons/fa";

// Component Imports
import FilterPanel from "./FilterPanel";
import OutlineButton from "../../Components/OutlineButton";
import ViewModeToggle from "./ViewToggle";
import DisplayDropdown from "./DisplayOptions";
import Product from "../../Components/Product/Product";
import ProductSkeleton from "../../Components/Skeletons/ProductSkeleton";
import UseGetProducts from "../../Hooks/UseGetProducts";

// Keys for browser storage to keep user preferences persistent
const FILTERS_KEY = "selectedFilters";
const PAGE_CONFIG_KEY = "pageSizePreference";
const PAGE_SIZES = [8, 12, 16, 24]; // Standard e-commerce grid sizes

const Products = () => {
  // --- 1. STATE & URL SYNC ---
  // searchParams allows the URL to be the "Master Source of Truth" (e.g., ?page=2)
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false); // Controls mobile drawer visibility
  const [priceRange, setPriceRange] = useState([0, 50000]); // Local UI state for slider

  // --- 2. DERIVED DATA FROM URL ---
  // We read the URL to decide what to show. This allows users to share links with filters active.
  const categoryParam = searchParams.get("category");
  const ratingParam = searchParams.get("rating");
  const currentPage = parseInt(searchParams.get("page") || "1");

  // Logic: Use URL size first, then check LocalStorage, then fall back to 8
  const itemsPerPage = parseInt(
    searchParams.get("size") ||
      localStorage.getItem(PAGE_CONFIG_KEY) ||
      PAGE_SIZES[0],
  );

  // rating and viewMode are initialized from URL/LocalStorage for a seamless experience
  const [rating, setRating] = useState(
    ratingParam ? Number(ratingParam) : null,
  );
  const [viewMode, setViewMode] = useState(
    () => localStorage.getItem("viewMode") || "grid",
  );

  // useMemo prevents re-splitting the category string unless the URL actually changes
  const selectedCategories = useMemo(
    () => (categoryParam ? categoryParam.split(",") : []),
    [categoryParam],
  );

  // --- 3. API FETCHING ---
  // Custom hook fetches products. Passing selectedCategories allows for API-side filtering if supported.
  const { products, isLoading } = UseGetProducts(selectedCategories);

  // --- 4. THE NAVIGATOR (URL UPDATER) ---
  // This memoized function handles ALL changes to filters/pagination.
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

      // Maintain your auto-reset logic for other filters
      if (
        !updates.page &&
        (updates.category !== undefined ||
          updates.rating !== undefined ||
          updates.size !== undefined)
      ) {
        // Here, instead of setting it to "1", we delete it to keep the URL clean
        params.delete("page");
      }

      setSearchParams(params);
    },

    [searchParams, setSearchParams],
  );

  // --- 5. EVENT HANDLERS ---

  const handlePageChange = (newPage) => {
    // Supports both functional updates and direct values
    const pageVal =
      typeof newPage === "function" ? newPage(currentPage) : newPage;
    updateQueryParams({ page: pageVal });
  };

  const handlePageSizeChange = (newSize) => {
    localStorage.setItem(PAGE_CONFIG_KEY, newSize); // Remember user preference
    updateQueryParams({ size: newSize });
  };

  const handleCategoryChange = (slug) => {
    // Multi-select logic: if it's there, remove it. If not, add it.
    let updated = selectedCategories.includes(slug)
      ? selectedCategories.filter((c) => c !== slug)
      : [...selectedCategories, slug];

    updateQueryParams({ category: updated.join(",") });

    // Backup to localStorage so filters persist even on browser close
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
    setSearchParams({}); // Empty the URL
    setRating(null);
    setPriceRange([0, 50000]);
    localStorage.removeItem(FILTERS_KEY); // Wipe browser memory
  };

  // --- 6. THE DATA PIPELINE (FILTERING & PAGINATION) ---

  // filteredProducts: Runs the logic to decide WHICH items fit the user's criteria.
  // We use useMemo because filtering 100+ items is slow to do on every render.
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

  // paginatedProducts: Takes the filtered list and cuts it into a "page."
  // Logic: (currentPage 2, size 8) starts at index 8 and takes the next 8 items.
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts?.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  // Total pages calculation for the pagination buttons
  const totalPages = Math.ceil((filteredProducts?.length || 0) / itemsPerPage);

  // --- 7. SIDE EFFECTS (LIFECYCLE) ---

  // Save ViewMode (Grid/List) whenever it changes
  useEffect(() => {
    localStorage.setItem("viewMode", viewMode);
  }, [viewMode]);

  // "Hydration" Hook: On first load, if URL is empty, try to restore filters from localStorage.
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

  // Auto-scroll to top when page changes so user doesn't stay at the footer.
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <section className="min-h-screen my-6">
      {/* Layout uses CSS Grid: Sidebar (16rem) + Main Content (1fr) */}
      <div className="lg:grid lg:grid-cols-[16rem_1fr] gap-6">
        {/* DESKTOP SIDEBAR */}
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
          {/* TOOLBAR: Filter Toggle (Mobile), Size Dropdown, View Toggle */}
          <div className="bg-(--white-color) dark:bg-(--dark-alt-color) rounded-lg shadow-md p-4 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <OutlineButton
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="lg:hidden"
            >
              <FaFilter /> <span>Filters</span>
            </OutlineButton>

            <div className="flex items-center gap-4 ml-auto">
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

          {/* THE PRODUCT GRID */}
          <div
            className={`grid gap-4 mb-8 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1 sm:grid-cols-2"}`}
          >
            {/* Loading State: Show Skeletons to improve "Perceived Performance" */}
            {isLoading ? (
              Array(8)
                .fill(0)
                .map((_, i) => <ProductSkeleton key={i} />)
            ) : paginatedProducts?.length > 0 ? (
              // Success State: Render paginated results
              paginatedProducts.map((product) => (
                <Product key={product.id} product={product} />
              ))
            ) : (
              // Empty State: Professional feedback when no items match filters
              <div className="col-span-full flex flex-col items-center justify-center py-10">
                <div className="text-6xl mb-4">🔍</div>
                <p className="text-lg font-medium mb-1">No products found</p>
                <p className="text-sm text-gray-500">
                  Try adjusting your filters
                </p>
              </div>
            )}
          </div>

          {/* PAGINATION UI */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-8">
              <OutlineButton
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="px-4 py-2"
              >
                Previous
              </OutlineButton>
              <span className="font-medium">
                Page {currentPage} of {totalPages}
              </span>
              <OutlineButton
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="px-4 py-2"
              >
                Next
              </OutlineButton>
            </div>
          )}
        </main>
      </div>

      {/* MOBILE FILTER OVERLAY (Drawer Pattern) */}
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
            {...{
              selectedCategories,
              handleCategoryChange,
              handleRatingChange,
              handleClearFilters,
              setIsFilterOpen,
              isFilterOpen,
              priceRange,
              setPriceRange,
              rating,
              setRating,
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Products;
