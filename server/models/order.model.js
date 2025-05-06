import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    address: {
      doorNo: String,
      village: String,
      city: String,
      pincode: String,
    },
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: Number,
      },
    ],
    createdAt: { type: Date, default: Date.now },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
