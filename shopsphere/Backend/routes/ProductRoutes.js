
const express = require("express");
const router = express.Router();

const ProductData = require("../controller/ProductController");
const upload = require("../middleware/ImageStorage");
const verifyToken = require("../middleware/auth");
const adminOnly = require("../middleware/auth").adminOnly;
const uploadImage = require("../controller/UploadController");

router.post(
  "/products",
  verifyToken,
  adminOnly,
  ProductData
);

router.delete(
  "/products/:id",
  verifyToken,
  adminOnly,
  ProductData.deleteProduct
);

// Existing Cloudinary image upload
router.post(
  "/upload",
  verifyToken,
  adminOnly,
  upload.single("image"),
  uploadImage
);

// Existing product image + details upload route
router.post(
  "/product",
  verifyToken,
  adminOnly,
  upload.single("image"),
  async (req, res) => {
    try {
      const Product = require("../model/Product");

      if (!req.file) {
        return res.status(400).json({
          message: "Please upload a product image."
        });
      }

      const { name, title, description, price, category, stock } = req.body;

      if (!name || price === undefined) {
        return res.status(400).json({
          message: "Name and price are required."
        });
      }

      const product = await Product.create({
        name,
        title: title || name,
        description: description || "",
        price: Number(price),
        category: category || "General",
        stock: stock === undefined ? 10 : Number(stock),
        image: req.file.path,
        public_id: req.file.filename
      });

      res.status(201).json({
        message: "Product created successfully.",
        product
      });

    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  }
);

module.exports = router;
