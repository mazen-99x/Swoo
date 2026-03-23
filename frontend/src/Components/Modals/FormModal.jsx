import { useEffect, useRef, useState } from "react";

import { toast } from "sonner";
import { FiEye, FiEyeOff } from "react-icons/fi";
import OutlineButton from "../Common/OutlineButton";
import RequirementItem from "../Common/RequirementItem";

const FormModal = ({
  open,
  title,
  fields,
  initialValues = {},
  onClose,
  onSubmit,
  t,
  dir,
  disableSubmit,
}) => {
  const isRTL = dir === "rtl";
  const formRef = useRef(null);
  const [formData, setFormData] = useState(initialValues || {});
  const [imagePreview, setImagePreview] = useState(
    initialValues?.thumbnail || null,
  );
  const [isUploading, setIsUploading] = useState(false);
  const isEdit = Boolean(initialValues && initialValues.id);
  const [show, setShow] = useState(false);

  const VALIDATORS = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    name: /^[a-zA-Z\s\u0600-\u06FF]{4,}$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
  };

  useEffect(() => {
    if (open) {
      setFormData(initialValues || {});
      setImagePreview(initialValues?.thumbnail || null);
    }
  }, [open, initialValues]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (formRef.current && !formRef.current.contains(e.target)) onClose();
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  if (!open) return null;

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
    setIsUploading(true);

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "vijnfaie");
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dbmjylfio/image/upload`,
        { method: "POST", body: data },
      );
      const result = await response.json();
      if (result.secure_url) {
        setFormData((prev) => ({ ...prev, thumbnail: result.secure_url }));
      }
    } catch (error) {
      console.error("Upload Error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isUploading || disableSubmit) return;

    const errors = [];
    fields.forEach((field) => {
      if (field.disabled && !isEdit) return;
      if (field.name === "password" && isEdit && !formData[field.name]) return;

      const value = formData[field.name] || "";


      if (!value.toString().trim()) {
        errors.push(t("messages.required"));
      } else if (field.name === "email" && !VALIDATORS.email.test(value)) {
        errors.push(t("messages.invalidEmail"));
      } else if (field.name === "name" && !VALIDATORS.name.test(value)) {
        errors.push(t("messages.invalidName"));
      } else if (
        field.name === "password" &&
        !VALIDATORS.password.test(value)
      ) {
        errors.push(t("messages.invalidPassword"));
      }
    });

    if (errors.length > 0) {
      toast.error(errors[0]);
      return;
    }

    await onSubmit(formData);
    setFormData({});
    setImagePreview(null);
  };

  const imageField = fields.find((f) => f.type === "image");
  const otherFields = fields.filter((f) => f.type !== "image");

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-2 sm:px-4 overflow-y-auto"
      dir={dir}
    >
      <div
        ref={formRef}
        className="relative bg-(--white-color) dark:bg-(--dark-bg-color) w-full max-w-4xl my-6 rounded-xl p-4 sm:p-6 max-h-[90vh] overflow-y-auto scrollbar-thin"
      >
        <button
          onClick={onClose}
          className={`absolute cursor-pointer top-4 text-gray-400 hover:text-gray-700 dark:hover:text-white text-xl ${isRTL ? "left-4" : "right-4"}`}
        >
          ×
        </button>

        <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white text-center">
          {title}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row gap-6">
            {/* Image Section */}
            {imageField && (
              <div className="flex flex-col items-center gap-3 w-full md:w-1/3">
                <div className="relative w-32 h-32">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="preview"
                      className={`w-32 h-32 rounded-lg object-cover border ${isUploading ? "opacity-40" : ""}`}
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-lg border border-dashed flex items-center justify-center text-sm text-gray-500 text-center">
                      {t("common.noImage")}
                    </div>
                  )}
                  {isUploading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>
                <label className="cursor-pointer text-sm text-blue-600 font-medium">
                  {isUploading
                    ? t("common.uploading")
                    : t("common.uploadImage")}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    disabled={isUploading}
                  />
                </label>
              </div>
            )}

            {/* Fields Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:w-2/3">
              {otherFields.map((field) => (
                <div key={field.name}>
                  <label
                    className={`block text-sm mb-1 text-gray-700 dark:text-gray-300 ${isRTL ? "text-right" : "text-left"}`}
                  >
                    {t(field.label)}
                  </label>

                  {field.type === "select" ? (
                    <select
                      value={formData[field.name] || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          [field.name]: e.target.value,
                        }))
                      }
                      className={`w-full bg-(--white-color) dark:bg-(--dark-bg-color) cursor-pointer px-3 py-2.5 text-sm sm:text-base capitalize rounded-lg border border-gray-300 dark:border-gray-700 dark:text-white ${isRTL ? "text-right" : "text-left"}`}
                    >
                      <option value="">{t(field.placeholder)}</option>
                      {field.options?.map((option) => (
                        <option key={option.id} value={option.name}>
                          {t(`from.${option.name}`)}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className="flex flex-col relative gap-1">
                      <input
                        type={
                          field.type === "password" && show
                            ? "text"
                            : field.type
                        }
                        value={formData[field.name] || ""}
                        disabled={field.disabled}
                        autoCapitalize={field.autoCapitalize || "sentences"}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            [field.name]: e.target.value,
                          }))
                        }
                        placeholder={t(field.placeholder)}
                        className={`w-full px-3 py-2.5 text-sm sm:text-base rounded-lg border bg-transparent dark:text-white transition-all 
                          ${isRTL ? "text-right" : "text-left"} 
                          ${field.disabled ? "bg-gray-100 dark:bg-gray-800 cursor-not-allowed" : ""}
                          ${field.error ? "border-red-500 ring-1 ring-red-500" : "border-gray-300 dark:border-gray-700"}`}
                      />
                      {field.type === "password" && (
                        <button
                          type="button"
                          onClick={() => setShow(!show)}
                          className="absolute top-1/2 -translate-y-1/2 right-3 rtl:left-3 rtl:right-auto p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                          {show ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                        </button>
                      )}
                    </div>
                  )}

                  {/* Checklist Logic based on your hasChecklist flag */}
                  {field.hasChecklist && field.name === "password" && (
                    <div className="mt-3 space-y-2 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-xl border border-gray-100 dark:border-gray-700">
                      <p className="text-xs font-medium text-gray-500 mb-2">
                        {t("profile.passRequirements")}
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        <RequirementItem
                          label={t("profile.reqLength")}
                          met={(formData.password?.length || 0) >= 6}
                        />
                        <RequirementItem
                          label={t("profile.reqUpper")}
                          met={/[A-Z]/.test(formData.password || "")}
                        />
                        <RequirementItem
                          label={t("profile.reqLower")}
                          met={/[a-z]/.test(formData.password || "")}
                        />
                        <RequirementItem
                          label={t("profile.reqNumber")}
                          met={/\d/.test(formData.password || "")}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div
            className={`flex flex-col sm:flex-row gap-3 pt-6 ${isRTL ? "sm:justify-start" : "sm:justify-end"}`}
          >
            <OutlineButton
              type="submit"
              className={`px-4 py-2 transition-opacity ${isUploading || disableSubmit ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"}`}
              disabled={isUploading || disableSubmit}
            >
              {isUploading ? "..." : t("common.save")}
            </OutlineButton>
            <OutlineButton
              type="button"
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
