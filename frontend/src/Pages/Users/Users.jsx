import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import FormModal from "../../Components/FormModal";
import OutlineButton from "../../Components/OutlineButton";
import i18n from "../../i18n";

const mockUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "admin" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "user" },
];

const Users = () => {
  const { t } = useTranslation();
  const isRTL = i18n.language === "ar";
  const dir = isRTL ? "rtl" : "ltr";
  const [open, setOpen] = useState(false);

  const userFields = [
    { name: "name", label: "users.name", placeholder: "users.name" },
    {
      name: "email",
      type: "email",
      label: "users.email",
      placeholder: "users.email",
    },
    { name: "role", label: "users.role", placeholder: "users.role" },
  ];

  return (
    <div className="p-4 md:p-6" dir={dir}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white text-right">
          {t("users.title")}
        </h1>

        <OutlineButton
          onClick={() => setOpen(true)}
          className="px-4 py-2 rounded-lg  sm:w-auto"
        >
          {t("users.add")}
        </OutlineButton>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table
          className={`w-full border border-gray-200 dark:border-gray-700 rounded-lg ${
            isRTL ? "text-right" : "text-left"
          }`}
        >
          <thead className="bg-(--white-color) dark:bg-(--dark-alt-color)">
            <tr>
              <th className="p-3">{t("users.name")}</th>
              <th className="p-3">{t("users.email")}</th>
              <th className="p-3">{t("users.role")}</th>
              <th className="p-3">{t("common.actions")}</th>
            </tr>
          </thead>
          <tbody>
            {mockUsers.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3 capitalize">{user.role}</td>
                <td className="p-3">
                  <div className="flex gap-2 justify-end">
                    <OutlineButton
                      className="border-blue-500
        text-blue-500 hover:bg-blue-500 hover:text-white"
                    >
                      {t("common.edit")}
                    </OutlineButton>
                    <OutlineButton
                      className="border-red-500
        text-red-500 hover:bg-red-500 hover:text-white"
                    >
                      {t("common.delete")}
                    </OutlineButton>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {mockUsers.map((user) => (
          <div key={user.id} className="border rounded-lg p-4 text-right">
            <p className="font-semibold">{user.name}</p>
            <p className="text-sm text-gray-600">{user.email}</p>

            <div className="flex gap-4 mt-4 justify-end">
              <OutlineButton
                className="border-blue-500
        text-blue-500 hover:bg-blue-500 hover:text-white"
              >
                {t("common.edit")}
              </OutlineButton>
              <OutlineButton
                className="border-red-500
        text-red-500 hover:bg-red-500 hover:text-white"
              >
                {t("common.delete")}
              </OutlineButton>
            </div>
          </div>
        ))}
      </div>

      {/* Add User Modal */}
      <FormModal
        open={open}
        title={t("users.add")}
        fields={userFields}
        onClose={() => setOpen(false)}
        onSubmit={() => setOpen(false)}
        t={t}
        dir={dir}
      />
    </div>
  );
};

export default Users;
