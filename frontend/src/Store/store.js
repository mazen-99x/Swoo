import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import cartReducer from "./Cart/CartSlice.jsx";
import wishlistReducer from "./Wishlist/WishlistSlice.jsx";
import authReducer from "./Auth/AuthSlice.jsx";
import { productApi } from "./Actions/GetProductsId.js";
import { authApi } from "./Actions/GetRegisiter.js";
import { userApi } from "./Actions/GetUserProducts.js";


const appReducer = combineReducers({
  cart: cartReducer,
  wishlist: wishlistReducer,
  auth: authReducer,
  [productApi.reducerPath]: productApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
});


const rootReducer = (state, action) => {

  if (action.type === "auth/logout") {

    state = undefined;

    storage.removeItem("persist:root");
  }
  return appReducer(state, action);
};

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["cart", "wishlist", "auth"],
};


const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(productApi.middleware, userApi.middleware, authApi.middleware),
});

export const persistor = persistStore(store);
