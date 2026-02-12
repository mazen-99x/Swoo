import React from "react";
import { useTranslation } from "react-i18next";
import i18n from "../../../i18n.js";

const brandsImg = [
  "./assets/Brand/brand1.svg",
  "./assets/Brand/brand2.svg",
  "./assets/Brand/brand3.svg",
  "./assets/Brand/brand4.svg",
  "./assets/Brand/brand5.svg",
  "./assets/Brand/brand6.svg",
  "./assets/Brand/brand7.svg",
  "./assets/Brand/brand8.svg",
  "./assets/Brand/brand9.svg",
  "./assets/Brand/brand10.svg",
];

// Array of top categories: label for display, value for future API
const topCategories = [
  { img: "./assets/Category/category1.svg", value: "laptops" },
  { img: "./assets/Category/category2.svg", value: "pc-gaming" },
  { img: "./assets/Category/category3.svg", value: "headphones" },
  { img: "./assets/Category/category4.svg", value: "monitors" },
];

const Brands = () => {
  const { t } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 gap-4 pt-5 ${
        isRTL ? "rtl" : "ltr"
      }`}
    >
      {/* Featured Brands */}
      <div className="bg-(--white-color) dark:bg-(--dark-alt-color) rounded-xl p-7">
        <p className="font-bold text-[18px] uppercase">
          {t("home.brands.featuredBrands")}
        </p>

        <div className="my-4 grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-7">
          {brandsImg.map((item, index) => (
            <img
              key={index}
              src={item}
              alt="brand"
              className="mx-auto cursor-pointer"
            />
          ))}
        </div>
      </div>

      {/* Top Categories */}
      <div className="bg-(--white-color) dark:bg-(--dark-alt-color) rounded p-7">
        <p className="font-bold text-[18px] uppercase">
          {t("home.brands.topCategories")}
        </p>

        <div className="my-4 flex flex-wrap justify-between max-[366px]:justify-center items-center gap-4 p-4">
          {topCategories.map(({ img, value }) => (
            <div
              key={value}
              className="flex flex-col justify-between cursor-pointer items-center"
            >
              <img src={img} alt={t(`home.brands.categories.${value}`)} />
              <p className="mt-1 font-semibold">
                {t(`home.brands.categories.${value}`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Brands;
