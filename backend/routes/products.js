const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

router.post("/", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).send(newProduct);
  } catch (error) {
    res
      .status(500)
      .send({ message: "An error occurred while adding the product", error });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).send(updatedProduct);
  } catch (error) {
    res
      .status(500)
      .send({ message: "An error occurred while updating the product", error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: "Product successfully deleted" });
  } catch (error) {
    res
      .status(500)
      .send({ message: "An error occurred while deleting the product", error });
  }
});

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send({ message: "Unable to retrieve products", error });
  }
});

router.get("/categories", async (req, res) => {
  try {
    const products = await Product.find();
    const categories = products.reduce((acc, product) => {
      const category = product.category;
      acc[category] = acc[category] ? acc[category] + 1 : 1;
      return acc;
    }, {});

    const categoryData = Object.keys(categories).map((category) => ({
      category,
      count: categories[category],
    }));

    res.json(categoryData);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Unable to retrieve product categories", error });
  }
});

module.exports = router;
