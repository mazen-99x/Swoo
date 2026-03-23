import React from "react";
import { useTranslation } from "react-i18next";

const Loading = ({ isLoading }) => {
  const { t } = useTranslation();


  if (isLoading) {
    return (

      <div className="fixed inset-0 z-150 flex flex-col items-center justify-center bg-(--bg-color) dark:bg-(--dark-bg-color) transition-colors duration-300">
        <div className="relative">
          {/* Animated shopping cart */}
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 animate-bounce">
              <svg
                className="w-24 h-24 text-(--main-color)"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            {/* Floating circles */}
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-(--main-color) rounded-full animate-ping" />
            <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-yellow-400 rounded-full animate-ping delay-300" />
          </div>
        </div>

        {/* Loading text with dots animation */}
        <div className="mt-8 flex items-center gap-2">
          <span className="text-lg font-medium text-gray-800 dark:text-gray-200">
            {t("common.loading")}
          </span>
          <div className="flex gap-1">
            <span
              className="w-2 h-2 bg-(--main-color) rounded-full animate-bounce"
              style={{ animationDelay: "0s" }}
            />
            <span
              className="w-2 h-2 bg-(--main-color) rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            />
            <span
              className="w-2 h-2 bg-(--main-color) rounded-full animate-bounce"
              style={{ animationDelay: "0.4s" }}
            />
          </div>
        </div>

        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {t("common.fetching_deals")}
        </p>
      </div>
    );
  }

  return null;
};

export default Loading;
