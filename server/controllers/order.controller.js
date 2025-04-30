import { Cart } from "../models/cart.model.js";
import { Order } from "../models/order.model.js";

export const placeOrder = async (req, res) => {
  try {
    const cart = await Cart.find({ userId: req.user._id });

    const cartProducts = cart.items;

    const newOrder = await Order.addItem(req.user._id, cartProducts);
    res.status(201).json({ order: newOrder });
  } catch (error) {
    res.status(500).json({ message: "Error adding item to cart", error });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id });
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
};

export const getOrderDetails = async (req, res) => {
  const { orderid } = req.params;
  try {
    const order = await Order.findById(orderid);
    res.status(200).json({ order });
  } catch (error) {
    res.status(500).json({ message: "Error fetching order details", error });
  }
};
