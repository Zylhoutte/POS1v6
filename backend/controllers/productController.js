const Product = require("../models/productModel");

const getProduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).send(products);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const addProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(200).send("Product created successfully!");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.body.productId;
    const updates = req.body.updates;

    const product = await Product.findOneAndUpdate(
      { _id: productId },
      updates,
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.body.productId;

    const product = await Product.findOneAndDelete({ _id: productId });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully", product });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const updateProductQuantity = async (req, res) => {
  try {
    const productId = req.body.productId;
    const newQuantity = req.body.quantity;

    const product = await Product.findOneAndUpdate(
      { _id: productId },
      { quantity: newQuantity },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res
      .status(200)
      .json({ message: "Product quantity updated successfully", product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  updateProductQuantity,
};
