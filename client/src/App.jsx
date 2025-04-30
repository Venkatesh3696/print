import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import Home from "./Pages/Home";
import { useSelector } from "react-redux";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Layout from "./layout/Layout";
import CartDialog from "./components/CartDialog";
import ProductsPage from "./Pages/ProductsPage";
import Checkout from "./Pages/Checkout";

const App = () => {
  return (
    <div className="w-full min-h-full">
      <CartDialog />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </Layout>
    </div>
  );
};

export default App;
