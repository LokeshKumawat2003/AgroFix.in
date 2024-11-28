const express = require("express");
const ProductModel = require("../Models/Product.Model");
const product = express.Router();

product.get("/", async (req, res) => {
  try {
    const productData = await ProductModel.find();
    res.status(200).json(productData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

product.post("/", async (req, res) => {
  try {
    const NewProduct = new ProductModel(req.body);
    const savedProduct = await NewProduct.save();
    res.status(200).json(savedProduct);
    console.log(savedProduct);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

product.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (updatedProduct) {
      res.status(200).json(updatedProduct);
      console.log(updatedProduct);
    } else {
      res.status(404).json({ message: "product not found" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

product.delete("/:id", async (req, res) => {
  try {
    const deleteProduct = await ProductModel.findByIdAndDelete(req.params.id);

    if (deleteProduct) {
      res.status(200).json({
        message: "Product deleted successfully",
        deletedProduct: deleteProduct,
      });
      console.log("Deleted Product:", deleteProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = product;
