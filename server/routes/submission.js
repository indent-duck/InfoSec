import express from "express";
import db from "../db.js";
import { encrypt } from "../utils/encryption.js";

const router = express.Router();

router.post("/submit", (req, res) => {
  const { message, tokenId } = req.body;

  if (!message || !tokenId) {
    return res.status(400).json({ error: "Invalid submission" });
  }

  const { encryptedData, iv } = encrypt(message);

  const sql = `
    INSERT INTO submissions (token_id, encrypted_message, iv)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [tokenId, encryptedData, iv], (err) => {
    if (err) {
      console.error("DB ERROR:", err);
      return res.status(500).json({ error: err.message });
    }

    res.json({ success: true });
  });
});

export default router;
