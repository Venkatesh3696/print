import { Router } from "express";

import { protect } from "../middleware/auth.middleware.js";
import {
  getOrderDetails,
  getOrders,
  placeOrder,
} from "../controllers/order.controller.js";

const router = Router();

router.post("/", protect, placeOrder);

router.get("/", protect, getOrders);

router.get("/:orderid", protect, getOrderDetails);

export default router;
