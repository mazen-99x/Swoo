import { useEffect, useRef, useState } from "react";
import OutlineButton from "./OutlineButton";

const FormModal = ({
  open,
  title,
  fields,
  initialValues = {},
  onClose,
  onSubmit,
  t,
  dir,
}) => {
  const isRTL = dir === "rtl";
  const formRef = useRef(null);
  const [formData, setFormData] = useState(initialValues || {});
  const [imagePreview, setImagePreview] = useState(
    initialValues?.thumbnail || null,
  );

  // New state to track upload progress
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    setFormData(initialValues || {});
    setImagePreview(initialValues?.thumbnail || null);
  }, [initialValues, open]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (formRef.current && !formRef.current.contains(e.target)) onClose();
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  if (!open) return null;

  /* =========================
      PROFESSIONAL CLOUDINARY UPLOAD
  ========================== */
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 1. Show local preview instantly so the UI feels fast
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
    setIsUploading(true);

    // 2. Setup Cloudinary Data
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "vijnfaie");
    data.append("folder", "products"); // Keeps your Cloudinary organized

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dbmjylfio/image/upload`,
        { method: "POST", body: data },
      );

      const result = await response.json();

      // 3. Check if upload actually worked before saving
      if (result.secure_url) {
        setFormData((prev) => ({
          ...prev,
          thumbnail: result.secure_url, // This matches your db.json key
        }));
        console.log("Cloudinary URL:", result.secure_url);
      } else {
        // If Cloudinary sends an error (e.g., preset is wrong)
        console.error("Cloudinary Error:", result.error?.message);
        alert("Upload failed: " + result.error?.message);
      }
    } catch (error) {
      console.error("Network Error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isUploading) return; // Prevent saving while image is still uploading
    await onSubmit(formData);
    setFormData({});
    setImagePreview(null);
  };

  const imageField = fields.find((f) => f.type === "image");
  const otherFields = fields.filter((f) => f.type !== "image");

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-2 sm:px-4 overflow-y-auto  "
      dir={dir}
    >
      <div
        ref={formRef}
        className="relative bg-(--white-color) dark:bg-(--dark-bg-color) 
w-full 
max-w-4xl 
my-6
rounded-xl  
p-4 sm:p-6
max-h-[90vh] 
overflow-y-auto 
scrollbar-thin"
      >
        <button
          onClick={onClose}
          className={`absolute cursor-pointer top-4 text-gray-400 hover:text-gray-700 dark:hover:text-white text-xl ${isRTL ? "left-4" : "right-4"}`}
        >
          {" "}
          ×{" "}
        </button>

        <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white text-center">
          {title}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row gap-6">
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
                    <div className="w-32 h-32 rounded-lg border border-dashed flex items-center justify-center text-sm text-gray-500">
                      {t("common.noImage")}
                    </div>
                  )}
                  {/* Visual Loading Spinner */}
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
                      className={`w-full bg-(--white-color) dark:bg-(--dark-bg-color) cursor-pointer px-3 py-2.5 text-sm  sm:text-base capitalize rounded-lg border border-gray-300 dark:border-gray-700  dark:text-white ${isRTL ? "text-right" : "text-left"}`}
                    >
                      <option >{t(field.placeholder)}</option>
                      {field.options?.map((option) => (
                        <option
                          className="cursor-pointer"
                          key={option.id}
                          value={option.name}
                        >
                          {option.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type || "text"}
                      value={formData[field.name] || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          [field.name]: e.target.value,
                        }))
                      }
                      placeholder={t(field.placeholder)}
                      className={`w-full px-3 py-2.5  text-sm sm:text-base ${field.name === "brand" ? "uppercase" : "capitalize"} rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent  dark:text-white ${isRTL ? "text-right" : "text-left"}`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
          <div
            className={`flex flex-col sm:flex-row gap-3 pt-6 
${isRTL ? "sm:justify-start" : "sm:justify-end"}`}
          >
            <OutlineButton
              type="submit"
              className={`px-4 py-2 ${isUploading ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={isUploading}
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
