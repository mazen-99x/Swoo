import { FaHeart, FaShareAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import { toggleWishlist } from "../../../Store/Wishlist/WishlistSlice";
import useShowToast from "../../Common/ShowToast";
import { useActionCheck } from "../../Shared/HandleActionError";
import { useUpdateWishlistMutation } from "../../../Store/Actions/GetUserProducts";

const BrandSection = ({ product }) => {
  const { showToast } = useShowToast(product);
  const { user } = useSelector((state) => state.auth);
  const { checkAction } = useActionCheck(user);
  const wishItem = useSelector((state) => state.wishlist.wishItems);
  const dispatch = useDispatch();
  const isFavorite = wishItem.includes(product.id);
  const wishlistItems = useSelector((state) => state.wishlist.wishItems);

  const [updateWishlist] = useUpdateWishlistMutation();

  const handleWishlistToggle = () => {

    checkAction(async () => {
     
      dispatch(toggleWishlist(product.id));
      showToast(isFavorite ? "removeWish" : "addWish", product);

      const updatedWishlist = isFavorite
        ? wishlistItems.filter((id) => id !== product.id)
        : [...wishlistItems, product.id];

      try {
        await updateWishlist({
          userId: user.id,
          wishlistItems: updatedWishlist,
        }).unwrap();
      } catch (err) {
        console.error("Wishlist sync failed:", err);
        
      }
    });
  };
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        {product.brand && (
          <span className="px-3 py-1 bg-(--main-color) text-(--white-color) rounded-full text-sm font-medium">
            {product.brand}
          </span>
        )}

        <span className="px-3 py-1 bg-gray-700 text-white rounded-full text-sm">
          {product.category}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={handleWishlistToggle} className="p-2 ">
          <FaHeart
            className={`w-4 h-4 transition duration-300 cursor-pointer ${isFavorite ? "fill-red-500" : "fill-gray-400 hover:fill-red-300"}`}
          />
        </button>
        <button className="p-2 ">
          <FaShareAlt className="text-gray-400 hover:text-(--main-color) cursor-pointer" />
        </button>
      </div>
    </div>
  );
};

export default BrandSection;
