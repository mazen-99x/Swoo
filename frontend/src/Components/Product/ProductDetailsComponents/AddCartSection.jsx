import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, addToCart } from "../../../Store/Cart/CartSlice";
import { FaMinus, FaPlus, FaShoppingCart } from "react-icons/fa";
import OutlineButton from "../../OutlineButton";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import useShowToast from "../../ShowToast";
const AddCartSection = ({ product, translate }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleAdd = () => {
    dispatch(addToCart({ id: product.id, stock: product.stock }));
  };
  const { showToast } = useShowToast(product);
  const { token } = useSelector((state) => state.auth);
  const showAuthError = () => {
    toast.error(translate("messages.loginRequired"), {
      action: {
        label: translate("common.login"),
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

  // 1. Get current quantity from Redux instead of local useState
  const cartQuantity = useSelector(
    (state) => state.cart.items[product.id] || 0,
  );

  // We define this ONLY to control the button appearance
  const isMaxReached = cartQuantity >= Math.min(5, product.stock);

  return (
    <>
      <div className="hidden md:block mb-6 sm:mb-8">
        {product.stock > 0 ? (
          /* ================= IN STOCK ================= */
          <div className="flex flex-col sm:flex-row gap-3  sm:gap-4">
            {/* Logic: If quantity in cart is > 0, show the +/- controls.
          If not, show the Add to Cart button.
      */}
            {cartQuantity > 0 ? (
              <div className="flex items-center  gap-2 sm:gap-3">
                <label className="text-gray-600 dark:text-gray-300 font-medium text-sm sm:text-base">
                  {translate("product.Quantity")}
                  <span className="ml-2 text-[12px] text-(--main-color)">
                    (Max {product.stock > 5 ? 5 : product.stock})
                  </span>
                </label>

                <div className="flex items-center   overflow-hidden">
                  <OutlineButton
                    onClick={() => dispatch(removeFromCart(product.id))}
                    className="px-4 py-2 flex-1 text-lg font-medium hover:bg-(--main-color) hover:text-white transition-colors "
                  >
                    −
                  </OutlineButton>
                  <span className="px-4 flex-1 py-2 font-bold min-w-12 text-center ">
                    {cartQuantity}
                  </span>
                  <OutlineButton
                    onClick={() =>
                      dispatch(
                        addToCart({ id: product.id, stock: product.stock }),
                      )
                    }
                    className="px-4 py-2 flex-1 text-lg font-medium hover:bg-(--main-color) hover:text-white transition-colors disabled:opacity-50"
                    disabled={isMaxReached}
                  >
                    +
                  </OutlineButton>
                </div>
              </div>
            ) : (
              /* Add to Cart Button (Only shows if cartQuantity is 0) */
              <div className="flex-1 flex gap-3">
                <OutlineButton
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="w-full group/btn relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {product.stock > 0 ? (
                      <>
                        <FaShoppingCart className="opacity-0 group-hover/btn:opacity-100 transition-all duration-300" />
                        {translate("product.addToCart")}
                      </>
                    ) : (
                      translate("product.outOfStock")
                    )}
                  </span>
                  {product.stock > 0 && (
                    <span className="absolute inset-0 bg-(--main-color) transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left"></span>
                  )}
                </OutlineButton>
              </div>
            )}
          </div>
        ) : (
          /* ================= OUT OF STOCK ================= */
          <div className="flex gap-3">
            <OutlineButton
              disabled
              className="flex-1 py-3 px-6 rounded-lg cursor-not-allowed font-medium"
            >
              {translate("product.outOfStock")}
            </OutlineButton>

            <OutlineButton className="py-3 px-4">
              {translate("product.addToWishlist")}
            </OutlineButton>
          </div>
        )}
      </div>
      {/* ================= MOBILE STICKY BAR ================= */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 z-30 shadow-lg">
        <div className="flex flex-col gap-3">
          {/* Price + Stock Info Row */}
          <div className="flex justify-between items-center">
            <div>
              <div className="text-lg font-bold text-gray-900 dark:text-white">
                ${product.price?.toFixed(2)}
              </div>
              <p
                className={`text-xs font-medium ${product.stock > 0 ? "text-green-600" : "text-red-500"}`}
              >
                {product.stock > 0
                  ? translate("product.inStock")
                  : translate("product.outOfStock")}
              </p>
            </div>
          </div>

          {/* Actions Section */}
          {product.stock > 0 ? (
            <div className="flex gap-3 items-center">
              {cartQuantity > 0 ? (
                /* MOBILE QUANTITY CONTROLS (Full Width) */
                <div className="flex-1 flex items-center justify-between border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden bg-gray-50 dark:bg-black/10">
                  <button
                    onClick={() => dispatch(removeFromCart(product.id))}
                    className="px-6 py-3 hover:bg-(--main-color) cursor-pointer hover:text-white transition-colors"
                  >
                    <FaMinus />
                  </button>

                  <div className="flex flex-col items-center">
                    <span className="text-lg font-bold text-(--main-color)">
                      {cartQuantity}
                    </span>
                    <span className="text-[10px] uppercase text-gray-400 font-bold">
                      {translate("product.inCart")}
                    </span>
                  </div>

                  <button
                    onClick={() =>
                      dispatch(
                        addToCart({ id: product.id, stock: product.stock }),
                      )
                    }
                    className="px-6 py-3 hover:bg-(--main-color) cursor-pointer hover:text-white transition-colors disabled:opacity-30"
                    disabled={isMaxReached}
                  >
                    <FaPlus />
                  </button>
                </div>
              ) : (
                /* MOBILE ADD TO CART BUTTON */
                <OutlineButton
                  onClick={handleAddToCart}
                  className="flex-1 py-4   gap-2"
                >
                  <FaShoppingCart />
                  {translate("product.addToCart")}
                </OutlineButton>
              )}
            </div>
          ) : (
            /* MOBILE OUT OF STOCK */
            <OutlineButton disabled className="w-full py-3">
              {translate("product.outOfStock")}
            </OutlineButton>
          )}
        </div>
      </div>
    </>
  );
};

export default AddCartSection;
