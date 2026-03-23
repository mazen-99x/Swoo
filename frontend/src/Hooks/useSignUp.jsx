import { useNavigate } from "react-router";

import { useTranslation } from "react-i18next";

import { toast } from "sonner";
import {
  useLazyCheckUserEmailQuery,
  useRegisterUserMutation,
} from "../Store/Actions/GetRegisiter";
import { useForm } from "react-hook-form";
import { setCredentials } from "../Store/Auth/AuthSlice";
import { useDispatch } from "react-redux";

const useSignUp = () => {
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
  return {
    errors,
    isDirty,
    register,
    handleSubmit,
    getValues,
    isLoading,
    error,
    onSubmit,
  };
};

export default useSignUp;
