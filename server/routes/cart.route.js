import { Router } from "express";
import { addItemToCart, getCartItems } from "../controllers/cart.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/", protect, addItemToCart);

router.get("/", protect, getCartItems);

router.delete("/:itemId", (req, res) => {
  const { itemId } = req.params;
  // Logic to remove item from cart
  res.status(200).json({ message: "Item removed from cart", itemId });
});
export default router;
