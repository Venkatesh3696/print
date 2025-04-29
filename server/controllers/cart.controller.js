import { Cart } from "../models/cart.model.js";

export const addItemToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
    return res
      .status(400)
      .json({ message: "Product ID and quantity are required" });
  }

  try {
    const cartItem = await Cart.addItem(req.user._id, productId, quantity);
    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({ message: "Error adding item to cart", error });
  }
};

export const getCartItems = async (req, res) => {
  try {
    const cartItems = await Cart.getItems(req.user._id);
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart items", error });
  }
};

export const removeItemFromCart = async (req, res) => {
  const { itemId } = req.params;

  try {
    await Cart.removeItem(req.user.id, itemId);
    res.status(200).json({ message: "Item removed from cart" });
  } catch (error) {
    res.status(500).json({ message: "Error removing item from cart", error });
  }
};
