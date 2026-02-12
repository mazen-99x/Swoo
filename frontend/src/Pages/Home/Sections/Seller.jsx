import React, { useEffect, useState } from "react";
import Swiperr from "../../../Components/Swiper/Swiper";
import { useTranslation } from "react-i18next";
import i18n from "../../../i18n.js";

const Seller = () => {
  const { t } = useTranslation();
  const isRTL = i18n.language === "ar";
  const [data, setData] = useState([]);
  const filters = ["popular", "newIn", "bestSeller"];
  const [active, setActive] = useState("popular");

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("http://localhost:5000/products");
      const data = await res.json();
      setData(data);
    };
    fetchProducts();
  }, []);
  console.log(data)
  const filteredProducts = data.filter((product) => product.type === active);
  return (
    <div
      className={`bg-(--white-color) dark:bg-(--dark-alt-color) p-7.5 mt-5 rounded-xl ${isRTL ? "rtl" : "ltr"}`}
    >
      <ul className="flex justify-between items-center flex-wrap gap-10">
        <li>
          <div className="flex gap-8 max-[400px]:justify-center">
            {filters.map((key) => (
              <button
                key={key}
                onClick={() => setActive(key)}
                className={`font-semibold cursor-pointer ${active === key ? "text-(--main-color)" : "dark:text-gray-300 text-gray-600"}`}
              >
                {t(`home.seller.filters.${key}`)}
              </button>
            ))}
          </div>
        </li>

        <li>
          <a
            href="/products"
            className="font-extralight max-[425px]:hidden dark:text-gray-300 text-gray-600 text-[14px] transition duration-300 hover:text-(--main-color)"
          >
            {t("home.seller.viewAll")}
          </a>
        </li>
      </ul>

      <div className="px-5 mt-6">
        <Swiperr products={filteredProducts} />
      </div>
    </div>
  );
};

export default Seller;
