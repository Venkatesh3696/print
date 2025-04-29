import { Schema, mongoose } from "mongoose";

const cartSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
});

export const Cart = mongoose.model("Cart", cartSchema);
