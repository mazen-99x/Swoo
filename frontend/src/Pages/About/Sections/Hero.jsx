
import { useTranslation } from "react-i18next";
import OutlineButton from "../../../Components/OutlineButton";

const Hero = () => {
  const { t } = useTranslation();

  return (
    <div className="p-7.5 bg-(--white-color) dark:bg-(--dark-alt-color) mt-5">
      <div>
        <img src="./assets/About/banner.png" className="w-full" alt="" />

        <div className="px-6 sm:px-10 lg:px-24 py-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
          {/* Left text */}
          <div className="max-w-full lg:max-w-105">
            <h3 className="text-sm sm:text-base font-semibold uppercase leading-6 tracking-wide">
              {t("about.hero.purpose")}{" "}
              <span className="text-(--main-color)">
                {t("about.hero.highlight")}
              </span>{" "}
              {t("about.hero.through")}
            </h3>
          </div>

          {/* Right stats */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 sm:gap-10 lg:gap-12 w-full lg:w-auto">
            {/* Stat 1 */}
            <div className="text-left sm:text-center">
              <h4 className="text-3xl sm:text-4xl font-bold">$12.5M</h4>
              <p className="mt-2 text-[11px] uppercase tracking-wide dark:text-gray-300 text-gray-600">
                {t("about.hero.stats.revenue")}
              </p>
            </div>

            <div className="hidden sm:block h-12 w-px bg-gray-200 dark:bg-gray-700" />

            {/* Stat 2 */}
            <div className="text-left sm:text-center">
              <h4 className="text-3xl sm:text-4xl font-bold">12K+</h4>
              <p className="mt-2 text-[11px] uppercase tracking-wide dark:text-gray-300 text-gray-600">
                {t("about.hero.stats.orders")}
              </p>
            </div>

            <div className="hidden sm:block h-12 w-px bg-gray-200 dark:bg-gray-700" />

            {/* Stat 3 */}
            <div className="text-left sm:text-center">
              <h4 className="text-3xl sm:text-4xl font-bold">725+</h4>
              <p className="mt-2 text-[11px] uppercase tracking-wide dark:text-gray-300 text-gray-600">
                {t("about.hero.stats.stores")}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-stretch gap-6">
        {/* Image */}
        <div className="w-full lg:w-1/2">
          <img
            src="./assets/About/about.png"
            alt=""
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* Content */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-10 lg:px-24 py-10 lg:py-17.5 gap-6 bg-(--gray-color) dark:bg-(--dark-alt-color) rounded-lg">
          <h3 className="text-base sm:text-lg font-bold leading-snug">
            {t("about.hero.description.title")}
          </h3>

          <p className="text-sm leading-6 text-gray-600 dark:text-gray-300">
            {t("about.hero.description.text")}
          </p>

          <div className="mt-2">
            <OutlineButton className="w-fit">
              {t("about.hero.button")}
            </OutlineButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
