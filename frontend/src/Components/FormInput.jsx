import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FiEye, FiEyeOff } from "react-icons/fi";

const FormInput = ({
  type = "text",
  labelKey,
  placeholderKey,
  required = false,
}) => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);

  const isPassword = type === "password" || type === "confirm password";

  return (
    <div className={`mb-4 ${isPassword ? "relative" : ""}`}>
      <label className="block text-sm font-medium mb-1">
        {t(labelKey)}
        {required && <span className="text-red-500">*</span>}
      </label>

      <input
        type={isPassword && show ? "text" : type}
        placeholder={placeholderKey ? t(placeholderKey) : ""}
        className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-(--main-color)"
      />

      {isPassword && (
        <span
          onClick={() => setShow(!show)}
          className="
            absolute top-9.5 cursor-pointer text-gray-400 hover:text-(--main-color)
            right-3 rtl:left-3 rtl:right-auto
          "
        >
          {show ? <FiEyeOff size={18} /> : <FiEye size={18} />}
        </span>
      )}
    </div>
  );
};

export default FormInput;
