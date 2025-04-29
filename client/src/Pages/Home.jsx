import ImageCarousel from "@/components/Image-Carousel";
import ProductCard from "@/components/ProductCard";
import { bannerImages, products } from "@/lib/data";
import API from "@/utils/axiosInstance";
import React, { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await API.get("/api/products");
        console.log(response.data);
        return response.data;
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
      <div className="flex items-center gap-3 overflow-x-auto snap-x snap-mandatory no-scrollbar h-80 mt-5 no-scrollbar">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
