import { useState, useEffect } from "react";
import { FaTimesCircle } from "react-icons/fa";

import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import ImageSection from "./ProductDetailsComponents/ImageSection";
import BrandSection from "./ProductDetailsComponents/BrandSection";
import RatingSection from "./ProductDetailsComponents/RatingSection";
import PriceSection from "./ProductDetailsComponents/PriceSection";
import AvailabilitySection from "./ProductDetailsComponents/AvailabilitySection";
import DescriptionSection from "./ProductDetailsComponents/DescriptionSection";
import AddCartSection from "./ProductDetailsComponents/AddCartSection";
import TagsSection from "./ProductDetailsComponents/TagsSection";
import TabContentSection from "./ProductDetailsComponents/TabSection";
import { ProductDetailsSkeleton } from "../Skeletons/ProductDetailsSkeleton";

const ProductDetails = () => {
  const { id } = useParams();

  const fetchProductDetails = async () => {
    const res = await axios.get(`https://dummyjson.com/products/${id}`);
    return res.data;
  };
  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["details", id],
    queryFn: fetchProductDetails,
    staleTime: 1000 * 60 * 5,
  });

  const { t } = useTranslation();

  const [isMobile, setIsMobile] = useState(false);


  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  
  if (isLoading) {
    return <ProductDetailsSkeleton />;
  }

 
  if (isError || !product) {
    return (
      <div className="min-h-screen bg-(--white-color) dark:bg-(--dark-alt-color) my-6 flex items-center justify-center">
        <div className="text-center">
          <FaTimesCircle className="text-4xl text-red-500 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">
            Failed to load product details. Please try again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-(--white-color) dark:bg-(--dark-alt-color) my-6">
      {/* Mobile Header */}

      <section className="container mx-auto px-2 sm:px-4 py-2 sm:py-6">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
          {/* Images Section */}
          <ImageSection product={product} isMobile={isMobile} translate={t} />
          {/* Product Info Section */}
          <div className="lg:w-3/5">
            <div className="bg-(--gray-color) dark:bg-(--dark-secondary-color) rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8">
              {/* Brand & Category - Desktop Only */}
              <BrandSection product={product} translate={t} />
              {/* Title */}
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3">
                {product.title}
              </h1>
              {/* Rating & Reviews */}
              <RatingSection product={product} translate={t} />
              {/* Price Section - Desktop Only */}
              <PriceSection product={product} translate={t} />
              {/* Availability */}
              <AvailabilitySection product={product} translate={t} />
              {/* Description */}
              <DescriptionSection product={product} translate={t} />
              {/* Quantity & Add to Cart - Desktop Only */}
              <AddCartSection product={product} translate={t} />
              {/* Tags */}
              <TagsSection product={product} translate={t} />
              {/* Tabs */}
              <TabContentSection product={product} translate={t} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;
