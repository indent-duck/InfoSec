import crypto from "node:crypto";

// for generating AES key and IV
// file is already used, no need to run again

console.log("AES Key:", crypto.randomBytes(32).toString("hex")); // 32 bytes for AES-256
console.log("AES IV:", crypto.randomBytes(16).toString("hex")); // 16 bytes IV
