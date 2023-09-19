// controllers/otpController.js
const bcrypt = require("bcrypt");

// Controller for sending OTP
exports.sendOTP = async (req, res) => {
  try {
    const { phoneNumber } = req.body;

    // Generate an OTP (you can customize this function)
    const otp = generateOTP();

    // Send OTP via Twilio (you should implement this function)
    await sendOTPViaTwilio(phoneNumber, otp);

    // Save the OTP in the database or temporary storage (e.g., a variable)
    saveOTPToDatabase(phoneNumber, otp);

    res.json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller for OTP validation
exports.validateOTP = async (req, res) => {
  try {
    const { otp, phoneNumber } = req.body;

    // Fetch the stored OTP from the database or temporary storage
    const storedOTP = getStoredOTPFromDatabase(phoneNumber);

    if (!storedOTP) {
      return res.status(400).json({ error: "OTP not found" });
    }

    // Compare the entered OTP with the stored OTP
    const isOTPValid = await bcrypt.compare(otp, storedOTP);

    if (isOTPValid) {
      // OTP is valid, you can proceed with user registration or other actions
      // ...

      res.json({ message: "OTP validation successful" });
    } else {
      res.status(400).json({ error: "Invalid OTP" });
    }
  } catch (error) {
    console.error("Error validating OTP:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Utility function to generate OTP (customize as needed)
function generateOTP() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

// Utility function to send OT via Twilio (you should implement this)
async function sendOTPViaTwilio(phoneNumber, otp) {
  // ... (use Twilio API to send OTP)
}

// Utility function to save OTP to the database or temporary storage
function saveOTPToDatabase(phoneNumber, otp) {
  // ... (store OTP in your database or a variable)
}

// Utility function to fetch the stored OTP from the database or temporary storage
function getStoredOTPFromDatabase(phoneNumber) {
  // ... (retrieve OTP from your database or a variable)
}
