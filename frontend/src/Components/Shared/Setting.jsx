import { useEffect, useRef, useState } from "react";
import { FaCog, FaPalette, FaTimes, FaMoon, FaSun } from "react-icons/fa";
import { FaDroplet } from "react-icons/fa6";
import DarkToggle from "../Common/DarkToggle/DarkToggle.jsx";

import { useTranslation } from "react-i18next";
import { useMode } from "../../Context/ModeContext.jsx";
import i18n from "../../i18n.js";

const colors = [
  // THE CLASSICS
  { hex: "#19b919", key: "colors.fresh_eco", name: "Fresh Eco" },
  { hex: "#2563EB", key: "colors.classic_blue", name: "Classic Blue" },
  { hex: "#1E3A8A", key: "colors.midnight", name: "Midnight" },

  // THE ENERGETIC
  { hex: "#F43F5E", key: "colors.rose_punch", name: "Rose Punch" },
  { hex: "#F97316", key: "colors.vivid_orange", name: "Vivid Orange" },
  { hex: "#EAB308", key: "colors.gold_standard", name: "Gold Standard" },

  // THE CREATIVE
  { hex: "#8B5CF6", key: "colors.modern_violet", name: "Modern Violet" },
  { hex: "#0D9488", key: "colors.deep_teal", name: "Deep Teal" },
  { hex: "#D946EF", key: "colors.electric_pink", name: "Electric Pink" },

  // THE EARTHY
  { hex: "#14B8A6", key: "colors.tropical_teal", name: "Tropical Teal" },
  { hex: "#0EA5E9", key: "colors.sky_high", name: "Sky High" },
  { hex: "#7C3AED", key: "colors.deep_royal", name: "Deep Royal" },
];

