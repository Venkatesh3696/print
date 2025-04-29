import React from "react";
import { Card } from "./ui/card";

const ProductCard = ({ product }) => {
  return (
    <div>
      <Card
        className="bg-white rounded-lg shadow-md p-2 snap-center cursor-pointer transition-transform duration-300 hover:scale-105 w-64 flex-shrink-0"
        onClick={() => navigator.push(`/product/${product.id}`)}
      >
        <img
          src={product.url}
          alt={product.name}
          width="250px"
          height="250px"
        />
        {/* Product Name, price and offerPrice */}
        <h1>{product.name}</h1>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500 line-through">
            {new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
            }).format(product.price)}
          </span>
          <span className="text-lg font-bold text-green-600">
            {new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
            }).format(product.offerPrice)}{" "}
          </span>
        </div>
      </Card>
    </div>
  );
};

export default ProductCard;
