const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController"); // Import the product controller

// Define routes for product-related actions
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.post("/create", productController.createProduct);
router.put("/update/:id", productController.updateProduct);
router.delete("/delete/:id", productController.deleteProduct);

module.exports = router;
