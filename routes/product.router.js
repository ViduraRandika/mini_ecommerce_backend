import express from "express";
import { addNewProduct, deleteProductById, getAllProducts, getProductById, updateProductById } from "../Controllers/product.controller.js";

const productRouter = express.Router();

// ALL ROUTES RESPONSES ARE RELEVANT TO EACH VENDOR
// Get all products
productRouter.get("/", getAllProducts);

// Get single product by id
productRouter.get("/:id", getProductById);

// Add new product
productRouter.post("/", addNewProduct);

// Update product by id
productRouter.put("/:id", updateProductById);

// Delete product by id
productRouter.delete("/:id", deleteProductById);

export default productRouter;