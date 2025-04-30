import ProductCard from "@/components/ProductCard";
import { fetchAllFilteredProducts } from "@/redux/slices/productSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { productsList } = useSelector((state) => state.products);
  const { searchText } = useSelector((state) => state.header);

  console.log({ productsList, searchText });

  useEffect(() => {
    console.log(searchText);
    dispatch(fetchAllFilteredProducts(searchText));
  }, [dispatch, searchText]);

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
