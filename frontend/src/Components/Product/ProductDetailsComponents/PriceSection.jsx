import React from "react";

const PriceSection = ({ product, translate }) => {
  return (
    <>
      <div className="hidden md:block mb-6 p-4 bg-linear-to-r from-(--main-color) to-(--main-color-pluse)  rounded-xl">
        <div className="flex items-center gap-4">
          <div>
            <div className="flex flex-wrap items-baseline gap-2 sm:gap-3">
              <span className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                ${product.price?.toFixed(2)}
              </span>
              {product.discountPercentage > 0 && (
                <>
                  <span className="text-lg sm:text-xl dark:text-gray-300 text-gray-600 line-through">
                    $
                    {(
                      product.price /
                      (1 - product.discountPercentage / 100)
                    ).toFixed(2)}
                  </span>
                  <span className="px-2 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 text-sm font-bold rounded">
                    {translate("product.save")} {product.discountPercentage}%
                  </span>
                </>
              )}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {translate(
                "product.Tax included. Shipping calculated at checkout.",
              )}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PriceSection;
