import { User } from "../models/user.model.js";
import { Product } from "../models/product.model.js";
import { uploadImage } from "../utils/cloudinary.js";

export const getProducts = async (req, res) => {
  const filter = {};
  const { search, category, minPrice, maxPrice } = req.query || {};
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  if (category) {
    filter.category = category;
  }

  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  try {
    const products = await Product.find(filter);
    res
      .status(200)
      .json({ message: "Products fetched successfully!", products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
    console.log(error);
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, price, description, category } = req.body;
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const image = await uploadImage(req.file.path);

    if (!name || !price || !category || !image) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newProduct = new Product({
      name,
      price,
      description,
      category,
      image,
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const product = await Product.findByIdAndUpdate(req.params.id, {
      name,
      price,
      description,
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllCategories = async (req, res) => {
  console.log("catt");
  try {
    const categories = await Product.distinct("category");
    res.status(200).json({ categories });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
