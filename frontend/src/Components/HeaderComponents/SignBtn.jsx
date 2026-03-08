import { Link, useNavigate } from "react-router";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";
import OutlineButton from "../OutlineButton";
// import { useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Store/Auth/AuthSlice";
import { toast } from "sonner";
import ConfirmModal from "../ConfirmModal";
import { useState } from "react";
function SignBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleLogout = () => {
    dispatch(logout());
    setIsModalOpen(false);
    toast.success(t("logged_out"));
    navigate("/signup");
  };
  const { token,  } = useSelector((state) => state.auth);

  const { t } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    <div
      className={`signin_button flex gap-2 items-center
        max-md:flex-col max-md:gap-4 max-md:justify-center
      `}
    >
      {token ? (
        <>
          <Link to="/profile">
            <OutlineButton className="flex items-center gap-2">
              <FaUserPlus className={isRTL ? "ml-2" : "mr-2"} />{" "}
              {t("signBtn.Profile")}
            </OutlineButton>
          </Link>
          <OutlineButton
            onClick={() => setIsModalOpen(!isModalOpen)}
            className="flex items-center gap-2"
          >
            <FaSignInAlt className={isRTL ? "ml-2" : "mr-2"} />{" "}
            {t("signBtn.Log Out")}
          </OutlineButton>
        </>
      ) : (
        <>
          <Link to="/signup">
            <OutlineButton className="flex items-center gap-2">
              <FaUserPlus className={isRTL ? "ml-2" : "mr-2"} />{" "}
              {t("signBtn.Sign Up")}
            </OutlineButton>
          </Link>
          <Link to="/signin">
            <OutlineButton className="flex items-center gap-2">
              <FaSignInAlt className={isRTL ? "ml-2" : "mr-2"} />{" "}
              {t("signBtn.Sign In")}
            </OutlineButton>
          </Link>
        </>
      )}
      <ConfirmModal
        confirmText="Yes Logout"
        onConfirm={handleLogout}
        onCancel={() => {
          setIsModalOpen(false);
        }}
        isOpen={isModalOpen}
        title="Logout?"
        message="Are you sure you want to log out of your account?"
      />
    </div>
  );
}

export default SignBtn;
