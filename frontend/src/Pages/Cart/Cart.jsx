import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import OutlineButton from "../../Components/OutlineButton";
import {
  addToCart,
  removeFromCart,
  clearCart,
} from "../../Store/Cart/CartSlice";

import { HiArrowLongLeft } from "react-icons/hi2";
import { HiOutlineTrash } from "react-icons/hi"; // Added Trash Icon
import i18n from "../../i18n";
import LoadingPage from "../../Components/LoadingPage";
import EmptyPage from "../../Components/EmptyPage";
import { useGetProductsByIdsQuery } from "../../Store/Actions/GetProductsId";
import { toast } from "sonner";
import { useState } from "react";
import ConfirmModal from "../../Components/ConfirmModal";

const Cart = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isRTL = i18n.language === "ar";

  const slugify = (text) =>
    text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

  const { items } = useSelector((state) => state.cart);

  const ids = Object.keys(items);

  const { data: products, isLoading } = useGetProductsByIdsQuery(ids, {
    skip: ids.length === 0,
    keepPreviousData: true,
  });

  const subTotal =
    products?.reduce((acc, product) => {
      return acc + product.price * items[product.id];
    }, 0) || 0;

  const shippingEstimate = ids.length > 0 ? 5.0 : 0;
  const taxEstimate = subTotal * 0.1;
  const orderTotal = subTotal + shippingEstimate + taxEstimate;

  if (ids.length === 0)
    return (
      <EmptyPage
        translate={t}
        icon={
          <svg
            className="w-32 h-32 text-(--main-color)/80"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
        }
        title={`${t("cart.empty")}`}
        desc={`${t("cart.desc")}`}
      />
    );
  if (isLoading) {
    return (
      <LoadingPage
        text={`${t("cart.loading")}`}
        icon={
          <svg
            className="w-32 h-32 text-(--main-color)/80"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
        }
      />
    );
  }
  const handleClear = () => {
    dispatch(clearCart());
    setIsModalOpen(false);

    toast.success(t("cart.clearedSuccess"), {
      description: t("cart.cleared_desc"),
      duration: 3000,
    });
  };

  return (
    <>
      <div
        className="bg-(--white-color) dark:bg-(--dark-alt-color) py-10 my-6 px-4 md:px-6 rounded-xl shadow-sm"
        dir={isRTL ? "rtl" : "ltr"}
      >
        <div className="max-w-7xl mx-auto">
          {/* Header with Clear Cart Button */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200 dark:border-gray-700">
            <div>
              <h1 className="text-2xl font-bold">{t("cart.title")}</h1>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {ids.length}{" "}
                {ids.length === 1 ? t("cart.item") : t("cart.items")}
              </span>
            </div>
            <OutlineButton
              onClick={() => {
                setIsModalOpen(!isModalOpen);
              }}
              className="flex items-center gap-2 border-red-500 text-red-500 hover:bg-red-500"
            >
              <HiOutlineTrash className="text-lg" />
              {t("cart.clear_cart")}
            </OutlineButton>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {products?.map((product) => (
                <div
                  key={product.id}
                  className="group bg-(--gray-color) dark:bg-(--dark-secondary-color) rounded-xl p-4 md:p-6 flex flex-col sm:flex-row gap-6 hover:shadow-md transition-shadow"
                >
                  <Link
                    to={`/${slugify(product.title)}/${product.id}`}
                    className="shrink-0"
                  >
                    <div className="w-28 h-28 md:w-32 md:h-32 bg-white rounded-lg p-3 group-hover:scale-105 transition-transform">
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </Link>

                  <div className="flex-1 flex flex-col">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <div>
                        <Link
                          to={`/${slugify(product.title)}/${product.id}`}
                          className="hover:text-(--main-color) transition-colors"
                        >
                          <h4 className="font-medium text-sm md:text-base mb-1">
                            {product.title}
                          </h4>
                        </Link>
                        <p className="text-lg font-semibold text-(--main-color) mb-3">
                          ${product.price.toFixed(2)}
                        </p>
                      </div>

                      <p
                        className={`text-xs flex items-center gap-1 sm:self-start ${product.stock > 0 ? "text-green-600" : "text-red-500"}`}
                      >
                        <span className="w-2 h-2 rounded-full bg-current"></span>
                        {product.stock > 0
                          ? t("cart.in_stock")
                          : t("cart.out_of_stock")}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center overflow-hidden">
                        <OutlineButton
                          onClick={() => dispatch(removeFromCart(product.id))}
                          className="px-4 py-2 text-lg font-medium hover:bg-(--main-color) hover:text-white transition-colors "
                        >
                          −
                        </OutlineButton>
                        <span className="px-4 py-1 font-bold min-w-10 text-center">
                          {items[product.id]}
                        </span>
                        <OutlineButton
                          onClick={() =>
                            dispatch(
                              addToCart({
                                id: product.id,
                                stock: product.stock,
                              }),
                            )
                          }
                          className="px-4 py-2 text-lg font-medium hover:bg-(--main-color) hover:text-white transition-colors disabled:opacity-50"
                          disabled={
                            items[product.id] >= Math.min(5, product.stock)
                          }
                        >
                          +
                        </OutlineButton>
                      </div>

                      <div className="text-right">
                        <p className="text-xs text-gray-500">
                          {t("cart.subtotal")}
                        </p>
                        <p className="font-semibold">
                          ${(product.price * items[product.id]).toFixed(2)}
                        </p>
                      </div>
                    </div>

                    {items[product.id] >= 5 && (
                      <p className="text-[10px] text-orange-500 mt-1">
                        {t("cart.limit_reached")}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col h-full">
              <div className="bg-(--white-color) mt-auto dark:bg-(--dark-secondary-color) rounded-xl p-6 border border-(--main-color) shadow-sm">
                <h3 className="font-semibold text-lg mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
                  {t("cart.order_summary")}
                </h3>

                <div className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">{t("cart.sub_total")}</span>
                    <span className="font-medium">${subTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">
                      {t("cart.shipping_estimate")}
                    </span>
                    <span className="font-medium">
                      ${shippingEstimate.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">
                      {t("cart.tax_estimate")}
                    </span>
                    <span className="font-medium">
                      ${taxEstimate.toFixed(2)}
                    </span>
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-2"></div>

                  <div className="flex justify-between font-semibold text-lg">
                    <span>{t("cart.order_total")}</span>
                    <span className="text-(--main-color) text-xl">
                      ${orderTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                <Link to={"/checkout"} className="block mt-6">
                  <OutlineButton className="w-full py-3">
                    {t("cart.checkout")}
                  </OutlineButton>
                </Link>

                <Link
                  to="/products"
                  className="flex items-end justify-center gap-2 text-sm text-gray-500 hover:text-(--main-color) mt-4 group"
                >
                  <HiArrowLongLeft
                    className={`text-lg transition-transform ${isRTL ? "rotate-180 group-hover:translate-x-1" : "group-hover:-translate-x-1"}`}
                  />
                  <span>{t("cart.continue_shopping")}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ConfirmModal
        onConfirm={handleClear}
        onCancel={() => {
          setIsModalOpen(false);
        }}
        isOpen={isModalOpen}
        title={t("cart.clearTitle")}
        message={t("cart.clearMessage")}
        confirmText={t("cart.clearConfirm")}
      />
    </>
  );
};

export default Cart;
