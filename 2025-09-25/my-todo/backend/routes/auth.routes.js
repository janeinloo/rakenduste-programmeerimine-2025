const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const SECRET_KEY = "your_secret_key";

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "1234") {
      const token = jwt.sign(
          { username: "admin", role: "admin" },
          SECRET_KEY,
          { expiresIn: "1h" }
      );
      return res.json({ token });
  }

  res.status(401).json({ message: "Invalid credentials" });
})

router.get("/ping", (req, res) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader)
  return res.status(401).json({ message: "Missing authorization header" });

  const token = authHeader.split(" ")[1];
  if (!token)
    return res.status(401).json({ message: "Missing token" });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    res.json({ message: "JWT valid", user: decoded });
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
});

module.exports = router;