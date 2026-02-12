import React from "react";
import { FaHeart, FaShoppingCart } from "react-icons/fa";

import { Link } from "react-router";
import LangButton from "../LangButton";

function HeadIcons() {
  return (
    <>
      <div className="headIcons flex max-md:flex-col max-md:justify-center items-center gap-7">
        <div>
          <LangButton />
        </div>
        <div className="flex gap-7">
          <Link to={`/cart`}>
            <div className="icon relative cursor-pointer">
              <FaShoppingCart className="text-xl text-blue-500" />
              <span className="absolute -right-2.5 bg-(--main-color)  text-white w-5 h-5 rounded-full leading-5 text-center -top-2.5">
                0
              </span>
            </div>
          </Link>

          <Link to={`/wishlist`}>
            <div className="icon relative cursor-pointer">
              <FaHeart className="text-xl text-red-500   " />
              <span className="absolute -right-2.5 bg-(--main-color)  text-white w-5 h-5 rounded-full leading-5 text-center -top-2.5">
                0
              </span>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default HeadIcons;
