import { FaSearch } from "react-icons/fa";
import { useTranslation } from "react-i18next";

function SearchBox({ id }) {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    <form
      className={`search_box max-md:w-full w-[45%] flex items-center relative ${
        isRTL ? "flex-row-reverse" : ""
      }`}
    >
      <input
        id={id}
        type="text"
        autoComplete="off"
        placeholder={t("search.placeholder")}
        className={`w-[80%] py-2.5 px-5 outline-none border-none rounded-[30px_0_0_30px] bg-(--gray-color) dark:bg-(--dark-secondary-color) text-black dark:text-white
          ${isRTL ? "rounded-[0_30px_30px_0] text-right" : ""}`}
      />
      <button
        type="submit"
        className={`w-[15%] h-11.25 cursor-pointer border-2 border-(--main-color) transition duration-300 flex justify-center items-center bg-transparent 
          hover:text-(--white-color) hover:bg-(--main-color) text-(--main-color)
          rounded-[0px_30px_30px_0px]`}
      >
        <FaSearch />
      </button>
    </form>
  );
}

export default SearchBox;
