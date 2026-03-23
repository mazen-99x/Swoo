import { useEffect, useMemo, useState } from "react";
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
import OutlineButton from "../../Components/Common/OutlineButton";
import ConfirmModal from "../../Components/Modals/ConfirmModal";
import { clearCart } from "../../Store/Cart/CartSlice";
import { clearWishList } from "../../Store/Wishlist/WishlistSlice";
import FormInput from "../../Components/Common/FormInput";
import RequirementItem from "../../Components/Common/RequirementItem";

export default function Profile() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPassBox, setShowPassBox] = useState(false);
  // const [showNewPass, setShowNewPass] = useState(false);
  // const [showConfirmPass, setShowConfirmPass] = useState(false);
  const { items } = useSelector((state) => state.cart);
  const { wishItems } = useSelector((state) => state.wishlist);

  // OPTION A: Count unique products
  const cartCount = useMemo(() => {
    return Object.keys(items).length;
  }, [items]);
  const wishlistCount = useMemo(() => {
    return wishItems.length;
  }, [wishItems]);
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
    reset: resetNameForm,
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
  } = useForm({ mode: "onSubmit" });

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
      // 1. Tell the database to delete the user
      await deleteAccount(user.id).unwrap();

      // 2. Success! Now immediately wipe the local memory
      dispatch(logout());
      dispatch(clearCart());
      dispatch(clearWishList());

      // 3. Feedback and Redirect
      toast.success(t("profile.accountDeletedSuccess"));
      navigate("/signup", { replace: true }); // 'replace' prevents them from clicking 'back' to a deleted profile
    } catch (err) {
      console.error("Delete Error:", err);
      toast.error(t("profile.deleteFailed"));
    }
  };
  // Add this inside your Profile() function, near your other hooks
  useEffect(() => {
    if (user) {
      resetNameForm({
        name: user.name,
        email: user.email,
      });
    }
  }, [user, resetNameForm]);
  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 dark:from-(--dark-alt-color) dark:to-(--dark-secondary-color) p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8 text-start">
            <h1 className="text-3xl font-bold  text-(--main-color) ">
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
                  <div className="h-24 bg-linear-to-r from-(--main-color) to-(--main-color-dark) relative">
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
                    {user && user.role !== "admin" && (
                      <>
                        <div className="flex justify-center gap-4 mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                          <div className="text-center">
                            <div className="text-xl font-bold text-(--main-color)">
                              {cartCount}
                            </div>
                            <div className="text-xs text-gray-500">
                              {t("profile.orders")}
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-xl font-bold text-(--main-color)">
                              {wishlistCount}
                            </div>
                            <div className="text-xs text-gray-500">
                              {t("profile.wishlist")}
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 space-y-6 text-start">
              {/* Profile Card */}
              <section className="bg-white dark:bg-(--dark-alt-color) rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-800">
                <div className="px-6 py-4 bg-linear-to-r from-(--main-color)/5 to-transparent border-b border-gray-100 dark:border-gray-800">
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
                      <FormInput
                        labelKey="profile.fullName"
                        placeholderKey="profile.enterName"
                        error={nameErrors.name}
                        {...regName("name", { required: true })} // Spread this LAST
                        defaultValue={user?.name} // This ensures the data shows up
                      />

                      <FormInput
                        labelKey="profile.emailAddress"
                        disabled={true}
                        value={user?.email || ""}
                        readOnly
                        className="bg-gray-50 dark:bg-gray-800 text-gray-500 cursor-not-allowed"
                      />
                    </div>

                    <div className="flex justify-end">
                      <OutlineButton
                        type="submit"
                        disabled={isUpdating || !isNameDirty}
                        className="min-w-35 disabled:opacity-50"
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
                <div className="px-6 py-4 bg-linear-to-r from-amber-500/5 to-transparent border-b border-gray-100 dark:border-gray-800">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                      <IoKeyOutline className="text-amber-500" />
                      {t("profile.security")}
                    </h2>
                    <OutlineButton
                      onClick={() => setShowPassBox(!showPassBox)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                        showPassBox
                          ? "bg-red-500 text-red-500 border-red-500 hover:bg-red-500"
                          : "bg-amber-500 text-amber-500 border-amber-500 hover:bg-amber-500  shadow-lg shadow-amber-500/30"
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
                    </OutlineButton>
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
                          <FormInput
                            type="password"
                            labelKey="profile.newPassword"
                            placeholderKey="profile.enterNewPass"
                            error={passErrors.newPassword}
                            {...regPass("newPassword", {
                              required: true,
                              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).+$/,
                            })}
                          />

                          {/* Password Requirements UI (Keep this as is) */}
                          <div className="mt-3 space-y-2 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-xl">
                            <p className="text-xs font-medium text-gray-500 mb-2">
                              {t("profile.passRequirements")}
                            </p>
                            <div className="grid grid-cols-2 gap-2">
                              <RequirementItem
                                label={t("profile.reqLength")}
                                met={hasMinLength}
                              />
                              <RequirementItem
                                label={t("profile.reqUpper")}
                                met={hasUppercase}
                              />
                              <RequirementItem
                                label={t("profile.reqLower")}
                                met={hasLowercase}
                              />
                              <RequirementItem
                                label={t("profile.reqNumber")}
                                met={hasNumber}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Confirm Password */}
                        <FormInput
                          type="password"
                          labelKey="profile.confirmPassword"
                          placeholderKey="profile.confirmYourPass"
                          error={passErrors.confirmPassword}
                          {...regPass("confirmPassword", {
                            required: true,
                            validate: (v) =>
                              // eslint-disable-next-line react-hooks/incompatible-library
                              v === watch("newPassword") ||
                              t("profile.passMismatch"),
                          })}
                          // Extra styling to show success state
                          className={
                            passwordsMatch && !passErrors.confirmPassword
                              ? "border-green-500"
                              : ""
                          }
                        />
                      </div>

                      {/* Success Message for matching passwords */}
                      {passwordsMatch && !passErrors.confirmPassword && (
                        <p className="text-green-500 text-xs mt-[-3.75] mb-4">
                          {t("profile.passMatch")}
                        </p>
                      )}

                      <div className="flex justify-end pt-4 border-t border-gray-100 dark:border-gray-800">
                        <OutlineButton
                          type="submit"
                          disabled={
                            isChangingPass || !isValidPass || !passwordsMatch
                          }
                          className="min-w-50  disabled:opacity-50"
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
                <div className="px-6 py-4 bg-linear-to-r from-red-500/5 to-transparent border-b border-red-100 dark:border-red-900/30">
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
                      className="border-red-500 text-red-500 hover:bg-red-500  min-w-35"
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
