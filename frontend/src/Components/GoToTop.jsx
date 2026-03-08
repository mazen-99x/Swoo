import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const GoToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const toggleVisible = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", toggleVisible);
    return () => window.removeEventListener("scroll", toggleVisible);
  }, []);
  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        {isVisible && (
          <button
            title="Go To Top"
            onClick={scrollToTop}
            className="fixed bottom-20 right-4 md:bottom-8 md:right-8 
             p-2 md:p-4 cursor-pointer hover:scale-110 duration-300
             bg-(--main-color) text-white rounded-full shadow-lg 
             transition-all active:scale-95 z-10"
            aria-label="Scroll to top"
          >
            <FaArrowUp size={20} />
          </button>
        )}
      </div>
    </>
  );
};

export default GoToTop;
