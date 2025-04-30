import ImageCarousel from "@/components/Image-Carousel";
import ProductCard from "@/components/ProductCard";
import { bannerImages } from "@/lib/data";
import API from "@/utils/axiosInstance";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await API.get("/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="mt-6">
      <ImageCarousel images={bannerImages} />

      <section className="flex flex-col justify-center items-center gap-4 md:flex-row md:mx-16 mx-3">
        <div className="image-position">
          <img
            src="/categories/keychain.webp"
            alt="keychain"
            className="image-size"
            width="250px"
            height="250px"
          />
          <img
            src="/categories/magnetlogo.jpg"
            alt="magnet"
            className="image-size"
            width="250px"
            height="250px"
          />
        </div>
        <div>
          <img
            src="/categories/allCategories.webp"
            alt="all"
            className="image-size"
            width="520px"
            height="520px"
          />
        </div>
        <div className="image-position">
          <img
            src="/categories/pens.jpg"
            alt="pens"
            className="image-size"
            width="250px"
            height="250px"
          />
          <img
            src="/categories/cardholder.jpg"
            alt="card"
            className="image-size"
            width="250px"
            height="250px"
          />
        </div>
      </section>
      <h1 className="m-3 font-bold text-xl">Featured Products</h1>
      <div className="flex h-120 p-4 items-center gap-3 overflow-x-auto snap-mandatory no-scrollbar mt-5 no-scrollbar">
        {products.map((product, i) => (
          <ProductCard key={i} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
