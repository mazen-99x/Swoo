import { useEffect, useState } from "react";
import FilterPanel from "./FilterPanel";
import { FaFilter } from "react-icons/fa";
import OutlineButton from "../../Components/OutlineButton";
import ViewModeToggle from "./ViewToggle";
import DisplayDropdown from "./DisplayOptions";
import Product from "../../Components/Product/Product";
import ProductSkeleton from "../../Components/Skeletons/ProductSkeleton";
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
const Products = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState(
    () => localStorage.getItem("viewMode") || "grid",
  );

  useEffect(() => {
    localStorage.setItem("viewMode", viewMode);
  }, [viewMode]);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true);
    }, 2000);
  });
  return (
    <>
      <section className=" min-h-screen  my-6">
        <div className="lg:grid lg:grid-cols-[16rem_1fr] gap-6">
          <aside className="hidden lg:block">
            <div className=" rounded-lg shadow-md h-fit overflow-y-auto">
              <FilterPanel
                setIsFilterOpen={setIsFilterOpen}
                isFilterOpen={isFilterOpen}
                viewMode={viewMode}
                handleViewModeChange={setViewMode}
              />
            </div>
          </aside>
          <main className=" ">
            <div className="bg-(--white-color) dark:bg-(--dark-alt-color) rounded-lg shadow-md p-4 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Filters Button (mobile) */}
              <OutlineButton
                onClick={() => {
                  setIsFilterOpen(!isFilterOpen);
                }}
                className="lg:hidden"
              >
                <FaFilter /> <span>Filters</span>
              </OutlineButton>

              {/* Controls (desktop) */}
              <div className="flex  items-center gap-4 ml-auto">
                <div className="hidden lg:flex items-center gap-4">
                  <div className="px-3 py-2  rounded-md text-sm">
                    <DisplayDropdown />
                  </div>

                  <div className="px-3 py-2  rounded-md text-sm">
                    <ViewModeToggle
                      viewMode={viewMode}
                      handleViewModeChange={setViewMode}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`grid gap-4 mb-8 ${
                viewMode === "grid"
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "grid-cols-1 sm:grid-cols-2 "
              }`}
            >
              {isLoading ? (
                phones.length > 0 ? (
                  phones.map((product) => (
                    <Product key={product.id} product={product} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <div className="text-black dark:text-white text-lg mb-2">
                      No Products found
                    </div>
                    <p className="text-Wpragh dark:text-pragh">
                      Try adjusting your filters or search query
                    </p>
                  </div>
                )
              ) : (
                Array(8)
                  .fill(0)
                  .map((_, i) => <ProductSkeleton key={i} />)
              )}
            </div>
          </main>
        </div>
        {/* mobile filterpanel */}
        <div
          className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${
            isFilterOpen ? "pointer-events-auto" : "pointer-events-none"
          }`}
        >
          {/* Backdrop */}
          <div
            className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${
              isFilterOpen ? "opacity-100" : "opacity-0"
            }`}
            onClick={() => setIsFilterOpen(false)}
          />

          {/* Sliding Panel */}
          <div
            className={`absolute left-0 top-0 h-full max-[400px]:w-full w-80
    dark:bg-(--dark-secondary-color) bg-(--gray-color)
    shadow-xl transform transition-transform duration-300 ease-in-out
    ${isFilterOpen ? "translate-x-0" : "-translate-x-full"}`}
          >
            <FilterPanel
              setIsFilterOpen={setIsFilterOpen}
              isFilterOpen={isFilterOpen}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Products;
