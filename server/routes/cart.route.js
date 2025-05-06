import { Router } from "express";
import {
  addItemToCart,
  deleteCart,
  getCartItems,
  removeItemFromCart,
  updateQuantity,
} from "../controllers/cart.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/", protect, addItemToCart);

router.get("/", protect, getCartItems);
router.put("/", protect, updateQuantity);

router.delete("/:itemId", protect, removeItemFromCart);
router.delete("/", protect, deleteCart);

export default router;
