import { FaFilter } from "react-icons/fa";
import { HiOutlineSearchCircle } from "react-icons/hi";

// Components
import FilterPanel from "./FilterPanel";

import ViewModeToggle from "./ViewToggle";
import DisplayDropdown from "./DisplayOptions";
import Product from "../../Components/Product/Product"


import OutlineButton from "../../Components/Common/OutlineButton";
// Hooks
import UseProducts from "../../Hooks/UseProducts";
import ProductSkeleton from "../../Components/Skeletons/ProductSkeleton";

const Products = () => {
  const {
    products: paginatedProducts,
    allFilteredProducts: filteredProducts,
    isLoading: isWorking,
    currentPage,
    totalPages,
    itemsPerPage,
    visiblePages,
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
    setRating,
    t,
  } = UseProducts();

  return (
    <section className="min-h-screen my-6 px-4 sm:px-6 lg:px-8">
      <div className="lg:grid lg:grid-cols-[18rem_1fr] gap-8">
        {/* 1. Desktop Sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 bg-white dark:bg-(--dark-alt-color) rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
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

        {/* 2. Main Content */}
        <main>
          {/* --- Top Controls Wrapper --- */}
          <div className="flex flex-col gap-4 mb-6">
            {/* Results Counter & Mobile Toggle Row */}
            <div className="flex items-center justify-between px-2">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {t("search.showing")}{" "}
                <span className="font-bold text-gray-900 dark:text-white">
                  {paginatedProducts?.length || 0}
                </span>{" "}
                {t("search.of")}{" "}
                <span className="font-bold text-gray-900 dark:text-white">
                  {filteredProducts?.length || 0}
                </span>{" "}
                {t("search.results")}
              </div>

              <OutlineButton
                onClick={() => setIsFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 py-2 px-4 rounded-xl text-sm"
              >
                <FaFilter />
                <span>{t("product.filters")}</span>
              </OutlineButton>
            </div>

            {/* Toolbar (Page Size & View Mode) */}
            <div
              className="bg-white dark:bg-(--dark-alt-color) rounded-2xl shadow-sm p-3 flex items-center justify-between border border-gray-100 dark:border-gray-800"
              dir={isRtl ? "rtl" : "ltr"}
            >
              <div className="flex items-center gap-4 ms-auto">
                <div className="hidden sm:flex items-center gap-2">
                  <DisplayDropdown
                    pageSize={itemsPerPage}
                    setPageSize={handlePageSizeChange}
                    setPage={handlePageChange}
                  />
                  <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-2" />
                  <ViewModeToggle
                    viewMode={viewMode}
                    handleViewModeChange={setViewMode}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* --- Products Display --- */}
          <div
            className={`grid gap-4 mb-8 ${
              viewMode === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "grid-cols-1"
            }`}
          >
            {isWorking ? (
              Array(itemsPerPage || 8)
                .fill(0)
                .map((_, i) => <ProductSkeleton key={i} viewMode={viewMode} />)
            ) : paginatedProducts?.length > 0 ? (
              paginatedProducts.map((product) => (
                <Product
                  key={product.id}
                  product={product}
                  viewMode={viewMode}
                />
              ))
            ) : (
              /* Empty State */
              <div className="col-span-full flex flex-col items-center justify-center py-24 px-6 text-center bg-gray-50 dark:bg-gray-900/30 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-800">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-(--main-color) blur-3xl opacity-10 rounded-full" />
                  <HiOutlineSearchCircle className="text-9xl text-gray-300 dark:text-gray-700 relative z-10" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                  {t("search.noProducts")}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-sm mb-8">
                  {t("search.adjustFilters")}
                </p>
                <OutlineButton
                  onClick={handleClearFilters}
                  className="rounded-2xl px-10 py-3 font-semibold"
                >
                  {t("filterPanel.clearallfilters")}
                </OutlineButton>
              </div>
            )}
          </div>

          {/* --- Pagination --- */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-3 mt-12 mb-8">
              <OutlineButton
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="px-5 py-2.5 rounded-xl disabled:opacity-50"
              >
                {t("product.preview")}
              </OutlineButton>

              <div className="hidden sm:flex items-center gap-2">
                {visiblePages.map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`min-w-11.25 h-11.25 rounded-xl font-bold transition-all cursor-pointer ${
                      currentPage === page
                        ? "bg-(--main-color) text-white shadow-lg shadow-(--main-color)/20 scale-105"
                        : "bg-gray-100 dark:bg-gray-800 hover:text-(--white-color) hover:bg-(--main-color)/80"
                    }`}
                  >
                    {page === totalPages && page > 5 ? t("common.end") : page}
                  </button>
                ))}
              </div>

              <OutlineButton
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="px-5 py-2.5 rounded-xl disabled:opacity-50"
              >
                {t("product.next")}
              </OutlineButton>
            </div>
          )}
        </main>
      </div>

      {/* --- Mobile Sidebar Overlay --- */}
      <div
        className={`fixed inset-0 z-100 lg:hidden transition-all duration-500 ${isFilterOpen ? "visible" : "invisible"}`}
      >
        <div
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-500 ${isFilterOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setIsFilterOpen(false)}
        />
        <div
          className={`absolute left-0 top-0 h-full w-75 bg-white dark:bg-(--dark-secondary-color) shadow-2xl transition-transform duration-500 ease-out p-6 ${isFilterOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex justify-between items-center mb-6 border-b pb-4 dark:border-gray-800">
            <h2 className="text-xl font-bold">{t("product.filters")}</h2>
            <button
              onClick={() => setIsFilterOpen(false)}
              className="text-3xl font-light hover:text-(--main-color)"
            >
              &times;
            </button>
          </div>
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
            mobile
          />
        </div>
      </div>
    </section>
  );
};

export default Products;
