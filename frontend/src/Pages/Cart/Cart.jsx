import { Link } from "react-router";
import OutlineButton from "../../Components/OutlineButton";
import { useTranslation } from "react-i18next";

const Cart = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-(--white-color) dark:bg-(--dark-alt-color) py-10 my-6 px-4 rounded-xl">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {[1, 2, 3, 4, 5, 6].map((item, i) => (
            <div
              key={i}
              className="bg-(--gray-color) dark:bg-(--dark-secondary-color) rounded-xl p-6 flex gap-6 items-center shadow-sm"
            >
              {/* Image */}
              <div className="w-24 h-24 shrink-0">
                <img
                  src="https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/1.webp"
                  alt={t("cart.product_name")}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Info */}
              <div className="flex-1">
                <h4 className="font-medium text-sm mb-1">
                  {t("cart.product_name")}
                </h4>
                <p className="text-lg font-semibold mb-2">$579.00</p>

                {/* Quantity */}
                <div className="flex items-center border rounded-md w-fit">
                  <button className="px-3 py-1 text-lg">-</button>
                  <span className="px-3">1</span>
                  <button className="px-3 py-1 text-lg">+</button>
                </div>

                {/* Status */}
                <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                  ● {t("cart.in_stock")}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="flex flex-col h-full">
          <div className="mt-auto bg-(--white-color) dark:bg-(--dark-secondary-color) rounded-xl p-6 border border-(--main-color)">
            <h3 className="font-semibold mb-6">{t("cart.order_summary")}</h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">{t("cart.sub_total")}</span>
                <span>$1,000.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">
                  {t("cart.shipping_estimate")}
                </span>
                <span>$600.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">{t("cart.tax_estimate")}</span>
                <span>$137.00</span>
              </div>

              <hr />

              <div className="flex justify-between font-semibold">
                <span>{t("cart.order_total")}</span>
                <span>$1,737.00</span>
              </div>
            </div>
            <Link to={"/checkout"}>
              <OutlineButton className="w-full mt-6">
                {t("cart.checkout")}
              </OutlineButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
