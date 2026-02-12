import { Outlet } from "react-router";
import TopHeader from "./Components/Header/TopHeader";
import BtmHeader from "./Components/Header/BtmHeader";
import SmallHeader from "./Components/SmallHeader/SmallHeader";
import Footer from "./Components/Footer/Footer";
import Setting from "./Components/Setting";

const Root = () => {
  return (
    <>
      <header className="sticky top-0 z-50">
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
