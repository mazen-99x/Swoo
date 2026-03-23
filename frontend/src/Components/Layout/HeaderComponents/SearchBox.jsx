import { FaSearch } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { FaExclamationCircle } from "react-icons/fa";
import i18n from "../../../i18n";

function SearchBox({ id }) {
  const { t } = useTranslation();
  const slugify = (text) =>
    text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

  const isRTL = i18n.language === "ar";
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const searchRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        debouncedSearch &&
        searchRef.current &&
        !searchRef.current.contains(e.target)
      ) {
        setDebouncedSearch("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [debouncedSearch]);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      setSearch("");
      navigate(`/search?query=${encodeURIComponent(search.trim())}`);
    }
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["searchProducts", debouncedSearch],
    queryFn: async () => {
      const res = await axios.get(
        `https://dummyjson.com/products/search?q=${debouncedSearch}`,
      );
      return res.data.products;
    },
    enabled: !!debouncedSearch,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <form
      onSubmit={handleSubmit}
      className={`search_box relative max-md:w-full w-[45%] flex items-center ${
        isRTL ? "flex-row-reverse" : ""
      }`}
    >
      <input
        ref={searchRef}
        id={id}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        autoComplete="off"
        placeholder={t("search.placeholder")}
        className={`w-[80%] py-2.5 px-5 outline-none border-none rounded-[30px_0_0_30px] bg-(--gray-color) dark:bg-(--dark-secondary-color) text-black dark:text-white ${
          isRTL ? "rounded-[0_30px_30px_0] text-right" : ""
        }`}
      />
      <button
        type="submit"
        onClick={() => setDebouncedSearch("")}
        className={`w-[15%] h-11.25 cursor-pointer border-2 border-(--main-color) transition duration-300 flex justify-center items-center bg-transparent 
          hover:text-(--white-color) hover:bg-(--main-color) text-(--main-color)
          rounded-[0px_30px_30px_0px]`}
      >
        <FaSearch />
      </button>

      {/* Dropdown results inside form */}
      {debouncedSearch && (
        <div className="absolute left-0 w-full top-full mt-2 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden backdrop-blur-sm">
            {/* Header */}
            <div className="px-4 py-2 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                {isLoading
                  ? "Searching..."
                  : `${data?.length || 0} results found`}
              </p>
            </div>

            {/* Results list */}
            <ul className="max-h-96 overflow-y-auto scrollbar-search divide-y divide-gray-100 dark:divide-gray-700">
              {isLoading && (
                <li className="px-4 py-6">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="relative">
                      <div className="w-12 h-12 border-4 border-gray-200 dark:border-gray-700 rounded-full" />
                      <div className="absolute top-0 left-0 w-12 h-12 border-4 border-(--main-color) border-t-transparent rounded-full animate-spin" />
                    </div>
                    <p className="text-sm text-gray-500">Loading products...</p>
                  </div>
                </li>
              )}

              {isError && (
                <li className="px-4 py-8">
                  <div className="flex flex-col items-center text-center text-red-500 gap-2">
                    <FaExclamationCircle size={24} />
                    <p className="text-sm">Error loading results</p>
                    <button
                      onClick={() => setDebouncedSearch(search)}
                      className="text-xs text-(--main-color) hover:underline"
                    >
                      Try again
                    </button>
                  </div>
                </li>
              )}

              {!isLoading && !isError && data?.length === 0 && (
                <li className="px-4 py-8">
                  <div className="flex flex-col items-center text-center text-gray-400 gap-2">
                    <FaSearch size={24} className="opacity-50" />
                    <p className="text-sm">
                      No products found for "{debouncedSearch}"
                    </p>
                    <p className="text-xs text-gray-500">
                      Try different keywords
                    </p>
                  </div>
                </li>
              )}

              {!isLoading &&
                !isError &&
                data?.map((item) => (
                  <li
                    key={item.id}
                    className="px-4 py-3 hover:bg-linear-to-r hover:from-(--main-color)/5 hover:to-transparent cursor-pointer transition-all duration-200 group/item"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      navigate(`/${slugify(item.title)}/${item.id}`);
                      setSearch("");
                      setDebouncedSearch("");
                    }}
                  >
                    <div className="flex items-center gap-4">
                      {/* Product Image with zoom effect */}
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700 shrink-0 border border-gray-200 dark:border-gray-600 group-hover/item:border-(--main-color)/30 transition-colors">
                        <img
                          src={
                            item.thumbnail ||
                            item.images?.[0] ||
                            "https://via.placeholder.com/56"
                          }
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover/item:scale-110"
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/56";
                          }}
                        />
                        {/* Quick view indicator */}
                        <div className="absolute inset-0 bg-black/0 group-hover/item:bg-black/10 transition-colors" />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white group-hover/item:text-(--main-color) transition-colors line-clamp-1">
                              {item.title}
                            </h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">
                              {item.description}
                            </p>
                          </div>

                          {/* Price tag */}
                          <div className="text-right shrink-0">
                            <span className="block text-(--main-color) font-bold">
                              ${item.price?.toFixed(2)}
                            </span>
                            {item.discountPercentage > 0 && (
                              <span className="text-xs text-gray-400 line-through">
                                $
                                {(
                                  item.price *
                                  (1 + item.discountPercentage / 100)
                                ).toFixed(0)}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="flex items-center gap-2 mt-2">
                          {item.brand && (
                            <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">
                              {item.brand}
                            </span>
                          )}
                          {item.category && (
                            <span className="text-xs px-2 py-0.5 bg-(--main-color)/10 text-(--main-color) rounded-full">
                              {item.category}
                            </span>
                          )}
                          {item.stock && item.stock < 10 && (
                            <span className="text-xs px-2 py-0.5 bg-orange-100 text-orange-600 rounded-full">
                              Low stock
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>

            {/* Footer with view all */}
            {!isLoading && !isError && data?.length > 0 && (
              <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-100 dark:border-gray-700">
                <button
                  onMouseDown={(e) => {
                  
                    handleSubmit(e);
                    console.log("Button Pressed!");
                  }}
                  type="button"
                  className="w-full cursor-pointer text-sm text-(--main-color) font-medium text-center hover:underline"
                >
                  View all {data.length} results →
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </form>
  );
}

export default SearchBox;
