import React, { useState } from "react";
import OutlineButton from "../../Components/OutlineButton";
import Product from "../../Components/Product/Product";
import { useTranslation } from "react-i18next";
import { useGetProductsByIdsQuery } from "../../Store/Actions/GetProductsId";
import { useDispatch, useSelector } from "react-redux";
import LoadingPage from "../../Components/LoadingPage";
import EmptyPage from "../../Components/EmptyPage";
import { HiOutlineTrash } from "react-icons/hi";
import ConfirmModal from "../../Components/ConfirmModal";
import { clearWishList } from "../../Store/Wishlist/WishlistSlice";
import { toast } from "sonner";
const Wishlist = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();
  const { wishItems } = useSelector((state) => state.wishlist);

  const { data, isLoading } = useGetProductsByIdsQuery(wishItems, {
    skip: wishItems.length == 0,
    keepPreviousData: true,
  });
  if (wishItems.length === 0)
    return (
      <EmptyPage
        translate={t}
        icon={
          <svg
            className="w-32 h-32 text-(--main-color)/30"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        }
        title={`${t("wishlist.empty")}`}
        desc={`${t("wishlist.desc")}`}
      />
    );
  if (isLoading) {
    return (
      <LoadingPage
        text={`${t("wishlist.loading")}`}
        icon={
          <svg
            className="w-32 h-32 text-(--main-color)/30"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        }
      />
    );
  }
  const handleClear = () => {
    dispatch(clearWishList());

    setIsModalOpen(false);

    toast.success(t("wishlist.cleared_success"), {
      description: t("wishlist.cleared_desc"),
      duration: 3000,

    });
  };
  return (
    <>
      <div className="bg-(--white-color) dark:bg-(--dark-alt-color) py-10 my-6 px-4 rounded-xl">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">{t("wishlist.title")}</h2>
            <OutlineButton
              onClick={() => setIsModalOpen(!isModalOpen)}
              className="flex items-center gap-2 border-red-500 text-red-500 hover:bg-red-500"
            >
              <HiOutlineTrash className="text-lg" />

              {t("wishlist.clear_button")}
            </OutlineButton>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
      <ConfirmModal
        onConfirm={handleClear}
        onCancel={() => {
          setIsModalOpen(false);
        }}
        isOpen={isModalOpen}
        title={t("wishlist.clearTitle")}
        message={t("wishlist.clearMessage")}
        confirmText={t("wishlist.clearConfirm")}
      />
    </>
  );
};

export default Wishlist;
