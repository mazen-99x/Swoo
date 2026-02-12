import { Link } from "react-router";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";
import OutlineButton from "../OutlineButton";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";

function SignBtn() {
  const [user] = useState(false);
  const { t } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    <div
      className={`signin_button flex gap-2 items-center
        max-md:flex-col max-md:gap-4 max-md:justify-center
      `}
    >
      {user ? (
        <>
          <Link to="/profile">
            <OutlineButton className="flex items-center gap-2">
              <FaUserPlus className={isRTL ? "ml-2" : "mr-2"} />{" "}
              {t("signBtn.Profile")}
            </OutlineButton>
          </Link>
          <OutlineButton className="flex items-center gap-2">
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
    </div>
  );
}

export default SignBtn;
