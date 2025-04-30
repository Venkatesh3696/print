import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const initialAddress = {
  doorNo: "",
  village: "",
  city: "",
  pincode: "",
};

const Checkout = () => {
  const [address, setAddress] = useState(initialAddress);

  const onChangeAddress = (e) => {
    setAddress((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const { cartItems } = useSelector((state) => state.cart);

  return (
    <div className="flex w-full h-screen">
      <div className="flex ">
        <div className="p-5 w-60">
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
            <label>City</label>
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
          <h1>order summary</h1>
          <div>
            {cartItems.map((item) => (
              <div className="flex ">
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
        </div>
      </div>
      <Button className="self-end">Place Order</Button>
    </div>
  );
};

export default Checkout;
