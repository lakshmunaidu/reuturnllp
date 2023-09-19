// controllers/userController.js
const bcrypt = require("bcrypt");
const User = require("../models/User"); // Import your Mongoose User model

// Controller for user registration
exports.registerUser = async (req, res) => {
  try {
    const { username, password, phoneNumber } = req.body;

    // Check if the username or phone number already exists
    const existingUser = await User.findOne({
      $or: [{ username }, { phoneNumber }],
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Username or phone number already exists" });
    }

    // Hash the user's password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user document
    const newUser = new User({
      username,
      password: hashedPassword,
      phoneNumber,
    });

    // Save the user to the database
    await newUser.save();

    res.json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller to retrieve user information by ID
exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    // Fetch user information from the database by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error retrieving user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller to update user information
exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { username, phoneNumber } = req.body;

    // Find the user by ID and update their information
    await User.findByIdAndUpdate(userId, { username, phoneNumber });

    res.json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller to delete a user
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Find the user by ID and remove them from the database
    await User.findByIdAndRemove(userId);

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Other user-related controller functions
// ...
