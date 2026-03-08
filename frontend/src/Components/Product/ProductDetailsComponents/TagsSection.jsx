import React from "react";

const TagsSection = ({ product, translate }) => {
  return (
    <>
      {product.tags && product.tags.length > 0 && (
        <div className="mb-6 sm:mb-8">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3">
            {translate("product.Tags")}
          </h3>
          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-700 text-(--white-color) rounded-full text-xs sm:text-sm font-medium hover:bg-(--main-color) hover:text-white transition-colors cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default TagsSection;
