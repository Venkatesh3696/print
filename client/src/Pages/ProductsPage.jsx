import ProductCard from "@/components/ProductCard";
import { fetchAllFilteredProducts } from "@/redux/slices/productSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { searchTerm } = useSelector((state) => state.header);
  const { productsList } = useSelector((state) => state.products);

  console.log({ productsList });

  return (
    <div>
      <div>
        <h1>Products</h1>
        <div className="w-full flex ">
          {productsList.map((product) => (
            <ProductCard key={product?._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
