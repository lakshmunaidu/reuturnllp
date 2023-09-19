const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

// Middleware
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)
app.use(morgan("combined")); // HTTP request logging

// Connect to MongoDB (replace with your MongoDB URI)
mongoose.connect("mongodb://localhost/your-database-name", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

// Import and use route files
const userRoutes = require("./routes/userRoutes"); // Import user routes
const productRoutes = require("./routes/productRoutes"); // Import product routes
const authRoutes = require("./routes/authRoutes"); // Import authentication routes

app.use("/api/users", userRoutes); // Use user routes
app.use("/api/products", productRoutes); // Use product routes
app.use("/api/auth", authRoutes); // Use authentication routes

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
