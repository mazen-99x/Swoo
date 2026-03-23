import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

import { addToCart, removeFromCart, clearCart } from "../Store/Cart/CartSlice";
import { toggleWishlist } from "../Store/Wishlist/WishlistSlice";
import { useGetProductsByIdsQuery } from "../Store/Actions/GetProductsId";
import {
  useUpdateCartMutation,
  useUpdateWishlistMutation,
} from "../Store/Actions/GetUserProducts";
import { useActionCheck } from "../Components/Shared/HandleActionError";
import useShowToast from "../Components/Common/ShowToast";

const useCart = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isRTL = i18n.language === "ar";
  const { showToast } = useShowToast();

  const [updateCart, { isLoading: updateLoading }] = useUpdateCartMutation();
  const [updateWishlist] = useUpdateWishlistMutation();

  const { items } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const { checkAction } = useActionCheck(user);
  const wishlistItems = useSelector((state) => state.wishlist.wishItems);

  const ids = Object.keys(items);
  const { data: products, isLoading } = useGetProductsByIdsQuery(ids, {
    skip: ids.length === 0,
  });

  // Calculations
  const subTotal =
    products?.reduce((acc, product) => {
      return acc + product.price * (items[product.id] || 0);
    }, 0) || 0;

  const shippingEstimate = ids.length > 0 ? 5.0 : 0;
  const taxEstimate = subTotal * 0.1;
  const orderTotal = subTotal + shippingEstimate + taxEstimate;

  const handleWishlistToggle = (targetProduct) => {
    const isFavorite = wishlistItems.includes(targetProduct.id);
    checkAction(async () => {
    
      dispatch(toggleWishlist(targetProduct.id));
      showToast(isFavorite ? "removeWish" : "addWish", targetProduct);

      try {
        await updateWishlist({
          userId: user.id,
          wishlistItems: isFavorite
            ? wishlistItems.filter((id) => id !== targetProduct.id)
            : [...wishlistItems, targetProduct.id],
        }).unwrap();
      } catch (err) {
        console.error("Wishlist sync failed:", err);
      }
    });
  };

  const syncCartToDB = async (updatedItemsObject, triggeredId) => {
    if (!user?.id || user.role === "admin") return;

    const cartArrayForDB = Object.entries(updatedItemsObject).map(
      ([id, qty]) => ({
        id: Number(id),
        quantity: qty,
      }),
    );

    try {
      await updateCart({
        userId: user.id,
        cartItems: cartArrayForDB,
        productId: triggeredId,
      }).unwrap();
    } catch (err) {
      console.error("Cart sync failed:", err);
    }
  };

  const handleQuantityUpdate = (product, change) => {
    const currentQty = items[product.id] || 0;
    const newQty = currentQty + change;

    if (newQty > Math.min(5, product.stock) || newQty < 0) return;

    
    if (change > 0) {
      dispatch(addToCart({ id: product.id, stock: product.stock }));
    } else {
      dispatch(removeFromCart(product.id));
      if (newQty === 0) showToast("removeCart", product);
    }

    const updatedItems = { ...items };
    if (newQty > 0) {
      updatedItems[product.id] = newQty;
    } else {
      delete updatedItems[product.id];
    }
    syncCartToDB(updatedItems, product.id);
  };

  const handleClear = () => {
    dispatch(clearCart());
    syncCartToDB({}, "ALL");
    setIsModalOpen(false);
    toast.success(t("cart.clearedSuccess"));
  };

  const slugify = (text) =>
    text
      ? text
          .toLowerCase()
          .trim()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]+/g, "")
      : "product";

  
  return {
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
  };
};

export default useCart;
