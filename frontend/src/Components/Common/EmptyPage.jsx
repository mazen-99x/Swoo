import { Link } from "react-router";
import OutlineButton from "./OutlineButton";
const EmptyPage = ({ translate, icon, title, desc }) => {
  return (
    <div className="min-h-[75vh] flex items-center justify-center p-4">
      <div className="text-center bg-(--white-color) dark:bg-(--dark-alt-color) rounded-2xl shadow-lg p-12 max-w-md w-full">
        {/* Empty Cart Illustration */}

        
        {icon && <div className="mb-6 flex justify-center">{icon}</div>}

        {/* Title */}
        {title && (
          <h2 className="text-3xl font-bold mb-3 text-gray-800 dark:text-white">
            {title}
          </h2>
        )}

        {/* Description */}
        {desc && (
          <p className="text-gray-500 dark:text-gray-400 mb-8">{desc}</p>
        )}

        {/* Continue Shopping Button */}
        <Link to="/">
          <OutlineButton
            className="inline-flex items-end gap-2 px-8 py-3   
                  font-medium"
          >
            <span>{translate("common.shopping")}</span>
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </OutlineButton>
        </Link>

        <div className="mt-6">
          <p className="text-sm text-gray-400 dark:text-gray-500">
            {translate("common.browse")}{" "}
            <Link
              to="/products"
              className="text-(--main-color) hover:underline"
            >
              {translate("common.products")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmptyPage;
