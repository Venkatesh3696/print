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
import { NavLink, useNavigate } from "react-router-dom";
import { selectCartTotal } from "@/redux/slices/selectorSlice";

const CartDialog = () => {
  const { isCartOpen } = useSelector((state) => state.header);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);

  const total = useSelector(selectCartTotal) || 0;

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getCart());
    }
  }, [dispatch, isAuthenticated]);

  return (
    <Sheet
      open={isCartOpen}
      onOpenChange={(open) => {
        if (!open) dispatch(closeCart());
      }}
      className="p-2"
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

        {!isAuthenticated ? (
          <p className="p-4">
            you are not logged in please <NavLink to="/login">Login</NavLink>
          </p>
        ) : null}

        <div className="flex flex-col  overflow-auto h-8/12">
          {cartItems?.map((item, i) => (
            <CartItem key={i} item={item} />
          ))}
        </div>

        <div className="p-5 justify-self-end">
          <div className="flex justify-between items-center">
            <h1>Total: </h1>
            <h1>₹ {total}</h1>
          </div>
          <p>Inclusive of all taxes and shipping</p>
          <Button
            className="w-full cursor-pointer "
            onClick={() => navigate("/checkout")}
            disabled={total <= 0}
          >
            BUY NOW
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartDialog;
