import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Layout from "./layout/Layout";
import CartDialog from "./components/CartDialog";
import ProductsPage from "./Pages/ProductsPage";
import Checkout from "./Pages/Checkout";
import ProductDetails from "./components/ProductDetails";
import { useDispatch } from "react-redux";
import { checkAuth } from "./redux/slices/authSlice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <div className="w-full min-h-full">
      <CartDialog />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:productid" element={<ProductDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </Layout>
    </div>
  );
};

export default App;
