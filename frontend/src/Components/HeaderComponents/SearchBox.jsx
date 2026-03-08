import { FaSearch } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { FaExclamationCircle } from "react-icons/fa";
import i18n from "../../i18n";
function SearchBox({ id }) {
  const { t } = useTranslation();
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
        <ul className="absolute left-0 w-[80%] scrollbar-search right-0 top-full mt-1 bg-white dark:bg-gray-800 shadow-lg rounded-b-md max-h-96 overflow-y-auto z-10 divide-y divide-gray-100 dark:divide-gray-700">
          {isLoading && (
            <li className="px-4 py-3 text-gray-500 flex items-center justify-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-(--main-color)"></div>
              Loading...
            </li>
          )}

          {isError && (
            <li className="px-4 py-3 text-red-500 flex items-center gap-2">
              <FaExclamationCircle />
              Error loading results
            </li>
          )}

          {!isLoading && !isError && data?.length === 0 && (
            <li className="px-4 py-3 text-gray-500 text-center">
              No products found
            </li>
          )}

          {!isLoading &&
            !isError &&
            data?.map((item) => (
              <li
                key={item.id}
                className="px-4 py-3  hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-all duration-200"
                onClick={() => {
                  navigate(`/products/${item.id}`);
                  setSearch("");
                }}
              >
                <div className="flex items-center gap-3  ">
                  {/* Product Image */}
                  <div className="w-10 h-10 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-700 shrink-0 border border-gray-200 dark:border-gray-600">
                    <img
                      src={
                        item.thumbnail ||
                        item.images?.[0] ||
                        "https://via.placeholder.com/40"
                      }
                      alt={item.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/40";
                      }}
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900 dark:text-white truncate">
                      {item.title}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-(--main-color) font-semibold">
                        ${item.price?.toFixed(2)}
                      </span>
                      {item.brand && (
                        <>
                          <span className="text-gray-300 dark:text-gray-600">
                            •
                          </span>
                          <span className="text-gray-500 dark:text-gray-400 text-xs truncate">
                            {item.brand}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Category Tag */}
                  {item.category && (
                    <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full hidden sm:block">
                      {item.category}
                    </span>
                  )}
                </div>
              </li>
            ))}
        </ul>
      )}
    </form>
  );
}

export default SearchBox;
