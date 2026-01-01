import express from "express";
import Submission from "../models/Submission.js";
import Token from "../models/Token.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// Submit form and use token
router.post("/", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "No token provided" });
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { formId, answers } = req.body;
    
    // Find and use a token for this form
    const userToken = await Token.findOne({ 
      userId: decoded.id, 
      formId: formId, 
      used: false 
    });
    
    if (!userToken) {
      return res.status(400).json({ error: "No available tokens for this form" });
    }
    
    // Create submission
    const submission = await Submission.create({
      userId: decoded.id,
      formId: formId,
      answers: answers
    });
    
    // Mark token as used
    userToken.used = true;
    await userToken.save();
    
    res.status(201).json(submission);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;