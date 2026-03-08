import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

const ProductError = ({ message = "Failed to load" }) => {
  return (
    <div className="group relative h-100 w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-(--dark-alt-color) overflow-hidden flex flex-col p-4">
      {/* Image area */}
      <div className="h-32 flex items-center justify-center mb-4 bg-gray-50 dark:bg-gray-800 rounded-md">
        <div className="flex flex-col items-center text-red-500">
          <FaExclamationTriangle size={30} />
          <span className="text-xs mt-2 font-medium">Error</span>
        </div>
      </div>

      {/* Content area */}
      <div className="flex flex-col flex-1 text-center gap-2">
        <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Oops!
        </div>

        <div className="text-xs text-gray-500 dark:text-gray-400 px-2">
          {message}
        </div>

        <div className="mt-auto">
          <button className="w-full py-2 text-sm rounded-full bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 font-medium">
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductError;
