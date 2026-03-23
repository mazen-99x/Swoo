import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
const DescriptionSection = ({ product, translate }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const isLong = product.description?.length > 150;
  return (
    <div className="mb-6 sm:mb-8">
      <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">
        {translate("product.Description")}
      </h3>
      <div className="bg-(--white-color) dark:bg-(--dark-alt-color) rounded-lg sm:rounded-xl p-3 sm:p-4">
        <p
          className={`text-sm sm:text-base text-gray-600 dark:text-gray-300 transition-all duration-300 ${
            !showFullDescription ? "line-clamp-2" : ""
          }`}
        >
          {product.description}
        </p>

        {isLong && (
          <button
            onClick={() => setShowFullDescription(!showFullDescription)}
            className="mt-2 text-(--main-color) cursor-pointer font-medium flex items-center gap-1 text-sm sm:text-base"
          >
            {showFullDescription
              ? translate("product.show_less")
              : translate("product.read_more")}
            {showFullDescription ? <FaChevronUp /> : <FaChevronDown />}
          </button>
        )}
      </div>
    </div>
  );
};

export default DescriptionSection;
