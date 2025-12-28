import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// imports .env file
dotenv.config();

/*
for using a different .env file
dotenv.config({ path: './config/dev.env' });
*/

const app = express();

app.use(cors());
app.use(express.json());

// mongoose connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error: ", err));

app.get("/", (req, res) => {
  res.send("Infosec server is running");
});

// api routes importing
import userRoutes from "./routes/userRoutes.js";
app.use("api/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
