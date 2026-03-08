import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import {
  IoEyeOutline,
  IoEyeOffOutline,
  IoKeyOutline,
  IoPersonOutline,
  IoMailOutline,
  IoTrashOutline,
  IoSaveOutline,
  IoCloseOutline,
} from "react-icons/io5";

// Store Imports
import {
  useChangePasswordMutation,
  useDeleteAccountMutation,
  useUpdateProfileMutation,
} from "../../Store/Actions/GetRegisiter";
import { logout, updateUser } from "../../Store/Auth/AuthSlice";

// Component Imports
import OutlineButton from "../../Components/OutlineButton";
import ConfirmModal from "../../Components/ConfirmModal";

export default function Profile() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPassBox, setShowPassBox] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth?.user);

  // Mutations
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const [changePassword, { isLoading: isChangingPass }] =
    useChangePasswordMutation();
  const [deleteAccount] = useDeleteAccountMutation();

  // 1. Name Form
  const {
    register: regName,
    handleSubmit: handleNameSubmit,
    formState: { errors: nameErrors, isDirty: isNameDirty },
  } = useForm({
    defaultValues: { name: user?.name || "", email: user?.email || "" },
  });

  // 2. Password Form
  const {
    register: regPass,
    handleSubmit: handlePassSubmit,
    watch,
    reset: resetPass,
    formState: { errors: passErrors },
  } = useForm({ mode: "onChange" });

  const newPassValue = watch("newPassword", "");
  const confirmPassValue = watch("confirmPassword", "");

  // Real-time Validation Checks
  const hasUppercase = /[A-Z]/.test(newPassValue);
  const hasLowercase = /[a-z]/.test(newPassValue);
  const hasNumber = /[0-9]/.test(newPassValue);
  const hasMinLength = newPassValue.length >= 6;
  const passwordsMatch =
    newPassValue === confirmPassValue && confirmPassValue.length > 0;
  const isValidPass = hasUppercase && hasLowercase && hasNumber && hasMinLength;

  const onSaveName = async (data) => {
    if (data.name.trim() === user?.name) {
      toast.error(t("profile.noChanges") || "No changes detected");
      return;
    }
    try {
      const res = await updateProfile({
        id: user.id,
        name: data.name.trim(),
      }).unwrap();
      dispatch(updateUser(res.name));
      toast.success(t("profile.updateSuccess") || "Name updated successfully");
    } catch (err) {
      console.log(err);
      toast.error(t("profile.updateFailed") || "Update failed");
    }
  };

  const onResetPass = async (data) => {
    try {
      await changePassword({
        id: user.id,
        password: data.newPassword,
      }).unwrap();
      toast.success(
        t("profile.passChanged") || "Password changed successfully",
      );
      setShowPassBox(false);
      resetPass();
    } catch (err) {
      console.log(err);
      toast.error(t("profile.passResetFailed") || "Password reset failed");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount(user.id).unwrap();
      dispatch(logout());
      toast.success(t("profile.accountDeletedSuccess") || "Account deleted");
      navigate("/signup");
    } catch (err) {
      console.log(err);
      toast.error(t("profile.deleteFailed") || "Failed to delete account");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-(--dark-alt-color) dark:to-(--dark-secondary-color) p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8 text-start">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-(--main-color) to-(--main-color-dark) bg-clip-text text-transparent">
              {t("profile.myProfile")}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              {t("profile.manageSettings")}
            </p>
          </div>

          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Sidebar - Profile Card */}
            <aside className="lg:w-80">
              <div className="sticky top-24 space-y-6">
                <div className="bg-white dark:bg-(--dark-alt-color) rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-800">
                  <div className="h-24 bg-gradient-to-r from-(--main-color) to-(--main-color-dark) relative">
                    <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
                      <div className="relative">
                        <img
                          src="./assets/About/profile.png"
                          alt={t("profile.userAvatar")}
                          className="h-24 w-24 rounded-full border-4 border-white dark:border-(--dark-alt-color) object-cover shadow-lg"
                        />
                        <div className="absolute bottom-0 right-0 h-5 w-5 rounded-full bg-green-500 border-2 border-white"></div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-16 pb-6 px-6 text-center">
                    <h3 className="font-bold text-xl dark:text-white capitalize">
                      {user?.name}
                    </h3>
                    <p className="text-sm text-gray-500 flex items-center justify-center gap-1 mt-1">
                      <IoMailOutline className="text-(--main-color)" />
                      {user?.email}
                    </p>

                    {/* Stats */}
                    <div className="flex justify-center gap-4 mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                      <div className="text-center">
                        <div className="text-xl font-bold text-(--main-color)">
                          2
                        </div>
                        <div className="text-xs text-gray-500">
                          {t("profile.orders")}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-(--main-color)">
                          5
                        </div>
                        <div className="text-xs text-gray-500">
                          {t("profile.wishlist")}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-(--main-color)">
                          1
                        </div>
                        <div className="text-xs text-gray-500">
                          {t("profile.reviews")}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-(--dark-alt-color) rounded-xl shadow-lg p-4 border border-gray-100 dark:border-gray-800 text-start">
                  <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider text-gray-500">
                    {t("profile.quickActions")}
                  </h4>
                  <div className="space-y-2">
                    <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm flex items-center gap-2">
                      <IoPersonOutline className="text-(--main-color)" />
                      {t("profile.viewOrders")}
                    </button>
                    <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm flex items-center gap-2">
                      <IoKeyOutline className="text-(--main-color)" />
                      {t("profile.securitySettings")}
                    </button>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 space-y-6 text-start">
              {/* Profile Card */}
              <section className="bg-white dark:bg-(--dark-alt-color) rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-800">
                <div className="px-6 py-4 bg-gradient-to-r from-(--main-color)/5 to-transparent border-b border-gray-100 dark:border-gray-800">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <IoPersonOutline className="text-(--main-color)" />
                    {t("profile.editProfile")}
                  </h2>
                </div>

                <div className="p-6">
                  <form
                    onSubmit={handleNameSubmit(onSaveName)}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-sm font-medium mb-2 block text-gray-700 dark:text-gray-300">
                          {t("profile.fullName")}
                        </label>
                        <input
                          {...regName("name", { required: true, minLength: 4 })}
                          className={`w-full rounded-xl border-2 p-3 bg-transparent dark:text-white transition-all focus:ring-2 focus:ring-(--main-color)/20 ${
                            nameErrors.name
                              ? "border-red-300 focus:border-red-500"
                              : "border-gray-200 dark:border-gray-700 focus:border-(--main-color)"
                          }`}
                          placeholder={t("profile.enterName")}
                        />
                        {nameErrors.name && (
                          <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                            <span className="h-1 w-1 bg-red-500 rounded-full"></span>
                            {t("profile.nameError")}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block text-gray-700 dark:text-gray-300">
                          {t("profile.emailAddress")}
                        </label>
                        <input
                          value={user?.email}
                          disabled
                          className="w-full rounded-xl border-2 border-gray-200 dark:border-gray-700 p-3 bg-gray-50 dark:bg-gray-800 text-gray-500 cursor-not-allowed"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <OutlineButton
                        type="submit"
                        disabled={isUpdating || !isNameDirty}
                        className="min-w-[140px] disabled:opacity-50"
                      >
                        {isUpdating ? (
                          <span className="flex items-center gap-2">
                            <span className="animate-spin">⚪</span>
                            {t("common.loading")}
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <IoSaveOutline />
                            {t("profile.saveChanges")}
                          </span>
                        )}
                      </OutlineButton>
                    </div>
                  </form>
                </div>
              </section>

              {/* Password Card */}
              <section className="bg-white dark:bg-(--dark-alt-color) rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-800">
                <div className="px-6 py-4 bg-gradient-to-r from-amber-500/5 to-transparent border-b border-gray-100 dark:border-gray-800">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                      <IoKeyOutline className="text-amber-500" />
                      {t("profile.security")}
                    </h2>
                    <button
                      onClick={() => setShowPassBox(!showPassBox)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                        showPassBox
                          ? "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
                          : "bg-amber-500 text-white hover:bg-amber-600 shadow-lg shadow-amber-500/30"
                      }`}
                    >
                      {showPassBox ? (
                        <span className="flex items-center gap-1">
                          <IoCloseOutline />
                          {t("common.cancel")}
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          {t("profile.resetPassword")}
                        </span>
                      )}
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  {showPassBox && (
                    <form
                      onSubmit={handlePassSubmit(onResetPass)}
                      className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-300"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* New Password */}
                        <div>
                          <label className="text-sm font-medium mb-2 block text-gray-700 dark:text-gray-300">
                            {t("profile.newPassword")}
                          </label>
                          <div className="relative">
                            <input
                              type={showNewPass ? "text" : "password"}
                              {...regPass("newPassword", {
                                required: true,
                                pattern:
                                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).+$/,
                              })}
                              className="w-full rounded-xl border-2 border-gray-200 dark:border-gray-700 p-3 pr-12 bg-transparent dark:text-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
                              placeholder={t("profile.enterNewPass")}
                            />
                            <button
                              type="button"
                              onClick={() => setShowNewPass(!showNewPass)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-amber-500 transition-colors p-1"
                            >
                              {showNewPass ? (
                                <IoEyeOffOutline size={20} />
                              ) : (
                                <IoEyeOutline size={20} />
                              )}
                            </button>
                          </div>

                          {/* Password Requirements */}
                          <div className="mt-3 space-y-2 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-xl">
                            <p className="text-xs font-medium text-gray-500 mb-2">
                              {t("profile.passRequirements")}
                            </p>
                            <div className="grid grid-cols-2 gap-2">
                              <div
                                className={`flex items-center gap-2 text-xs ${hasMinLength ? "text-green-500" : "text-gray-400"}`}
                              >
                                <span
                                  className={`h-2 w-2 rounded-full ${hasMinLength ? "bg-green-500" : "bg-gray-400"}`}
                                />
                                <span>{t("profile.reqLength")}</span>
                              </div>
                              <div
                                className={`flex items-center gap-2 text-xs ${hasUppercase ? "text-green-500" : "text-gray-400"}`}
                              >
                                <span
                                  className={`h-2 w-2 rounded-full ${hasUppercase ? "bg-green-500" : "bg-gray-400"}`}
                                />
                                <span>{t("profile.reqUpper")}</span>
                              </div>
                              <div
                                className={`flex items-center gap-2 text-xs ${hasLowercase ? "text-green-500" : "text-gray-400"}`}
                              >
                                <span
                                  className={`h-2 w-2 rounded-full ${hasLowercase ? "bg-green-500" : "bg-gray-400"}`}
                                />
                                <span>{t("profile.reqLower")}</span>
                              </div>
                              <div
                                className={`flex items-center gap-2 text-xs ${hasNumber ? "text-green-500" : "text-gray-400"}`}
                              >
                                <span
                                  className={`h-2 w-2 rounded-full ${hasNumber ? "bg-green-500" : "bg-gray-400"}`}
                                />
                                <span>{t("profile.reqNumber")}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                          <label className="text-sm font-medium mb-2 block text-gray-700 dark:text-gray-300">
                            {t("profile.confirmPassword")}
                          </label>
                          <div className="relative">
                            <input
                              type={showConfirmPass ? "text" : "password"}
                              {...regPass("confirmPassword", {
                                required: true,
                                validate: (v) =>
                                  // eslint-disable-next-line react-hooks/incompatible-library
                                  v === watch("newPassword") ||
                                  t("profile.passMismatch"),
                              })}
                              className={`w-full rounded-xl border-2 p-3 pr-12 bg-transparent dark:text-white transition-all focus:ring-2 focus:ring-amber-500/20 ${
                                passErrors.confirmPassword
                                  ? "border-red-300 focus:border-red-500"
                                  : passwordsMatch
                                    ? "border-green-500"
                                    : "border-gray-200 dark:border-gray-700"
                              }`}
                              placeholder={t("profile.confirmYourPass")}
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setShowConfirmPass(!showConfirmPass)
                              }
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-amber-500 transition-colors p-1"
                            >
                              {showConfirmPass ? (
                                <IoEyeOffOutline size={20} />
                              ) : (
                                <IoEyeOutline size={20} />
                              )}
                            </button>
                          </div>
                          {passErrors.confirmPassword && (
                            <p className="text-red-500 text-xs mt-2">
                              {passErrors.confirmPassword.message}
                            </p>
                          )}
                          {passwordsMatch && !passErrors.confirmPassword && (
                            <p className="text-green-500 text-xs mt-2">
                              {t("profile.passMatch")}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex justify-end pt-4 border-t border-gray-100 dark:border-gray-800">
                        <OutlineButton
                          type="submit"
                          disabled={
                            isChangingPass || !isValidPass || !passwordsMatch
                          }
                          className="min-w-[200px] bg-gradient-to-r from-amber-500 to-amber-600 text-white border-none shadow-lg shadow-amber-500/30 disabled:opacity-50"
                        >
                          {isChangingPass
                            ? t("common.loading")
                            : t("profile.saveNewPass")}
                        </OutlineButton>
                      </div>
                    </form>
                  )}

                  {!showPassBox && (
                    <div className="text-center py-8 text-gray-500">
                      <IoKeyOutline className="text-4xl mx-auto mb-3 text-amber-500/50" />
                      <p>{t("profile.passSecure")}</p>
                    </div>
                  )}
                </div>
              </section>

              {/* Danger Zone */}
              <section className="bg-white dark:bg-(--dark-alt-color) rounded-2xl shadow-xl border border-red-100 dark:border-red-900/30">
                <div className="px-6 py-4 bg-gradient-to-r from-red-500/5 to-transparent border-b border-red-100 dark:border-red-900/30">
                  <h2 className="text-lg font-semibold flex items-center gap-2 text-red-600">
                    <IoTrashOutline />
                    {t("profile.deleteAccount")}
                  </h2>
                </div>
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {t("profile.deleteHeading")}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {t("profile.deleteWarning")}
                      </p>
                    </div>
                    <OutlineButton
                      onClick={() => setIsModalOpen(true)}
                      className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white min-w-[140px]"
                    >
                      {t("profile.deleteAccount")}
                    </OutlineButton>
                  </div>
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={isModalOpen}
        onConfirm={handleDeleteAccount}
        onCancel={() => setIsModalOpen(false)}
        message={t("profile.deleteConfirmMsg")}
        title={t("profile.deleteAccount")}
        confirmText={t("profile.deleteForever")}
        confirmVariant="danger"
      />
    </>
  );
}
