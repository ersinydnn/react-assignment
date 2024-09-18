const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  amount: Number,
  unit: String,
  company: String,
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
