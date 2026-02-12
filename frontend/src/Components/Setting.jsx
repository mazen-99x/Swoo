import React, { useEffect, useRef, useState } from "react";
import { FaCog } from "react-icons/fa";
import DarkToggle from "./DarkToggle/DarkToggle";
import i18n from "../i18n.js";
import { useTranslation } from "react-i18next";

const colors = [
  "#19b919",
  "#16A34A",
  "#10B981",
  "#14B8A6",
  "#5E3BEE",
  "#8B5CF6",
  "#D946EF",
  "#7C3AED",
  "#2563EB",
  "#0EA5E9",
  "#234199",
  "#06B6D4",
  "#E62872",
  "#F43F5E",
  "#F87171",
  "#F97316",
  "#F59E0B",
  "#EAB308",
  "#FACC15",
];

const Setting = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);
  const gearRef = useRef(null);
  const isRTL = i18n.language === "ar"; // detect RTL

  const changeColor = (color) => {
    document.documentElement.style.setProperty("--main-color", color);
    localStorage.setItem("primary-color", color);
  };

  useEffect(() => {
    const savedColor = localStorage.getItem("primary-color");
    if (savedColor) {
      document.documentElement.style.setProperty("--main-color", savedColor);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        open &&
        panelRef.current &&
        !panelRef.current.contains(e.target) &&
        gearRef.current &&
        !gearRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [open]);

  return (
    <>
      {/* Gear Button */}
      <button
        ref={gearRef}
        onClick={() => setOpen(!open)}
        className={`
          cursor-pointer
          fixed top-1/2 -translate-y-1/2 z-50
          w-12 h-12
          flex items-center justify-center
          rounded-r-xl
          shadow-lg
          text-white
          transition-all duration-300
          ${open ? "left-64" : "left-0"}  // always on the left
        `}
        style={{ backgroundColor: "var(--main-color)" }}
      >
        <FaCog
          className="transition-transform duration-500 animate-spin-slow"
          size={20}
        />
      </button>

      {/* Panel (always from left) */}
      <div
        ref={panelRef}
        className={`
          fixed top-0 left-0 z-40
          h-full w-64
          bg-(--white-color) dark:bg-(--dark-alt-color)
          dark:text-(--white-color)
          text-(--black-color)
          shadow-2xl
          p-6
          flex flex-col
          transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"} // always slide from left
        `}
      >
        <h3
          className={`text-lg font-bold mb-6 ${isRTL ? "text-right" : "text-left"}`}
          style={{ color: "var(--heading-color)" }}
        >
          {t("settings.title")}
        </h3>

        {/* Color Picker */}
        <div className="mb-6">
          <p
            className={`text-sm font-medium mb-3 ${isRTL ? "text-right" : "text-left"}`}
            style={{ color: "var(--body-color)" }}
          >
            {t("settings.mainColor")}
          </p>

          <div className="flex flex-wrap gap-3">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => changeColor(color)}
                className="
                  w-8 h-8 rounded-full
                  border-2 border-white
                  shadow
                  hover:scale-110
                  active:scale-95
                  transition
                  cursor-pointer
                "
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        <div
          className={`flex items-center justify-between w-full max-w-xs rounded-xl px-4 py-3 ${isRTL ? "flex-row-reverse" : "flex-row"}`}
        >
          <p
            className={`text-sm text-gray-900 dark:text-white ${isRTL ? "text-right" : "text-left"}`}
          >
            {t("settings.changeMode")}
          </p>
          <DarkToggle />
        </div>

        <p
          className={`text-xs text-gray-400 mt-auto ${isRTL ? "text-right" : "text-left"}`}
        >
          {t("settings.closeTip")}
        </p>
      </div>
    </>
  );
};

export default Setting;
