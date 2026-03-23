import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, addToCart } from "../../../Store/Cart/CartSlice";
import { FaMinus, FaPlus, FaShoppingCart } from "react-icons/fa";
import { IoAlertCircle } from "react-icons/io5";
import OutlineButton from "../../Common/OutlineButton";
import QuantitySelector from "../../Shared/QuantitySelector";
import useShowToast from "../../Common/ShowToast";
import { useActionCheck } from "../../Shared/HandleActionError";
import { useUpdateCartMutation } from "../../../Store/Actions/GetUserProducts";

const AddCartSection = ({ product, translate }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { checkAction } = useActionCheck(user);
  const { showToast } = useShowToast(product);
  const [updateCart] = useUpdateCartMutation();

  const cartItems = useSelector((state) => state.cart.items);
  const cartQuantity = cartItems[product.id] || 0;
  const maxAllowed = Math.min(5, product.stock);
  const isMaxReached = cartQuantity >= maxAllowed;

  
  const handleQuantityUpdate = (prod, change) => {
    const newQty = cartQuantity + change;

 
    if (newQty < 0 || (change > 0 && cartQuantity >= prod.stock)) return;

    checkAction(() => {
      
      if (change > 0) {
        dispatch(addToCart({ id: prod.id, stock: prod.stock }));

      
        if (cartQuantity === 0) {
          showToast("addCart", prod);
        }
      } else {
        dispatch(removeFromCart(prod.id));

      
        if (newQty === 0) {
          showToast("removeCart", prod);
        }
      }

      
      if (user?.id && user.role !== "admin") {
        
        const updatedItems = { ...cartItems };

        if (newQty > 0) {
          updatedItems[prod.id] = newQty;
        } else {
          delete updatedItems[prod.id];
        }

       
        const cartArrayForDB = Object.entries(updatedItems).map(
          ([id, qty]) => ({
            id: Number(id),
            quantity: qty,
          }),
        );

        updateCart({ userId: user.id, cartItems: cartArrayForDB })
          .unwrap()
          .catch((err) => console.error("Cart sync failed:", err));
      }
    });
  };

  return (
    <>
      {/* DESKTOP VIEW */}
      <div className="hidden md:block mb-6 sm:mb-8">
        {product.stock > 0 ? (
          <div className="flex flex-col gap-3">
            {cartQuantity > 0 ? (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-4">
                  <label className="text-gray-600 dark:text-gray-300 font-medium text-sm sm:text-base">
                    {translate("product.Quantity")}
                    <span className="ml-2 text-[12px] text-(--main-color)">
                      (Max {maxAllowed})
                    </span>
                  </label>

                  {/* Using the same QuantitySelector for design consistency */}
                  <QuantitySelector
                    product={product}
                    quantity={cartQuantity}
                    onUpdate={handleQuantityUpdate}
                  />
                </div>

                {isMaxReached && (
                  <div className="flex items-center gap-2 text-red-500 text-sm font-bold ">
                    <IoAlertCircle />
                    {translate("product.limitReached")}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex-1 flex gap-3">
                <OutlineButton
                  onClick={() => handleQuantityUpdate(product, 1)}
                  className="w-full group/btn relative overflow-hidden py-3"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <FaShoppingCart className="opacity-0 group-hover/btn:opacity-100 transition-all duration-300" />
                    {translate("product.addToCart")}
                  </span>
                  <span className="absolute inset-0 bg-(--main-color) transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left"></span>
                </OutlineButton>
              </div>
            )}
          </div>
        ) : (
          <div className="flex gap-3">
            <OutlineButton
              disabled
              className="flex-1 py-3 px-6 cursor-not-allowed font-medium"
            >
              {translate("product.outOfStock")}
            </OutlineButton>
          </div>
        )}
      </div>

      {/* MOBILE STICKY BAR */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 pb-8 z-30 shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
        <div className="flex flex-col gap-2">
          {isMaxReached && (
            <div className="flex items-center justify-center gap-1 text-[11px] text-red-500 font-bold mb-1">
              <IoAlertCircle />
              {translate("product.limitReached")}
            </div>
          )}

          {product.stock > 0 ? (
            <div className="flex gap-3 items-center">
              {cartQuantity > 0 ? (
                <div className="flex-1 flex items-center justify-between border rounded-xl overflow-hidden">
                  <button
                    onClick={() => handleQuantityUpdate(product, -1)}
                    className="px-8 py-4 hover:bg-(--main-color) cursor-pointer hover:text-white transition-colors"
                  >
                    <FaMinus />
                  </button>
                  <div className="flex flex-col items-center">
                    <span
                      className={`text-xl font-black ${isMaxReached ? "text-red-500" : "text-(--main-color)"}`}
                    >
                      {cartQuantity}
                    </span>
                    <span className="text-[10px] uppercase text-gray-400 font-bold leading-none">
                      {translate("product.inCart")}
                    </span>
                  </div>
                  <button
                    onClick={() => handleQuantityUpdate(product, 1)}
                    className={`${isMaxReached ? "bg-gray-300 border-gray-500 dark:border-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed" : "hover:bg-(--main-color) cursor-pointer hover:text-white transition-colors"} px-8 py-4 `}
                    disabled={isMaxReached}
                  >
                    <FaPlus />
                  </button>
                </div>
              ) : (
                /* MOBILE ADD TO CART - Now matches Desktop grow effect */
                <OutlineButton
                  onClick={() => handleQuantityUpdate(product, 1)}
                  className="flex-1 py-4 group/btn relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2 transition-colors duration-300 group-hover/btn:text-white">
                    <FaShoppingCart className="opacity-0 group-hover/btn:opacity-100 transition-all duration-300" />
                    {translate("product.addToCart")}
                  </span>

                  {/* The Background Layer */}
                  <span className="absolute inset-0 bg-(--main-color) transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left"></span>
                </OutlineButton>
              )}
            </div>
          ) : (
            <OutlineButton disabled className="w-full py-4 text-gray-400">
              {translate("product.outOfStock")}
            </OutlineButton>
          )}
        </div>
      </div>
    </>
  );
};

export default AddCartSection;
