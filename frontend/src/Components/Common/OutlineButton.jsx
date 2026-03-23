import React from "react";

const OutlineButton = ({
  children,
  onClick,
  className = "",
  type = "button",
  disabled = false,
}) => {
  const hasCustomBorder = className.includes("border-");
  const hasCustomHoverBg = className.includes("hover:bg-");
  const hasCustomText = className.includes("text-");
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={`
        border-2 
        bg-transparent
        rounded-lg
        px-3 py-2
        flex items-center justify-center
        transition-all duration-300
        
        /* Only apply main colors if NO custom class is passed */
        ${!hasCustomBorder ? "border-(--main-color)" : ""}
        ${!hasCustomText ? "text-(--main-color)" : ""}
        
        ${
          disabled
            ? "bg-gray-300 border-gray-500 dark:border-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
            : `cursor-pointer hover:text-white active:text-(--white-color) 
             ${!hasCustomHoverBg ? "hover:bg-(--main-color)  active:bg-(--main-color)" : "active:opacity-80"} 
            `
        }
        
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default OutlineButton;
