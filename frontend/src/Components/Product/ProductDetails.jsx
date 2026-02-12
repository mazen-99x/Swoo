import { useState, useEffect } from "react";
import {
  FaStar,
  FaBoxOpen,
  FaShippingFast,
  FaInfoCircle,
  FaMinus,
  FaPlus,
  FaShoppingCart,
  FaHeart,
  FaShareAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaChevronDown,
  FaChevronUp,
  FaCalendarAlt,
  FaChevronLeft,
  FaChevronRight as FaChevronRightIcon,
} from "react-icons/fa";
import OutlineButton from "../OutlineButton";
import { useTranslation } from "react-i18next";

const data = [
  {
    id: 121,
    title: "iPhone 5s",
    description:
      "The iPhone 5s is a classic smartphone known for its compact design and advanced features during its release. While it's an older model, it still provides a reliable user experience.",
    category: "smartphones",
    price: 199.99,
    discountPercentage: 12.91,
    rating: 2.83,
    stock: 25,
    tags: ["smartphones", "apple"],
    brand: "Apple",
    sku: "SMA-APP-IPH-121",
    weight: 2,
    dimensions: { width: 5.29, height: 18.38, depth: 17.72 },
    warrantyInformation: "Lifetime warranty",
    shippingInformation: "Ships in 1 month",
    availabilityStatus: "In Stock",
    reviews: [
      {
        rating: 5,
        comment: "Highly recommended!",
        date: "2025-04-30T09:41:02.054Z",
        reviewerName: "Jace Smith",
        reviewerEmail: "jace.smith@x.dummyjson.com",
      },
      {
        rating: 1,
        comment: "Not as described!",
        date: "2025-04-30T09:41:02.054Z",
        reviewerName: "Logan Torres",
        reviewerEmail: "logan.torres@x.dummyjson.com",
      },
      {
        rating: 5,
        comment: "Very satisfied!",
        date: "2025-04-30T09:41:02.054Z",
        reviewerName: "Harper Kelly",
        reviewerEmail: "harper.kelly@x.dummyjson.com",
      },
    ],
    returnPolicy: "60 days return policy",
    minimumOrderQuantity: 3,
    meta: {
      createdAt: "2025-04-30T09:41:02.054Z",
      updatedAt: "2025-04-30T09:41:02.054Z",
      barcode: "8814683940853",
      qrCode: "https://cdn.dummyjson.com/public/qr-code.png",
    },
    images: [
      "https://cdn.dummyjson.com/product-images/smartphones/iphone-5s/1.webp",
      "https://cdn.dummyjson.com/product-images/smartphones/iphone-5s/2.webp",
      "https://cdn.dummyjson.com/product-images/smartphones/iphone-5s/3.webp",
    ],
    thumbnail:
      "https://cdn.dummyjson.com/product-images/smartphones/iphone-5s/thumbnail.webp",
  },
];

