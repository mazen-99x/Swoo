import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import FormModal from "../../Components/FormModal";
import OutlineButton from "../../Components/OutlineButton";
import i18n from "../../i18n";
import UseGetSeller from "../../Hooks/UseGetSeller";
import axios from "axios";
import { useSearchParams } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const page_size = 5;

const ProductControl = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1");
  const { t } = useTranslation();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const productFields = [
    { name: "id", type: "string", label: "productControl.id" },

    { name: "thumbnail", type: "image", label: "productControl.image" },

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
      name: "type",

      type: "select",

      label: "productControl.category",

      placeholder: "productControl.category",

      options: [
        { name: "popular", id: 1 },

        { name: "bestSeller", id: 2 },

        { name: "newIn", id: 3 },
      ],
    },

    {
      name: "price",

      type: "number",

      label: "productControl.price",

      placeholder: "productControl.price",
    },

    {
      name: "rating",

      type: "number",

      label: "productControl.rating",

      placeholder: "productControl.rating",
    },

    {
      name: "discountPercentage",

      type: "number",

      label: "productControl.discountPercentage",

      placeholder: "productControl.discountPercentage",
    },

    {
      name: "stock",

      type: "number",

      label: "productControl.stock",

      placeholder: "productControl.stock",
    },

    {
      name: "description",

      type: "text",

      label: "productControl.description",

      placeholder: "productControl.description",
    },
  ];
  const isRTL = i18n.language === "ar";
  const dir = isRTL ? "rtl" : "ltr";

  const { data, isLoading, isError } = UseGetSeller();
  const queryClient = useQueryClient();

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const updateQueryParams = useCallback(
    (updates) => {
      const params = new URLSearchParams(searchParams);
      Object.keys(updates).forEach((key) => {
        const value = updates[key];
        if (
          value === null ||
          value === "" ||
          (key === "page" && String(value) === "1")
        ) {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });
      setSearchParams(params);
    },
    [searchParams, setSearchParams],
  );

  // Mutations
  const deleteMutation = useMutation({
    mutationFn: (id) => axios.delete(`http://localhost:5000/products/${id}`),
    onSuccess: () => queryClient.invalidateQueries(["seller"]),
  });

  const editMutation = useMutation({
    mutationFn: ({ id, updatedProduct }) =>
      axios.patch(`http://localhost:5000/products/${id}`, {
        ...updatedProduct,
        badge: updatedProduct.type,
      }),
    onSuccess: () => queryClient.invalidateQueries(["seller"]),
  });

  const addMutation = useMutation({
    mutationFn: (newProduct) =>
      axios.post(`http://localhost:5000/products`, {
        ...newProduct,
        badge: newProduct.type,
      }),
    onSuccess: () => queryClient.invalidateQueries(["seller"]),
  });

  if (isLoading)
    return (
      <div className="p-10 text-center font-bold">{t("common.loading")}...</div>
    );
  if (isError)
    return (
      <div className="p-10 text-center text-red-500 font-bold">
        {t("common.error")}
      </div>
    );

  // Filter and Paginate
  const filteredProducts =
    data?.filter((e) =>
      e.title
        .toLowerCase()
        .replace(/\s+/g, "")
        .includes(search.toLowerCase().replace(/\s+/g, "")),
    ) || [];

  const totalPages = Math.ceil(filteredProducts.length / page_size);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * page_size,
    currentPage * page_size,
  );

  const handlePageChange = (newPage) => {
    const pageval =
      typeof newPage == "function" ? newPage(currentPage) : newPage;
    updateQueryParams({ page: pageval });
  };

  return (
    <div className="p-4 md:p-6" dir={dir}>
      {/* Header Area */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold">{t("productControl.title")}</h1>
        <div className="flex gap-2">
          <input
            className="flex-1 bg-white text-black p-2 outline-0 border rounded-xl border-(--main-color) min-w-50"
            value={search}
            placeholder={t("productControl.search")}
            onChange={(e) => {
              setSearch(e.target.value);
              updateQueryParams({ page: 1 });
            }}
          />
          <OutlineButton
            onClick={() => {
              setSelectedProduct(null);
              setIsEdit(false);
              setOpen(true);
            }}
            className="px-4 py-2 rounded-lg whitespace-nowrap"
          >
            {t("productControl.add")}
          </OutlineButton>
        </div>
      </div>

      {/* Combined Responsive Table */}
      <div className="overflow-hidden border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800">
        <div className="overflow-x-auto">
          <table className="w-full text-sm sm:text-base">
            <thead className="bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-200">
              <tr>
                <th className="p-4 text-start font-semibold">
                  {t("productControl.product")}
                </th>
                <th className="p-4 text-start font-semibold hidden sm:table-cell">
                  {t("productControl.price")}
                </th>
                <th className="p-4 text-start font-semibold hidden md:table-cell">
                  {t("productControl.stock")}
                </th>
                <th className="p-4 text-center font-semibold">
                  {t("common.actions")}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {paginatedProducts.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.thumbnail}
                        className="w-12 h-12 rounded-lg object-cover bg-gray-100"
                        alt=""
                      />
                      <div>
                        <p className="font-bold text-gray-900 dark:text-white line-clamp-1">
                          {product.title}
                        </p>
                        <p className="text-xs text-gray-500 sm:hidden">
                          ${product.price}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 hidden sm:table-cell dark:text-gray-300">
                    ${product.price}
                  </td>
                  <td className="p-4 hidden md:table-cell dark:text-gray-300">
                    {product.stock}
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2 justify-center">
                      <OutlineButton
                        onClick={() => {
                          setSelectedProduct(product);
                          setIsEdit(true);
                          setOpen(true);
                        }}
                        className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-3 py-1 text-sm"
                      >
                        {t("common.edit")}
                      </OutlineButton>
                      <OutlineButton
                        onClick={() => deleteMutation.mutate(product.id)}
                        className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-3 py-1 text-sm "
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

      {/* Reusable Pagination for both Desktop/Mobile */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-8">
          <OutlineButton
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="px-4 py-2"
          >
            {t("product.preview")}
          </OutlineButton>

          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-10 h-10 cursor-pointerloading rounded-lg font-medium transition-all ${
                  currentPage === page
                    ? "bg-(--main-color) text-white shadow-lg"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
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

      {/* Form Modal (Keep your existing one) */}
      <FormModal
        open={open}
        title={isEdit ? t("common.edit") : t("productControl.add")}
        fields={productFields}
        initialValues={selectedProduct}
        onClose={() => setOpen(false)}
        onSubmit={(formData) => {
          const cleanedData = { ...formData };
          ["price", "stock", "discountPercentage", "rating"].forEach(
            (f) => (cleanedData[f] = Number(cleanedData[f] || 0)),
          );
          isEdit
            ? editMutation.mutate({
                id: selectedProduct.id,
                updatedProduct: cleanedData,
              })
            : addMutation.mutate(cleanedData);
          setOpen(false);
        }}
        t={t}
        dir={dir}
      />
    </div>
  );
};

export default ProductControl;
