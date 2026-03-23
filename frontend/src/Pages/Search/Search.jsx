import Product from "../../Components/Product/Product";
import { useTranslation } from "react-i18next";
import ProductSkeleton from "../../Components/Skeletons/ProductSkeleton";
import OutlineButton from "../../Components/Common/OutlineButton";
import UseSearch from "../../Hooks/UseSearch";

const Search = () => {
  const { t } = useTranslation();

  const {
    totalPages,
    paginatedProducts,
    handlePageChange,
    isLoading,
    isError,
    getQuery,
    searchProduct,
    getPage,
  } = UseSearch();
  // 1. Loading State
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="h-8 w-64 bg-gray-200 dark:bg-gray-700 animate-pulse rounded mb-8"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array(8)
            .fill(0)
            .map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
        </div>
      </div>
    );
  }

  // 2. Error State
  if (isError) {
    return (
      <div className="py-20 text-center text-red-500">
        <p className="text-xl font-bold">{t("common.error")}</p>
      </div>
    );
  }
  return (
    <>
      {/* Search Result Header */}
      <div className="mb-8 border-b border-gray-100 py-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
          {paginatedProducts?.length > 0 ? (
            <span>
              {t("search.resultsFor")}:{" "}
              <span className="text-(--main-color)">"{getQuery}"</span>
            </span>
          ) : (
            <span>
              {t("search.noResultsFor")}: "{getQuery}"
            </span>
          )}
        </h1>
        {searchProduct?.length > 0 && (
          <p className="text-gray-500 mt-2">
            {t("search.found")} {searchProduct.length} {t("search.products")}
          </p>
        )}
      </div>

      {/* Products Grid */}
      {paginatedProducts?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center mb-8">
          {paginatedProducts.map((product) => (
            <Product product={product} key={product.id} />
          ))}
        </div>
      ) : (
        // 3. Empty State Design
        <div className="flex flex-col items-center justify-center py-20">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-xl font-medium text-gray-600 dark:text-gray-400">
            {t("search.tryDifferentKeywords")}
          </h2>
        </div>
      )}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 my-8 flex-wrap">
          {/* Prev */}
          <OutlineButton
            disabled={getPage === 1}
            onClick={() => handlePageChange(getPage - 1)}
            className="px-4 py-2"
          >
            {t("product.preview")}
          </OutlineButton>

          <div className="sm:hidden px-4 py-2 rounded-xl bg-(--main-color) text-white font-medium shadow">
            {getPage} / {totalPages}
          </div>

          <div className="hidden sm:flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`
        min-w-11 h-10 px-3 rounded-xl font-medium 
        transition-all duration-200
        ${
          // Make sure this variable name matches your state (getPage or currentPage)
          getPage === page
            ? "bg-(--main-color) text-white shadow-md shadow-(--main-color)/30 scale-105"
            : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-(--main-color) hover:text-white hover:scale-105"
        }
      `}
                >
                  {page}
                </button>
              );
            })}
          </div>

          {/* Next */}
          <OutlineButton
            disabled={getPage === totalPages}
            onClick={() => handlePageChange(getPage + 1)}
            className="px-4 py-2"
          >
            {t("product.next")}
          </OutlineButton>
        </div>
      )}
    </>
  );
};

export default Search;
