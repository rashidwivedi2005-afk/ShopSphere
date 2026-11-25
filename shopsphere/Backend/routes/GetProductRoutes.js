
const express = require("express");
const router = express.Router();

const { getAllProducts } = require("../controller/GetProduct");

router.get("/products", getAllProducts);


router.get("/productsdetails", getAllProducts);

module.exports = router;
