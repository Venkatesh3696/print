import { Router } from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllCategories,
} from "../controllers/product.controller.js";
import { upload } from "../utils/cloudinary.js";

const router = Router();

router.get("/categories", getAllCategories);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", upload.single("image"), createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