const ProductDetails = () => {
  const product = data[0];
  const { t } = useTranslation();
  const [mainImage, setMainImage] = useState(product.images[0]);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("details");

  const [isMobile, setIsMobile] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const tabs = ["details", "reviews"];
  const isLong = product.description.length > 150;

  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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

  const averageRating =
    product.reviews.reduce((acc, review) => acc + review.rating, 0) /
    product.reviews.length;

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1,
    );
    setMainImage(
      product.images[
        currentImageIndex === product.images.length - 1
          ? 0
          : currentImageIndex + 1
      ],
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1,
    );
    setMainImage(
      product.images[
        currentImageIndex === 0
          ? product.images.length - 1
          : currentImageIndex - 1
      ],
    );
  };

  return (
    <div className="min-h-screen bg-(--white-color) dark:bg-(--dark-alt-color) my-6">
      {/* Mobile Header */}

      <section className="container mx-auto px-2 sm:px-4 py-2 sm:py-6">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
          {/* Images Section */}
          <div className="lg:w-2/5">
            <div className="lg:sticky lg:top-30">
              {/* Main Image with Mobile Carousel */}
              <div className="bg-(--gray-color) dark:bg-(--dark-secondary-color) rounded-xl sm:rounded-2xl shadow-lg p-2 sm:p-4">
                <div className="relative">
                  <img
                    src={mainImage}
                    alt={product.title}
                    className="w-full aspect-square sm:aspect-auto sm:h-96 object-contain rounded-lg sm:rounded-xl"
                  />

                  {/* Mobile Carousel Controls */}
                  {isMobile && product.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-lg"
                      >
                        <FaChevronLeft />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-lg"
                      >
                        <FaChevronRightIcon />
                      </button>

                      {/* Dots Indicator */}
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                        {product.images.map((_, idx) => (
                          <div
                            key={idx}
                            className={`w-2 h-2 rounded-full ${idx === currentImageIndex ? "bg-(--main-color)" : "bg-gray-300"}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Thumbnail Gallery - Hidden on mobile, shown on tablet+ */}
                <div className="hidden sm:flex gap-2 sm:gap-3 mt-4 sm:mt-6 overflow-x-auto pb-2">
                  {[...product.images].map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setMainImage(img);
                        setCurrentImageIndex(idx === 0 ? 0 : idx - 1);
                      }}
                      className={`cursor-pointer shrink-0 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border transition-all duration-200 ${mainImage === img ? "border-(--main-color) " : "border-gray-200 dark:border-gray-700 hover:border-(--main-color)"}`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Quick Actions */}
              <div className="sm:hidden mt-4 bg-white dark:bg-gray-800 rounded-xl shadow p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.discountPercentage > 0 && (
                        <span className="px-2 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 text-xs font-bold rounded">
                          {t("product.Save")} {product.discountPercentage}%
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      {renderStars(product.rating)}
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        ({product.reviews.length})
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="px-4 py-2 bg-(--main-color) text-white rounded-lg font-medium">
                      <FaShoppingCart />
                    </button>
                  </div>
                </div>
              </div>

              {/* QR Code Card - Hidden on mobile, shown on tablet+ */}
              <div className="hidden sm:block mt-4 sm:mt-6 bg-(--gray-color) dark:bg-(--dark-secondary-color) rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6">
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2 text-sm sm:text-base">
                  <FaShareAlt className="text-(--main-color)" />
                  {t("product.Quick Share")}
                </h3>
                <div className="flex items-center gap-3 sm:gap-4">
                  <img
                    src={product.meta.qrCode}
                    alt="QR Code"
                    className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 border border-gray-200 dark:border-gray-700 rounded-lg"
                  />
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1 sm:mb-2">
                      {t("product.Scan to view on mobile")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Info Section */}
          <div className="lg:w-3/5">
            <div className="bg-(--gray-color) dark:bg-(--dark-secondary-color) rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8">
              {/* Brand & Category - Desktop Only */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-(--main-color) text-(--white-color) rounded-full text-sm font-medium">
                    {product.brand}
                  </span>
                  <span className="px-3 py-1 bg-gray-700 text-white rounded-full text-sm">
                    {product.category}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 ">
                    <FaHeart className="text-gray-400 hover:text-red-500 cursor-pointer" />
                  </button>
                  <button className="p-2 ">
                    <FaShareAlt className="text-gray-400 hover:text-(--main-color) cursor-pointer" />
                  </button>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold  mb-2 sm:mb-3">
                {product.title}
              </h1>

              {/* Rating & Reviews */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6">
                <div className="flex items-center gap-1 sm:gap-2">
                  {renderStars(product.rating)}
                  <span className="dark:text-gray-300 text-gray-600 font-medium text-sm sm:text-base">
                    {product.rating.toFixed(1)}
                  </span>
                </div>
                <span className="hidden sm:inline dark:text-gray-300 text-gray-600">
                  •
                </span>
                <span className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                  {product.reviews.length} {t("product.reviews")}
                </span>
                <span className="hidden sm:inline dark:text-gray-300 text-gray-600">
                  •
                </span>
                <span className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                  <span className="  text-(--main-color) font-bold">
                    {product.stock}
                  </span>{" "}
                  {t("product.in stock")}
                </span>
              </div>

              {/* Price Section - Desktop Only */}
              <div className="hidden md:block mb-6 p-4 bg-linear-to-r from-(--gray-color) to-(--main-color) dark:from-(--dark-secondary-color) dark:to-(--main-color) rounded-xl">
                <div className="flex items-center gap-4">
                  <div>
                    <div className="flex flex-wrap items-baseline gap-2 sm:gap-3">
                      <span className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.discountPercentage > 0 && (
                        <>
                          <span className="text-lg sm:text-xl dark:text-gray-300 text-gray-600 line-through">
                            $
                            {product.originalPrice?.toFixed(2) ||
                              (
                                product.price /
                                (1 - product.discountPercentage / 100)
                              ).toFixed(2)}
                          </span>
                          <span className="px-2 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 text-sm font-bold rounded">
                            {t("product.save")} {product.discountPercentage}%
                          </span>
                        </>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {t(
                        "product.Tax included. Shipping calculated at checkout.",
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* Availability */}
              <div className="mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                {product.availabilityStatus === "In Stock" ? (
                  <div className="flex items-center gap-1 sm:gap-2 text-green-600 dark:text-green-400 text-sm sm:text-base">
                    <FaCheckCircle className="text-sm sm:text-base" />
                    <span className="font-medium">{t("product.inStock")}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 sm:gap-2 text-red-600 dark:text-red-400 text-sm sm:text-base">
                    <FaTimesCircle className="text-sm sm:text-base" />
                    <span className="font-medium">
                      {t("product.outOfStock")}
                    </span>
                  </div>
                )}
                <span className="dark:text-gray-300 text-gray-600 text-sm sm:text-base">
                  • {t("product.Ships")}
                  {product.shippingInformation.toLowerCase()}
                </span>
              </div>

              {/* Description */}
              <div className="mb-6 sm:mb-8">
                <h3 className="text-base sm:text-lg font-semibold  mb-2 sm:mb-3">
                  {t("product.Description")}
                </h3>
                <div className="bg-(--white-color) dark:bg-(--dark-alt-color) rounded-lg sm:rounded-xl p-3 sm:p-4">
                  <p
                    className={`text-sm sm:text-base text-gray-600 dark:text-gray-300 transition-all duration-300 ${
                      !showFullDescription ? "line-clamp-2" : ""
                    }`}
                  >
                    {product.description}
                  </p>

                  {isLong && (
                    <button
                      onClick={() =>
                        setShowFullDescription(!showFullDescription)
                      }
                      className="mt-2 text-(--main-color) cursor-pointer font-medium flex items-center gap-1 text-sm sm:text-base"
                    >
                      {showFullDescription ? "Show Less" : "Read More"}
                      {showFullDescription ? (
                        <FaChevronUp />
                      ) : (
                        <FaChevronDown />
                      )}
                    </button>
                  )}
                </div>
              </div>

              {/* Quantity & Add to Cart - Desktop Only */}
              <div className="hidden md:block mb-6 sm:mb-8">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <label className="text-gray-600 dark:text-gray-300 font-medium text-sm sm:text-base">
                      {t("product.Quantity")}
                    </label>
                    <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                      {/* Minus Button */}
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-2 cursor-pointer rounded-full hover:bg-(--main-color) hover:text-white transition-colors"
                        disabled={quantity <= 1}
                      >
                        <FaMinus className="text-sm sm:text-base" />
                      </button>

                      {/* Quantity Display */}
                      <span className="px-4 py-2 min-w-10 sm:min-w-12 text-center font-medium text-sm sm:text-base text-gray-700 dark:text-gray-300">
                        {quantity}
                      </span>

                      {/* Plus Button */}
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-2 cursor-pointer rounded-full hover:bg-(--main-color) hover:text-white transition-colors"
                        disabled={quantity >= product.stock}
                      >
                        <FaPlus className="text-sm sm:text-base" />
                      </button>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col sm:flex-row gap-3">
                    <OutlineButton className="flex-1 py-3 px-4 sm:px-6 ">
                      <FaShoppingCart />
                      {t("product.addToCart")}
                    </OutlineButton>
                    <OutlineButton className="px-4 sm:px-6 py-3 ">
                      {t("product.BuyNow")}
                    </OutlineButton>
                  </div>
                </div>
                <p className="text-xs sm:text-sm dark:text-gray-300 text-gray-600 mt-2">
                  {t("product.Minimum order quantity:")}{" "}
                  {product.minimumOrderQuantity}
                </p>
              </div>

              {/* Tags */}
              <div className="mb-6 sm:mb-8">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3">
                  {t("product.Tags")}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-700  text-(--white-color) rounded-full text-xs sm:text-sm font-medium hover:bg-(--main-color) hover:text-white transition-colors cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tabs */}
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
                        {t(`product.tabs.${tab}`)}
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
                      {t(`product.tabs.${tab}`)}
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
                            {t("product.SKU")}
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
                            {t("product.Warranty")}
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
                            {t("product.Shipping")}
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
                            {t("product.Return Policy")}
                          </p>
                          <p className="font-medium text-sm sm:text-base">
                            {product.returnPolicy}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "reviews" && (
                    <div>
                      {/* Average Rating Card */}
                      <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gray-50 dark:bg-gray-900 rounded-lg sm:rounded-xl">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
                          <div>
                            <div className="flex items-center gap-1 sm:gap-2 mb-1">
                              <span className="text-xl sm:text-2xl font-bold">
                                {averageRating.toFixed(1)}
                              </span>
                              {renderStars(averageRating)}
                            </div>
                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                              {t("product.Basedon")} {product.reviews.length}
                              {t("product.reviews")}
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
                                  {renderStars(review.rating)}
                                  <span className="text-xs sm:text-sm dark:text-gray-300 text-gray-600">
                                    {new Date(review.date).toLocaleDateString(
                                      "en-US",
                                      {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                      },
                                    )}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Mobile Bottom Navigation */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 z-50">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    ${product.price.toFixed(2)}
                  </div>
                  {product.discountPercentage > 0 && (
                    <div className="text-xs text-red-600 dark:text-red-400">
                      {t("productSave")} {product.discountPercentage}%
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2"
                      disabled={quantity <= 1}
                    >
                      <FaMinus className="text-sm" />
                    </button>
                    <span className="px-3 py-2 min-w-8 text-center font-medium">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2"
                      disabled={quantity >= product.stock}
                    >
                      <FaPlus className="text-sm" />
                    </button>
                  </div>
                  <button className="px-4 py-3 bg-(--main-color) text-white rounded-lg font-semibold flex items-center gap-2">
                    <FaShoppingCart />
                    {t("product.Add")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;
