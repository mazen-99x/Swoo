import React from "react";

const LoadingPage = ({ icon, text }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] w-full">
      <div className="relative">
        <div className="w-40 h-40">
          <div className="absolute w-full h-full border-8 border-(--main-color)/20 rounded-full"></div>
          <div className="absolute w-full h-full border-8 border-(--main-color) rounded-full border-t-transparent animate-spin"></div>
        </div>
        {icon && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {icon}
          </div>
        )}
      </div>

      <div className="mt-10 text-center">
        {text && (
          <p className="text-2xl font-light text-gray-700 dark:text-gray-200 tracking-wide">
            {text}
          </p>
        )}
        <div className="mt-4 flex justify-center space-x-1">
          <div className="w-2 h-2 bg-(--main-color) rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 bg-(--main-color) rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 bg-(--main-color) rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
