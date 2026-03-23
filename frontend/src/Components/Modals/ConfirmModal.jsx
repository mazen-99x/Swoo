import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";

const ConfirmModal = ({
  isOpen,
  onConfirm,
  onCancel,
  message,
  title,
  confirmText = "Yes",
  confirmVariant = "danger", 
}) => {
  const { t } = useTranslation();
  const isRtl = i18n.language === "ar";


  useEffect(() => {
    const html = document.documentElement;

    if (isOpen) {
      html.style.overflowX = "hidden"; 
      html.style.overflowY = "hidden"; 
      html.style.paddingRight = "0px"; 
    } else {
      html.style.overflowX = "hidden"; 
      html.style.overflowY = "unset";
      html.style.paddingRight = "0px";
    }

    return () => {
      html.style.overflowX = "hidden";
      html.style.overflowY = "unset";
    };
  }, [isOpen]);


  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) onCancel();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onCancel]);

  const modalRef = React.useRef(null);
  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);


  const variantStyles = {
    danger: {
      bg: "bg-red-500",
      hover: "hover:bg-red-600",
      shadow: "shadow-red-500/30",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      ),
    },
    success: {
      bg: "bg-green-500",
      hover: "hover:bg-green-600",
      shadow: "shadow-green-500/30",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      ),
    },
    primary: {
      bg: "bg-(--main-color)",
      hover: "hover:bg-(--main-color-dark)",
      shadow: "shadow-(--main-color)/30",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 13l4 4L19 7"
        />
      ),
    },
  };

  const currentVariant = variantStyles[confirmVariant] || variantStyles.danger;

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <>
      {/* Backdrop with fade animation */}
      <div
        className="fixed inset-0 z-999 bg-black/50 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
        onClick={onCancel}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div
        className="fixed inset-0 z-999 flex items-center justify-center p-4"
        dir={isRtl ? "rtl" : "ltr"}
        onClick={onCancel}
      >
        {/* Modal Content */}
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          tabIndex="-1"
          className="w-full max-w-md transform transition-all duration-300 animate-in fade-in zoom-in"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-2xl">
            {/* Animated gradient bar */}
            <div className="h-1.5 bg-linear-to-r from-(--main-color)  to-(--dark-alt-color) bg-size-[200%_100%] animate-gradient" />

            <div className="p-6">
              {/* Icon with animated pulse effect */}
              <div className="relative mb-4">
                <div
                  className={`absolute inset-0 rounded-full ${currentVariant.bg}/20 animate-ping`}
                />
                <div
                  className={`relative flex h-14 w-14 items-center justify-center rounded-full ${currentVariant.bg}/10 mx-auto`}
                >
                  <svg
                    className={`h-7 w-7 ${currentVariant.bg.replace("bg-", "text-")}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {currentVariant.icon}
                  </svg>
                </div>
              </div>

              {/* Title */}
              <h3
                id="modal-title"
                className="mb-2 text-center text-xl font-bold text-gray-900 dark:text-white"
              >
                {title || t("common.confirmation")}
              </h3>

              {/* Message */}
              <p
                id="modal-description"
                className="mb-8 text-center text-gray-600 dark:text-gray-300"
              >
                {message}
              </p>

              {/* Buttons */}
              <div className="flex flex-col-reverse sm:flex-row gap-3">
                <button
                  onClick={onCancel}
                  className="inline-flex cursor-pointer w-full sm:flex-1 items-center justify-center px-6 py-3 rounded-xl font-semibold text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                >
                  {t("common.cancel")}
                </button>
                <button
                  onClick={onConfirm}
                  className={`inline-flex cursor-pointer w-full sm:flex-1 items-center justify-center px-6 py-3 rounded-xl font-semibold text-white ${currentVariant.bg} ${currentVariant.hover} shadow-lg ${currentVariant.shadow} transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${currentVariant.bg.replace("bg-", "")}`}
                >
                  <span>{confirmText}</span>
                  <svg
                    className={`${isRtl ? "mr-2 rotate-180" : "ml-2"} h-4 w-4 transition-transform group-hover:translate-x-1`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </button>
              </div>

              {/* Hint text */}
              <p className="mt-4 text-center text-xs text-(--main-color)">
                {t("common.press")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Add animation keyframes to your global CSS */}
      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </>,
    document.getElementById("modal-root"),
  );
};

export default ConfirmModal;
