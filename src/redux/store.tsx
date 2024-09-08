import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./CartOfProducts/cartOfIdsOfProductsReducer"; // Adjust the import based on your file structure
import productReducer from "./CartOfProducts/cartOfProductReducer";
import categoriesReducer from "./ListOfProducts/categoriesReducer";
import paginationsClothesList from "./ListOfProducts/paginationsProductsListReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage
import ProductsListReducer from "./ListOfProducts/ProductsListReducer";

const persistConfig = {
  key: "root",
  storage,
};

export const store = configureStore({
  reducer: {
    cart: persistReducer(persistConfig, cartReducer),
    product: productReducer,
    productList: ProductsListReducer,
    categories: categoriesReducer,
    pagination: paginationsClothesList,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
