import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useEffect, useId, useState } from "react";
import i18n from "../../i18n";
import "swiper/css";
import "swiper/css/navigation";
import "./swiperr.css";
import Product from "../Product/Product";
import ProductSkeleton from "../Skeletons/ProductSkeleton";
import ProductError from "../Skeletons/ProductError";

export default function Swiperr({ products, loading, error }) {
  const [isRTL, setIsRTL] = useState(i18n.language === "ar");
  const [swiperKey, setSwiperKey] = useState(0);
  const id = useId();
  const nextClass = `custom-next-${id}`;
  const prevClass = `custom-prev-${id}`;

  useEffect(() => {
    const handleLanguageChange = () => {
      setIsRTL(i18n.language === "ar");
      setSwiperKey((prev) => prev + 1); 
    };

    i18n.on("languageChanged", handleLanguageChange);
    return () => i18n.off("languageChanged", handleLanguageChange);
  }, []);

  const navigationConfig = isRTL
    ? { prevEl: `.${nextClass}`, nextEl: `.${prevClass}` }
    : { prevEl: `.${prevClass}`, nextEl: `.${nextClass}` };


  const showNavigation = products?.length > 4;

  return (
    <div className={`slider-wrapper relative ${isRTL ? "rtl" : ""}`}>
      <Swiper
        key={swiperKey + products?.length}
        dir={isRTL ? "rtl" : "ltr"}
        spaceBetween={12}
        loop={true}
        modules={[Navigation, Autoplay]}
        navigation={showNavigation ? navigationConfig : false} 
        breakpoints={{
          0: { slidesPerView: 1.2 },
          480: { slidesPerView: 1.5 },
          768: { slidesPerView: 2.5 },
          1024: { slidesPerView: 4 },
        }}
      >
        {loading
          ? Array.from({ length: 8 }, (_, i) => (
              <SwiperSlide key={`skeleton-${i}`}>
                <ProductSkeleton />
              </SwiperSlide>
            ))
          : error
            ? Array.from({ length: 8 }, (_, i) => (
                <SwiperSlide key={`error-${i}`}>
                  <ProductError />
                </SwiperSlide>
              ))
            : products?.map((product) => (
                <SwiperSlide key={product.id}>
                  <Product product={product} />
                </SwiperSlide>
              ))}
      </Swiper>

      {/* Render buttons only if enough slides */}
      {showNavigation && (
        <>
          <button
            className={`max-sm:hidden custom-prev ${prevClass}`}
            aria-label="Previous slide"
          >
            ❮
          </button>
          <button
            className={`max-sm:hidden custom-next ${nextClass}`}
            aria-label="Next slide"
          >
            ❯
          </button>
        </>
      )}
    </div>
  );
}
