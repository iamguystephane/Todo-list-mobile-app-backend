const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("Auth header:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", verified);
    req.user = verified;
    next();
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    res.status(401).json({ error: "Token is invalid" });
  }
};

module.exports = auth;
