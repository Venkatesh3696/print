import Footer from "@/components/Footer";
import Header from "@/components/Header";
import useSyncSearchWithURL from "@/hooks/useSyncSearchWithURL";
import React from "react";

const Layout = ({ children }) => {
  useSyncSearchWithURL();
  return (
    <div className="min-h-screen max-h-screen flex flex-col justify-start ">
      <Header />
      <div className="min-h-screen overflow-auto">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
