const jwt = require("jsonwebtoken");
const saveUser = require("../model/userModel");
const userModel = require("../model/userModel");

exports.signup = async (req, res) => {
const { username, email, password } = req.body;

  try {
    // Save user and send OTP
    const role = "Admin";
    const newUser = await userModel.saveUser({ username, email, password, role });
    res.status(201).json({
      message: "User signed up successfully. Please verify your email using the OTP sent.",
      newUser
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
      //Fetch the user from the database
      const user = await userModel.getUserByEmail(email);
  
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      //Verify the password
      const isValidPassword = await userModel.verifyPassword(password, user.password);
  
      if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      //Generate JWT
      const payload = {
        userId: user.id,
        email: user.email,
        emailVerified: user.email_verify,
        role: user.role, // Assuming 'role' is stored in the user table
      };
  
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY });
  
      //Set the token in HttpOnly cookie
      res.cookie('token', token, {
        httpOnly: true, // Prevent access to the token from JavaScript
        secure: process.env.NODE_ENV === 'production', // Use secure cookie for production (requires HTTPS)
        sameSite: 'Strict', // Protects against CSRF
        maxAge: parseInt(process.env.JWT_EXPIRY) * 1000, // Expires in JWT_EXPIRY (milliseconds)
      });
      console.log(token)
      //Send a success response without the token in the body
      return res.status(200).json({
        message: 'Login successful',
        token
      });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  exports.getMe = async (req, res) => {
    const { email } = req.params;
    try {
      const user = await userModel.getUserById(email);
      res.status(200).json({ user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

exports.forgotPassword = async (req, res) => {
    // Implement forgot password logic here
    const { email } = req.body;
    console.log("email is: ", email)
    try {
      const user = await userModel.getForgetPassword(email);
      res.status(200).json({ message: "success" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };


  exports.verifyPasswordOTP = async (req, res) => {
    const { email, otp } = req.body;

    try {
      const isVerified = await userModel.verifyPasswordOTP(email, otp);
      if (isVerified) {
        res.status(200).json({ message: "Email otp verified successfully!" });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

exports.resetPassword = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await userModel.getUserByEmail(email);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      await userModel.resetPassword(email, password);
  
      res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };