import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  formId: {
    type: mongoose.Types.ObjectId,
    ref: "Form",
    required: true,
  },
  encryptedAnswer: {
    type: String,
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
  reviewed: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("Submission", submissionSchema);
