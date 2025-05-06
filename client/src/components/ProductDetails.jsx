import API from "@/utils/axiosInstance";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "./ui/button";
import { addToCart } from "@/redux/slices/cartSlice";
import { useDispatch } from "react-redux";

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const { productid } = useParams();
  const dispatch = useDispatch();

  console.log(productid);

  const onAddToCart = async () => {
    try {
      dispatch(
        addToCart({
          product: product._id,
          quantity: 1,
          price: product.price,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchProductDetails = async () => {
      const { data } = await API.get(`/api/products/${productid}`);

      setProduct(data);
    };
    fetchProductDetails();
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-3xl my-4">Product details</h1>
      <div className="flex gap-4">
        <img className="w-100" src={product?.image} alt="product" />
        <div>
          <h1 className="text-3xl font-bold">{product?.name}</h1>
          <p>{product?.description?.slice(0, 300)}</p>
          <p>₹ {product?.price}</p>
          <Button className="w-full mt-4 bg-amber-500">
            Add files to customize
          </Button>
          <Button className="w-full mt-4" onClick={onAddToCart}>
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
