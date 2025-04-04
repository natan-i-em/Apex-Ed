const crypto = require("crypto");
const sgMail = require("@sendgrid/mail");

// Set up SendGrid API Key (Use environment variables for security)
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Function to generate OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // Generates a 6-digit OTP
};

// Function to send OTP email using SendGrid
const sendOTPEmail = async (email, otp) => {
  const msg = {
    to: email,
    from: "Apex-ed@outlook.com", // Must be a verified sender in SendGrid
    subject: "Email Verification OTP",
    text: `Your OTP is: ${otp}. It will expire in 10 minutes.`,
  };

  try {
    await sgMail.send(msg);
    console.log(`OTP sent successfully to ${email}`);
  } catch (error) {
    console.error("Error sending OTP email:", error.response?.body || error);
    throw new Error("Error sending OTP email");
  }
};

module.exports = { generateOTP, sendOTPEmail };
