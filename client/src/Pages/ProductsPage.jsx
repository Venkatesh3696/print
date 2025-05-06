import ProductCard from "@/components/ProductCard";
import { fetchAllFilteredProducts } from "@/redux/slices/productSlice";
import API from "@/utils/axiosInstance";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { keyword } = useSelector((state) => state.search);
  const { productsList } = useSelector((state) => state.products);

  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [categories, setCategories] = useState([]);

  console.log("product page => ", { keyword, category, minPrice, maxPrice });
  console.log(categories);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await API.get("/api/products/categories");

      setCategories(data?.categories);
    };
    fetchCategories();
    dispatch(
      fetchAllFilteredProducts({ keyword, category, minPrice, maxPrice })
    );
  }, [dispatch, keyword, minPrice, maxPrice, category]);

  return (
    <div className="p-3">
      <h1 className="font-bold text-3xl mb-4">Products</h1>
      <div className="mb-4 flex gap-4">
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select Option</option>
          {categories?.map((category) => (
            <option value={category}>{category}</option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>
      <div className="w-full   grid grid-cols-4 ">
        {productsList?.map((product) => (
          <ProductCard key={product?._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
