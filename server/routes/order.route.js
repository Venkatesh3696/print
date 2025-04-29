import { Router } from "express";

import { protect } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/", protect, addItemToCart);

router.get("/", protect, getCartItems);

export default router;
