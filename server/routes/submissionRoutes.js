import express from "express";
import Submission from "../models/Submission.js";
import Token from "../models/Token.js";
import { authenticateToken } from "../middleware/AuthMiddleware.js";
import { encrypt, decrypt } from "../../utils/crypto.js";

const router = express.Router();

// POST create submission
router.post("/", authenticateToken, async (req, res) => {
  try {
    console.log("Submission request received:", req.body);
    const { formId, answers } = req.body;
    
    console.log("Form ID:", formId);
    console.log("User ID:", req.user.id);
    console.log("Answers:", answers);
    
    // Find an unused token for this user and form
    const userToken = await Token.findOne({ 
      userId: req.user.id, 
      formId: formId, 
      used: false 
    });
    
    if (!userToken) {
      return res.status(400).json({ error: "No available token for this form" });
    }
    
    console.log("Using token:", userToken.token);
    
    // Encrypt each answer
    const encryptedAnswers = answers.map(answer => {
      console.log("Encrypting answer:", answer.answer);
      return {
        questionIndex: answer.questionIndex,
        answer: encrypt(answer.answer)
      };
    });

    console.log("Encrypted answers:", encryptedAnswers);

    const submission = new Submission({
      formId,
      token: userToken.token,
      answers: encryptedAnswers,
    });

    await submission.save();
    
    // Delete the token after storing it in submission
    await Token.findByIdAndDelete(userToken._id);
    
    console.log("Submission saved and token deleted");
    res.status(201).json({ message: "Submission created successfully" });
  } catch (err) {
    console.error("Error in submission:", err);
    res.status(400).json({ error: err.message });
  }
});

// GET submissions for a form
router.get("/form/:formId", authenticateToken, async (req, res) => {
  try {
    console.log("Fetching submissions for form:", req.params.formId);
    const submissions = await Submission.find({ formId: req.params.formId });
    console.log(`Found ${submissions.length} submissions for form ${req.params.formId}`);
    res.json(submissions);
  } catch (err) {
    console.error("Error fetching submissions:", err);
    res.status(500).json({ error: err.message });
  }
});

// GET single submission by ID
router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);
    if (!submission) {
      return res.status(404).json({ error: "Submission not found" });
    }
    res.json(submission);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST decrypt text
router.post("/decrypt", authenticateToken, async (req, res) => {
  try {
    const { encryptedText } = req.body;
    const decryptedText = decrypt(encryptedText);
    res.json({ decryptedText });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT mark submission as reviewed
router.put("/:id/review", authenticateToken, async (req, res) => {
  try {
    const submission = await Submission.findByIdAndUpdate(
      req.params.id,
      { reviewed: true },
      { new: true }
    );
    if (!submission) {
      return res.status(404).json({ error: "Submission not found" });
    }
    res.json(submission);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;