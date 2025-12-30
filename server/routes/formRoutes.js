import express from "express";
import Form from "../models/Form.js";
import { authenticateToken } from "../middleware/AuthMiddleware.js";

const router = express.Router();

// POST create form
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { title, description, season, expiresAt, questions } = req.body;
    const form = new Form({
      title,
      description,
      season,
      expiresAt,
      questions,
      createdBy: req.user.id,
    });

    await form.save();
    res.status(201).json(form);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET all forms
router.get("/", authenticateToken, async (req, res) => {
  try {
    const forms = await Form.find();
    res.json(forms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single form by ID
router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    if (!form) {
      return res.status(404).json({ error: "Form not found" });
    }
    res.json(form);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
