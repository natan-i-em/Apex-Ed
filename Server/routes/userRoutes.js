const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
    // auth routes
router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.post("/verify-email-otp", userController.verifyEmailOTP)

    // user routes
router.get("/me/:email", userController.getMe);
router.post("/forgot-password", userController.forgotPassword);
router.post("/verify-password-otp", userController.verifyPasswordOTP)
router.post("/reset-password", userController.resetPassword)


module.exports = router;
