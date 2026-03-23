import { Route, Routes, useLocation } from "react-router";
import Root from "./Root";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Products from "./Pages/Products/Products";
import Contact from "./Pages/Contact/Contact";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import Cart from "./Pages/Cart/Cart";
import Wishlist from "./Pages/WishList/Wishlist";
import ProductDetails from "./Components/Product/ProductDetails";
import { useEffect } from "react";
import Profile from "./Pages/Profile/Profile";
import Error from "./Pages/Error/Error";

import Dashboard from "./Pages/Dashboard/Dashboard";
import Users from "./Pages/Users/Users";
import ProductControl from "./Pages/ProductControl/ProductControl";

import Checkout from "./Pages/Checkout.jsx/Checkout";
import Search from "./Pages/Search/Search";
import { Toaster } from "sonner";

import { useTranslation } from "react-i18next";

import { useDispatch, useSelector } from "react-redux";
import { useGetUserDataQuery } from "./Store/Actions/GetUserProducts";
import { hydrateCart } from "./Store/Cart/CartSlice";
import { hydrateWishlist } from "./Store/Wishlist/WishlistSlice";

import GoToTop from "./Components/Layout/GoToTop";
import ProtectPages from "./Components/Layout/ProtectPages";
function App() {
  const { pathname } = useLocation();
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const isRTL = i18n.language === "ar";

  
  const { user, token } = useSelector((state) => state.auth);


  const { data: userData, isSuccess } = useGetUserDataQuery(user?.id, {
    skip: !token || !user?.id,
  });

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  useEffect(() => {
  
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = i18n.language;
  }, [isRTL, i18n.language]);
  useEffect(() => {
    if (isSuccess && userData) {
 
      if (userData.cart) {
        dispatch(hydrateCart(userData.cart));
      }

      if (userData.wishlist) {
        dispatch(hydrateWishlist(userData.wishlist));
      }
    }
  }, [userData, isSuccess, dispatch]);

  return (
    <>
      <Routes>
        <Route element={<Root />}>
          {/* User Pages */}

          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="products" element={<Products />} />
          <Route path="contact" element={<Contact />} />
          <Route path="signin" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="/:name/:id" element={<ProductDetails />} />
          <Route path="/search" element={<Search />} />

          <Route
            path="Checkout"
            element={
              <ProtectPages allowedRoles={["user", "admin"]}>
                <Checkout />
              </ProtectPages>
            }
          />
          <Route
            path="profile"
            element={
              <ProtectPages allowedRoles={["user", "admin"]}>
                <Profile />
              </ProtectPages>
            }
          />
          <Route
            path="cart"
            element={
              <ProtectPages allowedRoles={["user", "admin"]}>
                <Cart />
              </ProtectPages>
            }
          />
          <Route
            path="wishlist"
            element={
              <ProtectPages allowedRoles={["user", "admin"]}>
                <Wishlist />
              </ProtectPages>
            }
          />
          {/* User Pages */}
          {/* admin Pages */}

          {/* Admin Pages */}
          <Route
            path="dashboard"
            element={
              <ProtectPages allowedRoles={["admin"]}>
                <Dashboard />
              </ProtectPages>
            }
          />
          <Route
            path="users"
            element={
              <ProtectPages allowedRoles={["admin"]}>
                <Users />
              </ProtectPages>
            }
          />
          <Route
            path="productcontrol"
            element={
              <ProtectPages allowedRoles={["admin"]}>
                <ProductControl />
              </ProtectPages>
            }
          />

          {/* admin Pages */}
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
      <GoToTop />
      <Toaster
        position={isRTL ? "bottom-left" : "bottom-right"}
        dir={isRTL ? "rtl" : "ltr"}
        expand={false}
        richColors
      />
    </>
  );
}

export default App;
