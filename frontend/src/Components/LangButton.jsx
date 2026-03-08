// import i18n from "../i18n";

// function LangButton() {
//   const handleChange = (e) => {
//     const lang = e.target.value;
//     i18n.changeLanguage(lang);
//     document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
//   };

//   return (
//     <select
//       value={i18n.language}
//       onChange={handleChange}
//       style={{
//         padding: "6px 10px",
//         borderRadius: "6px",
//         cursor: "pointer",
//       }}
//     >
//       <option value="en">🇺🇸 English</option>
//       <option value="ar">🇪🇬 العربية</option>
//     </select>
//   );
// }

// export default LangButton;
import { useEffect, useRef, useState } from "react";

import i18n from "../i18n";

const languages = [
  { code: "en", name: "English", flag: "/assets/Flags/usa.svg" },
  { code: "ar", name: "العربية", flag: "/assets/Flags/egy.svg" },
];

function LangButton() {
  const [open, setOpen] = useState(false);
  const dropRef = useRef(null);
  const selectRef = useRef(null);
  const current =
    languages.find((l) => l.code === i18n.language) || languages[0];

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);

    localStorage.setItem("lang", lang);
    setOpen(false);
  };
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        open &&
        selectRef.current &&
        !selectRef.current.contains(e.target) &&
        dropRef.current &&
        !dropRef.current.contains(e.target)
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
    const savedLang = localStorage.getItem("lang");
    if (savedLang && savedLang !== i18n.language) {
      i18n.changeLanguage(savedLang);
    }
  }, []);
  return (
    <div className="relative w-44">
      {/* Selected */}
      <button
        ref={selectRef}
        onClick={() => setOpen(!open)}
        className="flex cursor-pointer w-full items-center gap-2 rounded-md border border-gray-300 bg-(--gray-color) dark:bg-(--dark-secondary-color) px-3 py-2 text-sm shadow-sm "
      >
        <img src={current.flag} alt="" className="h-5 w-5" />
        <span className="flex-1 text-left">{current.name}</span>
        <span className="text-gray-400">▼</span>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          ref={dropRef}
          className="absolute z-50 mt-1 w-full rounded-md border border-gray-200 bg-(--gray-color) dark:bg-(--dark-secondary-color) shadow-lg"
        >
          <div className="max-h-48 overflow-auto">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className=" cursor-pointer flex w-full items-center gap-2 px-3 py-2 text-sm dark:hover:bg-gray-700 hover:bg-gray-200"
              >
                <img src={lang.flag} alt="" className="h-5 w-5" />
                <span>{lang.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default LangButton;
