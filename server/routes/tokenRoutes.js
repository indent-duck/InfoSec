import express from "express";
import Token from "../models/Token.js";
import jwt from "jsonwebtoken";
import { authenticateToken } from "../middleware/AuthMiddleware.js";

const router = express.Router();

// GET token count for current user
router.get("/count", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "No token provided" });
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const tokenCount = await Token.countDocuments({ userId: decoded.id, used: false });
    
    res.json({ count: tokenCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all tokens for a user
router.get("/user/:userId", authenticateToken, async (req, res) => {
  try {
    const tokens = await Token.find({ userId: req.params.userId }).populate("formId");
    res.json(tokens);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all tokens for a form
router.get("/form/:formId", authenticateToken, async (req, res) => {
  try {
    const tokens = await Token.find({ formId: req.params.formId }).populate("userId");
    res.json(tokens);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all tokens
router.get("/", authenticateToken, async (req, res) => {
  try {
    const tokens = await Token.find().populate("userId formId");
    res.json(tokens);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;