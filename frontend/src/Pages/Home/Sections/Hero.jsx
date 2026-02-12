import { useTranslation } from "react-i18next";
import i18n from "../../../i18n.js";

const categories = [
  "furniture",
  "groceries",
  "home-decoration",
  "kitchen-accessories",
  "laptops",
  "mens-watches",
  "mobile-accessories",
  "motorcycle",
  "skin-care",
  "smartphones",
  "sports-accessories",
  "sunglasses",
  "tablets",
];

const Hero = () => {
  const { t } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    <div
      className={`grid grid-cols-1 lg:grid-cols-4 gap-4 w-full mt-5 ${isRTL ? "rtl" : "ltr"}`}
    >
      {/* Left Column */}
      <div className="bg-(--white-color) h-fit dark:bg-(--dark-alt-color) rounded-2xl pb-6 px-6 md:px-12">
        <p className="text-[#F1352B] font-bold pt-5 pb-3.5">
          {t("home.hero.saleTag")}
        </p>

        <ul className="grid grid-cols-2 lg:grid-cols-1 max-[400px]:grid-cols-1 gap-x-6 gap-y-3">
          {categories.map((value) => (
            <li
              key={value}
              className="transition duration-300 hover:text-(--main-color) cursor-pointer text-[14px] md:text-[16px] font-semibold leading-6"
            >
              {t(`home.hero.categories.${value}`)}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Column */}
      <div className="lg:col-span-3 grid gap-4  grid-rows-[auto_auto] md:grid-rows-4">
        {/* Big Banner */}
        <div className="md:row-span-3 w-full min-h-65 md:min-h-0 bg-[url('./assets/Slider/slider1.webp')] bg-cover bg-center bg-no-repeat rounded-2xl">
          <div
            className={`${isRTL ? "pr-6 md:pr-15 text-right" : "pl-6 md:pl-15 text-left"} pt-8 md:pt-10 text-white`}
          >
            <h2 className="text-3xl md:text-4xl font-bold pb-1">
              {t("home.hero.bannerTitle")}
            </h2>
            <h3 className="text-2xl md:text-3xl font-extralight">
              {t("home.hero.bannerSubtitle")}
            </h3>

            <div className="mt-5 pl-3 md:pl-5 text-[14px] md:text-[16px] font-extralight leading-7">
              {t("home.hero.bannerDescription", { returnObjects: true }).map(
                (line, idx) => (
                  <p key={idx}>{line}</p>
                ),
              )}
            </div>

            <button className="mb-2 bg-(--white-color) text-(--black-color) rounded-xl mt-8 md:mt-10 px-4 py-2 cursor-pointer font-semibold transition duration-300 hover:bg-transparent border-2 border-(--white-color) hover:text-(--white-color)">
              {t("home.hero.bannerButton")}
            </button>
          </div>
        </div>

        {/* Bottom Cards */}
        <div className="flex flex-col sm:flex-row md:row-span-1 gap-4">
          <div className="w-full min-h-35 p-6 bg-cover bg-center bg-no-repeat rounded-2xl bg-[url('./assets/Slider/slider4.svg')]">
            <p
              className={`font-bold ${isRTL ? "text-right" : "text-left"} leading-6 text-[16px] md:text-[18px] max-w-full pb-4 text-(--black-color)`}
            >
              {t("home.hero.bottomCard1Title")}{" "}
              <span className="text-(--main-color)">
                {t("home.hero.bottomCard1Price")}
              </span>
            </p>
            <a
              style={{ textDecoration: "underline" }}
              className={`transition duration-300 hover:text-(--main-color) font-medium text-[14px] md:text-[16px] ${isRTL ? "text-right" : "text-left"} text-(--black-color)`}
              href="#"
            >
              {t("home.hero.bottomCard1Link")}
            </a>
          </div>

          <div className="w-full min-h-35 p-6 bg-cover bg-center bg-no-repeat rounded-2xl bg-[url('./assets/Slider/slider5.svg')]">
            <p
              className={`font-bold ${isRTL ? "text-right" : "text-left"} leading-6 text-[16px] md:text-[18px] max-w-full pb-2 text-(--white-color)`}
            >
              {t("home.hero.bottomCard2Highlight")}{" "}
              <span className="text-amber-300">
                {t("home.hero.bottomCard2Title")}
              </span>
            </p>
            <p
              className={`text-[14px] md:text-[16px] ${isRTL ? "text-right" : "text-left"} text-(--white-color) font-extralight leading-6`}
            >
              {t("home.hero.bottomCard2Subtitle")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
