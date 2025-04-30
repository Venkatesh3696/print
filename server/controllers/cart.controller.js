import { Cart } from "../models/cart.model.js";

export const getCartItems = async (req, res) => {
  try {
    const cartItems = await Cart.find({ userId: req.userId }).populate(
      "items.product"
    );

    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart items", error });
  }
};

export const addItemToCart = async (req, res) => {
  const { product, quantity, price } = req.body;

  try {
    console.log(product, quantity, price);
    if (!product || !quantity || !price) {
      return res
        .status(500)
        .json({ message: "Product ID, quantity and price are required" });
    }

    let cart = await Cart.findOne({ userId: req?.userId });

    if (cart.length === 0) {
      cart = await Cart.create({ userId: req?.userId });
    }

    console.log("itemm==>>", cart.items);
    const itemIndex = cart?.items?.findIndex((item) => {
      return item.product.toString() === product;
    });

    console.log("index", itemIndex);

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product, quantity, price });
    }
    // cart?.items?.price = price

    await cart.save();

    res.status(201).json(cart);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error adding item to cart", error });
  }
};

export const decreaseItemFromCart = async (req, res) => {
  const { productId } = req.params;

  try {
    const cart = await Cart.findOne({ userId: req?.userId });

    if (!cart) {
      return res.status(500).json("cart not found");
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity -= quantity;

      if (cart?.items[itemIndex].quantity === 1) {
        cart.items.filter((each) => each.productId !== productId);
      }
    } else {
      res.status(500).json({ message: "Item not in  cart" });
    }

    await Cart.save();
    res.status(200).json({ message: "Item removed from cart" });
  } catch (error) {
    res.status(500).json({ message: "Error removing item from cart", error });
  }
};

export const removeItemFromCart = async (req, res) => {
  const { productId } = req.params;

  try {
    const cart = await Cart.find({ userId: req?.userId });
    if (!cart) {
      return res.status(500).json("cart not found");
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items.filter((each) => each.productId !== productId);
    } else {
      res.status(500).json({ message: "Item not in  cart" });
    }

    res.status(200).json({ message: "Item removed from cart" });
  } catch (error) {
    res.status(500).json({ message: "Error removing item from cart", error });
  }
};
