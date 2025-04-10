const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.post("/verify-email-otp", userController.verifyEmailOTP)

// module.exports = router;
