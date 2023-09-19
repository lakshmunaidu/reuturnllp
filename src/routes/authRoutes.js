const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController"); // Import the authentication controller

// Define routes for authentication-related actions
router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.post("/logout", authController.logoutUser);

module.exports = router;
