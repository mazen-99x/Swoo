import React from "react";
import { useTranslation } from "react-i18next";

const Text = () => {
  const { t } = useTranslation();

  return (
    <div className="my-6">
      <h3 className="font-bold pb-10">{t("home.text.heading")}</h3>

      <p className="text-[14px] leading-6.25 dark:text-gray-300 text-gray-600 pb-5">
        {t("home.text.paragraph1")}
      </p>

      <p className="text-[14px] leading-6.25 dark:text-gray-300 text-gray-600">
        {t("home.text.paragraph2")}
      </p>
    </div>
  );
};

export default Text;
