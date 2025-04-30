import ProductCard from "@/components/ProductCard";
import { fetchAllFilteredProducts } from "@/redux/slices/productSlice";
import { setKeyword } from "@/redux/slices/searchSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { keyword } = useSelector((state) => state.search);
  const { productsList } = useSelector((state) => state.products);

  console.log("product page => ", { keyword });

  useEffect(() => {
    dispatch(fetchAllFilteredProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <div className="p-3">
      <h1 className="font-bold text-3xl mb-4">Products</h1>
      <div className="w-full  gap-3 grid grid-cols-4 ">
        {productsList?.map((product) => (
          <ProductCard key={product?._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
