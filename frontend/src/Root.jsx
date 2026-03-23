import { Outlet } from "react-router";
import { useSelector } from "react-redux";
import TopHeader from "./Components/Layout/Header/TopHeader";
import BtmHeader from "./Components/Layout/Header/BtmHeader";
import SmallHeader from "./Components/Layout/SmallHeader/SmallHeader";
import Footer from "./Components/Layout/Footer/Footer";
import Setting from "./Components/Shared/Setting";
import Loading from "./Components/Common/Loading";

const Root = () => {
 
  const isAnyApiLoading = useSelector((state) =>
    Object.values(state.api?.queries || {}).some(
      (query) => query?.status === "pending",
    ),
  );

  return (
    <>
      <Loading isLoading={isAnyApiLoading} />

      <header className="sticky top-0 z-40">
        <TopHeader />
        <BtmHeader />
        <SmallHeader />
      </header>

      <Setting />

      <main className="container">
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default Root;
