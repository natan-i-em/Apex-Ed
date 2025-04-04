const jwt = require("jsonwebtoken");
const saveUser = require("../model/userModel");
const userModel = require("../model/userModel");

exports.signup = async (req, res) => {
const { username, email, password } = req.body;

  try {
    // Save user and send OTP
    const role = "Student";
    const newUser = await userModel.saveUser({ username, email, password, role });
    res.status(201).json({
      message: "User signed up successfully. Please verify your email using the OTP sent.",
    });
  } catch (error) {
    res.status(500).json({ message: "Error signing up", error: error.message });
  }
};
exports.verifyEmailOTP = async (req, res) => {
    const { email, otp } = req.body;
  
    try {
      const isVerified = await userModel.verifyOTP(email, otp);
      if (isVerified) {
        res.status(200).json({ message: "Email verified successfully!" });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

exports.login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // 1. Fetch the user from the database
      const user = await userModel.getUserByEmail(email);
      
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      // 2. Verify the password
      const isValidPassword = await userModel.verifyPassword(password, user.password);
      
      if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      // 3. Generate JWT
      const payload = {
        userId: user.id,
        email: user.email,
        emailVerified: user.email_verify,
        role: user.role, // Assuming 'role' is stored in the user table
      };
  
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY });
  
      // 4. Send the token back to the client
      res.status(200).json({
        message: 'Login successful',
        token,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
