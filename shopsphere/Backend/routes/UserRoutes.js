
const express = require("express");
const router = express.Router();
const Userdetails = require("../controller/UserController");

router.post("/auth/register", Userdetails);

module.exports = router;
