import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

/**
 * Custom Hook to handle authentication and role-based action checks.
 * Use this for Add to Cart, Wishlist, etc.
 */
export const useActionCheck = (user) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const checkAction = (action) => {
    // 1. GUEST CHECK (Not logged in)
    if (!user) {
      toast.error(t("messages.loginRequired"), {
        
        action: {
          label: t("common.login"),
          onClick: () => navigate("/signin"),
        },
        actionButtonStyle: {
          backgroundColor: "var(--main-color)",
          color: "white",
          borderRadius: "8px",
          padding: "8px 16px",
          fontWeight: "600",
        },
      });
      return;
    }

    // 2. ADMIN CHECK (Logged in but restricted)
    if (user?.role === "admin") {
      toast.warning(t("messages.adminRestricted"), {
        description: t("messages.adminNoShopping"),
        duration: 4000,
      });
      return;
    }

    // 3. SUCCESS (Regular User)
    if (action && typeof action === "function") {
      action();
    }
  };

  return { checkAction };
};
