import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeCart } from "@/redux/slices/headerSlice";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import CartItem from "./CartItem";
import { Button } from "./ui/button";
import { getCart } from "@/redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";

const CartDialog = () => {
  const { isCartOpen } = useSelector((state) => state.header);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  if (!open) dispatch(closeCart());

  const { cartItems } = useSelector((state) => state.cart);

  console.log("items in cart dialog ", cartItems);

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  return (
    <Sheet
      open={isCartOpen}
      onOpenChange={(open) => {
        if (!open) dispatch(closeCart());
      }}
      className="p-0"
    >
      <SheetContent className="fixed h-screen p-0 flex flex-col justify-start">
        <SheetHeader className="p-0">
          <SheetTitle className="w-full font-bold p-2">
            Shopping Cart
          </SheetTitle>
          <SheetDescription className="p-0 bg-red-600 text-white text-center font-medium">
            Your brand deserves this! Click Buy Now to Proceed
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col">
          {cartItems?.map((item, i) => (
            <CartItem key={i} item={item} />
          ))}
        </div>

        <div className="p-5 justify-self-end">
          <div className="flex justify-between items-center">
            <h1>Total: </h1>
            <h1>₹ {1000}</h1>
          </div>
          <p>Inclusive of all taxes and shipping</p>
          <Button
            className="w-full cursor-pointer "
            onClick={() => navigate("/checkout")}
          >
            BUY NOW
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartDialog;
