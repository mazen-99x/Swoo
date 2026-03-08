import { useState } from "react";
import { RenderStars } from "./RenderStars";
import {
 
  FaBoxOpen,
  FaShippingFast,
  FaInfoCircle,

  FaCalendarAlt,

} from "react-icons/fa";
const TabContentSection = ({ product, translate }) => {
  const [activeTab, setActiveTab] = useState("details");
  const averageRating =
    product.reviews && product.reviews.length > 0
      ? product.reviews.reduce((acc, review) => acc + review.rating, 0) /
        product.reviews.length
      : 0;

  const tabs = ["details", "reviews"];
  return (
    <div className="mb-6 sm:mb-8">
      {/* Mobile Tabs - Scrollable */}
      <div className="md:hidden overflow-x-auto">
        <div className="flex min-w-max border-b border-gray-200 dark:border-gray-700">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`cursor-pointer px-4 py-2 font-medium capitalize text-sm whitespace-nowrap ${activeTab === tab ? "text-(--main-color) border-b-2 border-(--main-color)" : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"}`}
            >
              {translate(`product.tabs.${tab}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop Tabs */}
      <div className="hidden md:flex border-b border-gray-200 dark:border-gray-700">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`cursor-pointer px-4 sm:px-6 py-3 font-medium capitalize text-sm sm:text-base ${activeTab === tab ? "text-(--main-color) border-b-2 border-(--main-color)" : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"}`}
          >
            {translate(`product.tabs.${tab}`)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="pt-4 sm:pt-6">
        {activeTab === "details" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <FaBoxOpen className="text-(--main-color) text-base sm:text-lg" />
              <div>
                <p className="text-xs sm:text-sm dark:text-gray-300 text-gray-600">
                  {translate("product.SKU")}
                </p>
                <p className="font-medium text-sm sm:text-base">
                  {product.sku}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <FaInfoCircle className="text-(--main-color) text-base sm:text-lg" />
              <div>
                <p className="text-xs sm:text-sm dark:text-gray-300 text-gray-600">
                  {translate("product.Warranty")}
                </p>
                <p className="font-medium text-sm sm:text-base">
                  {product.warrantyInformation}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <FaShippingFast className="text-(--main-color) text-base sm:text-lg" />
              <div>
                <p className="text-xs sm:text-sm dark:text-gray-300 text-gray-600">
                  {translate("product.Shipping")}
                </p>
                <p className="font-medium text-sm sm:text-base">
                  {product.shippingInformation}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <FaCalendarAlt className="text-(--main-color) text-base sm:text-lg" />
              <div>
                <p className="text-xs sm:text-sm dark:text-gray-300 text-gray-600">
                  {translate("product.Return Policy")}
                </p>
                <p className="font-medium text-sm sm:text-base">
                  {product.returnPolicy}
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "reviews" && product.reviews && (
          <div>
            {/* Average Rating Card */}
            <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gray-50 dark:bg-gray-900 rounded-lg sm:rounded-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
                <div>
                  <div className="flex items-center gap-1 sm:gap-2 mb-1">
                    <span className="text-xl sm:text-2xl font-bold">
                      {averageRating.toFixed(1)}
                    </span>
                    {<RenderStars rating={averageRating} />}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    {translate("product.Basedon")} {product.reviews.length}
                    {translate("product.reviews")}
                  </p>
                </div>
              </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-3 sm:space-y-4">
              {product.reviews.map((review, idx) => (
                <div
                  key={idx}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg sm:rounded-xl p-3 sm:p-4"
                >
                  {/* Reviewer Info */}
                  <div className="flex justify-between items-start mb-2 sm:mb-3">
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-1">
                        <span className="font-semibold text-sm sm:text-base">
                          {review.reviewerName}
                        </span>
                        <span className="text-xs sm:text-sm dark:text-gray-300 text-gray-600">
                          {review.reviewerEmail}
                        </span>
                      </div>

                      {/* Rating & Date */}
                      <div className="flex items-center gap-2">
                        {<RenderStars rating={review.rating} />}
                        <span className="text-xs sm:text-sm dark:text-gray-300 text-gray-600">
                          {new Date(review.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">
                        {review.comment}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TabContentSection;
