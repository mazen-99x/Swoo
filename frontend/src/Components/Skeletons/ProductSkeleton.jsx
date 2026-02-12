import React from "react";

const ProductSkeleton = () => {
  return (
    <div className="group relative h-100 w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-(--dark-alt-color) overflow-hidden flex flex-col p-4 animate-pulse">
      {/* Image placeholder */}
      <div className="h-32 flex items-center justify-center mb-4">
        <div className="w-full h-full bg-gray-300 dark:bg-gray-700 rounded-md" />
      </div>

      {/* Content placeholders */}
      <div className="flex flex-col flex-1 text-center gap-2">
        {/* Brand */}
        <div className="h-3 w-16 mx-auto bg-gray-300 dark:bg-gray-700 rounded-full" />

        {/* Title */}
        <div className="h-4 w-32 mx-auto bg-gray-300 dark:bg-gray-700 rounded-full" />

        {/* Rating */}
        <div className="h-3 w-12 mx-auto bg-gray-300 dark:bg-gray-700 rounded-full" />

        {/* Description */}
        <div className="h-3 w-40 mx-auto bg-gray-300 dark:bg-gray-700 rounded-full" />

        {/* Price */}
        <div className="h-5 w-20 mx-auto bg-gray-300 dark:bg-gray-700 rounded-full mt-2" />

        {/* Button */}
        <div className="h-8 w-full bg-gray-300 dark:bg-gray-700 rounded-full mt-auto" />
      </div>
    </div>
  );
};

export default ProductSkeleton;
