import express from "express";
import Form from "../models/Form.js";
import { authenticateToken } from "../middleware/AuthMiddleware.js";

const router = express.Router();

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

export default router;
