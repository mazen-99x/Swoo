import {
  FaTimes,
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import DisplayDropdown from "./DisplayOptions";
import UseGetCategories from "../../Hooks/UseGetCategories";
import { Range } from "react-range";
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const FilterPanel = ({
  selectedCategories,
  onCategoryChange,
  onRatingChange,
  onClear,
  setIsFilterOpen,
  isFilterOpen,
  priceRange,
  setPriceRange,
  rating,
}) => {
  const { categories } = UseGetCategories();
  const isRTL = i18n.language === "ar";
  const { t } = useTranslation();
  const [showAllCategories, setShowAllCategories] = useState(false);

  const INITIAL_CATEGORIES_COUNT = 5;
  const displayedCategories = showAllCategories
    ? categories
    : categories?.slice(0, INITIAL_CATEGORIES_COUNT);

  return (
    <div className="h-full w-full flex dark:bg-(--dark-alt-color) bg-(--white-color) flex-col overflow-y-auto">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center sticky top-0 bg-(--white-color) dark:bg-(--dark-alt-color) z-10">
        <h2 className="text-lg text-black dark:text-white font-medium">
          {t("filterPanel.filters")}
        </h2>

        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="lg:hidden p-1 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors duration-200"
        >
          <FaTimes className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        </button>
      </div>

      {/* Price */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-sm mb-3 text-black dark:text-white font-medium">
          {t("filterPanel.price")}
        </h3>

        {/* Price Values */}
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-3 rtl:flex-row-reverse">
          {isRTL ? (
            <>
              <span className="font-medium text-(--main-color)">
                ${priceRange[1]}
              </span>
              <span className="font-medium text-(--main-color)">
                ${priceRange[0]}
              </span>
            </>
          ) : (
            <>
              <span className="font-medium text-(--main-color)">
                ${priceRange[0]}
              </span>
              <span className="font-medium text-(--main-color)">
                ${priceRange[1]}
              </span>
            </>
          )}
        </div>

        <Range
          step={1}
          min={0}
          max={50000}
          values={priceRange}
          rtl={isRTL}
          onChange={(values) => setPriceRange(values)}
          renderTrack={({ props, children }) => {
            const min = 0;
            const max = 50000;

            const startPercent = ((priceRange[0] - min) / (max - min)) * 100;
            const endPercent = ((priceRange[1] - min) / (max - min)) * 100;

            return (
              <div
                {...props}
                className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded relative"
              >
                <div
                  className="absolute h-2 bg-(--main-color) rounded"
                  style={{
                    [isRTL ? "right" : "left"]: `${startPercent}%`,
                    width: `${endPercent - startPercent}%`,
                  }}
                />
                {children}
              </div>
            );
          }}
          renderThumb={({ props }) => (
            <div
              {...props}
              key={props.key}
              className="h-4 w-4 bg-(--main-color) rounded-full shadow-md cursor-pointer outline-none"
            />
          )}
        />
      </div>

      {/* Rating */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-sm mb-3 text-black dark:text-white font-medium">
          {t("filterPanel.rating")}
        </h3>

        <div className="flex flex-col gap-2">
          {[4.5, 4, 3, 2].map((value) => (
            <div
              key={value}
              onClick={() => {
                if (rating === value) {
                  onRatingChange(null);
                } else {
                  onRatingChange(value);
                }
              }}
              className={`flex items-center justify-between p-2 rounded-md cursor-pointer transition-all duration-200
                ${
                  rating === value
                    ? "bg-(--main-color)/10 border border-(--main-color)"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
            >
              {/* Stars */}
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => {
                  if (value >= star) {
                    return (
                      <FaStar key={star} className="w-4 h-4 text-yellow-400" />
                    );
                  } else if (value + 0.5 === star) {
                    return (
                      <FaStarHalfAlt
                        key={star}
                        className="w-4 h-4 text-yellow-400"
                      />
                    );
                  } else {
                    return (
                      <FaRegStar
                        key={star}
                        className="w-4 h-4 text-gray-300 dark:text-gray-600"
                      />
                    );
                  }
                })}
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                  {value}+
                </span>
              </div>

              {/* Selected Indicator */}
              {rating === value && (
                <div className="w-2 h-2 rounded-full bg-(--main-color) animate-pulse" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={onClear}
          className="w-full py-2 px-4 text-sm text-(--main-color) font-medium
            hover:bg-(--main-color)/5 dark:hover:bg-(--main-color)/10 rounded-md 
            cursor-pointer transition-colors duration-200 border border-transparent
            hover:border-(--main-color)/20"
        >
          {t("filterPanel.clearallfilters")}
        </button>
      </div>

      {/* Responsive Options */}
      <div className="lg:hidden flex flex-col mt-3 gap-4 p-3">
        <div className="border border-gray-200 dark:border-gray-700 p-2 rounded-md text-center hover:border-(--main-color)/30 transition-colors duration-200">
          <DisplayDropdown />
        </div>
      </div>

      {/* Categories */}
      <div className="p-4">
        <h3 className="text-md text-black dark:text-white mb-3 font-medium">
          {t("filterPanel.categories")}
        </h3>
        {/* Selected count indicator */}
        {selectedCategories.length > 0 && (
          <div className="mb-4 pt-2 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
            {selectedCategories.length} {t("filterPanel.selected")}
          </div>
        )}
        <div className="space-y-1">
          {displayedCategories?.map((category, idx) => {
            const isSelected = selectedCategories.includes(category.slug);

            return (
              <label
                key={idx}
                className={`flex items-center p-2 rounded-md cursor-pointer transition-all duration-200
                  ${
                    isSelected
                      ? "bg-(--main-color)/10"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
              >
                <input
                  type="checkbox"
                  className={`${isRTL ? "ml-3" : "mr-3"} w-4 h-4 accent-(--main-color) cursor-pointer`}
                  checked={isSelected}
                  onChange={() => onCategoryChange(category.slug)}
                />
                <span
                  className={`text-sm flex-1 ${
                    isSelected
                      ? "text-(--main-color) font-medium"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {category.slug}
                </span>

                {/* Category count badge */}
              </label>
            );
          })}
        </div>

        {/* Show More/Less Button */}
        {categories?.length > INITIAL_CATEGORIES_COUNT && (
          <button
            onClick={() => setShowAllCategories(!showAllCategories)}
            className="w-full mt-3 py-2 px-4 text-sm text-(--main-color) font-medium
              hover:bg-(--main-color)/5 dark:hover:bg-(--main-color)/10 rounded-md 
              cursor-pointer transition-colors duration-200 flex items-center justify-center gap-2"
          >
            {showAllCategories ? (
              <>
                <FaChevronUp className="text-xs" />
                {t("filterPanel.showLess")}
              </>
            ) : (
              <>
                <FaChevronDown className="text-xs" />
                {t("filterPanel.showMore")} (
                {categories.length - INITIAL_CATEGORIES_COUNT})
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterPanel;
