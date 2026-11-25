
const Product = require("../model/Product");

const ProductData = async (req, res) => {
  try {
    const {
      name,
      title,
      description,
      price,
      image,
      category,
      stock
    } = req.body;

    if (!name || price === undefined || !image) {
      return res.status(400).json({
        message: "Name, price and image are required."
      });
    }

    const numericPrice = Number(price);

    if (!Number.isFinite(numericPrice) || numericPrice < 0) {
      return res.status(400).json({
        message: "Please enter a valid price."
      });
    }

    const product = await Product.create({
      name,
      title: title || name,
      description: description || "",
      price: numericPrice,
      image,
      category: category || "General",
      stock: stock === undefined ? 10 : Number(stock)
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
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found."
      });
    }

    await product.deleteOne();

    res.status(200).json({
      message: "Product deleted successfully."
    });

  } catch (error) {
    res.status(400).json({
      message: "Invalid product ID."
    });
  }
};

module.exports = ProductData;
module.exports.deleteProduct = deleteProduct;
