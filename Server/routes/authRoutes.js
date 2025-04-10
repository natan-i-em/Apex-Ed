// const express = require("express");
// const { monitorEventLoopDelay } = require("perf_hooks");
// const router = express.Router();


// router.post("/login", async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         console.log(req.body)
//         // Perform authentication logic here (e.g., check credentials against the database)
//         // For demonstration, let's assume authentication is successful
//         const user = { email }; // Replace with actual user object from the database

//         // Send the user object as a response
//         res.status(200).json({ message: "Login successful", user });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Server error" });    
//     }
// });

// module.exports = router;