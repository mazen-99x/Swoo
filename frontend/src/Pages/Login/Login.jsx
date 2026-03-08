import { useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import OutlineButton from "../../Components/OutlineButton";
import FormInput from "../../Components/FormInput";
import { useLazyCheckUserEmailQuery } from "../../Store/Actions/GetRegisiter";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../Store/Auth/AuthSlice";

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const [triggerLogin, { isLoading }] = useLazyCheckUserEmailQuery();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({
    mode: "onSubmit",
  });

  // Check if user came from Signup success
  useEffect(() => {
    if (searchParams.get("message") === "account_created") {
      toast.success(t("signup.success_message"));
    }
  }, [searchParams, t]);

  const onSubmit = async (data) => {
    try {
      // 1. Fetch user array from JSON server
      const users = await triggerLogin(data.email).unwrap();

      // 2. Find the specific user
      const userFound = users[0];

      if (userFound && userFound.password === data.password) {
        // 3. Create your token
        const fakeToken = btoa(`${userFound.email}-${userFound.id}`);

        // 4. DISPATCH TO REDUX (This handles storage automatically via Redux Persist)
        dispatch(
          setCredentials({
            user: userFound,
            token: fakeToken,
          }),
        );

        toast.success(t("login.welcome_back"));
        navigate("/");
      } else {
        toast.error(t("errors.invalid_credentials"));
      }
    } catch (err) {
      toast.error(t("errors.something_went_wrong"));
      console.error("Login Error:", err);
    }
  };
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
