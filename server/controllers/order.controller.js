import { Order } from "../models/order.model.js";

export const placeOrder = async (req, res) => {
  try {
    const { address, items } = req.body;

    const userId = req?.userId;

    const order = new Order({
      user: userId,
      address,
      items,
    });

    await order.save();
    res.status(201).json({ message: "Order created", order });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create order" });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req?.userId }).populate(
      "items.product"
    );
    res.status(200).json({ orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching orders", error });
  }
};

export const getOrderDetails = async (req, res) => {
  const { orderid } = req.params;
  try {
    const order = await Order.findById(orderid).populate("items.product");
    res.status(200).json({ order });
  } catch (error) {
    res.status(500).json({ message: "Error fetching order details", error });
  }
};
