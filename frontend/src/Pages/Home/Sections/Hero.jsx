import { useTranslation } from "react-i18next";
import i18n from "../../../i18n.js";
import UseGetCategories from "../../../Hooks/UseGetCategories";
import { Link } from "react-router";

const Hero = () => {
  const { t } = useTranslation();
  const isRTL = i18n.language === "ar";
  const { categories, isLoading } = UseGetCategories();

  return (
    <div
      className={`grid grid-cols-1 lg:grid-cols-4 gap-4 w-full mt-5 ${
        isRTL ? "rtl" : "ltr"
      }`}
    >
      {/* ================= LEFT COLUMN ================= */}
      <div className="bg-(--white-color) h-fit dark:bg-(--dark-alt-color) rounded-2xl pb-6 px-6 md:px-12">
        <p className="text-[#F1352B] font-bold pt-5 pb-3.5">
          {t("home.hero.saleTag")}
        </p>

        <ul className="grid grid-cols-2 lg:grid-cols-1 max-[400px]:grid-cols-1 gap-x-6 gap-y-3">
          {isLoading
            ? // --- Skeleton Loading State ---
              Array.from({ length: 10 }).map((_, index) => (
                <li
                  key={index}
                  className="flex items-center space-x-2 rtl:space-x-reverse"
                >
                  {/* A shimmering bar representing the text */}
                  <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
                </li>
              ))
            : // --- Actual Data State ---
              categories?.slice(0, 10).map(({ slug }) => (
                <Link key={slug} to={`/products?category=${slug}`}>
                  <li className="transition duration-300 hover:text-(--main-color) cursor-pointer text-[14px] md:text-[16px] font-semibold leading-6">
                    {t(`home.hero.categories.${slug}`)}
                  </li>
                </Link>
              ))}
        </ul>

        {/* Only show "Show More" if not loading and categories exist */}
        {!isLoading && categories?.length > 10 && (
          <Link
            to="/products"
            className="inline-block mt-4 text-(--main-color) font-semibold hover:underline"
          >
            {t("home.hero.showMore")}
          </Link>
        )}
      </div>

      {/* ================= MAIN COLUMN ================= */}
      <div className="lg:col-span-3 grid gap-4 grid-rows-[auto_auto] md:grid-rows-4">
        {/* ================= HERO BANNER ================= */}
        <div className="relative md:row-span-3 w-full min-h-65 md:min-h-0 rounded-2xl overflow-hidden">
          {/* Background Image */}
          <img
            src={"/assets/Slider/slider1.webp"}
            alt="Hero Banner"
            loading="eager"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/30" />

          {/* Content */}
          <div className="relative z-10">
            <div
              className={`${
                isRTL ? "pr-6 md:pr-15 text-right" : "pl-6 md:pl-15 text-left"
              } pt-8 md:pt-10 text-white`}
            >
              <h2 className="text-3xl md:text-4xl font-bold pb-1">
                {t("home.hero.bannerTitle")}
              </h2>

              <h3 className="text-2xl md:text-3xl font-extralight">
                {t("home.hero.bannerSubtitle")}
              </h3>

              <div className="mt-5 pl-3 md:pl-5 text-[14px] md:text-[16px] font-extralight leading-7">
                {t("home.hero.bannerDescription", {
                  returnObjects: true,
                }).map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))}
              </div>
              <Link to={"/products"}>
                <button className="mb-2 bg-white text-black rounded-xl mt-8 md:mt-10 px-4 py-2 cursor-pointer font-semibold transition duration-300 hover:bg-transparent border-2 border-white hover:text-white">
                  {t("home.hero.bannerButton")}
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* ================= BOTTOM CARDS ================= */}
        <div className="flex flex-col sm:flex-row md:row-span-1 gap-4">
          {/* -------- Card 1 -------- */}
          <div className="relative w-full min-h-35 p-6 rounded-2xl overflow-hidden">
            <img
              src={"/assets/Slider/slider4.svg"}
              alt="Bottom Card 1"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="relative z-10">
              <p
                className={`font-bold ${
                  isRTL ? "text-right" : "text-left"
                } leading-6 text-[16px] md:text-[18px] max-w-full pb-4 text-(--black-color)`}
              >
                {t("home.hero.bottomCard1Title")}{" "}
                <span className="text-(--main-color)">
                  {t("home.hero.bottomCard1Price")}
                </span>
              </p>

              <a
                style={{ textDecoration: "underline" }}
                className={`transition duration-300 hover:text-(--main-color) font-medium text-[14px] md:text-[16px] ${
                  isRTL ? "text-right" : "text-left"
                } text-(--black-color)`}
                href="/products"
              >
                {t("home.hero.bottomCard1Link")}
              </a>
            </div>
          </div>

          {/* -------- Card 2 -------- */}
          <div className="relative w-full min-h-35 p-6 rounded-2xl overflow-hidden">
            <img
              src={"/assets/Slider/slider5.svg"}
              alt="Bottom Card 2"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black/40" />

            <div className="relative z-10">
              <p
                className={`font-bold ${
                  isRTL ? "text-right" : "text-left"
                } leading-6 text-[16px] md:text-[18px] max-w-full pb-2 text-white`}
              >
                {t("home.hero.bottomCard2Highlight")}{" "}
                <span className="text-amber-300">
                  {t("home.hero.bottomCard2Title")}
                </span>
              </p>

              <p
                className={`text-[14px] md:text-[16px] ${
                  isRTL ? "text-right" : "text-left"
                } text-white font-extralight leading-6`}
              >
                {t("home.hero.bottomCard2Subtitle")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
