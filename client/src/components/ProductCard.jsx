import React from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  return (
    <Card
      className="flex justify-between h-100 bg-white rounded-lg shadow-md p-2 snap-center cursor-pointer transition-transform duration-300 hover:scale-105 w-64 flex-shrink-0"
      onClick={() => navigate(`/product/${product._id}`)}
    >
      <img alt={product.name} src={product?.image} className="h-50" />

      <h1>{product.name}</h1>
      <div className="flex justify-between items-center">
        <span className="text-lg font-bold text-green-600">
          ₹ {product.price}
        </span>
      </div>
      <Button>Add to cart</Button>
    </Card>
  );
};

export default ProductCard;
