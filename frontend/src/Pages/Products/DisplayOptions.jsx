import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaChevronDown } from "react-icons/fa";

const displayOptions = [8, 12, 16, 24];

export default function DisplayDropdown({ pageSize, setPageSize, setPage }) {
  const [open, setOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";

  return (
    <div className="relative" dir={isRtl ? "rtl" : "ltr"}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center max-lg:w-full border-gray-300 dark:border-gray-600 cursor-pointer justify-between w-44 px-3 py-2 rounded-md bg-(--gray-color) dark:bg-(--dark-secondary-color) transition-all"
      >
        <span className="text-sm font-medium">
          {pageSize} {t("product.perPage")}
        </span>

        {/* Animated Chevron: Rotates on open, flips margin for RTL */}
        <FaChevronDown
          className={`text-xs transition-transform duration-200 
            ${open ? "rotate-180" : "rotate-0"} 
            ${isRtl ? "mr-2" : "ml-2"}`}
        />
      </button>

      {open && (
        <>
          {/* Overlay to close dropdown when clicking outside */}
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />

          <div className="absolute mt-1 w-44 bg-(--gray-color) dark:bg-(--dark-secondary-color) border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50 overflow-hidden">
            {displayOptions.map((size) => (
              <div
                key={size}
                onClick={() => {
                  setPage(1);
                  setPageSize(size);
                  setOpen(false);
                }}
                className={`px-3 py-2 text-sm cursor-pointer transition-colors
                  ${pageSize === size ? "bg-(--main-color) text-white" : "hover:bg-(--main-color) hover:text-white"}`}
              >
                {size} {t("product.perPage")}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
