import { useEffect, useState } from "react";

import {
  FaStar,
  FaShareAlt,
  FaChevronLeft,
  FaChevronRight as FaChevronRightIcon,
} from "react-icons/fa";
import { RenderStars } from "./RenderStars";
const ImageSection = ({ product, isMobile, translate }) => {
  const [mainImage, setMainImage] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    if (!product.images || product.images.length === 0) return;
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
    if (!product.images || product.images.length === 0) return;
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

  useEffect(() => {
    if (product && product.images && product.images.length > 0) {
      const timer = setTimeout(() => {
        setMainImage(product.images[0]);
        setCurrentImageIndex(0);
      }, 0);

      return () => clearTimeout(timer);
    }
  }, [product]);

  return (
    <div className="lg:w-2/5">
      <div className="lg:sticky lg:top-35">
        {/* Main Image with Mobile Carousel */}
        <div className="bg-(--gray-color) dark:bg-(--dark-secondary-color) rounded-xl sm:rounded-2xl shadow-lg p-2 sm:p-4">
          <div className="relative">
            <img
              src={
                mainImage ||
                product.images?.[0] ||
                "https://via.placeholder.com/400"
              }
              alt={product.title}
              className="w-full aspect-square sm:aspect-auto sm:h-96 object-contain rounded-lg sm:rounded-xl"
            />

            {/* Mobile Carousel Controls */}
            {isMobile && product.images && product.images.length > 1 && (
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
          {product.images && product.images.length > 0 && (
            <div className="hidden sm:flex gap-2 sm:gap-3 mt-4 sm:mt-6 overflow-x-auto pb-2 scrollbar-thin">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setMainImage(img);
                    setCurrentImageIndex(idx);
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
          )}
        </div>

        {/* Mobile Quick Actions */}
        <div className="sm:hidden mt-4 bg-white dark:bg-gray-800 rounded-xl shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${product.price?.toFixed(2)}
                </span>
                {product.discountPercentage > 0 && (
                  <span className="px-2 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 text-xs font-bold rounded">
                    {translate("product.save")} {product.discountPercentage}%
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 mt-1">
                {<RenderStars rating={product.rating} />}
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  ({product.reviews?.length || 0})
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* QR Code Card - Hidden on mobile, shown on tablet+ */}
        {product.meta?.qrCode && (
          <div className="hidden sm:block mt-4 sm:mt-6 bg-(--gray-color) dark:bg-(--dark-secondary-color) rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2 text-sm sm:text-base">
              <FaShareAlt className="text-(--main-color)" />
              {translate("product.Quick Share")}
            </h3>
            <div className="flex items-center gap-3 sm:gap-4">
              <img
                src={product.meta.qrCode}
                alt="QR Code"
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 border border-gray-200 dark:border-gray-700 rounded-lg"
              />
              <div>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1 sm:mb-2">
                  {translate("product.Scan to view on mobile")}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageSection;
