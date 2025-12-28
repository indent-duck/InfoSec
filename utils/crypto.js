import crypto from "node:crypto";
import "dotenv/config";

const SECRET_KEY = Buffer.from(process.env.AES_SECRET_KEY, "hex");
const IV = Buffer.from(process.env.AES_IV, "hex");

export function encrypt(text) {
  const cipher = crypto.createCipheriv("aes-256-cbc", SECRET_KEY, IV);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}

export function decrypt(encryptedText) {
  const decipher = crypto.createDecipheriv("aes-256-cbc", SECRET_KEY, IV);
  let decrypted = decipher.update(encryptedText, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}
