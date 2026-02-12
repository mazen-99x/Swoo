import { useState } from "react";
import { FaHeart, FaStar, FaCheckCircle } from "react-icons/fa";
import { IoCloseCircle } from "react-icons/io5";
import OutlineButton from "../OutlineButton";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";

const Product = ({ product }) => {
  const [heart, setHeart] = useState(false);
  const { t } = useTranslation();

  const discountedPrice = (
    product.price -
    (product.price * product.discountPercentage) / 100
  ).toFixed(2);

  return (
    <div className="group relative h-100 max-[650px]:mx-auto rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-(--dark-alt-color) overflow-hidden flex flex-col p-4 transition-all duration-300">
      {/* Wishlist Heart */}
      <button
        onClick={() => setHeart(!heart)}
        className="absolute cursor-pointer right-3 top-3 z-20 p-2 rounded-full bg-white/80 dark:bg-black/40 backdrop-blur transition"
      >
        <FaHeart
          className={`w-4 h-4 transition duration-300 ${
            heart ? "fill-red-500" : "fill-gray-400 hover:fill-red-300"
          }`}
        />
      </button>

      {/* Vertical Badge Stack */}
      <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
        {/* Stock */}
        <div
          className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full shadow-sm ${
            product.stock > 0
              ? "bg-green-100 text-green-600 dark:bg-green-900/40"
              : "bg-red-100 text-red-600 dark:bg-red-900/40"
          }`}
        >
          {product.stock > 0 ? <FaCheckCircle /> : <IoCloseCircle />}
          {product.stock > 0 ? t("product.inStock") : t("product.outOfStock")}
        </div>

        {/* Type / Badge */}
        {product.badge && (
          <div className="flex items-center justify-center text-xs font-semibold px-2 py-1 rounded-full bg-blue-500 text-white shadow-sm">
            {product.badge}
          </div>
        )}

        {/* Discount */}
        {product.discountPercentage > 0 && (
          <div className="flex items-center justify-center text-xs font-bold px-2 py-1 rounded-full bg-red-500 text-white shadow-sm">
            -{Math.round(product.discountPercentage)}%
          </div>
        )}
      </div>

      {/* Product Image */}
      <div className="h-32 flex items-center justify-center mb-4">
        <Link to={`/product/${product.id}`} className="block">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="max-h-28 object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
      </div>

      {/* Product Content */}
      <div className="flex flex-col flex-1 text-center">
        {/* Brand */}
        <span className="text-xs uppercase tracking-wide text-gray-400 mb-1">
          {product.brand}
        </span>

        {/* Title */}
        <h3 className="font-semibold text-sm sm:text-base mb-1 line-clamp-2 text-gray-800 dark:text-gray-100">
          {product.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center justify-center gap-1 text-sm mb-2">
          <FaStar className="text-yellow-400" />
          <span className="text-gray-600 dark:text-gray-300">
            {product.rating}
          </span>
        </div>

        {/* Description */}
        <p
          title={product.description}
          className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-3"
        >
          {product.description}
        </p>

        {/* Price */}
        <div className="mb-4">
          {product.discountPercentage > 0 ? (
            <div className="flex items-center justify-center gap-2">
              <span className="text-gray-400 line-through text-sm">
                ${product.price}
              </span>
              <span className="text-(--main-color) font-bold text-lg">
                ${discountedPrice}
              </span>
            </div>
          ) : (
            <span className="text-(--main-color) font-bold text-lg">
              ${product.price}
            </span>
          )}
        </div>

        {/* CTA Button */}
        <div className="mt-auto">
          <OutlineButton disabled={product.stock === 0} className="w-full">
            {product.stock > 0
              ? t("product.addToCart")
              : t("product.outOfStock")}
          </OutlineButton>
        </div>
      </div>
    </div>
  );
};

export default Product;
