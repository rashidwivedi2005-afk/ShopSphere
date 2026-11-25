
const Product = require("../model/Product");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({
      createdAt: -1
    });

    res.status(200).json({
      success: true,
      products
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = { getAllProducts };
