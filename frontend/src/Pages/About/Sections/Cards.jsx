/* eslint-disable no-unused-vars */
import React from "react";
import { useTranslation } from "react-i18next";
import { SiGoogleauthenticator, SiCashapp } from "react-icons/si";
import { CiDeliveryTruck } from "react-icons/ci";

const cardsData = [
  {
    titleKey: "authentic",
    descriptionKey: "authenticDesc",
    icon: SiGoogleauthenticator,
  },
  {
    titleKey: "price",
    descriptionKey: "priceDesc",
    icon: SiCashapp,
  },
  {
    titleKey: "delivery",
    descriptionKey: "deliveryDesc",
    icon: CiDeliveryTruck,
  },
];

const Cards = () => {
  const { t } = useTranslation();

  return (
    <div className="mt-4 flex flex-wrap lg:flex-nowrap justify-between items-stretch gap-2">
      {cardsData.map(({ titleKey, descriptionKey, icon: Icon }, index) => (
        <div
          key={index}
          className="p-6.25 bg-(--white-color) w-full sm:w-[48%] lg:w-[33%] dark:bg-(--dark-alt-color) rounded-xl"
        >
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-bold leading-5.5">
              {t(`about.cards.${titleKey}.title`)}
            </h3>

            <div className="bg-(--main-color) w-15 h-15 rounded-4xl flex justify-center items-center text-(--white-color)">
              <Icon size={32} />
            </div>
          </div>

          <p className="text-sm leading-6 text-gray-600 dark:text-gray-300">
            {t(`about.cards.${titleKey}.description`)}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Cards;
