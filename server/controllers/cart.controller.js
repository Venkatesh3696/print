import { Cart } from "../models/cart.model.js";

export const getCartItems = async (req, res) => {
  try {
    const cartItems = await Cart.findOne({ userId: req.userId }).populate(
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

    let cart = await Cart.findOne({ userId: req?.userId }).populate(
      "items.product"
    );

    console.log(cart);

    if (!cart) {
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

export const updateQuantity = async (req, res) => {
  const { productId, type } = req.body;
  console.log(productId, type);
  try {
    const cart = await Cart.findOne({ userId: req?.userId }).populate(
      "items.product"
    );

    if (!cart) {
      return res.status(500).json("cart not found");
    }

    const itemIndex = cart?.items?.findIndex((item) => {
      return item?.product?._id?.toString() === productId;
    });

    if (itemIndex > -1) {
      if (type === "plus") {
        cart.items[itemIndex].quantity += 1;
      } else if (type === "minus") {
        cart.items[itemIndex].quantity -= 1;
      }
    }

    await cart.save();

    res
      .status(200)
      .json({ message: "Item removed from cart", cartItems: cart });
  } catch (error) {
    res.status(500).json({ message: "Error removing item from cart", error });
  }
};

export const removeItemFromCart = async (req, res) => {
  const { itemId } = req.params;

  try {
    const cart = await Cart.findOne({ userId: req.userId }).populate(
      "items.product"
    );

    if (!cart) {
      return res.status(500).json("cart not found");
    }

    const itemIndex = cart?.items?.findIndex(
      (item) => item?.product?._id?.toString() === itemId
    );

    if (itemIndex > -1) {
      cart.items = cart?.items?.filter((item) => {
        return item?.product?._id?.toString() !== itemId;
      });
    } else {
      return res.status(500).json({ message: "Item not in  cart" });
    }

    await cart.save();

    res.status(200).json({ message: "Item removed from cart", cart });
  } catch (error) {
    res.status(500).json({ message: "Error removing item from cart", error });
  }
};

export const deleteCart = async (req, res) => {
  await Cart.findOneAndUpdate({ userId: req.userId }, { items: [] });
  res.json({ message: "Cart cleared" });
};
