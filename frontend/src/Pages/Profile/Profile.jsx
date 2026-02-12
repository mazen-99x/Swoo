import OutlineButton from "../../Components/OutlineButton";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";

export default function Profile() {
  const { t } = useTranslation();

  const sidebarItems = [
    "Account info",
    "My order",
    "My address",
    "Change password",
  ];

  return (
    <div className="min-h-screen bg-(--white-color) dark:bg-(--dark-alt-color) p-4 my-6">
      <div className="mx-auto h-full max-w-6xl rounded-xl bg-(--gray-color) dark:bg-(--dark-secondary-color) p-4 shadow md:p-6">
        <div className="flex flex-col gap-6 md:flex-row">
          {/* Sidebar */}
          <aside className="w-full md:w-64">
            <div className="flex flex-col items-center rounded-xl bg-(--white-color) dark:bg-(--dark-alt-color) p-4 text-center">
              <img
                src="./assets/About/profile.png"
                alt={t("profile.avatar")}
                className="mb-3 h-20 w-20 rounded-full"
              />
              <h3 className="font-semibold">
                {t("profile.name", { name: "Mark Cole" })}
              </h3>
              <p className="text-sm text-gray-500">
                {t("profile.email", { email: "swoo@gmail.com" })}
              </p>
            </div>

            <nav className="mt-4 flex max-sm:flex-col gap-2 md:flex-col">
              {sidebarItems.map((item, i) => (
                <button
                  key={item}
                  className={`flex w-full items-center justify-between rounded-lg px-4 py-2 text-sm font-medium transition
                    ${i === 0 ? "bg-(--main-color)" : "bg-(--white-color) dark:bg-(--dark-alt-color)"}`}
                >
                  {t(`profile.sidebar.${item}`)}
                  <span>{i18n.language === "ar" ? "←" : "→"}</span>
                </button>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <main className="flex-1">
            <h2 className="mb-6 text-xl font-semibold">
              {t("profile.accountInfo")}
            </h2>

            <form className="space-y-5">
              {/* First & Last name */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    {t("profile.firstName")} *
                  </label>
                  <input
                    placeholder="Mark"
                    className="w-full rounded-lg border px-3 py-2 focus:border-(--main-color) focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">
                    {t("profile.lastName")} *
                  </label>
                  <input
                    placeholder="Cole"
                    className="w-full rounded-lg border px-3 py-2 focus:border-(--main-color) focus:outline-none"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="mb-1 block text-sm font-medium">
                  {t("profile.emailAddress")} *
                </label>
                <input
                  placeholder="swoo@gmail.com"
                  className="w-full rounded-lg border px-3 py-2 focus:border-(--main-color) focus:outline-none"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="mb-1 block text-sm font-medium">
                  {t("profile.phoneNumber")}
                </label>
                <input
                  placeholder="+1 0231 4554 452"
                  className="w-full rounded-lg border px-3 py-2 focus:border-(--main-color) focus:outline-none"
                />
              </div>

              {/* Save button */}
              <OutlineButton className="px-7">
                {t("profile.save")}
              </OutlineButton>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
}
