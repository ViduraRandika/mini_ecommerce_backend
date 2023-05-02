import express from "express";
import {
  addNewProduct,
  addProductToFavourite,
  deleteProductById,
  getAllFavouriteProducts,
  getAllProducts,
  getProductById,
  removeProductFromFavourite,
  searchProducts,
  updateProductById,
} from "../Controllers/product.controller.js";
import { userAuthorization } from "../middlewares/auth.middleare.js";

const productRouter = express.Router();

// ALL ROUTES RESPONSES ARE RELEVANT TO EACH VENDOR
// Get all products
productRouter.get("/", userAuthorization, getAllProducts);

// Get all favourite products
productRouter.get("/favourites", userAuthorization, getAllFavouriteProducts);

// Get single product by id
productRouter.get("/:id", userAuthorization, getProductById);

// Add new product
productRouter.post("/", userAuthorization, addNewProduct);

// Update product by id
productRouter.put("/:id", userAuthorization, updateProductById);

// Delete product by id
productRouter.delete("/:id", userAuthorization, deleteProductById);

//Add product to favourite
productRouter.put(
  "/add-to-favourite/:id",
  userAuthorization,
  addProductToFavourite
);

//Remove product from favourite
productRouter.put(
  "/remove-from-favourite/:id",
  userAuthorization,
  removeProductFromFavourite
);

//Search products
productRouter.post("/search", userAuthorization, searchProducts);

export default productRouter;