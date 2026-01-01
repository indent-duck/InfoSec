import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
  formId: {
    type: mongoose.Types.ObjectId,
    ref: "Form",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  answers: [{
    questionIndex: {
      type: Number,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    }
  }],
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
