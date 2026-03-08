import { FaHeart, FaShareAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist } from "../../../Store/Wishlist/WishlistSlice";
import useShowToast from "../../ShowToast";
const BrandSection = ({ product }) => {
  const { showToast } = useShowToast(product);
  const wishItem = useSelector((state) => state.wishlist.wishItems);
  const dispatch = useDispatch();
  const isFavorite = wishItem.includes(product.id);

  const handleFaveorite = () => {
    dispatch(toggleWishlist(product.id));
    if (isFavorite) {
      showToast("removeWish");
    } else {
      showToast("addWish");
    }
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
        <button onClick={handleFaveorite} className="p-2 ">
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
