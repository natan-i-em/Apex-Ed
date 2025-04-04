require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(cors({
    origin: '*', // Adjust this to allow specific origins
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true // Allows cookies and authentication headers
}));
app.use(bodyParser.json());

app.use("/auth", userRoutes);


app.get("/api/hello", (req, res) => {
    res.status(200).json({ message: "Hello Apex!" });;
})


const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
