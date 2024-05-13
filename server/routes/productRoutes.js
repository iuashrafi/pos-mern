const express = require("express");
const router = express.Router();
const ProductModel = require("../models/ProductModel");
const multer = require("multer");
const verifyToken = require("../middlewares/verifyToken");

/**
 * Creating a product
 */
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name
  },
});

const upload = multer({ storage });
router.post("/add_product", upload.single("productFile"), async (req, res) => {
  const { user_id, owner_id, name, description, category } = req.body;
  try {
    const newProduct = new ProductModel({
      user_id,
      owner_id,
      name,
      category,
      image_url: req.file.path,
      //   price,
      description,
    });

    await newProduct.save();
    res.status(201).json({ success: "Product added successfully" });
  } catch (err) {
    console.error("Error saving product:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * updating the product
 */
router.put("/edit/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const updatedProductData = req.body;

    const {
      productName: name,
      productCategory: category,
      productDesc: description,
    } = req.body;

    console.log("***********************");
    console.log("****** UPDATING  ********");
    console.log(`product id = `, req.params.productId);
    console.log(`updatedProductData = `, updatedProductData);
    console.log("***********************");

    if (!productId) {
      return res.status(400).json({ error: "Product ID is required." });
    }

    // Update the product by ID
    const updatedProduct = await ProductModel.findOneAndUpdate(
      { _id: productId },
      { name, category, description },
      { new: true } // Return the updated document
    );

    // Check if the product was found and updated
    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found." });
    }

    // Return the updated product
    res.status(200).json({
      message: "Product updated successfully.",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * @desc  Delete a product
 */
router.delete("/:productId", verifyToken, async (req, res) => {
  const productId = req.params.productId;
  const userId = req.decodedToken.userId;
  try {
    const product = await ProductModel.findOne({
      _id: productId,
      $or: [
        { user_id: userId }, // Check if userId matches product's user_id
        { owner_id: userId }, // Check if userId matches product's owner_id
      ],
    });

    // Check if the product exists and the user is authorized to delete it
    if (!product) {
      // If product is not found or user is not authorized, send a 404 Not Found response
      return res
        .status(404)
        .json({ message: "Product not found or unauthorized" });
    }

    // If product is found and user is authorized, delete it
    await ProductModel.findByIdAndDelete(productId);
    // Send a success response
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * @returns list of all the products by a user
 */

router.get("/all", async (req, res) => {
  try {
    // const { user_id } = req.body;
    const user_id = req.query.user_id;

    if (!user_id) {
      return res.status(400).json({ error: "User id is required." });
    }

    const products = await ProductModel.find({ user_id });

    // If no products found, return appropriate status
    if (products.length === 0) {
      return res
        .status(404)
        .json({ error: "No products found for the specified user ID." });
    }

    // Return the products as a response with status 200
    res.status(200).json(products);
  } catch (error) {
    // Handle errors
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
