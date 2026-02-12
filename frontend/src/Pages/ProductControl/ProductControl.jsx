import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import FormModal from "../../Components/FormModal";
import OutlineButton from "../../Components/OutlineButton";
import i18n from "../../i18n";

const mockProducts = [
  {
    id: 8,
    title: "Huawei MateBook X  (Silver)",
    brand: "Huawei",
    price: 1649,
    stock: 11,
    thumbnail:
      "https://cdn.dummyjson.com/product-images/laptops/huawei-matebook-x-pro/2.webp",
  },
  {
    id: 9,
    title: "Huawei MateBook X Pro (Silver)",
    brand: "Huawei",
    price: 1749,
    stock: 11,
    thumbnail:
      "https://cdn.dummyjson.com/product-images/laptops/huawei-matebook-x-pro/1.webp",
  },
];

const ProductControl = () => {
  const { t } = useTranslation();
  const isRTL = i18n.language === "ar";
  const dir = isRTL ? "rtl" : "ltr";
  const [open, setOpen] = useState(false);

  const productFields = [
    { name: "image", type: "image", label: "productControl.image" },
    {
      name: "title",
      label: "productControl.title",
      placeholder: "productControl.title",
    },
    {
      name: "brand",
      label: "productControl.brand",
      placeholder: "productControl.brand",
    },
    {
      name: "price",
      type: "number",
      label: "productControl.price",
      placeholder: "productControl.price",
    },
    {
      name: "stock",
      type: "number",
      label: "productControl.stock",
      placeholder: "productControl.stock",
    },
  ];

  return (
    <div className="p-4 md:p-6" dir={dir}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1
          className={`text-2xl font-bold  ${
            isRTL ? "text-right" : "text-left"
          }`}
        >
          {t("productControl.title")}
        </h1>

        <OutlineButton
          onClick={() => setOpen(true)}
          className="px-4 py-2 rounded-lg  sm:w-aut"
        >
          {t("productControl.add")}
        </OutlineButton>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table
          className={`w-full border border-gray-200 dark:border-gray-700 rounded-lg ${
            isRTL ? "text-right" : "text-left"
          }`}
        >
          <thead className="bg-(--white-color) dark:bg-(--dark-alt-color) ">
            <tr>
              <th className="p-3">{t("productControl.product")}</th>
              <th className="p-3">{t("productControl.price")}</th>
              <th className="p-3">{t("productControl.stock")}</th>
              <th className="p-3">{t("common.actions")}</th>
            </tr>
          </thead>

          <tbody>
            {mockProducts.map((product) => (
              <tr key={product.id} className="border-t ">
                <td className="p-3">
                  <div
                    className="flex items-center gap-3 
                    "
                  >
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-semibold">{product.title}</p>
                      <p className="text-sm text-gray-500">{product.brand}</p>
                    </div>
                  </div>
                </td>

                <td className="p-3">${product.price}</td>
                <td className="p-3">{product.stock}</td>

                <td className="p-3">
                  <div
                    className={`flex gap-2 ${
                      isRTL ? "justify-end" : "justify-end"
                    }`}
                  >
                    <OutlineButton className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white">
                      {t("common.edit")}
                    </OutlineButton>

                    <OutlineButton className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
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
        {mockProducts.map((product) => (
          <div
            key={product.id}
            className={`border rounded-lg p-4 ${
              isRTL ? "text-right" : "text-left"
            }`}
          >
            <div className={`flex gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div>
                <p className="font-semibold">{product.title}</p>
                <p className="text-sm text-gray-500">{product.brand}</p>
              </div>
            </div>

            <div
              className={`flex justify-between mt-4 text-sm ${
                isRTL ? "flex-row-reverse" : ""
              }`}
            >
              <span>
                {t("productControl.price")}: ${product.price}
              </span>
              <span>
                {t("productControl.stock")}: {product.stock}
              </span>
            </div>

            <div
              className={`flex gap-4 mt-4 ${
                isRTL ? "justify-end" : "justify-start"
              }`}
            >
              <OutlineButton className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white">
                {t("common.edit")}
              </OutlineButton>

              <OutlineButton className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
                {t("common.delete")}
              </OutlineButton>
            </div>
          </div>
        ))}
      </div>

      {/* Add Product Modal */}
      <FormModal
        open={open}
        title={t("productControl.add")}
        fields={productFields}
        onClose={() => setOpen(false)}
        onSubmit={() => setOpen(false)}
        t={t}
        dir={dir}
      />
    </div>
  );
};

export default ProductControl;
