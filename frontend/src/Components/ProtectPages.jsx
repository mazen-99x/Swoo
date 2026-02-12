import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const ProtectPages = ({ children, allowedRoles = [] }) => {
  const { t } = useTranslation();

  // Mock user role: "user" | "admin"
  const [role] = useState("admin"); // default can be "user" or "admin"

  const hasAccess = allowedRoles.includes(role);

  if (!hasAccess) {
    return (
      <div className="p-6 text-center flex justify-center items-center flex-col h-160">
        <h2 className="text-xl font-semibold mb-4">{t("auth.accessDenied")}</h2>

        <div className="mt-4">
          {t("auth.currentRole")}: {t(`auth.roles.${role}`)}
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectPages;
