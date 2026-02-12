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
        ${disabled ? "bg-gray-200 border-gray-300 text-gray-500 cursor-not-allowed" : "hover:bg-(--main-color) hover:text-white cursor-pointer active:bg-(--main-color) active:text-(--white-color) "}
        
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default OutlineButton;
