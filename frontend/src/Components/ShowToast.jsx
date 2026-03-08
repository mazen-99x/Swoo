import { useCallback } from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

const useShowToast = (product) => {
  const { t } = useTranslation();

  const slugify = (text) =>
    text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

  const showToast = useCallback(
    (type) => {
      const added = type.startsWith("add");
      const isWish = type.includes("Wish");

      toast.custom((toastId) => (
        <>
          {/* 📱 MOBILE SMALL TOAST */}
          <div className="sm:hidden w-64 flex items-center gap-2 rounded-lg bg-white dark:bg-gray-800 shadow-lg p-2 border border-gray-200 dark:border-gray-700">
            <Link to={`/${slugify(product.title)}/${product.id}`}>
              <img
                src={product?.thumbnail || "/Images/placeholder.png"}
                alt={product?.title}
                className="h-10 w-10 rounded-md object-cover"
              />
            </Link>

            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-gray-900 dark:text-white line-clamp-1">
                {product?.title}
              </p>
              {product?.price && (
                <p className="text-xs font-bold text-gray-700 dark:text-gray-300">
                  ${product.price.toFixed(2)}
                </p>
              )}
            </div>

            <button
              onClick={(e) => {
                e.preventDefault();
                toast.dismiss(toastId);
              }}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              ✕
            </button>
          </div>

          {/* 💻 DESKTOP ORIGINAL TOAST */}
          <div className="hidden sm:block group relative w-80 overflow-hidden rounded-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg shadow-2xl border border-white/20 dark:border-gray-700/30">
            <div
              className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity ${
                added
                  ? "bg-linear-to-r from-(--main-color) to-transparent"
                  : "bg-linear-to-r from-red-500 to-transparent"
              }`}
            />

            <div
              className={`h-1 w-full ${
                added ? "bg-(--main-color)" : "bg-red-500"
              }`}
            />

            <div className="p-4">
              <div className="flex items-start gap-3">
                <div className="relative">
                  <Link to={`/${slugify(product.title)}/${product.id}`}>
                    <img
                      src={product?.thumbnail || "/Images/placeholder.png"}
                      alt={product?.title}
                      className="h-16 w-16 rounded-xl object-cover shadow-lg ring-2 ring-white dark:ring-gray-700"
                    />
                  </Link>

                  <div
                    className={`absolute -right-1 -bottom-1 h-5 w-5 rounded-full border-2 border-white flex items-center justify-center ${
                      added ? "bg-(--main-color)" : "bg-red-500"
                    }`}
                  >
                    <span className="text-xs text-white">
                      {added ? "✓" : "✕"}
                    </span>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white line-clamp-1">
                        {product?.title}
                      </h4>
                      <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                        {added ? t("toast.added_to") : t("toast.removed_from")}
                      </p>
                    </div>

                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        toast.dismiss(toastId);
                      }}
                      className="relative cursor-pointer z-50 rounded-full p-1 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-600 dark:hover:text-gray-200 transition-all"
                    >
                      <svg
                        className="h-3 w-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="mt-2 flex items-center gap-1">
                    <span className="text-lg">{isWish ? "❤️" : "🛒"}</span>
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        added
                          ? "bg-(--main-color)/10 text-(--main-color)"
                          : "bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400"
                      }`}
                    >
                      {isWish ? t("wishlist.title") : t("cart.title")}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-gray-100 dark:border-gray-700 pt-2">
                {product?.price && (
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    ${product.price.toFixed(2)}
                  </span>
                )}
              </div>
            </div>
          </div>
        </>
      ));
    },
    [product, t],
  );

  return { showToast };
};

export default useShowToast;
