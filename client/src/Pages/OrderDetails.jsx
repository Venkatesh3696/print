import { Card } from "@/components/ui/card";
import API from "@/utils/axiosInstance";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const OrderDetails = () => {
  const { orderid } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const { data } = await API.get(`/api/orders/${orderid}`);
        setOrderDetails(data.order || data); // Adjust based on your API response
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrderDetails();
  }, [orderid]);

  if (!orderDetails) {
    return <div>Loading...</div>;
  }

  const orderItems = orderDetails?.items || [];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Order Details</h1>
      <div className="flex flex-col items-start">
        <label>Order ID: {orderid}</label>
        <label>Status: {orderDetails?.status}</label>
        <label>
          Placed On: {new Date(orderDetails?.createdAt).toLocaleString()}
        </label>
      </div>
      <div className="flex flex-col items-start mt-4">
        <h2 className="text-xl font-semibold">Items:</h2>
        {orderItems?.length === 0 && <p>No items in this order.</p>}
        {orderItems?.map((item, idx) => (
          <Card
            key={idx}
            className="mb-2 border-b pb-2 w-full p-5 flex flex-row items-center"
          >
            <div className="flex-1">
              <p className="font-medium">{item.product?.name}</p>
              <p>Price: ₹{item.product?.price}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
            <img
              src={item.product?.image}
              alt={item.product?.name}
              className="w-40 h-40 object-cover ml-4"
            />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OrderDetails;
