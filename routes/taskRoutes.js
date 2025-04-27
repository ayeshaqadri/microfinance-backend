// routes/taskRoutes.js
import express from "express";
import { createTask, getTasks, updateTask, deleteTask } from "../controllers/taskController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Task Routes.....
router.post("/", protect, createTask);
router.get("/", protect, getTasks);
router.put("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);

export default router;
