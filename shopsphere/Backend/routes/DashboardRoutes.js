
const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/auth");
const adminOnly = require("../middleware/auth").adminOnly;

router.get("/dashboard", verifyToken, adminOnly, (req, res) => {
  res.json({
    message: "Welcome to the ShopSphere Admin Dashboard.",
    user: req.user
  });
});

module.exports = router;
