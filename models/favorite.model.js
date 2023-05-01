import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  vensorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
    required: true,
  },
});

const Favorite = mongoose.model('Favorite', favoriteSchema);

export default Favorite;