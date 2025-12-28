import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: true,
  },
  formId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Form",
    required: true,
  },
  token: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    enum: ["used", "unused"],
    default: "unused",
  },
  createdAt: {
    type: Date,
    default: date.now,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});

export default mongoose.model("Token", tokenSchema);
