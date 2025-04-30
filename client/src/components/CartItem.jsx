import React from "react";
import { Separator } from "./ui/separator";
import { useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "@/redux/slices/cartSlice";
import { Button } from "./ui/button";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <div className="flex p-2 ">
      <img src={item?.product?.image} alt="cart item" className="w-30 h-30" />
      <div className="pl-3">
        <h1 className="text-lg">{item?.product?.name} </h1>
        <p className="text-sm">{item?.product?.description?.slice(0, 50)} </p>
        <h1 className="text-sm">
          <span>₹ {item?.product?.price}</span>
        </h1>
        <div className="flex gap-3 items-center">
          <div className="flex justify-between items-center px-4 p-1 w-20  border-2 border-black rounded-full">
            <button
              onClick={() =>
                dispatch(
                  updateQuantity({
                    type: "minus",
                    productId: item?.product?._id,
                  })
                )
              }
              className="cursor-pointer text-2xl"
            >
              -
            </button>
            <p>{item?.quantity}</p>
            <button
              onClick={() =>
                dispatch(
                  updateQuantity({
                    type: "plus",
                    productId: item?.product?._id,
                  })
                )
              }
              className="cursor-pointer text-2xl"
            >
              +
            </button>
          </div>
          <Button
            className="cursor-pointer"
            onClick={() => {
              dispatch(removeFromCart({ productId: item?.product?._id }));
            }}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
