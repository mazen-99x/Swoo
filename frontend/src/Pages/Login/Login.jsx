import { Link } from "react-router";



import UseLogin from "../../Hooks/UseLogin";
import { useTranslation } from "react-i18next";
import FormInput from "../../Components/Common/FormInput";
import OutlineButton from "../../Components/Common/OutlineButton";

const Login = () => {
   const { t } = useTranslation();
  const {
    onSubmit,
    errors,
    isDirty,
    isValid,
    register,
    handleSubmit,
    isLoading,
  } = UseLogin();

  return (
    <div className="lg:min-h-[70vh] my-6 bg-(--white-color) dark:bg-(--dark-alt-color) flex items-center rounded-xl justify-center px-4 max-lg:py-6">
      <div className="w-full max-w-6xl flex items-center justify-center lg:justify-between gap-12">
        <div className="hidden lg:flex w-1/2 justify-center">
          <img
            src="./assets/login.webp"
            alt="Login illustration"
            className="max-w-md"
          />
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full lg:w-1/2 max-w-md"
        >
          <h3 className="text-3xl font-semibold text-(--main-color) mb-1">
            {t("signin.Welcome Back")}
          </h3>
          <p className="text-sm text-[#999] tracking-[2px] mb-6">
            {t("signin.Login to continue")}
          </p>

          <FormInput
            type="email"
            {...register("email", { required: true })}
            labelKey="signin.Email Address"
            placeholderKey="signin.Email Address"
            error={errors.email}
          />

          <FormInput
            type="password"
            {...register("password", { required: true })}
            labelKey="signin.Password"
            placeholderKey="signin.Password"
            error={errors.password}
          />

          <OutlineButton
            className="px-6 mb-4 "
            disabled={!isDirty || !isValid || isLoading}
            type="submit"
          >
            {isLoading ? t("common.Loading") : t("signin.Login")}
          </OutlineButton>

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
