const jwt = require("jsonwebtoken");
const { secretKey } = require("../config/authConfig"); // Import your JWT secret key

// Middleware to check if the request has a valid JWT token
exports.authenticateUser = (req, res, next) => {
  // Extract the JWT token from the request headers
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    // Verify the token using your secret key
    const decoded = jwt.verify(token, secretKey);

    // Attach the decoded user information to the request object for further use
    req.user = decoded.user;

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Error authenticating user:", error);
    res.status(401).json({ error: "Invalid token" });
  }
};
