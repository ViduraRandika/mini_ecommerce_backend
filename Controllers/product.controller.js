import Product from "../models/product.model.js";

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
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
    if (!product) {
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
    await Product.findByIdAndDelete(req.params.id);
    res.send({ msg: "Product removed" });
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).send({ msg: "Product not found" });
    }
    res.status(500).send({ msg: "Server Error" });
  }
};
