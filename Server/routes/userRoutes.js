const express = require("express");
const pool = require("../config/db");
const router = express.Router();

router.post("/auth/save-user", async (req, res) => {
  try {
    console.log(req.body)
    const { Auth_Id, First_Name, Last_Name, Email, Username, Avatar } = req.body;

    // Check if user exists
    const existingUser = await pool.query("SELECT * FROM Users WHERE email = $1", [email]);

    if (existingUser.rows.length === 0) {
      // Insert user into DB
      await pool.query(
        "INSERT INTO Users (Auth_Id,First_Name, Last_Name, Email, Username, Avatar) VALUES ($1, $2, $3 , $4, $5, $6)",
       [Auth_Id, First_Name, Last_Name, Email, Username, Avatar]
      );
    }

    res.status(200).json({ message: "User saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
