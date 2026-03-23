import React from "react";

const ProductSkeleton = ({ viewMode }) => {
  const isList = viewMode === "list";

  return (
    <div
      className={`group relative rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-(--dark-alt-color) overflow-hidden animate-pulse transition-all duration-500
      ${
        isList
          ? "flex flex-col sm:flex-row items-center p-6 gap-8 min-h-max sm:min-h-65 w-full"
          : "flex flex-col p-4 min-h-105 max-[650px]:mx-auto w-full"
      }`}
    >
      {/* 1. Image Placeholder */}
      <div
        className={`shrink-0 bg-gray-200 dark:bg-gray-800 rounded-lg ${
          isList ? "w-40 sm:w-52 h-40 sm:h-48" : "w-full h-32 mb-4"
        }`}
      />

      {/* 2. Content Section */}
      <div
        className={`flex flex-col flex-1 w-full gap-3 ${
          isList ? "items-start" : "items-center"
        }`}
      >
        {/* Brand Label */}
        <div className="h-3 w-16 bg-gray-200 dark:bg-gray-800 rounded-full" />

        {/* Title */}
        <div className="h-5 w-3/4 bg-gray-300 dark:bg-gray-700 rounded-full" />

        {/* Rating Badge */}
        <div className="h-4 w-12 bg-gray-200 dark:bg-gray-800 rounded-full" />

        {/* Description Lines */}
        <div className="space-y-2 w-full">
          <div
            className={`h-3 bg-gray-200 dark:bg-gray-800 rounded-full ${isList ? "w-full" : "w-5/6 mx-auto"}`}
          />
          <div
            className={`h-3 bg-gray-200 dark:bg-gray-800 rounded-full ${isList ? "w-4/5" : "w-4/6 mx-auto"}`}
          />
        </div>

        {/* Price & Button Area */}
        <div
          className={`mt-auto w-full flex ${
            isList
              ? "flex-row items-center justify-between"
              : "flex-col items-center gap-3"
          }`}
        >
          {/* Price */}
          <div className="h-7 w-20 bg-gray-300 dark:bg-gray-700 rounded-md" />

          {/* Button */}
          <div
            className={`h-10 bg-gray-200 dark:bg-gray-800 rounded-xl ${isList ? "w-48" : "w-full"}`}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
