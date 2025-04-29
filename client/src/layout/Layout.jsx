import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen max-h-screen flex flex-col justify-between ">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
