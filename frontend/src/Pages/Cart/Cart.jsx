import { Link } from "react-router";
import { useTranslation } from "react-i18next";

import { FaExclamationCircle, FaTimes, FaHeart, FaTruck } from "react-icons/fa";
import { HiArrowLongLeft } from "react-icons/hi2";
import { HiOutlineTrash } from "react-icons/hi";
import LoadingPage from "../../Components/Common/LoadingPage";
import EmptyPage from "../../Components/Common/EmptyPage";
import QuantitySelector from "../../Components/Shared/QuantitySelector";
import useCart from "../../Hooks/UseCart";
import OutlineButton from "../../Components/Common/OutlineButton";
import ConfirmModal from "../../Components/Modals/ConfirmModal";

const Cart = () => {
  const { t } = useTranslation();
  const {
    items,
    products,
    isLoading,
    updateLoading,
    subTotal,
    shippingEstimate,
    taxEstimate,
    orderTotal,
    isRTL,
    isModalOpen,
    setIsModalOpen,
    handleWishlistToggle,
    handleQuantityUpdate,
    handleClear,
    slugify,
    wishlistItems,
    ids,
  } = useCart();
  if (ids.length === 0)
    return (
      <EmptyPage
        translate={t}
        title={t("cart.empty")}
        desc={t("cart.desc")}
        icon={<FaTruck className="w-20 h-20 text-gray-300" />}
      />
    );

  if (isLoading)
    return (
      <LoadingPage
        text={t("cart.loading")}
        icon={
          <svg
            className="w-32 h-32 text-(--main-color)/30"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        }
      />
    );

  return (
    <>
      <div
        className="bg-(--white-color) dark:bg-(--dark-alt-color) py-10 my-6 px-4 md:px-6 rounded-xl shadow-sm"
        dir={isRTL ? "rtl" : "ltr"}
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8 pb-6 border-b-2 border-(--main-color)/10">
            <div>
              <h1 className="text-3xl font-bold bg-linear-to-r from-(--main-color) to-(--main-color-transparent) bg-clip-text text-transparent">
                {t("cart.title")}
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <span className="bg-(--main-color)/10 text-(--main-color) px-3 py-1 rounded-full text-sm font-medium">
                  {ids.length} {t("cart.items")}
                </span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-500 text-sm">
                  {t("cart.total")}: ${subTotal.toFixed(2)}
                </span>
              </div>
            </div>
            <OutlineButton
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white group"
            >
              <HiOutlineTrash className="group-hover:animate-bounce" />
              {t("cart.clear_cart")}
            </OutlineButton>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {products?.map((product) => {
                const quantity = items[product.id] || 0;
                const itemSubtotal = product.price * quantity;
                const isFavorite = wishlistItems.includes(product.id);
                const isMaxReached = quantity >= Math.min(5, product.stock);
                const isLowStock = product.stock > 0 && product.stock < 10;

                // Track loading for this specific product
                const isThisItemLoading = updateLoading;

                return (
                  <div
                    key={product.id}
                    className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 flex flex-col sm:flex-row gap-6 
                      border-l-4 border-l-transparent hover:border-l-(--main-color)
                      border border-gray-100 dark:border-gray-700 
                      hover:shadow-xl transition-all duration-300"
                  >
                    {/* Item Loading Overlay */}
                    {isThisItemLoading && (
                      <div className="absolute inset-0 z-40 bg-white/90 dark:bg-gray-800/90 backdrop-blur-[1px] flex flex-col sm:flex-row gap-6 p-6 animate-pulse">
                        <div className="w-28 h-28 bg-gray-200 dark:bg-gray-700 rounded-xl shrink-0" />
                        <div className="flex-1 space-y-4 pt-2">
                          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
                          <div className="flex justify-between items-center mt-auto">
                            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-32" />
                            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-20" />
                          </div>
                        </div>
                      </div>
                    )}

                    <button
                      onClick={() => handleWishlistToggle(product)}
                      className="absolute cursor-pointer left-2 top-1 z-20 p-2.5 rounded-full bg-white/90 dark:bg-black/60 backdrop-blur-sm transition-all duration-300 hover:scale-110 shadow-md"
                    >
                      <FaHeart
                        className={`w-4 h-4 transition-all duration-300 ${isFavorite ? "fill-red-500 scale-110" : "fill-gray-400 hover:fill-red-300"}`}
                      />
                    </button>

                    <Link
                      to={`/${slugify(product.title)}/${product.id}`}
                      className="shrink-0 relative"
                    >
                      <div className="relative w-28 h-28 bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl p-3 group-hover:scale-105 transition-transform duration-300">
                        <img
                          src={product.thumbnail}
                          alt={product.title}
                          className="w-full h-full object-contain"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 rounded-xl transition-colors" />
                      </div>
                    </Link>

                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <Link
                            to={`/${slugify(product.title)}/${product.id}`}
                            className="hover:text-(--main-color) transition-colors"
                          >
                            <h4 className="font-bold text-gray-900 dark:text-white text-lg line-clamp-1">
                              {product.title}
                            </h4>
                          </Link>
                          <div className="flex items-center gap-2 mt-1">
                            {product.brand && (
                              <span className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">
                                {product.brand}
                              </span>
                            )}
                            <span
                              className={`text-xs px-2 py-0.5 rounded-full font-medium ${product.stock > 0 ? (isLowStock ? "bg-orange-100 text-orange-600" : "bg-green-100 text-green-600") : "bg-red-100 text-red-600"}`}
                            >
                              {product.stock > 0
                                ? isLowStock
                                  ? t("cart.low_stock", {
                                      count: product.stock,
                                    })
                                  : t("cart.in_stock")
                                : t("cart.out_of_stock")}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-(--main-color)">
                            ${product.price.toFixed(2)}
                          </p>
                          {product.discountPercentage > 0 && (
                            <p className="text-xs text-gray-400 line-through">
                              $
                              {(
                                product.price *
                                (1 + product.discountPercentage / 100)
                              ).toFixed(0)}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                        <div className="flex items-center gap-4">
                          <QuantitySelector
                            product={product}
                            quantity={quantity}
                            onUpdate={handleQuantityUpdate}
                          />
                          {isMaxReached && (
                            <div className="flex items-center gap-1 text-xs text-orange-500 bg-orange-50 dark:bg-orange-900/20 px-2 py-1 rounded-full">
                              <FaExclamationCircle size={12} />
                              <span>{t("cart.limit_reached")}</span>
                            </div>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-400 uppercase tracking-wider">
                            {t("cart.subtotal")}
                          </p>
                          <p className="text-xl font-bold text-(--main-color)">
                            ${itemSubtotal.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleQuantityUpdate(product, -quantity)}
                      disabled={isThisItemLoading}
                      className="absolute top-1 right-2 w-6 h-6 rounded-full bg-white dark:bg-gray-700 shadow-md hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-500 hover:scale-110 transition-all duration-300 cursor-pointer flex items-center justify-center"
                      aria-label="Remove item"
                    >
                      <FaTimes size={14} />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Summary */}
            <div className="flex flex-col h-full">
              <div className="bg-(--white-color) mt-auto dark:bg-(--dark-secondary-color) rounded-xl p-6 border border-(--main-color) shadow-sm">
                <h3 className="font-semibold text-lg mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
                  {t("cart.order_summary")}
                </h3>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">{t("cart.sub_total")}</span>
                    <span className="font-medium">${subTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">
                      {t("cart.shipping_estimate")}
                    </span>
                    <span className="font-medium">
                      ${shippingEstimate.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">
                      {t("cart.tax_estimate")}
                    </span>
                    <span className="font-medium">
                      ${taxEstimate.toFixed(2)}
                    </span>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-2"></div>
                  <div className="flex justify-between font-semibold text-lg">
                    <span>{t("cart.order_total")}</span>
                    <span className="text-(--main-color) text-xl">
                      ${orderTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
                <Link to={"/checkout"} className="block mt-6">
                  <OutlineButton className="w-full py-3">
                    {t("cart.checkout")}
                  </OutlineButton>
                </Link>
                <Link
                  to="/products"
                  className="flex items-end justify-center gap-2 text-sm text-gray-500 hover:text-(--main-color) mt-4 group"
                >
                  <HiArrowLongLeft
                    className={`text-lg transition-transform ${isRTL ? "rotate-180 group-hover:translate-x-1" : "group-hover:-translate-x-1"}`}
                  />
                  <span>{t("cart.continue_shopping")}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={isModalOpen}
        onConfirm={handleClear}
        onCancel={() => setIsModalOpen(false)}
        title={t("cart.clearTitle")}
        message={t("cart.clearMessage")}
      />
    </>
  );
};

export default Cart;
