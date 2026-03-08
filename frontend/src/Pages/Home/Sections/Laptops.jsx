import React from "react";
import ProductSection from "../../../Components/ProductSection";
import { useTranslation } from "react-i18next";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const Laptops = () => {
  const { t } = useTranslation();
  const fetchLaptops = async () => {
    const res = await axios.get(
      "https://dummyjson.com/products/category/laptops",
    );
    
    return res.data.products;
  };
  const { data, isLoading, isError } = useQuery({
    queryKey: ["laptop"],
    queryFn: () => fetchLaptops(),
    staleTime: 1000 * 60 * 5,
  });
  return (
    <ProductSection
      title={t("home.laptops.sectionTitle")}
      loading={isLoading}
      error={isError}
      products={data}
    />
  );
};

export default Laptops;
