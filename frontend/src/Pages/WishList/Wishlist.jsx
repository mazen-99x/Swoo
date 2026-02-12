import React from "react";
import OutlineButton from "../../Components/OutlineButton";
import Product from "../../Components/Product/Product";
import { useTranslation } from "react-i18next";

// Laptops data stays the same
const laptops = [
  {
    id: 1,
    title: "MacBook Pro 14-inch (M2)",
    brand: "Apple",
    price: 1999,
    discountPercentage: 10.5,
    rating: 4.8,
    stock: 0,
    thumbnail:
      "https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/1.webp",
    description:
      "Apple MacBook Pro with M2 chip delivers exceptional performance, long battery life, and a stunning Liquid Retina XDR display.",
  },
  {
    id: 2,
    title: "MacBook Pro 14-inch (M2) Silver",
    brand: "Apple",
    price: 2099,
    discountPercentage: 8.0,
    rating: 4.7,
    stock: 12,
    thumbnail:
      "https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/2.webp",
    description:
      "Powerful and portable MacBook Pro with advanced thermal design, pro-grade performance, and premium aluminum build.",
  },
  // ... rest of your laptops
];

const Wishlist = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-(--white-color) dark:bg-(--dark-alt-color) py-10 my-6 px-4 rounded-xl">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">{t("wishlist.title")}</h2>
          <OutlineButton>{t("wishlist.clear_button")}</OutlineButton>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {laptops.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
