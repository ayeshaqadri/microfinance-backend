import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import { protect } from "./middlewares/authMiddleware.js";

dotenv.config();

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'https://resonant-kulfi-c7ba93.netlify.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS policy error: Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json()); 

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", protect, taskRoutes);

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

app.get("/", (req, res) => {
  res.send("Task Manager App Backend is Running 🚀");
});

// Server Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
