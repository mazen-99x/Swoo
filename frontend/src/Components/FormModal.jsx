import React, { useEffect, useRef, useState } from "react";
import OutlineButton from "./OutlineButton";

const FormModal = ({ open, title, fields, onClose, onSubmit, t, dir }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const isRTL = dir === "rtl";
  const formRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (formRef.current && !formRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);
  if (!open) return null;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      dir={dir}
    >
      <div className="relative bg-white dark:bg-gray-900 w-full max-w-md rounded-xl p-6">
        {/* ❌ Close button */}
        <button
          onClick={onClose}
          className={`absolute cursor-pointer top-4 text-gray-400 hover:text-gray-700 dark:hover:text-white text-xl ${
            isRTL ? "left-4" : "right-4"
          }`}
        >
          ×
        </button>

        <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white text-center">
          {title}
        </h2>

        <form
          ref={formRef}
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
          className="space-y-4"
        >
          {fields.map((field) => {
            /* 🖼 Image field */
            if (field.type === "image") {
              return (
                <div
                  key={field.name}
                  className={isRTL ? "text-right" : "text-left"}
                >
                  <label className="block text-sm mb-2 text-gray-700 dark:text-gray-300">
                    {t(field.label)}
                  </label>

                  <div className="flex flex-col items-center gap-3">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="preview"
                        className="w-32 h-32 rounded-lg object-cover border"
                      />
                    ) : (
                      <div className="w-32 h-32 rounded-lg border border-dashed flex items-center justify-center text-sm text-gray-500">
                        {t("common.noImage")}
                      </div>
                    )}

                    <label className="cursor-pointer text-sm text-blue-600">
                      {t("common.uploadImage")}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              );
            }

            /* ✏️ Normal input */
            return (
              <div key={field.name}>
                <label
                  className={`block text-sm mb-1 text-gray-700 dark:text-gray-300 ${
                    isRTL ? "text-right" : "text-left"
                  }`}
                >
                  {t(field.label)}
                </label>

                <input
                  type={field.type || "text"}
                  placeholder={t(field.placeholder)}
                  className={`w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent ${
                    isRTL ? "text-right" : "text-left"
                  }`}
                />
              </div>
            );
          })}

          {/* Buttons */}
          <div
            className={`flex gap-3 pt-6 ${
              isRTL ? "justify-start" : "justify-end"
            }`}
          >
            <OutlineButton className="px-4 py-2">
              {t("common.save")}
            </OutlineButton>

            <OutlineButton
              onClick={onClose}
              className="px-4 py-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
            >
              {t("common.cancel")}
            </OutlineButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormModal;
