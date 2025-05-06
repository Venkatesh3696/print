import { Button } from "@/components/ui/button";
import { clearCart } from "@/redux/slices/cartSlice";
import API from "@/utils/axiosInstance";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const initialAddress = {
  doorNo: "",
  village: "",
  city: "",
  pincode: "",
};

const Checkout = () => {
  const [address, setAddress] = useState(initialAddress);
  const { cartItems } = useSelector((state) => state.cart);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChangeAddress = (e) => {
    setAddress((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePlaceOrder = async () => {
    try {
      const { data } = await API.post("/api/orders", {
        address,
        items: cartItems,
      });
      console.log(data?.order?._id);
      dispatch(clearCart());
      navigate(`/orders/${data?.order?._id}`);
    } catch (error) {
      alert("Order failed. Please try again.");
      console.log(error);
    }
  };

  return (
    <div className="flex w-full h-screen">
      <div className="flex w-full">
        <div className="p-5 w-1/3">
          <h1>Address</h1>
          <form className="flex flex-col items-start">
            <label>Door No</label>
            <input
              required={true}
              className="border border-black w-full"
              name="doorNo"
              value={address.doorNo}
              onChange={onChangeAddress}
            />
            <label>village</label>
            <input
              required={true}
              className="border border-black  w-full"
              name="village"
              value={address.village}
              onChange={onChangeAddress}
            />
            <label>City</label>
            <input
              required={true}
              className="border border-black w-full"
              name="city"
              value={address.city}
              onChange={onChangeAddress}
            />
            <label>Pincode </label>
            <input
              required={true}
              className="border border-black w-full"
              name="pincode"
              value={address.pincode}
              onChange={onChangeAddress}
            />
          </form>
        </div>
        <div>
          <h1 className="text-3xl">order summary</h1>
          <div className="flex flex-col gap-4 mt-4">
            {cartItems?.map((item, i) => (
              <div key={i} className="flex gap-4 ">
                <img
                  src={item?.product?.image}
                  alt="cart item"
                  className="w-30 h-30"
                />
                <div className="pl-3">
                  <h1 className="text-lg">{item?.product?.name} </h1>
                  <p className="text-sm">
                    {item?.product?.description?.slice(0, 50)}
                  </p>
                  <h1 className="text-sm">
                    <span>₹ {item?.product?.price}</span>
                  </h1>
                  <p>Quantity: {item?.quantity}</p>
                </div>
              </div>
            ))}
          </div>
          <Button
            className="w-full mt-5 cursor-pointer"
            onClick={handlePlaceOrder}
          >
            Place Order
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
