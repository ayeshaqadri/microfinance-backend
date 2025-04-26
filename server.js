import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from "./routes/authRoutes.js";
import loanRoutes from "./routes/loanRoutes.js";

// .env file se variables lene ke liye
dotenv.config();

// Express app create
const app = express();

// Middlewares
app.use(cors({
  origin: 'http://localhost:5173', // your frontend URL
  credentials: true                
}));
app.use(express.json()); // body se json data read karne ke liye
app.use("/api/auth", authRoutes);
app.use("/api/loans", loanRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Connected'))
.catch((err) => console.error('❌ MongoDB Connection Error:', err));

// Simple Route (Test ke liye)
app.get('/', (req, res) => {
  res.send('Ayesha ki App Backend is Running 🚀');
});

// Server Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
