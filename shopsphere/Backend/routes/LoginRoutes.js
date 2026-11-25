
const express = require("express");
const router = express.Router();
const { Login } = require("../controller/LoginController");

router.post("/auth/login", Login);

module.exports = router;
