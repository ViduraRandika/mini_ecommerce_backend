import express from "express";
import Product from "../models/product.model.js";
const productRouter = express.Router();

//Get all products
productRouter.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.send(products);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ msg: "Server error" });
  }
});

//Get single product by id
productRouter.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send({ msg: "Product not found" });
    }
    res.send(product);
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).send({ msg: "Product not found" });
    }
    res.status(500).send({ msg: "Server error" });
  }
});

//Add new product
productRouter.post("/", async (req, res) => {
  const { sku, quantity, description, images } = req.body;
  try {
    const newProduct = new Product({ sku, quantity, description, images });
    const product = await newProduct.save();
    res.send(product);
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Server error" });
  }
});

//Update product by id
productRouter.put("/:id", async (req, res) => {
  const { sku, quantity, description, images } = req.body;
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send({ msg: "Product not found" });
    }
    product.sku = sku;
    product.quantity = quantity;
    product.description = description;
    product.images = images;

    await product.save();
    res.send(product);
  } catch (error) {
    console.error(error.message);
    if (error.king === "ObjectId") {
      return res.status(404).send({ msg: "Product not found" });
    }
    res.status(500).send({ msg: "Server Error" });
  }
});

// Delete product by id
productRouter.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send({ msg: "Product not found" });
    }
    await product.remove();
    res.send({ msg: "Product removed" });
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).send({ msg: "Product not found" });
    }
    res.status(500).send({ msg: "Server Error" });
  }
});

export default productRouter;
