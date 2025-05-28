const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();
router.post("/signup", async (req, res) => {
  const formData = req.body;
  console.log("formData received: ", formData);
  try {
    const existingUser = await User.findOne({ email: formData.email });
    if (existingUser) {
      return res.status(401).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(formData.password, 10);
    const newData = { ...formData, password: hashedPassword };
    const savedData = new User(newData);
    await savedData.save();
    return res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.log("Error registering user: ", err);
    return res.status(501).json({ message: "Internal server error" });
  }
});

router.post("/auth/login", async (req, res) => {
  try {
    const formData = req.body;
    const existingUser = await User.findOne({ email: formData.email });
    if (!existingUser) {
      return res.status(401).json({ message: "User not found" });
    }
    const comparePasswords = await bcrypt.compare(
      formData.password,
      existingUser.password
    );
    if (!comparePasswords) {
      return res.status(405).json({ message: "Incorrect password" });
    }
    const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res.status(201).json({ message: "Login successful", token: token });
  } catch (err) {
    console.log("Error signing in: ", err);
    return res.status(501).json({ message: "Internal server error" });
  }
});

module.exports = router;
