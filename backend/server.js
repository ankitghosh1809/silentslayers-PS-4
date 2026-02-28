import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";

// Routes
import reviewRoutes from "./routes/review.routes.js";

dotenv.config();

const app = express();

/* -------------------------
   Middleware
-------------------------- */
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

/* -------------------------
   Routes
-------------------------- */
app.use("/api", reviewRoutes);

app.get("/", (req, res) => {
  res.status(200).send("API Running...");
});

/* -------------------------
   Database + Server Start
-------------------------- */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server running on port ${process.env.PORT || 8000}`);
    });
  })
  .catch((err) => {
    console.error("DB Connection Error:", err.message);
  });