import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import dialogReducer from "./slices/dialogsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    dialog: dialogReducer,
  },
});

export default store;
