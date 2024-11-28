const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  image: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  off: { type: Number },
  inStock: { type: Boolean, default: true },
});

const ProductModel = mongoose.model("Product", ProductSchema);
module.exports = ProductModel;
