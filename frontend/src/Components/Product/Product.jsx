import { FaHeart, FaStar, FaCheckCircle, FaShoppingCart } from "react-icons/fa";
import { IoCloseCircle } from "react-icons/io5";

import OutlineButton from "../OutlineButton";
import { Link, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../Store/Cart/CartSlice";
import { toggleWishlist } from "../../Store/Wishlist/WishlistSlice";

import useShowToast from "../ShowToast";
import { toast } from "sonner";

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { showToast } = useShowToast(product);
  const wishlistItems = useSelector((state) => state.wishlist.wishItems);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const isFavorite = wishlistItems.includes(product.id);

  const quantity = useSelector((state) => state.cart.items[product.id] || 0);

  const maxAllowed = Math.min(5, product.stock);
  const isMaxReached = quantity >= maxAllowed;

  const slugify = (text) =>
    text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

  const discountedPrice = Number(
    (
      product.price -
      (product.price * product.discountPercentage) / 100
    ).toFixed(2),
  );

  const handleAdd = () => {
    dispatch(addToCart({ id: product.id, stock: product.stock }));
  };
  const showAuthError = () => {
    toast.error(t("messages.loginRequired"), {
      action: {
        label: t("common.login"),
        onClick: () => navigate("/signin"),
      },
      actionButtonStyle: {
        backgroundColor: "var(--main-color)",
        color: "white",
        borderRadius: "8px",
        padding: "8px 16px",
        fontWeight: "600",
      },
    });
  };
  const handleAddToCart = () => {
    if (!token) {
      showAuthError();
    } else {
      handleAdd();
      showToast("addCart");
    }
  };

  const handleWishlistToggle = () => {
    if (!token) {
      return showAuthError();
    } else {
      dispatch(toggleWishlist(product.id));
      if (isFavorite) {
        showToast("removeWish");
      } else {
        showToast("addWish");
      }
    }
  };
  return (
    <div className="group relative h-100 max-[650px]:mx-auto rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-(--dark-alt-color) overflow-hidden flex flex-col p-4 transition-all duration-300 hover:shadow-xl hover:shadow-(--main-color)/5 hover:border-(--main-color)/30 dark:hover:shadow-(--main-color)/10">
      {/* Wishlist Heart - Enhanced */}
      <button
        onClick={handleWishlistToggle}
        className="absolute cursor-pointer right-3 top-3 z-20 p-2.5 rounded-full bg-white/90 dark:bg-black/60 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-red-50 dark:hover:bg-red-900/30 shadow-md"
      >
        <FaHeart
          className={`w-4 h-4 transition-all duration-300 ${isFavorite ? "fill-red-500 scale-110" : "fill-gray-400 hover:fill-red-400"}`}
        />
      </button>

      {/* Badges Stack - Repositioned for better layout */}
      <div
        className={`absolute ${product.badge ? "top-12 right-3" : "top-3 left-3"} flex flex-col gap-2 z-10`}
      >
        <div
          className={`flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-full shadow-sm backdrop-blur-sm ${
            product.stock > 0
              ? "bg-green-100/90 text-green-600 dark:bg-green-900/60 dark:text-green-300"
              : "bg-red-100/90 text-red-600 dark:bg-red-900/60 dark:text-red-300"
          }`}
        >
          {product.stock > 0 ? (
            <FaCheckCircle className="text-xs" />
          ) : (
            <IoCloseCircle className="text-xs" />
          )}
          <span>
            {product.stock > 0 ? t("product.inStock") : t("product.outOfStock")}
          </span>
        </div>
      </div>

      {/* Product Badge - Enhanced ribbon design */}
      {product.badge && (
        <div className="absolute top-0 left-0 w-24 h-24 overflow-hidden z-20 pointer-events-none">
          <div
            className="absolute top-5 -left-8 -rotate-45 w-32 
              bg-linear-to-r from-(--main-color) to-(--dark-secondary-color) 
              text-white text-[10px] font-bold uppercase tracking-wider text-center 
              shadow-lg py-1.5 border-b border-white/20 flex items-center justify-center gap-1"
          >
            <span className="relative">
              {product.badge === "New In"
                ? "✨"
                : product.badge === "Best Seller"
                  ? "🔥"
                  : "⭐"}
              {product.badge}
            </span>
          </div>
        </div>
      )}

      {/* Product Image - Enhanced with overlay effect */}
      <Link
        to={`/${slugify(product.title)}/${product.id}`}
        className="block relative"
      >
        <div className="h-32 flex items-center justify-center mb-4 relative">
          {/* Quick view overlay on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 rounded-lg transition-all duration-300 flex items-center justify-center"></div>
          <img
            src={product.thumbnail}
            alt={product.title}
            className="max-h-28 object-contain transition-all duration-500 group-hover:scale-110 group-hover:rotate-1"
          />
        </div>
      </Link>

      {/* Product Content */}
      <div className="flex flex-col flex-1 text-center relative">
        {/* Brand with icon */}
        <span className="text-xs uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-1 flex items-center justify-center gap-1">
          <span className="w-1 h-1 rounded-full bg-(--main-color)"></span>
          {product.brand}
          <span className="w-1 h-1 rounded-full bg-(--main-color)"></span>
        </span>

        {/* Title */}
        <h3
          title={product.title}
          className="font-semibold text-sm sm:text-base mb-1 line-clamp-1 text-gray-800 dark:text-gray-100 hover:text-(--main-color) transition-colors"
        >
          {product.title}
        </h3>

        {/* Rating with background */}
        <div className="flex items-center justify-center gap-1 text-sm mb-2">
          <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/20 px-2 py-0.5 rounded-full">
            <FaStar className="text-yellow-400 text-xs" />
            <span className="text-gray-600 dark:text-gray-300 font-medium">
              {product.rating}
            </span>
            <span className="text-gray-400 text-xs">/5</span>
          </div>
        </div>

        {/* Description */}
        <p
          title={product.description}
          className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1 mb-3 italic"
        >
          "{product.description}"
        </p>

        {/* Price with enhanced styling */}
        <div className="mb-4 flex items-center justify-center gap-2">
          <span className="text-(--main-color) font-bold text-xl">
            ${discountedPrice}
          </span>
          {product.discountPercentage > 0 && (
            <div className="flex items-center gap-1">
              <span className="text-gray-400 line-through text-xs">
                ${product.price}
              </span>
              <span className="bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                -{Math.round(product.discountPercentage)}%
              </span>
            </div>
          )}
        </div>

        {/* Dynamic CTA Area - Enhanced */}
        <div className="mt-auto min-h-10">
          {quantity > 0 ? (
            <div className="flex items-center gap-1 bg-gray-50 dark:bg-gray-800/50 p-1 rounded-xl">
              <OutlineButton
                onClick={() => dispatch(removeFromCart(product.id))}
                className="px-4 py-2 flex-1 text-lg font-medium rounded-lg"
              >
                −
              </OutlineButton>
              <div className="relative">
                <span className="px-3 py-2 font-bold min-w-12 text-center block bg-white dark:bg-gray-700 rounded-lg shadow-inner">
                  {quantity}
                </span>
                {quantity >= 5 && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                )}
              </div>
              <OutlineButton
                onClick={() => handleAdd()}
                className="px-4 py-2 flex-1 text-lg font-medium rounded-lg "
                disabled={isMaxReached}
              >
                +
              </OutlineButton>
            </div>
          ) : (
            <OutlineButton
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="w-full group/btn relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {product.stock > 0 ? (
                  <>
                    <FaShoppingCart className="opacity-0 group-hover/btn:opacity-100 transition-all duration-300" />
                    {t("product.addToCart")}
                  </>
                ) : (
                  t("product.outOfStock")
                )}
              </span>
              {product.stock > 0 && (
                <span className="absolute inset-0 bg-(--main-color) transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left"></span>
              )}
            </OutlineButton>
          )}
        </div>

        {/* Max Limit Messaging - Enhanced */}
        {isMaxReached && product.stock > 0 && (
          <div className="flex items-center justify-center gap-1 text-[10px] text-red-500 mt-2 animate-pulse">
            <span className="w-1 h-1 bg-red-500 rounded-full"></span>
            <span className="italic">
              {quantity >= 5
                ? t("product.limitReached")
                : t("product.lowStock")}
            </span>
            <span className="w-1 h-1 bg-red-500 rounded-full"></span>
          </div>
        )}
      </div>

      {/* Hover effect overlay border */}
      <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-(--main-color)/10 pointer-events-none transition-all duration-300"></div>
    </div>
  );
};

export default Product;
