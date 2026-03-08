import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import i18n from "../../../i18n.js";
import OutlineButton from "../../../Components/OutlineButton.jsx";

const NewBrand = () => {
  const { t } = useTranslation();
  const isRTL = i18n.language === "ar";

  const news = t("home.newBrand.newsItems", { returnObjects: true });

  return (
    <div
      className={`bg-(--white-color) dark:bg-(--dark-alt-color) p-6 md:p-8 mt-5 rounded-xl ${
        isRTL ? "rtl" : "ltr"
      }`}
    >
      {/* Section title */}
      <p className="capitalize font-bold text-lg">
        {t("home.newBrand.sectionTitle")}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {news.map(({ head, title, button }, index) => (
          <div key={index} className="flex flex-col h-full">
            <div className="overflow-hidden rounded-lg">
              <img
                src={`./assets/New/new${index + 1}.svg`}
                alt={head}
                className="w-full h-56 object-cover"
              />
            </div>

            <h4 className="font-bold mt-3">{head}</h4>

            <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>

            <div className="mt-auto pt-4">
              <Link to={"/products"}>
                <OutlineButton className="w-full">{button}</OutlineButton>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewBrand;
