import React from "react";
import { FaStar } from "react-icons/fa";
const RatingSection = ({ product, translate }) => {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-500 fill-current" />);
      } else if (i === fullStars + 1 && halfStar) {
        stars.push(
          <FaStar
            key={i}
            className="text-yellow-500 fill-current opacity-80"
          />,
        );
      } else {
        stars.push(<FaStar key={i} className="text-gray-300 fill-current" />);
      }
    }
    return stars;
  };
  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6">
      <div className="flex items-center gap-1 sm:gap-2">
        {renderStars(product.rating)}
        <span className="dark:text-gray-300 text-gray-600 font-medium text-sm sm:text-base">
          {product.rating?.toFixed(1)}
        </span>
      </div>
      <span className="hidden sm:inline dark:text-gray-300 text-gray-600">
        •
      </span>
      <span className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
        {product.reviews?.length || 0} {translate("product.reviews")}
      </span>
      <span className="hidden sm:inline dark:text-gray-300 text-gray-600">
        •
      </span>
      <span className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
        <span className="text-(--main-color) font-bold">{product.stock}</span>{" "}
        {translate("product.inStock")}
      </span>
    </div>
  );
};

export default RatingSection;
