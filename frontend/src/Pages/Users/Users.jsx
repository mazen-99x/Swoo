import { useState, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import i18n from "../../i18n";
import { useNavigate, useSearchParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";


import FormModal from "../../Components/Modals/FormModal";
import OutlineButton from "../../Components/Common/OutlineButton";
import ConfirmModal from "../../Components/Modals/ConfirmModal";

import {
  useDeleteAccountMutation,
  useGetUsersQuery,
  useLazyCheckUserEmailQuery,
  useRegisterUserMutation,
  useUpdateAdminUserMutation,
} from "../../Store/Actions/GetRegisiter";
import { logout } from "../../Store/Auth/AuthSlice";

const PAGE_SIZE = 5;

const Users = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = parseInt(searchParams.get("page") || "1");
  const [search, setSearch] = useState("");

  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [emailValue, setEmailValue] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user: currentUser } = useSelector((state) => state.auth);

  const isRTL = i18n.language === "ar";
  const dir = isRTL ? "rtl" : "ltr";


  const { data: users = [], isLoading, isError } = useGetUsersQuery();
  const [deleteAccount] = useDeleteAccountMutation();
  const [registerUser, { isLoading: isAdding }] = useRegisterUserMutation();
  const [updateAdminUser, { isLoading: isUpdating }] =
    useUpdateAdminUserMutation();

  const [
    triggerCheckEmail,
    { data: emailStatus, isFetching: isCheckingEmail },
  ] = useLazyCheckUserEmailQuery();


  const isEmailTaken =
    emailValue.length > 0 &&
    Array.isArray(emailStatus) &&
    emailStatus.length > 0; 

  
  const userFields = [
    { name: "name", label: "users.name", placeholder: "users.name" },
    {
      name: "email",
      type: "email",
      label: "users.email",
      placeholder: "users.email",
      disabled: isEdit,

      onChange: (e) => {
        const val = e.target.value;
        setEmailValue(val);
        if (!isEdit && val.includes("@") && val.includes(".")) {
          triggerCheckEmail(val);
        }
      },
      error: !isEdit && isEmailTaken ? t("messages.emailTaken") : null,
    },
    {
      name: "role",
      type: "select",
      label: "users.role",
      placeholder: "users.role",
      options: [
        { name: "admin", id: "admin" },
        { name: "user", id: "user" },
      ],
    },
    ...(!isEdit
      ? [
          {
            name: "password",
            type: "password",

            label: "users.password",
            placeholder: "users.password",
            hasChecklist: true, 
          },
        ]
      : []),
  ];

  const handleFormSubmit = async (formData) => {

    if (!isEdit && isEmailTaken) {
      toast.error(t("messages.emailTaken") || "Email already in use");
      return; 
    }

    try {
      if (isEdit) {
        await updateAdminUser({ id: selectedUser.id, ...formData }).unwrap();
        toast.success(t("messages.userUpdated"));
      } else {
        await registerUser(formData).unwrap();
        toast.success(t("messages.userAdded"));
      }
      setOpen(false);
    } catch (err) {
      
      if (err.status === 409) {
        toast.error(t("messages.emailTaken"));
      } else {
        toast.error(t("messages.error"));
      }
    }
  };
  const updateQueryParams = useCallback(
    (updates) => {
      const params = new URLSearchParams(searchParams);
      Object.keys(updates).forEach((key) => {
        const value = updates[key];
        if (!value || (key === "page" && String(value) === "1")) {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });
      setSearchParams(params);
    },
    [searchParams, setSearchParams],
  );

  const handleDelete = async (id) => {
    try {
      setIsModalOpen(false);
      await deleteAccount(id).unwrap();
      if (id === currentUser?.id) {
        navigate("/signup", { replace: true });
        dispatch(logout());
        return;
      }
      toast.success(t("messages.userDeleted"));
    } catch (err) {
      console.log(err);
      toast.error(t("messages.error"));
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase()),
  );
  const handlePageChange = (newPage) => {
    const pageval =
      typeof newPage == "function" ? newPage(currentPage) : newPage;
    updateQueryParams({ page: pageval });
  };
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );
  const totalPages = Math.ceil(filteredUsers.length / PAGE_SIZE);
  useEffect(() => {
 
    if (currentPage > 1 && paginatedUsers.length === 0 && !isLoading) {
      
      updateQueryParams({ page: currentPage - 1 });
    }
  }, [paginatedUsers.length, currentPage, updateQueryParams, isLoading]);
  const highlightText = (text, highlight) => {
    
    if (!highlight || !highlight.trim()) return text;

    const escapedHighlight = highlight
      .trim()
      .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  
    const regex = new RegExp(`(${escapedHighlight})`, "gi");
    const parts = text.split(regex);

    return (
      <span>
        {parts.map((part, i) =>
          
          regex.test(part) ? (
            <mark
              key={i}
              className="bg-(--main-color) text-(--white-color) rounded-sm px-0.5"
            >
              {part}
            </mark>
          ) : (
            part
          ),
        )}
      </span>
    );
  };
  if (isLoading)
    return <div className="p-10 text-center">{t("common.loading")}...</div>;
  if (isError)
    return (
      <div className="p-10 text-center text-red-500">{t("common.error")}</div>
    );

  return (
    <div className="p-4 md:p-6" dir={dir}>
      {/* Header & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold">{t("users.title")}</h1>
        <div className="flex gap-2">
          <input
            className="flex-1 bg-white dark:bg-gray-800 text-black dark:text-white p-2 border rounded-xl border-(--main-color) outline-none min-w-50"
            value={search}
            placeholder={t("productControl.search")}
            onChange={(e) => {
              setSearch(e.target.value);
              updateQueryParams({ page: 1 });
            }}
          />
          <OutlineButton
            onClick={() => {
              setIsEdit(false);
              setSelectedUser(null);
              setOpen(true);
            }}
            className="px-4 py-2 rounded-lg"
          >
            {t("users.add")}
          </OutlineButton>
        </div>
      </div>

      {/* Users Table */}
      <div className="overflow-hidden border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800">
        <div className="overflow-x-auto">
          <table className="w-full text-sm sm:text-base">
            <thead className="bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-200">
              <tr>
                <th className="p-4 text-start">{t("users.name")}</th>
                <th className="p-4 text-start hidden sm:table-cell">
                  {t("users.email")}
                </th>
                <th className="p-4 text-start hidden md:table-cell">
                  {t("users.role")}
                </th>
                <th className="p-4 text-center">{t("common.actions")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {paginatedUsers.map((u) => (
                <tr
                  key={u.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  <td className="p-4">
                    <div className="font-bold text-gray-900 dark:text-white">
                      {highlightText(u.name, search)}
                    </div>
                    <div className="text-xs text-gray-500 sm:hidden">
                      {highlightText(u.email, search)}
                    </div>
                  </td>
                  <td className="p-4 hidden sm:table-cell">
                    {highlightText(u.email, search)}
                  </td>
                  <td className="p-4 hidden md:table-cell">
                    <span
                      className={`px-2 py-1 rounded-md text-xs capitalize font-medium ${
                        u.role === "admin"
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex gap-2 justify-center">
                      <OutlineButton
                        onClick={() => {
                          setSelectedUser(u);
                          setIsEdit(true);
                          setOpen(true);
                        }}
                        className="border-blue-500 text-blue-500 hover:bg-blue-500 px-3 py-1 text-sm"
                      >
                        {t("common.edit")}
                      </OutlineButton>
                      <OutlineButton
                        onClick={() => {
                          setSelectedUserId(u.id);
                          setIsModalOpen(true);
                        }}
                        className="border-red-500 text-red-500 hover:bg-red-500 px-3 py-1 text-sm"
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
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-8">
          <OutlineButton
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="px-4 py-2"
          >
            {t("product.preview")}
          </OutlineButton>
          <div className="sm:hidden px-4 py-2 rounded-xl bg-(--main-color) text-white font-medium shadow">
            {currentPage} / {totalPages}
          </div>
          <div className="hidden sm:flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-10 h-10 cursor-pointer loading rounded-lg font-medium transition-all ${
                  currentPage === page
                    ? "bg-(--main-color) text-white shadow-md shadow-(--main-color)/30 scale-105"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-(--main-color)/50 hover:text-white hover:scale-105"
                } ${Math.abs(currentPage - page) > 1 && page !== 1 && page !== totalPages ? "hidden sm:block" : ""}`}
              >
                {page}
              </button>
            ))}
          </div>

          <OutlineButton
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-4 py-2"
          >
            {t("product.next")}
          </OutlineButton>
        </div>
      )}

      {/* Modals */}
      <ConfirmModal
        confirmText={t("users.confirmText")}
        isOpen={isModalOpen}
        onConfirm={() => handleDelete(selectedUserId)}
        onCancel={() => setIsModalOpen(false)}
        title={t("users.deleteTitle")}
        message={t("users.deleteMessage")}
      />

      <FormModal
        open={open}
        title={isEdit ? t("common.edit") : t("users.add")}
        fields={userFields}
        initialValues={isEdit ? selectedUser : null}
        onClose={() => {
          setOpen(false);
          setSelectedUser(null);
          setIsEdit(false);
        }}
        onSubmit={handleFormSubmit}
        isUploading={isAdding || isUpdating || isCheckingEmail}
        
        disableSubmit={isCheckingEmail || (!isEdit && isEmailTaken)}
        t={t}
        dir={dir}
      />
    </div>
  );
};

export default Users;
