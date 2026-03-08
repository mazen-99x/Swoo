import React from "react";
import { useTranslation } from "react-i18next";
import OutlineButton from "../../Components/OutlineButton";
import FormInput from "../../Components/FormInput";
import { useSelector } from "react-redux";

import LoadingPage from "../../Components/LoadingPage";
import { Link } from "react-router";
import { useGetProductsByIdsQuery } from "../../Store/Actions/GetProductsId";
const Checkout = () => {
  const { t } = useTranslation();
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
  return (
    <div className="bg-(--white-color) dark:bg-(--dark-alt-color) py-10 my-6 px-4 rounded-xl">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ================= LEFT SIDE - BILLING FORM ================= */}
        <form className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-semibold mb-4">
            {t("checkout.billing_details")}
          </h2>

          {/* First & Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              required
              labelKey="checkout.first_name"
              placeholderKey="checkout.first_name"
            />
            <FormInput
              required
              labelKey="checkout.last_name"
              placeholderKey="checkout.last_name"
            />
          </div>

          {/* Company */}
          <FormInput
            labelKey="checkout.company_name"
            placeholderKey="checkout.company_name"
          />

          {/* Country */}
          <div>
            <label className="block text-sm font-medium mb-1">
              {t("contact.country")} <span className="text-red-500">*</span>
            </label>
            <select className="w-full border rounded-md px-4 py-2 bg-(--white-color) dark:bg-(--dark-alt-color)  focus:outline-none focus:ring focus:ring-(--main-color)">
              <option>{t("contact.countries.us")}</option>
              <option>{t("contact.countries.uk")}</option>
              <option>{t("contact.countries.ca")}</option>
            </select>
          </div>

          {/* Address */}
          <FormInput
            required
            labelKey="checkout.street_address"
            placeholderKey="checkout.street_address"
          />

          <FormInput
            labelKey="checkout.apartment"
            placeholderKey="checkout.apartment"
          />

          {/* City + State */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              required
              labelKey="checkout.city"
              placeholderKey="checkout.city"
            />
            <FormInput
              required
              labelKey="checkout.state"
              placeholderKey="checkout.state"
            />
          </div>

          {/* Zip + Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              required
              labelKey="checkout.zip"
              placeholderKey="checkout.zip"
            />
            <FormInput
              required
              labelKey="checkout.phone"
              placeholderKey="checkout.phone"
            />
          </div>

          {/* Email */}
          <FormInput
            required
            type="email"
            labelKey="checkout.email"
            placeholderKey="checkout.email"
          />

          {/* Notes */}

          <div>
            <label className="block text-sm font-medium mb-1">
              {t("checkout.order_notes")}
            </label>
            <textarea
              rows={4}
              placeholder={t("checkout.order_notes")}
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-(--main-color)"
            />
          </div>
        </form>

        {/* ================= RIGHT SIDE - ORDER SUMMARY ================= */}
        <aside className="lg:col-span-1">
          <div className="flex flex-col h-full">
            <div className="mt-auto sticky top-6 max-h-[calc(100vh-1.5rem)] overflow-y-auto bg-(--white-color) dark:bg-(--dark-secondary-color) rounded-xl p-6 border border-(--main-color) ">
              {/* Header */}
              <div className="flex justify-between text-xs font-semibold text-gray-500 border-b pb-3">
                <span>{t("checkout.product")}</span>
                <span>{t("checkout.sub_total")}</span>
              </div>

              {/* Product */}
              <div className="flex flex-nowrap overflow-x-auto gap-4 pb-4 scrollbar-hide">
                {products?.map((product) => {
                  const quantity = items[product.id] || 0;
                  const itemTotal = Number(
                    (product.price * quantity).toFixed(2),
                  );
                  return (
                    <div
                      key={product.id}
                      className="flex-none w-64 p-3 bg-gray-50 dark:bg-(--dark-secondary-color) rounded-xl border border-gray-100 dark:border-gray-800"
                    >
                      <div className="flex gap-3">
                        {/* Product Image */}
                        <div className="relative shrink-0">
                          <Link to={`/${slugify(product.title)}/${product.id}`}>
                            <img
                              src={product.thumbnail}
                              alt={product.title}
                              className="w-16 h-16 rounded-lg object-contain bg-white"
                            />
                          </Link>
                          <span className="absolute -top-2 -right-2 bg-(--main-color) text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white dark:border-gray-900">
                            {quantity}
                          </span>
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <p
                            title={product.title}
                            className="font-medium text-sm text-gray-800 dark:text-white truncate"
                          >
                            {product.title}
                          </p>
                          <div className="flex justify-between items-center mt-2">
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              ${product.price} <span className="mx-1">×</span>{" "}
                              {quantity}
                            </p>
                            <span className="text-sm font-bold text-gray-900 dark:text-white">
                              ${itemTotal}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Shipping */}
              <div className="flex justify-between py-4 border-b text-sm">
                <span className="text-gray-600">{t("checkout.shipping")}</span>
                <span className="text-red-500">+ $9.50</span>
              </div>

              {/* Total */}
              <div className="flex justify-between py-4 font-semibold text-base">
                <span>{t("checkout.order_total")}</span>
                <span className="text-green-600">{orderTotal.toFixed(2)}</span>
              </div>

              {/* Payment Methods */}
              <div className="mt-4 space-y-4 text-sm border-t pt-4">
                {/* Direct Bank */}
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    defaultChecked
                    className="mt-1 accent-(--main-color) cursor-pointer"
                  />
                  <div>
                    <p className="font-medium">
                      {t("checkout.direct_bank_transfer")}
                    </p>
                    <p className="text-gray-500 text-xs mt-1">
                      {t("checkout.direct_bank_desc")}
                    </p>
                  </div>
                </label>

                {/* Cash on Delivery */}
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    className="accent-(--main-color) cursor-pointer"
                  />
                  {t("checkout.cash_on_delivery")}
                </label>

                {/* PayPal */}
                <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      className="accent-(--main-color) cursor-pointer"
                    />
                    <span>Paypal</span>
                    <span className="text-blue-500 text-xs underline">
                      {t("checkout.what_is_paypal")}
                    </span>
                  </div>

                  <img
                    src="./assets/checkout.jpg"
                    alt="paypal"
                    className="h-8"
                  />
                </label>
              </div>

              <OutlineButton className="py-3 rounded-md mt-6 font-medium transition w-full">
                {t("checkout.place_order")}
              </OutlineButton>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Checkout;
