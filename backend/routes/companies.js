const express = require("express");
const router = express.Router();
const Company = require("../models/Company");

router.post("/", async (req, res) => {
  try {
    const newCompany = new Company(req.body);
    await newCompany.save();
    res.status(201).send(newCompany);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error occurred while adding the company", error });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedCompany = await Company.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).send(updatedCompany); //
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error occurred while updating the company", error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Company.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: "Company successfully deleted" });
  } catch (error) {
    res
      .status(500)
      .send({ message: "An error occurred while deleting the company", error });
  }
});

router.get("/count", async (req, res) => {
  try {
    const companyCount = await Company.countDocuments();
    res.status(200).send({ companyCount });
  } catch (error) {
    res.status(500).send({ message: "Unable to retrieve company count" });
  }
});

router.get("/latest", async (req, res) => {
  try {
    const latestCompanies = await Company.find().sort({ _id: -1 }).limit(3);
    res.status(200).send({ latestCompanies });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Unable to retrieve the latest companies" });
  }
});

router.get("/", async (req, res) => {
  try {
    const companies = await Company.find();
    res.status(200).send(companies);
  } catch (error) {
    res.status(500).send({ message: "Unable to retrieve companies" });
  }
});

module.exports = router;
