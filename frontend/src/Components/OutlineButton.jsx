import React from "react";

const OutlineButton = ({
  children,
  onClick,
  className = "",
  type = "button",
  disabled = false,
}) => {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={`
        border-2 border-(--main-color)
        text-(--main-color)
        bg-transparent
        rounded-lg
        px-3 py-2
        
        flex items-center justify-center
        transition-all duration-300
        ${disabled ? "bg-gray-300 border-gray-500 dark:border-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed" : "hover:bg-(--main-color) hover:text-white cursor-pointer active:bg-(--main-color) active:text-(--white-color) "}
        
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default OutlineButton;
