import React, { useState } from "react";

const displayOptions = [12, 24, 36, 48];

export default function DisplayDropdown({ pageSize, setPageSize, setPage }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center max-lg:w-full    border-gray-300 dark:border-gray-600 cursor-pointer justify-between w-44 px-3 py-2  rounded-md bg-(--gray-color) dark:bg-(--dark-secondary-color) "
      >
        {pageSize} per page
        <span className="ml-2">▼</span>
      </button>

      {open && (
        <div className="absolute mt-1 w-44 bg-(--gray-color) dark:bg-(--dark-secondary-color) max-lg:w-full  cursor-pointer dark:bg-bg border rounded-md shadow-lg z-50">
          {displayOptions.map((size) => (
            <div
              key={size}
              onClick={() => {
                setPageSize(size);
                setPage(1);
                setOpen(false);
              }}
              className="px-3 py-2 cursor-pointer hover:bg-(--main-color) hover:text-(--white-color) "
            >
              {size} per page
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
