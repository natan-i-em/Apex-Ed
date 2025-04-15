// /models/userModel.js

const bcrypt = require("bcrypt");
const db = require("../config/db"); // Ensure db is correctly imported
const { generateOTP, sendOTPEmail , sendOtpPasswordEmail} = require("../utility/otpUtil");

const saveUser = async ({ username, email, password, role }) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user to the database
    const query =
      "INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, username, email, role";
    const values = [username, email, hashedPassword, role];
    const result = await db.query(query, values);

    // Generate OTP for email verification
    const otp = generateOTP();

    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000).toISOString();  // 10 minutes from the current time

    // Save OTP and its expiry in the database
    const otpQuery = "UPDATE users SET otp = $1, otp_expiry = $2 WHERE email = $3";
    await db.query(otpQuery, [otp, otpExpiry, email]);

    // Send OTP to user's email
    await sendOTPEmail(email, otp);

    return result.rows[0]; // Return the new user
  } catch (error) {
    throw new Error("Error saving user: " + error.message);
  }
};

const getUserByEmail = async (email) => {
  try {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    return result.rows[0];
  } catch (error) {
    throw new Error("Error fetching user: " + error.message);
  }
};
const verifyPassword = async (inputPassword, storedPasswordHash) => {
    return await bcrypt.compare(inputPassword, storedPasswordHash);
  };

// Function to verify OTP
const verifyOTP = async (email, otp) => {
  try {
    const user = await getUserByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }

    const { otp: storedOtp, otp_expiry } = user;

    // Check if OTP is expired
    if (Date.now() > otp_expiry) {
      throw new Error("OTP has expired");
    }

    // Verify if OTP matches
    if (storedOtp !== otp) {
      throw new Error("Invalid OTP");
    }

    // Mark email as verified
    const query = "UPDATE users SET email_verified = true WHERE email = $1";
    await db.query(query, [email]);

    return true; // OTP verified successfully
  } catch (error) {
    throw new Error("Error verifying OTP: " + error.message);
  }
};
const verifyPasswordOTP = async (email, otp) => {
  try {
    const user = await getUserByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }

    const { otp: storedOtp, otp_expiry } = user;

    // Check if OTP is expired
    if (Date.now() > otp_expiry) {
      throw new Error("OTP has expired");
    }

    // Verify if OTP matches
    if (storedOtp !== otp) {
      throw new Error("Invalid OTP");
    }

    return true; // OTP verified successfully
  } catch (error) {
    throw new Error("Error verifying OTP: " + error.message);
  }
};
const getUserById = async (email) => {
  
  try {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    return result.rows[0];
  } catch (error) {
    throw new Error("Error fetching user: " + error.message);
  }
};

const getForgetPassword = async (email) => {
  const otp = generateOTP();
  const otpExpiry = new Date(Date.now() + 10 * 60 * 1000).toISOString();  // 10 minutes from the current time

  try {
      // Save OTP and its expiry in the database
  const otpQuery = "UPDATE users SET otp = $1, otp_expiry = $2 WHERE email = $3";
  const result = await db.query(otpQuery, [otp, otpExpiry, email]);

    // Send OTP to user's email
    await sendOtpPasswordEmail(email, otp);
  
    return result.rows[0];
  } catch (error) {
    throw new Error("Error : " + error.message);
  }

};

const resetPassword = async (email, newPassword) => {
  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const query = "UPDATE users SET password = $1 WHERE email = $2";
    await db.query(query, [hashedPassword, email]);
  } catch (error) {
    throw new Error("Error resetting password: " + error.message);
  }
};

const enrollUser = async (userId, courseId, isPaid = false) => {
  try {
   const result =  await db.query(
    `INSERT INTO enrollments (user_id, course_id, is_paid, lifetime_access)
     VALUES ($1, $2, $3, $4)
     ON CONFLICT (user_id, course_id) DO NOTHING`,
    [userId, courseId, isPaid, true]);
    
  return result.rows;

  }catch (error) {
    throw new Error("Error enrolling user in course: " + error.message);

  }
 
  return result.rows.length > 0; // true if inserted, false if already existed
};



module.exports = { saveUser, 
  getUserByEmail,
  verifyOTP,
  verifyPassword, 
  resetPassword,
  getUserById , 
  getForgetPassword,
  verifyPasswordOTP,
  enrollUser
};
