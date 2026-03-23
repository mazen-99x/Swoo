import React, { useMemo } from "react";
import { FaHeart, FaShoppingCart } from "react-icons/fa";

import { Link } from "react-router";

import { useSelector } from "react-redux";
import LangButton from "../../Common/LangButton";

function HeadIcons() {
  const { items } = useSelector((state) => state.cart);
  const { wishItems } = useSelector((state) => state.wishlist);
  const { user } = useSelector((state) => state.auth);
 
  const cartCount = useMemo(() => {
    return Object.keys(items).length;
  }, [items]);
  const wishlistCount = useMemo(() => {
    return wishItems.length;
  }, [wishItems]);

  return (
    <>
      <div className="headIcons flex max-md:flex-col max-md:justify-center items-center gap-7">
        <div>
          <LangButton />
        </div>
        {user && user.role !== "admin" && (
          <>
            <div className="flex gap-7">
              <Link to={`/cart`}>
                <div className="icon relative cursor-pointer">
                  <FaShoppingCart className="text-xl text-blue-500" />
                  <span className="absolute -right-3.5 bg-(--main-color) flex justify-center items-center  text-white w-6 h-6 rounded-full leading-5 text-center -top-3.5">
                    {cartCount}
                  </span>
                </div>
              </Link>

              <Link to={`/wishlist`}>
                <div className="icon relative cursor-pointer">
                  <FaHeart className="text-xl text-red-500   " />
                  <span className="absolute -right-3.5 bg-(--main-color) flex justify-center items-center  text-white w-6 h-6 rounded-full leading-5 text-center -top-3.5">
                    {wishlistCount}
                  </span>
                </div>
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default HeadIcons;
