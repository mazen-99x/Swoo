import React from "react";
import {

  FaCheckCircle,
  FaTimesCircle,

} from "react-icons/fa";
const AvailabilitySection = ({ product, translate }) => {
  return (
    <div className="mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
      {product.availabilityStatus === "In Stock" ? (
        <div className="flex items-center gap-1 sm:gap-2 text-green-600 dark:text-green-400 text-sm sm:text-base">
          <FaCheckCircle className="text-sm sm:text-base" />
          <span className="font-medium">{translate("product.inStock")}</span>
        </div>
      ) : product.availabilityStatus === "Low Stock" ? (
        <div className="flex items-center gap-1 sm:gap-2 text-orange-500 dark:text-orange-400 text-sm sm:text-base ">
          <FaTimesCircle className="text-sm sm:text-base" />
          <span className="font-medium">{translate("product.lowStock")}</span>
        </div>
      ) : (
        <div className="flex items-center gap-1 sm:gap-2 text-red-600 dark:text-red-400 text-sm sm:text-base">
          <FaTimesCircle className="text-sm sm:text-base" />
          <span className="font-medium">{translate("product.outOfStock")}</span>
        </div>
      )}
      <span className="dark:text-gray-300 text-gray-600 text-sm sm:text-base">
        {product.shippingInformation?.toLowerCase()}
      </span>
    </div>
  );
};

export default AvailabilitySection;
