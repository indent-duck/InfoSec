import crypto from "crypto";
import Token from "../models/Token.js";
import Account from "../models/Account.js";

export const generateTokensForForm = async (formId) => {
  try {
    console.log("Starting token generation for form:", formId);
    
    // Get all users with role 'user'
    const users = await Account.find({ role: "user" });
    console.log("Found users with role 'user':", users.length);
    
    if (users.length === 0) {
      console.log("No users found with role 'user'");
      return [];
    }
    
    // Generate tokens for each user
    const tokens = [];
    for (const user of users) {
      const tokenString = crypto.randomBytes(32).toString("hex");
      console.log(`Generating token for user ${user._id}: ${tokenString.substring(0, 10)}...`);
      
      const token = new Token({
        userId: user._id,
        formId: formId,
        token: tokenString,
      });
      
      tokens.push(token);
    }
    
    // Save all tokens
    const savedTokens = await Token.insertMany(tokens);
    console.log(`Successfully saved ${savedTokens.length} tokens for form ${formId}`);
    
    return savedTokens;
  } catch (error) {
    console.error("Error generating tokens:", error);
    throw error;
  }
};