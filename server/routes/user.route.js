import { Router } from "express";

import {
  registerUser,
  loginUser,
  LogoutUser,
  getUserProfile,
  authMiddleware,
} from "../controllers/user.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/signup", registerUser);

router.post("/login", loginUser);

router.get("/check-auth", authMiddleware, (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    message: "Authenticated user!",
    user,
  });
});

router.get("/profile", protect, getUserProfile);

router.post("/logout", LogoutUser);

export default router;
