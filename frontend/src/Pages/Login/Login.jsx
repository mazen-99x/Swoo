import { Link } from "react-router";
import OutlineButton from "../../Components/OutlineButton";

import { useTranslation } from "react-i18next";
import FormInput from "../../Components/FormInput";

const Login = () => {
  const { t } = useTranslation();
  return (
    <div className="lg:min-h-[70vh] my-6 bg-(--white-color) dark:bg-(--dark-alt-color) flex items-center rounded-xl justify-center px-4 max-lg:py-6">
      <div className="w-full max-w-6xl flex items-center justify-center lg:justify-between gap-12">
        {/* Image section – hidden on small devices */}
        <div className="hidden lg:flex w-1/2 justify-center">
          <img
            src="./assets/login.webp"
            alt="Login illustration"
            className="max-w-md"
          />
        </div>

        {/* Form section */}
        <form className="w-full lg:w-1/2 max-w-md">
          <h3 className="text-3xl font-semibold text-(--main-color) mb-1">
            {t("signin.Welcome Back")}
          </h3>
          <p className="text-sm text-[#999] tracking-[2px] mb-6">
            {t("signin.Login to continue")}
          </p>

          {/* Email */}
          <FormInput
            type="email"
            labelKey="signin.Email Address"
            placeholderKey="signin.Email Address"
          />

          {/* Password */}
          <FormInput
            type="password"
            labelKey="signin.Password"
            placeholderKey="signin.Password"
          />

          {/* Button */}
          <OutlineButton className="px-6 mb-4">{t("signin.Login")}</OutlineButton>

          {/* Signup */}
          <p className="text-sm text-center">
            <span className="text-gray-500">{t("signin.New User?")}</span>{" "}
            <Link
              to="/signup"
              className="text-(--main-color) font-medium hover:underline transition duration-300"
            >
              {t("signin.Sign up")}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
