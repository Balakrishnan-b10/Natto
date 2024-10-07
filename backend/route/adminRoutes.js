import express from "express";
import bcrypt from "bcrypt";
import pkg from "jsonwebtoken";
const { sign, JsonWebTokenError } = pkg; // Import 'sign' for JWT token generation

import Admin from "../model/Adminlogin.js";

const router = express.Router();
// Secret key for JWT
const JWT_SECRET = "your_jwt_secret_key";

// Admin login route
router.post("/adminlogin", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if admin exists
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res
        .status(400)
        .json({ success: false, message: "Admin not found" });
    }

    // Match password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid password" });
    }

    // Generate JWT token
    const token = sign({ id: admin._id, role: admin.role }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      success: true,
      token,
      data: {
        name: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// Register an admin (Optional)
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if admin already exists
    let admin = await Admin.findOne({ email });
    if (admin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Hash password before saving to the database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new admin
    admin = new Admin({ email, password: hashedPassword });
    await admin.save();

    res.status(201).json({ message: "Admin created successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

export default router;
