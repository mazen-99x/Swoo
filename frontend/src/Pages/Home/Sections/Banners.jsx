import React from "react";
import { useTranslation } from "react-i18next";

// Original banners array with full image paths
const banners = [
  {
    key: "audios_cameras",
    mainImage: "./assets/Audio/audio.svg",
    items: [
      { img: "./assets/Audio/banner1.svg", key: "speaker" },
      { img: "./assets/Audio/banner2.svg", key: "dslr_camera" },
      { img: "./assets/Audio/banner3.svg", key: "earbuds" },
      { img: "./assets/Audio/banner4.svg", key: "microphone" },
    ],
  },
  {
    key: "gaming",
    mainImage: "./assets/Gaming/game.svg",
    items: [
      { img: "./assets/Gaming/banner1.svg", key: "monitors" },
      { img: "./assets/Gaming/banner2.svg", key: "chair" },
      { img: "./assets/Gaming/banner3.svg", key: "controller" },
      { img: "./assets/Gaming/banner4.svg", key: "keyboards" },
    ],
  },
  {
    key: "office_equipments",
    mainImage: "./assets/Office/office.svg",
    items: [
      { img: "./assets/Office/banner1.svg", key: "printers" },
      { img: "./assets/Office/banner2.svg", key: "network" },
      { img: "./assets/Office/banner3.svg", key: "security" },
      { img: "./assets/Office/banner4.svg", key: "projectors" },
    ],
  },
];

const BannerCard = ({ bannerKey, mainImage, items }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-(--white-color) dark:bg-(--dark-alt-color) p-6 md:p-7.5 rounded-xl flex flex-col gap-6">
      {/* Title */}
      <p className="font-bold">{t(`home.banners.${bannerKey}.title`)}</p>

      {/* Main Image */}
      <img
        src={mainImage}
        alt={t(`home.banners.${bannerKey}.title`)}
        className="w-full object-contain"
      />

      {/* Items */}
      <div className="grid grid-cols-2 gap-4">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center gap-2 text-center"
          >
            <img
              src={item.img}
              alt={t(`home.banners.${bannerKey}.items.${item.key}`)}
              className="w-12 h-12 sm:w-14 sm:h-14 md:w-20 md:h-20 object-contain"
            />
            <p className="font-bold text-xs sm:text-sm">
              {t(`home.banners.${bannerKey}.items.${item.key}`)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const Banners = () => {
  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
      {banners.map((banner) => (
        <BannerCard
          key={banner.key}
          bannerKey={banner.key}
          mainImage={banner.mainImage}
          items={banner.items}
        />
      ))}
    </div>
  );
};

export default Banners;
