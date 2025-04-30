import { Router } from "express";
import {
  addItemToCart,
  getCartItems,
  removeItemFromCart,
} from "../controllers/cart.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/", protect, addItemToCart);

router.get("/", protect, getCartItems);

router.delete("/:itemId", protect, removeItemFromCart);
export default router;
