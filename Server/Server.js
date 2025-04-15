require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const courseRoutes = require("./routes/courseRoutes");
const transactionRoutes = require("./routes/transactionRoutes");

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


app.use("/api/transactions", transactionRoutes);



app.get("/api/hello", (req, res) => {
    res.status(200).json({ message: "Hello Apex!" });;
})


const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
