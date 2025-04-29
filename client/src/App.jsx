import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Product from "./Pages/Product";
import Home from "./Pages/Home";

import AdminPage from "./Pages/AdminPage";
import { useSelector } from "react-redux";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Layout from "./layout/Layout";
import CartDialog from "./components/CartDialog";

const App = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  console.log(isAuthenticated, user);

  const navigate = useNavigate();

  useEffect(() => {
    if (user?.isAuthenticated && user?.role === "admin") {
      navigate("/admin");
    }
    console.log(user);
  }, [user, navigate]);

  return (
    <div className="w-full min-h-full">
      <CartDialog />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Layout>
    </div>
  );
};

export default App;
