import Product from "../models/product.model.js";
import Vendor from "../models/vendor.model.js";
import { verifyToken } from "../Utils/VerifyToken.js";

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({
      vendor: verifyToken(req.cookies.jwt).userId,
    });
    res.send(products);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ msg: "Server error" });
  }
};

// Get all favourite products
export const getAllFavouriteProducts = async (req, res) => {
  try {
    const products = await Product.find({
      vendor: verifyToken(req.cookies.jwt).userId,isFavourite:true
    });
    res.send(products);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ msg: "Server error" });
  }
};

// Get single product by id
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (
      !product ||
      product.vendor.toString() !== verifyToken(req.cookies.jwt).userId
    ) {
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
};

// Add new product
export const addNewProduct = async (req, res) => {
  const { sku, qty, description, images, name, price } = req.body;
  try {
    const newProduct = new Product({
      sku,
      quantity: qty,
      name,
      images,
      description,
      price,
      vendor: verifyToken(req.cookies.jwt).userId,
    });
    const product = await newProduct.save();
    res.send(product);
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Server error" });
  }
};

// Update product by id
export const updateProductById = async (req, res) => {
  const { sku, qty, description, images, name, price } = req.body;
  try {
    let product = await Product.findById(req.params.id);
    if (
      !product ||
      product.vendor.toString() !== verifyToken(req.cookies.jwt).userId
    ) {
      return res.status(404).send({ msg: "Product not found" });
    }
    product.sku = sku;
    product.quantity = qty;
    product.description = description;
    product.images = images;
    product.name = name;
    product.price = price;

    await product.save();
    res.send(product);
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).send({ msg: "Product not found" });
    }
    res.status(500).send({ msg: "Server Error" });
  }
};

// Delete product by id
export const deleteProductById = async (req, res) => {
  try {
    await Product.findOneAndDelete({
      _id: req.params.id,
      vendor: verifyToken(req.cookies.jwt).userId,
    });
    res.send({ msg: "Product removed" });
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).send({ msg: "Product not found" });
    }
    res.status(500).send({ msg: "Server Error" });
  }
};

//Add to favourite by id
export const addProductToFavourite = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (
      !product ||
      product.vendor.toString() !== verifyToken(req.cookies.jwt).userId
    ) {
      return res.status(404).send({ msg: "Product not found" });
    }

    product.isFavourite = true;

    await product.save();
    res.send(product);
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).send({ msg: "Product not found" });
    }
    res.status(500).send({ msg: "Server Error" });
  }
}

//Remove product from favourite by id
export const removeProductFromFavourite = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (
      !product ||
      product.vendor.toString() !== verifyToken(req.cookies.jwt).userId
    ) {
      return res.status(404).send({ msg: "Product not found" });
    }

    product.isFavourite = false;

    await product.save();
    res.send(product);
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).send({ msg: "Product not found" });
    }
    res.status(500).send({ msg: "Server Error" });
  }
}

//search products
export const searchProducts = async (req,res) => {
  const { query } = req.body;
  const products = await Product.find({
    $or: [
      { sku: query },
      { name: { $regex: query, $options: "i" } },
      { description: { $regex: query, $options: "i" } },
    ],
  });
  
  res.send(products);
}
