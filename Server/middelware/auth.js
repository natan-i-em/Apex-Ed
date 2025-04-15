const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET;

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // "Bearer <token>"
  console.log("token in auth middleware:", token);

  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded; // Attach decoded user info to req.user
    next();

    console.log("decoded in auth middleware:", decoded);
  } catch (err) {
    return res.status(401).json({ message: "Invalid token", error: err.message });
  }
};

module.exports = auth;
