import React, { useEffect } from "react";

const ProductPage = () => {
  useEffect(() => {
    console.log("product page");
  }, []);
  return <div>product page</div>;
};

export default ProductPage;
