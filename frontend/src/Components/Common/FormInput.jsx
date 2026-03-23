import { forwardRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiEye, FiEyeOff, FiAlertCircle } from "react-icons/fi";

const FormInput = forwardRef(
  (
    {
      type = "text",
      labelKey,
      placeholderKey,
      name,
      error,
      required = false,
      className = "",
      ...props
    },
    ref,
  ) => {
    const { t } = useTranslation();
    const [show, setShow] = useState(false);
    const [focused, setFocused] = useState(false);

    const isPassword =
      type === "password" || name?.toLowerCase().includes("password");
    const hasError = !!error;

    return (
      <div className="mb-5 relative group">
        {/* Label */}
        <label
          className={`flex items-center gap-1 text-sm font-medium mb-1.5 transition-colors duration-200 ${
            hasError
              ? "text-red-500"
              : focused
                ? "text-(--main-color)"
                : "text-gray-700 dark:text-gray-300"
          }`}
        >
          {t(labelKey)}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>

        {/* Input Container */}
        <div className="relative">
          <input
            {...props}
            ref={ref}
            name={name}
            type={isPassword && show ? "text" : type}
            placeholder={placeholderKey ? t(placeholderKey) : ""}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className={`
    w-full px-4 py-3 
    border-2 rounded-xl 
    bg-white dark:bg-gray-800
    text-gray-900 dark:white
    placeholder:text-gray-400 dark:placeholder:text-gray-500
    transition-all duration-200
    outline-none
    ${
      hasError
        ? "border-red-500"
        : focused
          ? "border-(--main-color)" 
          : "border-gray-200 dark:border-gray-700" 
    }
    ${isPassword ? "pr-12 rtl:pl-12 rtl:pr-4" : ""}
    ${className}
  `}
          />

          {/* Logic: Show Eye Icon ONLY if there is NO error */}
          {isPassword && !hasError && (
            <button
              type="button"
              onClick={() => setShow(!show)}
              className={`
                absolute top-1/2 -translate-y-1/2 
                right-3 rtl:left-3 rtl:right-auto
                p-2 rounded-lg
                text-gray-400 hover:text-gray-600 dark:hover:text-gray-300
                transition-all duration-200
                focus:outline-none
                ${focused ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
              `}
              aria-label={show ? "Hide password" : "Show password"}
            >
              {show ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
          )}

          {/* Logic: Show Error Icon ONLY if there IS an error */}
          {hasError && (
            <div className="absolute top-1/2 -translate-y-1/2 right-3 rtl:left-3 rtl:right-auto pointer-events-none">
              <FiAlertCircle className="text-red-500" size={18} />
            </div>
          )}
        </div>

        {/* Error Message */}
        {hasError && (
          <div className="mt-1.5 flex items-center gap-1 text-red-500 text-xs font-medium">
            <span>{t(error.message)}</span>
          </div>
        )}
      </div>
    );
  },
);

export default FormInput;
