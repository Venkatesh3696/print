import { Router } from "express";

import {
  registerUser,
  loginUser,
  LogoutUser,
  getUserProfile,
} from "../controllers/user.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/signup", registerUser);

router.post("/login", loginUser);

router.get("/profile", protect, getUserProfile);

router.post("/logout", LogoutUser);

export default router;
