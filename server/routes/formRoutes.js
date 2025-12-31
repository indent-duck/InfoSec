import express from "express";
import Form from "../models/Form.js";
import { authenticateToken } from "../middleware/AuthMiddleware.js";
import { generateTokensForForm } from "../utils/tokenGenerator.js";

const router = express.Router();

// POST create form
router.post("/", authenticateToken, async (req, res) => {
  try {
    console.log("Form creation started");
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
    console.log("Form saved with ID:", form._id);
    
    // Generate tokens for all users
    console.log("About to generate tokens...");
    await generateTokensForForm(form._id);
    console.log("Token generation completed");
    
    res.status(201).json(form);
  } catch (err) {
    console.error("Error in form creation:", err);
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
