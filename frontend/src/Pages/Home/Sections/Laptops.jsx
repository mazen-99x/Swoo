import React from "react";
import ProductSection from "../../../Components/ProductSection";
import { useTranslation } from "react-i18next";
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
  {
    id: 3,
    title: "MacBook Pro 14-inch (M2) Open Lid",
    brand: "Apple",
    price: 2149,
    discountPercentage: 12.3,
    rating: 4.9,
    stock: 8,
    thumbnail:
      "https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/3.webp",
    description:
      "Experience blazing-fast workflows with Apple silicon, mini-LED display, and studio-quality speakers.",
  },
  {
    id: 4,
    title: "ASUS ZenBook Pro Duo",
    brand: "Asus",
    price: 1799,
    discountPercentage: 15.0,
    rating: 4.6,
    stock: 4,
    thumbnail:
      "https://cdn.dummyjson.com/product-images/laptops/asus-zenbook-pro-dual-screen-laptop/1.webp",
    description:
      "Dual-screen productivity laptop with powerful CPU, OLED display, and creative-focused design.",
  },
  {
    id: 5,
    title: "ASUS ZenBook Pro Duo (Side View)",
    brand: "Asus",
    price: 1849,
    discountPercentage: 9.5,
    rating: 4.5,
    stock: 6,
    thumbnail:
      "https://cdn.dummyjson.com/product-images/laptops/asus-zenbook-pro-dual-screen-laptop/2.webp",
    description:
      "Designed for creators with ScreenPad Plus, premium build quality, and immersive visuals.",
  },
  {
    id: 6,
    title: "ASUS ZenBook Pro Duo (Open)",
    brand: "Asus",
    price: 1899,
    discountPercentage: 11.0,
    rating: 4.6,
    stock: 9,
    thumbnail:
      "https://cdn.dummyjson.com/product-images/laptops/asus-zenbook-pro-dual-screen-laptop/3.webp",
    description:
      "A powerful multitasking laptop with dual displays, ideal for design and video editing workflows.",
  },
  {
    id: 7,
    title: "Huawei MateBook X Pro",
    brand: "Huawei",
    price: 1599,
    discountPercentage: 13.2,
    rating: 4.4,
    stock: 0,
    thumbnail:
      "https://cdn.dummyjson.com/product-images/laptops/huawei-matebook-x-pro/1.webp",
    description:
      "Ultra-slim laptop with a high-resolution touchscreen display and premium metal body.",
  },
  {
    id: 8,
    title: "Huawei MateBook X Pro (Silver)",
    brand: "Huawei",
    price: 1649,
    discountPercentage: 7.8,
    rating: 4.5,
    stock: 11,
    thumbnail:
      "https://cdn.dummyjson.com/product-images/laptops/huawei-matebook-x-pro/2.webp",
    description:
      "Lightweight and powerful laptop with long battery life and excellent display clarity.",
  },
];

const Laptops = () => {
  const { t } = useTranslation();
  return (
    <ProductSection title={t("home.laptops.sectionTitle")} products={laptops} />
  );
};

export default Laptops;
