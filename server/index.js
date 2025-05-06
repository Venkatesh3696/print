import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.route.js";
import productRoutes from "./routes/product.route.js";
import cartRoutes from "./routes/cart.route.js";
import { protect } from "./middleware/auth.middleware.js";
import { corsOptions } from "./config/corsConfig.js";
// import orderRoutes from "./routes/order.route.js";

dotenv.config();

import { connectDB } from "./config/db.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.static("public"));
app.use(cors(corsOptions));

// routes

app.use("/api/users", userRoutes);

app.use("/api/products", productRoutes);

app.use("/api/cart", protect, cartRoutes);


// app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
  res.send(`API is running... on PORT ${port} `);
});

const port = process.env.PORT || 5000;

connectDB()
  .then(() => {
    console.log("MongoDB connected successfully");
    app.listen(port, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error: ", error);
    process.exit(1);
  });
