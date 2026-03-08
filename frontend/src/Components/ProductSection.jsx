import React from "react";
import Swiperr from "./Swiper/Swiper";

const ProductSection = ({ title, products,loading,error }) => {

  return (
    <div className="bg-(--white-color) dark:bg-(--dark-alt-color) p-6 md:p-8 mt-5 rounded-xl">
      <p className="capitalize font-bold">{title}</p>

      <div className="px-5 mt-6">
        <Swiperr products={products} loading={loading} error={error}/>
      </div>
    </div>
  );
};

export default ProductSection;
