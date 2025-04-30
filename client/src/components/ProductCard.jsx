import React from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/slices/cartSlice";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <Card
      className="flex justify-between h-100 bg-white rounded-lg shadow-md p-2 snap-center cursor-pointer transition-transform duration-300 hover:scale-105 w-full gap -4 flex-shrink-0"
      onClick={() => navigate(`/product/${product._id}`)}
    >
      <img alt={product.name} src={product?.image} className="h-50" />

      <h1>{product.name}</h1>
      <div className="flex justify-between items-center">
        <span className="text-lg font-bold text-green-600">
          ₹ {product.price}
        </span>
      </div>
      <Button
        className="cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          dispatch(
            addToCart({
              product: product._id,
              quantity: 1,
              price: product.price,
            })
          );
        }}
      >
        Add to cart
      </Button>
    </Card>
  );
};

export default ProductCard;
