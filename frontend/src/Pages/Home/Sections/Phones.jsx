import { useTranslation } from "react-i18next";
import ProductSection from "../../../Components/ProductSection";
const phones = [
  {
    id: 1,
    title: "iPhone 14 Pro",
    brand: "Apple",
    price: 1099,
    discountPercentage: 9.2,
    rating: 4.8,
    stock: 0,
    thumbnail:
      "https://cdn.dummyjson.com/product-images/smartphones/iphone-5s/1.webp",
    description:
      "Apple iPhone 14 Pro with advanced camera system, A16 Bionic chip, and ProMotion display.",
  },
  {
    id: 2,
    title: "Samsung Galaxy S23 Ultra",
    brand: "Samsung",
    price: 1199,
    discountPercentage: 11.5,
    rating: 4.7,
    stock: 18,
    thumbnail:
      "https://cdn.dummyjson.com/product-images/smartphones/iphone-6/1.webp",
    description:
      "Samsung flagship smartphone with 200MP camera, S Pen support, and ultra-smooth AMOLED display.",
  },
  {
    id: 3,
    title: "Google Pixel 8",
    brand: "Google",
    price: 899,
    discountPercentage: 7.8,
    rating: 4.6,
    stock: 22,
    thumbnail:
      "https://cdn.dummyjson.com/product-images/smartphones/iphone-13-pro/1.webp",
    description:
      "Google Pixel phone with AI-powered photography, clean Android experience, and long software support.",
  },
  {
    id: 4,
    title: "iPhone 13",
    brand: "Apple",
    price: 799,
    discountPercentage: 10.0,
    rating: 4.5,
    stock: 0,
    thumbnail:
      "https://cdn.dummyjson.com/product-images/smartphones/iphone-13-pro/2.webp",
    description:
      "Powerful iPhone with A15 Bionic chip, excellent battery life, and premium build quality.",
  },
  {
    id: 5,
    title: "OnePlus 11",
    brand: "OnePlus",
    price: 749,
    discountPercentage: 12.4,
    rating: 4.4,
    stock: 15,
    thumbnail:
      "https://cdn.dummyjson.com/product-images/smartphones/iphone-13-pro/3.webp",
    description:
      "High-performance smartphone with Snapdragon processor, fast charging, and smooth OxygenOS experience.",
  },
  {
    id: 6,
    title: "Xiaomi 13 Pro",
    brand: "Xiaomi",
    price: 699,
    discountPercentage: 14.9,
    rating: 4.3,
    stock: 20,
    thumbnail:
      "https://cdn.dummyjson.com/product-images/smartphones/iphone-x/1.webp",
    description:
      "Premium Xiaomi smartphone with Leica camera system, powerful chipset, and elegant design.",
  },
  {
    id: 7,
    title: "Samsung Galaxy A54",
    brand: "Samsung",
    price: 449,
    discountPercentage: 6.5,
    rating: 4.2,
    stock: 0,
    thumbnail:
      "https://cdn.dummyjson.com/product-images/smartphones/iphone-x/2.webp",
    description:
      "Mid-range Samsung smartphone with solid performance, long battery life, and water resistance.",
  },
  {
    id: 8,
    title: "Nothing Phone (2)",
    brand: "Nothing",
    price: 599,
    discountPercentage: 13.1,
    rating: 4.5,
    stock: 17,
    thumbnail:
      "https://cdn.dummyjson.com/product-images/smartphones/iphone-x/3.webp",
    description:
      "Unique transparent design smartphone with Glyph interface and smooth AMOLED display.",
  },
];

const Phones = () => {
  const { t } = useTranslation();
  return (
    <ProductSection title={t("home.phones.sectionTitle")} products={phones} />
  );
};

export default Phones;
