import express from "express";
import Account from "../models/Account.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

// account registration/creation
router.post("/register", async (req, res) => {
  try {
    const { email, password, studentNumber } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const account = await Account.create({
      email,
      passwordHash,
      studentNumber,
      role: "user",
    });
    res.status(201).json(account);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const account = await Account.findOne({ email });
    if (!account) return res.status(404).json({ error: "Account not found" });
    const valid = await bcrypt.compare(password, account.passwordHash);
    if (!valid) return res.status(401).json({ error: "Invalid credentials" });

    // login token generation
    const token = jwt.sign(
      { id: account._id, role: account.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
