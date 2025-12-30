import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
  formId: {
    type: mongoose.Types.ObjectId,
    ref: "Form",
    required: true,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "Account",
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
