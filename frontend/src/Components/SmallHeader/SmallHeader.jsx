import React, { useEffect, useState } from "react";
import { PiListBold } from "react-icons/pi";

import { IoClose } from "react-icons/io5";
import SearchBox from "../HeaderComponents/SearchBox";
import HeadIcons from "../HeaderComponents/HeadIcons";
import NaV from "../HeaderComponents/NaV";
import SignBtn from "../HeaderComponents/SignBtn";
import { useLocation } from "react-router";
import { createPortal } from "react-dom";

function SmallHeader() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const location = useLocation();

  const toggleNav = () => {
    setIsNavOpen((prev) => !prev);
  };
  useEffect(() => {
    if (isNavOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => (document.body.style.overflow = "unset");
  });
  useEffect(() => {
    const timer = setTimeout(() => setIsNavOpen(false), 0);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="md:hidden bg-(--white-color) dark:bg-(--dark-alt-color) py-5">
      <div className="container flex justify-between items-center relative">
        {/* Logo */}
        <div className="image">
          <img
            src="/assets/logo.png"
            alt="logo"
            className="w-14 rounded-full"
          />
        </div>

        {/* List Icon */}
        <PiListBold
          className="text-3xl cursor-pointer text-black dark:text-white"
          onClick={toggleNav}
        />
        {/* use createPortal to solve problem of goToTop button be over the sidebar */}
        {createPortal(
          <>
            <div
              className={`fixed inset-0 bg-black/50 transition-opacity z-99 duration-300 ${
                isNavOpen ? "opacity-100 visible" : "opacity-0 invisible"
              }`}
              onClick={toggleNav}
            />

            <div
              className={`fixed top-0 right-0 h-full max-md:w-[50%] max-sm:w-[70%] max-[400px]:w-full! bg-(--white-color) dark:bg-(--dark-alt-color) dark:text-(--white-color) text-(--black-color) transform transition-transform duration-300 
            ${isNavOpen ? "translate-x-0" : "translate-x-full"} z-100`}
            >
              <div className="py-6 px-8 border-b-2 border-b-pragh relative">
                <button
                  className="cursor-pointer duration-300 hover:bg-gray-100 dark:hover:bg-gray-700 text-2xl absolute top-2.5 right-2.5 text-black dark:text-white hover:rounded-3xl"
                  onClick={toggleNav}
                >
                  <IoClose />
                </button>
              </div>

              <div className="flex flex-col gap-2.5 p-4 justify-start h-full w-full mt-4">
                <div className="list_item py-3">
                  <SearchBox id={"SmSearch"} />
                </div>
                <div className="list_item py-3">
                  <NaV />
                </div>
                <div className="list_item py-3">
                  <SignBtn />
                </div>
                <div className="list_item py-3">
                  <HeadIcons />
                </div>
              </div>
            </div>
          </>,
          document.body,
        )}
      </div>
    </div>
  );
}

export default SmallHeader;
