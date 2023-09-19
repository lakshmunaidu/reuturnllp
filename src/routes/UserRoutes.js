const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController"); // Import the user controller

// Define routes for user-related actions
router.post("/register", userController.registerUser);
router.get("/profile/:id", userController.getUserProfile);
router.put("/update/:id", userController.updateUserProfile);
router.delete("/delete/:id", userController.deleteUser);

module.exports = router;
