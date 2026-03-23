import { useTranslation } from "react-i18next";
import ProductSection from "../../../Components/Product/ProductSection";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Phones = () => {
  const { t } = useTranslation();
  const fetchPhones = async () => {
    const res = await axios.get(
      "https://dummyjson.com/products/category/smartphones",
    );
    
    return res.data.products;
  };
  const { data, isLoading, isError } = useQuery({
    queryKey: ["phone"],
    queryFn: () => fetchPhones(),
    staleTime: 1000 * 60 * 5,
  });
  return (
    <ProductSection
      title={t("home.phones.sectionTitle")}
      loading={isLoading}
      error={isError}
      products={data}
    />
  );
};

export default Phones;
