import React from "react";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";

import {
  useGetUserCountQuery,
  useGetProductCountQuery,
} from "../../Store/Actions/GetRegisiter";

const topUsers = [
  { id: 1, name: "Ahmed Ali", purchases: 12 },
  { id: 2, name: "Sarah Mohamed", purchases: 9 },
  { id: 3, name: "John Smith", purchases: 7 },
];

const topProducts = [
  { id: 1, title: "Huawei MateBook X Pro", sold: 22 },
  { id: 2, title: "iPhone 15 Pro", sold: 18 },
  { id: 3, title: "Samsung Galaxy S23", sold: 15 },
];

const Dashboard = () => {
  const { t } = useTranslation();
  const { data: users, isLoading: userLoading } = useGetUserCountQuery();
  const { data: products, isLoading: productLoading } =
    useGetProductCountQuery();
  console.log(users);
  const isRTL = i18n.language === "ar";
  const dir = isRTL ? "rtl" : "ltr";
  const stats = [
    {
      key: "totalUsers",
      value: userLoading ? "..." : users || 0,
    },
    { key: "totalProducts", value: productLoading ? "..." : products || 0 },
    { key: "orders", value: 342 },
    { key: "revenue", value: "$12,430" },
  ];
  return (
    <div className="p-4 md:p-6 space-y-6" dir={dir}>
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.key}
            className="bg-(--white-color) dark:bg-(--dark-alt-color) p-4 rounded-lg border"
          >
            <p
              className={`text-sm dark:text-gray-300 text-gray-600 ${
                isRTL ? "text-right" : "text-left"
              }`}
            >
              {t(`dashboard.${stat.key}`)}
            </p>
            <p
              className={`text-2xl font-bold ${
                isRTL ? "text-right" : "text-left"
              }`}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Top Users & Products */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Top Users */}
        <div className="bg-(--white-color) dark:bg-(--dark-alt-color) p-4 rounded-lg border">
          <h2
            className={`font-semibold mb-4 ${
              isRTL ? "text-right" : "text-left"
            }`}
          >
            {t("dashboard.topUsers")}
          </h2>
          <ul className="space-y-3">
            {topUsers.map((user) => (
              <li
                key={user.id}
                className={`flex justify-between text-sm ${
                  isRTL ? "flex-row-reverse" : ""
                }`}
              >
                <span>{user.name}</span>
                <span className="font-semibold">
                  {user.purchases} {t("dashboard.purchases")}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Top Products */}
        <div className="bg-(--white-color) dark:bg-(--dark-alt-color) p-4 rounded-lg border">
          <h2
            className={`font-semibold mb-4 ${
              isRTL ? "text-right" : "text-left"
            }`}
          >
            {t("dashboard.topProducts")}
          </h2>
          <ul className="space-y-3">
            {topProducts.map((product) => (
              <li
                key={product.id}
                className={`flex justify-between text-sm ${
                  isRTL ? "flex-row-reverse" : ""
                }`}
              >
                <span>{product.title}</span>
                <span className="font-semibold">
                  {product.sold} {t("dashboard.sold")}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
