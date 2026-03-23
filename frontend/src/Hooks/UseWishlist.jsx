import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { useGetProductsByIdsQuery } from "../Store/Actions/GetProductsId";
import { useUpdateWishlistMutation } from "../Store/Actions/GetUserProducts";
import { clearWishList } from "../Store/Wishlist/WishlistSlice";


const useWishlist = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { wishItems } = useSelector((state) => state.wishlist);
  const { user } = useSelector((state) => state.auth);
  const [updateWishlist] = useUpdateWishlistMutation();

  const { data: products, isLoading } = useGetProductsByIdsQuery(wishItems, {
    skip: wishItems.length === 0,
    keepPreviousData: true,
  });

  const syncWishlistToDB = async (updatedArray) => {
    if (!user?.id || user.role === "admin") return;
    try {
      await updateWishlist({
        userId: user.id,
        wishlistItems: updatedArray.map(Number),
      }).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  const handleClear = () => {
    dispatch(clearWishList());
    syncWishlistToDB([]);
    setIsModalOpen(false);
    toast.success(t("wishlist.cleared_success"));
  };

  return {
    products,
    isLoading,
    wishItems,
    isModalOpen,
    setIsModalOpen,
    handleClear,
  };
};

export default useWishlist;
