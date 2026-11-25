
const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/auth");

const {
  placeOrder,
  getMyOrders
} = require("../controller/OrderController");

router.post("/", verifyToken, placeOrder);

router.get("/myorders", verifyToken, getMyOrders);

module.exports = router;
