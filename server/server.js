import "dotenv/config"; // ✅ MUST BE FIRST LINE

import express from "express";
import cors from "cors";
import submissionRoutes from "./routes/submission.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", submissionRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
