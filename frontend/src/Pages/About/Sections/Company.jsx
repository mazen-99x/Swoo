import React from "react";
import { useTranslation } from "react-i18next";

const leaders = [
  { name: "Henry Avery", jobKey: "chairman", img: "./assets/About/714.jpg" },
  {
    name: "Michael Edward",
    jobKey: "vicePresident",
    img: "./assets/About/715.jpg",
  },
  {
    name: "Nathan Drake",
    jobKey: "strategistDirector",
    img: "./assets/About/722.jpg",
  },
  { name: "Eden Hazard", jobKey: "ceo", img: "./assets/About/714.jpg" },
  { name: "Robert Downey Jr", jobKey: "ceo", img: "./assets/About/715.jpg" },
];

const timelineLeft = [
  { year: "1997", textKey: "t1997" },
  { year: "1998", textKey: "t1998" },
  { year: "2000", textKey: "t2000" },
  { year: "2002", textKey: "t2002" },
  { year: "2004", textKey: "t2004" },
  { year: "2005", textKey: "t2005" },
];

const timelineRight = [
  { year: "2014", textKey: "t2014" },
  { year: "2016", textKey: "t2016" },
  { year: "2020", textKey: "t2020" },
  { year: "2022", textKey: "t2022" },
  { year: "2023", textKey: "t2023" },
];

const Company = () => {
  const { t } = useTranslation();

  return (
    <div className="px-6 lg:px-24 my-6 py-12 space-y-20 bg-(--white-color) dark:bg-(--dark-alt-color)">
      {/* ================= Mission & Vision ================= */}
      <section className="space-y-6">
        <h2 className="text-sm font-bold uppercase tracking-wide">
          {t("about.company.missionTitle")}
        </h2>

        <p className="text-sm leading-7 max-w-4xl">
          {t("about.company.missionText")}
        </p>

        <img
          src="./assets/About/landing.png"
          className="w-full h-65 lg:h-105 rounded-xl"
          alt=""
        />
      </section>

      {/* ================= Timeline ================= */}
      <section className="space-y-8">
        <h3 className="text-sm font-bold uppercase tracking-wide">
          {t("about.company.timelineTitle")}
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 text-sm">
          {[timelineLeft, timelineRight].map((column, i) => (
            <ul key={i} className="space-y-4 dark:text-gray-300 text-gray-600">
              {column.map(({ year, textKey }) => (
                <li key={year}>
                  <span className="font-bold">{year}:</span>{" "}
                  {t(`about.company.timeline.${textKey}`)}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </section>

      {/* ================= Leadership ================= */}
      <section className="space-y-8">
        <h3 className="text-sm font-bold uppercase tracking-wide">
          {t("about.company.leadershipTitle")}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6 text-center">
          {leaders.map(({ img, jobKey, name }, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-3 justify-center"
            >
              <img
                src={img}
                className="w-full sm:w-[80%] h-50 rounded-lg"
                alt=""
              />

              <div>
                <h4 className="text-sm font-semibold">{name}</h4>
                <p className="text-xs dark:text-gray-300 text-gray-600 uppercase">
                  {t(`about.company.roles.${jobKey}`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Company;
