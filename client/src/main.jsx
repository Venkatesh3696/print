import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
//  Local Imports
import "./index.css";
import App from "./App.jsx";
import store from "./redux/store";
import React from "react";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
