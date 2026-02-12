import { Link } from "react-router";
import OutlineButton from "../../Components/OutlineButton";
import { useTranslation } from "react-i18next";
import FormInput from "../../Components/FormInput";
const Signup = () => {
  const { t } = useTranslation();
  return (
    <div className="lg:min-h-[70vh] my-6 bg-(--white-color) dark:bg-(--dark-alt-color) flex items-center rounded-xl justify-center px-4 py-6">
      <div className="w-full max-w-6xl flex items-center justify-center lg:justify-between gap-12">
        {/* Image section – hidden on small devices */}
        <div className="hidden lg:flex w-1/2 justify-center">
          <img
            src="./assets/login.webp"
            alt="Register illustration"
            className="max-w-md"
          />
        </div>

        {/* Form section */}
        <form className="w-full lg:w-1/2 max-w-md">
          <h3 className="text-3xl font-semibold text-(--main-color) mb-1 ">
            {t("signup.Register")}
          </h3>
          <p className="text-sm text-[#999] tracking-[2px] mb-6">
            {t("signup.Register to continue")}
          </p>

          {/* Name */}
          <FormInput
            type="text"
            labelKey="signup.Name"
            placeholderKey="signup.Name"
          />

          {/* Email */}
          <FormInput
            type="email"
            labelKey="signup.Email Address"
            placeholderKey="signup.Email Address"
          />

          {/* Password */}
          <FormInput
            type="password"
            labelKey="signup.Password"
            placeholderKey="signup.Password"
          />

          {/* Confirm Password */}
          <FormInput
            type="confirm password"
            labelKey="signup.Confirm Password"
            placeholderKey="signup.Confirm Password"
          />

          {/* Button */}
          <OutlineButton className="mb-4 ">
            {t("signup.Register")}
          </OutlineButton>

          {/* Login */}
          <p className="text-sm text-center mt-2">
            <span className="text-gray-500">
              {t("signup.Already have an account?")}
            </span>{" "}
            <Link
              to="/signin"
              className="text-(--main-color) font-medium hover:underline transition duration-300"
            >
              {t("signup.Login")}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
