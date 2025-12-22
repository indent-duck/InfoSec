import crypto from "crypto";

const algorithm = "aes-256-cbc";

if (!process.env.AES_SECRET_KEY) {
  throw new Error("AES_SECRET_KEY is missing from environment variables");
}

// ✅ force 32-byte key
const secretKey = crypto
  .createHash("sha256")
  .update(process.env.AES_SECRET_KEY)
  .digest();

export function encrypt(text) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  return {
    iv: iv.toString("hex"),
    encryptedData: encrypted,
  };
}

export function decrypt(encryptedData, iv) {
  const decipher = crypto.createDecipheriv(
    algorithm,
    secretKey,
    Buffer.from(iv, "hex")
  );

  let decrypted = decipher.update(encryptedData, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}
