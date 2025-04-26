import express from "express";
import { createLoanRequest, getAllLoanRequests } from "../controllers/loanController.js"; 
import { protect } from "../middlewares/authMiddleware.js";
import { getAllLoans, getLoanById, updateLoanStatus, deleteLoan } from "../controllers/loanController.js";

const router = express.Router();

// Protected routes
router.post("/create", protect, createLoanRequest); // 👈 Login user hi loan apply karega
router.get("/all", protect, getAllLoanRequests);    // 👈 Login user hi sab loan dekh sakega

// Routes
router.get("/", getAllLoans);
router.get("/:id", getLoanById);
router.patch("/:id/status", updateLoanStatus);
router.delete("/:id", deleteLoan);
router.put("/:id", updateLoanStatus);

export default router;
