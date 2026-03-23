import { useEffect } from "react";
import {  useNavigate, useSearchParams } from "react-router";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";


import { useLazyCheckUserEmailQuery } from "../Store/Actions/GetRegisiter";
import { useDispatch } from "react-redux";
import { setCredentials } from "../Store/Auth/AuthSlice";
import i18n from "../i18n";

const UseLogin = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isRTL = i18n.language === "ar";
  const dispatch = useDispatch();
  const [triggerLogin, { isLoading }] = useLazyCheckUserEmailQuery();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({
    mode: "onSubmit",
  });

  
  useEffect(() => {
    if (searchParams.get("message") === "account_created") {
      toast.success(t("signup.success_message"));
    }
  }, [searchParams, t]);

  const onSubmit = async (data) => {
    try {
      
      const users = await triggerLogin(data.email).unwrap();

   
      const userFound = users[0];

      if (userFound && userFound.password === data.password) {
       
        const fakeToken = btoa(`${userFound.email}-${userFound.id}`);

     
        dispatch(
          setCredentials({
            user: userFound,
            token: fakeToken,
          }),
        );

        toast.success(t("signin.welcome_back", { name: userFound.name }), {
          position: isRTL ? "top-left" : "top-right",
        });
        if (userFound?.role === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      } else {
        toast.error(t("errors.invalid_credentials"));
      }
    } catch (err) {
      const errorMessage =
        err?.data?.message || t("errors.something_went_wrong");

      toast.error(errorMessage);
      console.error("Login Error:", err);
    }
  };
  return { onSubmit, errors, isDirty, isValid, register, handleSubmit, isLoading};
};

export default UseLogin;
