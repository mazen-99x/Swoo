import React from "react";
import { FaTh, FaList } from "react-icons/fa";

export default function ViewModeToggle({ viewMode, handleViewModeChange }) {
  return (
    <div className="flex items-center border w-fit   border-gray-300 dark:border-gray-600 rounded-md overflow-hidden">
      <button
        onClick={() => handleViewModeChange("grid")}
        className={`p-2 cursor-pointer  ${
          viewMode === "grid"
            ? "bg-(--main-color) text-(--white-color)"
            : "text-gray-500 dark:text-gray-400"
        }`}
      >
        <FaTh className="w-4 h-4" />
      </button>
      <button
        onClick={() => handleViewModeChange("list")}
        className={`p-2 cursor-pointer ${
          viewMode === "list"
            ? "bg-(--main-color) text-(--white-color) "
            : "text-gray-500 dark:text-gray-400"
        }`}
      >
        <FaList className="w-4 h-4" />
      </button>
    </div>
  );
}
