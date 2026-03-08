import { forwardRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiEye, FiEyeOff } from "react-icons/fi";

const FormInput = forwardRef(
  (
    {
      type = "text",
      labelKey,
      placeholderKey,
      name,
      error,
      required = false,
      ...props 
    },
    ref,
  ) => {
    const { t } = useTranslation();
    const [show, setShow] = useState(false);

    const isPassword =
      type === "password" || name?.toLowerCase().includes("password");

    return (
      <div className="mb-4 relative">
        <label className="block text-sm font-medium mb-1">
          {t(labelKey)}
          {required && <span className="text-red-500">*</span>}
        </label>

        <input
          {...props} 
          ref={ref} 
          name={name}
          type={isPassword && show ? "text" : type}
          placeholder={placeholderKey ? t(placeholderKey) : ""}
          className="w-full border rounded-md px-4 py-2 pr-10 rtl:pl-10 rtl:pr-4 focus:outline-none focus:ring focus:ring-(--main-color)"
        />

        {isPassword && (
          <span
            onClick={() => setShow(!show)}
            className="absolute top-9 cursor-pointer text-gray-400 right-3 rtl:left-3 rtl:right-auto"
          >
            {show ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          </span>
        )}
        {error && (
          <p className="text-red-500 text-xs mt-1 font-medium">
            {error.message}
          </p>
        )}
      </div>
    );
  },
);

export default FormInput;
