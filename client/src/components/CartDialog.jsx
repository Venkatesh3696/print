import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { closeCart } from "@/redux/slices/dialogsSlice";
import API from "@/utils/axiosInstance";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";

const CartDialog = () => {
  const { isCartOpen } = useSelector((state) => state.dialog);
  const dispatch = useDispatch();

  if (!open) dispatch(closeCart());

  useEffect(() => {
    console.log("cart mounted");

    const fetchCartItems = async () => {
      const { data } = await API.get("/api/cart");
      console.log(data);
    };

    fetchCartItems();
  }, []);

  return (
    <Sheet
      open={isCartOpen}
      onOpenChange={(open) => {
        if (!open) dispatch(closeCart());
      }}
      className="p-0"
    >
      <SheetContent className="fixed h-screen p-0">
        <SheetHeader className="p-0">
          <SheetTitle className="w-full font-bold p-2">
            Shopping Cart
          </SheetTitle>
          <SheetDescription className="p-0 bg-red-600 text-white text-center font-medium">
            Your brand deserves this! Click Buy Now to Proceed
          </SheetDescription>
        </SheetHeader>
        <div></div>
      </SheetContent>
    </Sheet>
  );
};

export default CartDialog;