const Setting = () => {
  const { mode } = useMode();
  const [isMobile, setIsMobile] = useState(false);
  const isRTL = i18n.language == "ar";
  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 400);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [activeColor, setActiveColor] = useState("#19b919");
  const panelRef = useRef(null);
  const gearRef = useRef(null);

  const changeColor = (color) => {
    setActiveColor(color);
    document.documentElement.style.setProperty("--main-color", color);
    document.documentElement.style.setProperty(
      "--main-color-transparent",
      `${color}66`,
    );
    localStorage.setItem("primary-color", color);
  };

  useEffect(() => {
    const savedColor = localStorage.getItem("primary-color");
    if (savedColor) {
      const timer = setTimeout(() => setActiveColor(savedColor), 0);

      document.documentElement.style.setProperty("--main-color", savedColor);
      return () => clearTimeout(timer);
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
  useEffect(() => {
    const html = document.documentElement;

    if (open) {
      // 1. Lock scroll
      html.style.overflowY = "hidden";

      // 2. Force background color to prevent gray gutter
      html.style.backgroundColor =
        mode === "dark" ? "var(--dark-alt-color)" : "var(--bg-color)";
    } else {
      // 1. Unlock scroll
      html.style.overflowY = "auto";

      // 2. Reset background (it will fall back to your CSS)
      html.style.backgroundColor = "";
    }
  }, [open, mode]); // Re-run if mode changes while panel is open
  return (
    <>
      {/* Gear Button - Enhanced */}
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
          ${open ? "left-72 rounded-l-xl rounded-r-none" : "left-0"}
          ${open && isMobile ? "opacity-0 pointer-events-none -translate-x-full" : "opacity-100"}
        `}
        style={{ backgroundColor: "var(--main-color)" }}
      >
        <FaCog
          className={`transition-transform duration-500 ${open ? "rotate-180" : "animate-spin-slow"}`}
          size={20}
        />
      </button>

      {/* Panel - Modern Redesign */}
      <div
        ref={panelRef}
        className={`
          fixed top-0 left-0 z-90
          h-full w-72 max-[400px]:w-full!
          bg-linear-to-b from-white to-gray-50 
          dark:from-gray-900 dark:to-gray-800
          shadow-2xl
          transition-transform duration-300 ease-out
          border-r border-gray-200 dark:border-gray-700
          ${open ? "translate-x-0" : "-translate-x-full"}
          ${isRTL ? "text-right" : "text-left"}
        `}
      >
        {/* Header with linear */}
        <div className="relative h-32 bg-linear-to-br from-(--main-color)/20 to-transparent">
          <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-(--main-color)/5" />

          {/* Close button */}
          <button
            onClick={() => setOpen(false)}
            className="absolute cursor-pointer top-4 right-4 p-2 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-all"
          >
            <FaTimes size={16} className="text-gray-600 dark:text-gray-300" />
          </button>

          {/* Title with icon */}
          <div className="absolute bottom-4 left-6 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-(--main-color) text-white shadow-lg">
              <FaPalette size={18} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">
              {t("settings.title")}
            </h3>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8 overflow-y-auto h-[calc(100%-128px)]">
          {/* Color Picker Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center gap-2">
                <span className="w-1 h-4 rounded-full bg-(--main-color)" />
                {t("settings.mainColor")}
              </p>
              <span className="text-xs px-2 py-1 bg-(--main-color)/10 text-(--main-color) rounded-full">
                {colors.length} {t("settings.colorsCount", "colors")}
              </span>
            </div>

            {/* Color Grid with Droplets */}
            <div className="grid grid-cols-4 gap-y-8 gap-x-3">
              {colors.map((color) => (
                <button
                  key={color.hex}
                  onClick={() => changeColor(color.hex)}
                  className="group relative cursor-pointer"
                >
                  <div className="relative flex flex-col items-center">
                    <div
                      className={`
                        relative transition-all duration-300
                        ${activeColor === color.hex ? "scale-110" : "group-hover:scale-105"}
                      `}
                    >
                      <FaDroplet
                        size={40}
                        style={{ color: color.hex }}
                        className={`
                          drop-shadow-lg transition-all duration-300
                          ${activeColor === color.hex ? "drop-shadow-[0_0_10px_rgba(0,0,0,0.3)]" : "group-hover:drop-shadow-[0_0_8px_rgba(0,0,0,0.2)]"}
                        `}
                      />
                      <span className="absolute top-2 left-3 w-2 h-2.5 bg-white/40 rounded-full rotate-15" />
                      {activeColor === color.hex && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-(--main-color) rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center">
                          <span className="text-white text-[8px]">✓</span>
                        </span>
                      )}
                    </div>
                    <span className="absolute z-20 -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-gray-800 text-white px-2 py-0.5 rounded-full pointer-events-none">
                      {t(color.key, color.name)}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-700" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-2 bg-white dark:bg-gray-800 text-xs text-gray-400 uppercase tracking-widest">
                {t("settings.preferences", "preferences")}
              </span>
            </div>
          </div>

          {/* Dark Mode Toggle */}
          <div className="bg-gray-100 dark:bg-gray-800/50 rounded-2xl p-4 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-(--main-color)/10 text-(--main-color)">
                  {mode === "dark" ? <FaMoon size={16} /> : <FaSun size={16} />}
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t("settings.changeMode")}
                </span>
              </div>
              <DarkToggle />
            </div>
          </div>

          {/* Current Color Preview */}
          <div className="bg-gray-100 dark:bg-gray-800/50 rounded-2xl p-4">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-tighter">
              {t("settings.currentColor", "Current Color")}
            </p>
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl shadow-inner border border-white/20"
                style={{ backgroundColor: activeColor }}
              />
              <div>
                <p className="text-sm font-bold text-gray-800 dark:text-white">
                  {(() => {
                    const currentColor = colors.find(
                      (c) => c.hex === activeColor,
                    );
                    return currentColor
                      ? t(currentColor.key)
                      : t("settings.custom", "Custom");
                  })()}
                </p>
                <p className="text-xs font-mono text-gray-500 uppercase">
                  {activeColor}
                </p>
              </div>
            </div>
          </div>

          {/* Footer Tip */}
        </div>
      </div>
    </>
  );
};

export default Setting;
