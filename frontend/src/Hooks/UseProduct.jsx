import { useDispatch, useSelector } from "react-redux";



import { toggleWishlist } from "../Store/Wishlist/WishlistSlice";



import {
  useUpdateCartMutation,
  useUpdateWishlistMutation,
} from "../Store/Actions/GetUserProducts";

import { removeFromCart, addToCart } from "../Store/Cart/CartSlice";
import useShowToast from "../Components/Common/ShowToast";
import { useActionCheck } from "../Components/Shared/HandleActionError";
const UseProduct = (product) => {
  const dispatch = useDispatch();

  const { showToast } = useShowToast(product);

  const { user } = useSelector((state) => state.auth);
  const { checkAction } = useActionCheck(user);

  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.wishItems);

  const [updateCart] = useUpdateCartMutation();
  const [updateWishlist] = useUpdateWishlistMutation();
  if (!product) {
    return {
      handleQuantityUpdate: () => {},
      handleWishlistToggle: () => {},
      isFavorite: false,
      slugify: () => "",
      isMaxReached: false,
      quantity: 0,
      discountedPrice: 0,
      checkAction: () => {},
    };
  }

  const isFavorite = wishlistItems.includes(product.id);
  const quantity = cartItems[product.id] || 0;
  const maxAllowed = Math.min(5, product.stock);
  const isMaxReached = quantity >= maxAllowed;

  const discountedPrice = Number(
    (
      product.price -
      (product.price * product.discountPercentage) / 100
    ).toFixed(2),
  );

  const slugify = (text) =>
    text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");
  const handleWishlistToggle = () => {
    checkAction(async () => {
      // 1. Snapshot status immediately
      const wasFavorite = isFavorite;

      // 2. TRIGGER UI UPDATES INSTANTLY
      dispatch(toggleWishlist(product.id)); // Icon changes now
      showToast(wasFavorite ? "removeWish" : "addWish", product); // Toast shows now

      // 3. Prepare DB payload
      const updatedWishlist = wasFavorite
        ? wishlistItems.filter((id) => id !== product.id)
        : [...wishlistItems, product.id];

      // 4. Sync with DB in the background
      if (user?.id && user.role !== "admin") {
        try {
          await updateWishlist({
            userId: user.id,
            wishlistItems: updatedWishlist,
          }).unwrap();
        } catch (err) {
          console.error("Wishlist sync failed:", err);
          // Optional: Revert UI if it's critical, but usually not needed for wishlist
        }
      }
    });
  };
  const handleQuantityUpdate = (prod, change) => {
    const currentQty = cartItems[prod.id] || 0;
    const newQty = currentQty + change;


    if (newQty < 0 || (change > 0 && currentQty >= prod.stock)) return;

    
    checkAction(() => {
      
      if (change > 0) {
        dispatch(addToCart({ id: prod.id, stock: prod.stock }));

       
        if (currentQty === 0) {
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

  return {
    handleQuantityUpdate,
    handleWishlistToggle,
    isFavorite,
    slugify,
    isMaxReached,
    quantity,
    discountedPrice,
    checkAction,
  };
};

export default UseProduct;
