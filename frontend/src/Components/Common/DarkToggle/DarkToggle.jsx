import React from "react";
import { useMode } from "../../../Context/ModeContext";
import { FaSun, FaMoon } from "react-icons/fa";

function DarkToggle() {
  const { mode, toggleMode } = useMode();
  const isDark = mode === "dark";

  return (
    <div className="flex items-center justify-center">
      <button
        onClick={toggleMode}
        aria-label="Toggle Dark Mode"
        className={`
          relative w-14 h-7 rounded-full transition-all duration-500 ease-in-out cursor-pointer
          ${isDark ? "bg-slate-700 shadow-inner" : "bg-sky-400 shadow-md"}
        `}
      >
        {/* The Sliding Circle */}
        <div
          className={`
            absolute top-1 left-1 w-5 h-5 rounded-full bg-white shadow-lg 
            flex items-center justify-center transform transition-all duration-500 ease-in-out
            ${isDark ? "translate-x-7 rotate-360" : "translate-x-0 rotate-0"}
          `}
        >
          {isDark ? (
            <FaMoon className="text-slate-700" size={10} />
          ) : (
            <FaSun className="text-amber-500" size={10} />
          )}
        </div>

        {/* Decorative background icons */}
        <div className="flex justify-between items-center h-full px-2 pointer-events-none">
          <FaSun
            className={`text-white transition-opacity duration-300 ${isDark ? "opacity-0" : "opacity-40"}`}
            size={10}
          />
          <FaMoon
            className={`text-white transition-opacity duration-300 ${isDark ? "opacity-40" : "opacity-0"}`}
            size={10}
          />
        </div>
      </button>
    </div>
  );
}

export default DarkToggle;
