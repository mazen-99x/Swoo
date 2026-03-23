import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import OutlineButton from "../../Components/Common/OutlineButton";

const Error = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-(--white-color) dark:bg-(--dark-alt-color) px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-200 dark:text-gray-700">
          404
        </h1>

        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-4">
          {t("error404.title")}
        </h2>

        <p className="text-gray-600 dark:text-gray-300 mt-2 max-w-md">
          {t("error404.description")}
        </p>

        <Link to="/">
          <OutlineButton className="mt-8 mx-auto block px-6">
            {t("error404.goHome")}
          </OutlineButton>
        </Link>

        <p className="mt-8 text-gray-500 dark:text-gray-400 text-sm">
          {t("error404.code")}
        </p>
      </div>
    </div>
  );
};

export default Error;
