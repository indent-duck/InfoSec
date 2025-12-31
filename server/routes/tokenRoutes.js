import express from "express";
import Token from "../models/Token.js";
import { authenticateToken } from "../middleware/AuthMiddleware.js";

const router = express.Router();

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