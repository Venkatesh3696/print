import React from "react";
import { Separator } from "./ui/separator";

const CartItem = ({ item }) => {
  console.log(item);
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
          <div className="flex justify-between px-4 p-1 w-20  border-2 border-black rounded-full">
            <button className="cursor-pointer">-</button>
            <p>{item?.quantity}</p>
            <button className="cursor-pointer">+</button>
          </div>
          <h1>delete</h1>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
