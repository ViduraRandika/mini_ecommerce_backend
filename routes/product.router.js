import express from "express";
import { addNewProduct, deleteProductById, getAllProducts, getProductById, updateProductById } from "../Controllers/product.controller.js";
import { userAuthorization } from "../middlewares/auth.middleare.js";

const productRouter = express.Router();

// ALL ROUTES RESPONSES ARE RELEVANT TO EACH VENDOR
// Get all products
productRouter.get("/",userAuthorization, getAllProducts);

// Get single product by id
productRouter.get("/:id",userAuthorization, getProductById);

// Add new product
productRouter.post("/",userAuthorization, addNewProduct);

// Update product by id
productRouter.put("/:id",userAuthorization, updateProductById);

// Delete product by id
productRouter.delete("/:id",userAuthorization, deleteProductById);

export default productRouter;