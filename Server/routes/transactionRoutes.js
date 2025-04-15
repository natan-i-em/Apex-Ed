// routes/transactionRoutes.js
const express = require("express");
const router = express.Router();
const { initializePayment, verifyPayment } = require("../controller/transactionController");
const auth = require("../middelware/auth");

router.post("/initialize", auth, initializePayment);
router.get("/verify", verifyPayment);

module.exports = router;
