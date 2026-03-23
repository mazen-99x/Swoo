import { FaHeart, FaStar, FaCheckCircle, FaShoppingCart } from "react-icons/fa";
import { IoCloseCircle, IoAlertCircle } from "react-icons/io5";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";



import QuantitySelector from "../Shared/QuantitySelector";

import UseProduct from "../../Hooks/UseProduct";
import OutlineButton from "../Common/OutlineButton";

const Product = ({ product, viewMode }) => {
  const { t } = useTranslation();
  const {
    discountedPrice,
    handleQuantityUpdate,
    handleWishlistToggle,
    isFavorite,
    isMaxReached,
    slugify,
    quantity,
    checkAction,
  } = UseProduct(product);

  const isList = viewMode === "list";

  return (
    <div
      className={`group relative rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-(--dark-alt-color) overflow-hidden transition-all duration-500 ease-in-out hover:shadow-xl hover:shadow-(--main-color)/5 
    ${
      isList
        ? "flex flex-col sm:flex-row items-center p-6 gap-8 min-h-max sm:min-h-65 w-full"
        : "flex flex-col p-4 min-h-105 max-[650px]:mx-auto w-full"
    }`}
    >
      {/* 1. Stock Overlay */}
      {isMaxReached && (
        <div className="absolute top-14 left-1/2 -translate-x-1/2 z-30 w-max">
          <span className="bg-red-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1 ">
            <IoAlertCircle className="text-xs" />
            {product.stock === 0
              ? t("product.outOfStock")
              : t("product.limitReached")}
          </span>
        </div>
      )}

      {/* 2. Wishlist Button */}
      <button
        onClick={handleWishlistToggle}
        className="absolute cursor-pointer right-3 top-3 z-20 p-2.5 rounded-full bg-white/90 dark:bg-black/60 backdrop-blur-sm transition-all duration-300 hover:scale-110 shadow-md"
      >
        <FaHeart
          className={`w-4 h-4 transition-all duration-300 ${isFavorite ? "fill-red-500 scale-110" : "fill-gray-400 hover:fill-red-300"}`}
        />
      </button>

      {/* 3. Product Ribbon (Grid Only) */}
      {product.badge && !isList && (
        <div className="absolute top-0 left-0 w-24 h-24 overflow-hidden z-20 pointer-events-none">
          <div className="absolute top-5 -left-8 -rotate-45 w-32 bg-linear-to-r from-(--main-color) to-(--dark-secondary-color) text-white text-[10px] font-bold uppercase tracking-wider text-center shadow-lg py-1.5 border-b border-white/20">
            {product.badge}
          </div>
        </div>
      )}

      {/* 4. Product Image Section */}
      <Link
        to={`/${slugify(product.title)}/${product.id}`}
        className={`block relative shrink-0 transition-all duration-500 ease-in-out ${
          isList ? "w-40 sm:w-52 h-40 sm:h-48" : "w-full h-32 mb-4"
        }`}
      >
        <div className="flex items-center justify-center h-full transition-opacity duration-300">
          <img
            src={product.thumbnail}
            alt={product.title}
            className={`object-contain transition-all duration-500 group-hover:scale-110 ${
              isList ? "max-h-40" : "max-h-28 "
            }`}
          />
        </div>
      </Link>

      {/* 5. Product Content Section */}
      <div
        className={`flex flex-col flex-1 w-full relative ${isList ? "text-left items-start" : "text-center items-center"}`}
      >
        {/* Brand & Badge Row */}
        <div
          className={`flex items-center gap-2 mb-1 ${isList ? "justify-start" : "justify-center"}`}
        >
          <span className="text-xs uppercase tracking-wide text-gray-400">
            {product.brand}
          </span>
          {isList && product.badge && (
            <span className="px-2 py-0.5 bg-(--main-color)/10 text-(--main-color) rounded text-[9px] font-bold uppercase">
              {product.badge}
            </span>
          )}
        </div>

        <h3
          className={` ${isList ? "line-clamp-2" : "line-clamp-1"} font-semibold  text-sm sm:text-base mb-1  text-gray-800 dark:text-gray-100`}
        >
          {product.title}
        </h3>

        {/* Rating */}
        <div className="mb-2">
          <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/20 px-2 py-0.5 rounded-full w-fit">
            <FaStar className="text-yellow-400 text-xs" />
            <span className="text-gray-600 dark:text-gray-300 font-medium text-xs">
              {product.rating}
            </span>
          </div>
        </div>

        {/* Description */}
        <p
          className={`text-sm text-gray-500 dark:text-gray-400 italic mb-4 ${isList ? "line-clamp-3 max-w-xl" : "line-clamp-2"}`}
        >
          "{product.description}"
        </p>

        {/* Price & Stock & Action Row */}
        <div
          className={`mt-auto w-full flex ${isList ? "flex-row items-center justify-between gap-4" : "flex-col items-center gap-3"}`}
        >
          <div
            className={`flex flex-col ${isList ? "items-start" : "items-center"}`}
          >
            <div className="flex items-center gap-2">
              <span className="text-(--main-color) font-bold text-xl">
                ${discountedPrice}
              </span>
              {product.discountPercentage > 0 && (
                <span className="text-gray-400 line-through text-xs">
                  ${product.price}
                </span>
              )}
            </div>

            <div
              className={`flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full mt-1 ${
                product.stock > 0
                  ? "bg-green-100 text-green-600 dark:bg-green-900/40"
                  : "bg-red-100 text-red-600 dark:bg-red-900/40"
              }`}
            >
              {product.stock > 0 ? <FaCheckCircle /> : <IoCloseCircle />}
              <span>
                {product.stock > 0
                  ? t("product.inStock")
                  : t("product.outOfStock")}
              </span>
            </div>
          </div>

          {/* Button Area */}
          <div className={`${isList ? "w-48" : "w-full"}`}>
            {quantity > 0 ? (
              <QuantitySelector
                product={product}
                quantity={quantity}
                onUpdate={(prod, change) => handleQuantityUpdate(prod, change)}
              />
            ) : (
              <OutlineButton
                onClick={() =>
                  checkAction(() => handleQuantityUpdate(product, 1))
                }
                disabled={product.stock === 0}
                className="w-full group/btn relative overflow-hidden py-2"
              >
                <span className="relative z-10 flex items-center justify-center gap-2 text-sm">
                  {product.stock > 0 ? (
                    <>
                      <FaShoppingCart className="opacity-0 group-hover/btn:opacity-100 transition-all " />
                      {t("product.addToCart")}
                    </>
                  ) : (
                    t("product.outOfStock")
                  )}
                </span>
                {product.stock > 0 && (
                  <span className="absolute inset-0 bg-(--main-color) transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-500 origin-left"></span>
                )}
              </OutlineButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
