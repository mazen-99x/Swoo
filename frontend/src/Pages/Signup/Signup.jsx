import { Link, useNavigate } from "react-router";
import OutlineButton from "../../Components/OutlineButton";
import { useTranslation } from "react-i18next";
import FormInput from "../../Components/FormInput";
import { toast } from "sonner";
import {
  useLazyCheckUserEmailQuery,
  useRegisterUserMutation,
} from "../../Store/Actions/GetRegisiter";
import { useForm } from "react-hook-form";
import { setCredentials } from "../../Store/Auth/AuthSlice";
import { useDispatch } from "react-redux";

const Signup = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [registerUser, { isLoading, error, reset: resetMutation }] =
    useRegisterUserMutation();
  const [triggerCheckEmail] = useLazyCheckUserEmailQuery();

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    setError,
    formState: { errors, isDirty },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const onSubmit = async (data) => {
    try {
      const { data: existingUsers } = await triggerCheckEmail(data.email);

      if (existingUsers && existingUsers.length > 0) {
        setError("email", {
          type: "manual",
          message: t("errors.Email already exists"),
        });
        return;
      }

      const { confirm_password: _, ...userData } = data;

      // 2. SIMULATE TOKEN (Using stable response data)
      const accessToken = btoa(`${data.email}-${data.name}`);

      const finalData = { token: accessToken, ...userData };

      const response = await registerUser(finalData).unwrap();
      dispatch(
        setCredentials({
          user: response,
          token: accessToken,
        }),
      );

      reset();
      resetMutation();

      // 4. Navigate
      navigate("/signin?message=account_created");
    } catch (err) {
      toast.error(t("errors.something_went_wrong"));
      console.error(err);
    }
  };

  return (
    <div className="lg:min-h-[70vh] my-6 bg-(--white-color) dark:bg-(--dark-alt-color) flex items-center rounded-xl justify-center px-4 py-6">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-12">
        <div className="hidden lg:flex w-1/2 justify-center">
          <img src="./assets/login.webp" alt="Register" className="max-w-md" />
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full lg:w-1/2 max-w-md"
        >
          <h3 className="text-3xl font-semibold text-(--main-color) mb-1">
            {t("signup.Register")}
          </h3>
          <p className="text-sm text-[#999] tracking-[2px] mb-6">
            {t("signup.Register to continue")}
          </p>
          {/* Show Server Errors if they exist */}
          {error && (
            <p className="text-red-500 bg-red-50 p-2 rounded text-sm mb-4">
              {error.data?.message || t("errors.something_went_wrong")}
            </p>
          )}
          <FormInput
            {...register("name", {
              required: t("errors.Name is required"), // Add this
              minLength: {
                value: 4,
                message: t("errors.Name must be at least 4 characters"),
              },
            })}
            labelKey="signup.Name"
            placeholderKey="signup.Name"
            error={errors.name}
          />

          <FormInput
            type="email"
            {...register("email", {
              required: t("errors.Email is required"), // Add this
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: t("errors.Invalid email address"),
              },
            })}
            labelKey="signup.Email Address"
            placeholderKey="signup.Email Address"
            error={errors.email}
          />

          <FormInput
            type="password"
            {...register("password", {
              required: t("errors.Password is required"), // Add this
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
                message: t("errors.Password strength requirement"),
              },
            })}
            labelKey="signup.Password"
            placeholderKey="signup.Password"
            error={errors.password}
          />
          <FormInput
            type="password"
            {...register("confirm_password", {
              validate: (val) =>
                !val ||
                val === getValues("password") ||
                t("errors.Passwords do not match"),
            })}
            labelKey="signup.Confirm Password"
            placeholderKey="signup.Confirm Password"
            error={errors.confirm_password}
          />
          <OutlineButton
            disabled={!isDirty || isLoading}
            type="submit"
            className="mb-4"
          >
            {isLoading ? t("signup.Loading...") : t("signup.Register")}
          </OutlineButton>
          <p className="text-sm text-center mt-2">
            <span className="text-gray-500">
              {t("signup.Already have an account?")}
            </span>{" "}
            <Link
              to="/signin"
              className="text-(--main-color) font-medium hover:underline"
            >
              {t("signup.Login")}
            </Link>
          </p>
          {error && <p>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Signup;
