<<<<<<< HEAD
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const courseRoutes = require("./routes/courseRoutes");

const app = express();

app.use(cors({
  origin: 'http://localhost:3000', // ✅ Specify exact origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true
}));
app.use(bodyParser.json());

app.use("/auth", userRoutes);

app.use("/api/courses", courseRoutes);

=======
// require("dotenv").config();
// const express = require("express");
// // const { graphqlHTTP } = require("express-graphql");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const pool = require("./config/db"); // Database connection

import express from "express";
import "dotenv/config";
// const userRoutes = require("./routes/userRoutes");
// const authRoutes = require("./routes/authRoutes");
// const adminRoutes = require("./routes/adminRoutes")
import adminRoutes from "./routes/adminRoutes.js"

const app = express();
// app.use(cors({
//     origin: '*', // Adjust this to allow specific origins
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
//     credentials: true // Allows cookies and authentication headers
// }));
// app.use(bodyParser.json());

// app.use("/api", userRoutes);
// app.use("/api/auth/", authRoutes)
app.use(express.json());
app.use("/api/admin/", adminRoutes)
>>>>>>> 7445b72d1a97437d4ecd3e58e4381bc9b26fcfa7


app.get("/api/hello", (req, res) => {
    res.status(200).json({ message: "Hello Apex!" });;
})


const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
