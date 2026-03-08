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
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import cartReducer from "./Cart/CartSlice.jsx";
import wishlistReducer from "./Wishlist/WishlistSlice.jsx";
import authReducer from "./Auth/AuthSlice.jsx";
import { productApi } from "./Actions/GetProductsId.js";
import { authApi } from "./Actions/GetRegisiter.js";

// 1. Combine your reducers
const rootReducer = combineReducers({
  cart: cartReducer,
  wishlist: wishlistReducer,
  auth:authReducer,
  [productApi.reducerPath]: productApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
});

// 2. Persistence Configuration
const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["cart", "wishlist", "auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// 3. Configure Store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist actions to avoid console errors
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(productApi.middleware, authApi.middleware),
});

export const persistor = persistStore(store);
