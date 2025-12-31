import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// imports .env file
dotenv.config();

// debug purpose only
console.log("JWT_SECRET:", process.env.JWT_SECRET ? "Loaded" : "Missing");

/*
for using a different .env file
dotenv.config({ path: './config/dev.env' });
*/

const app = express();

app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT;
// mongoose connection
mongoose
  .connect(MONGO_URI)
  .then(() => console.log(`MongoDB Connected in ${MONGO_URI}`))
  .catch((err) => console.error("MongoDB connection error: ", err));

app.get("/", (req, res) => {
  res.send("Infosec server is running");
});

// api routes importing
import accountRoutes from "./routes/accountRoutes.js";
import formRoutes from "./routes/formRoutes.js";
import tokenRoutes from "./routes/tokenRoutes.js";
app.use("/api/accounts", accountRoutes);
app.use("/api/forms", formRoutes);
app.use("/api/tokens", tokenRoutes);

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
