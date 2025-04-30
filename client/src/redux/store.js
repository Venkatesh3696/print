import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import headerReducer from "./slices/headerSlice";
import productsReducer from "./slices/productSlice";
import cartReducer from "./slices/cartSlice";
import searchReducer from "./slices/searchSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    header: headerReducer,
    cart: cartReducer,
    search: searchReducer,
  },
});

export default store;
