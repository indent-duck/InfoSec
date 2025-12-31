import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
});

const formSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "No description available.",
  },
  questions: [questionSchema],
  season: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["open", "closed", "expired"],
    default: "open",
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});

export default mongoose.model("Form", formSchema);
