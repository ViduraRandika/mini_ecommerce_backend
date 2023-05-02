import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  sku: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  images: [
    {
      type: String,
    },
  ],
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
