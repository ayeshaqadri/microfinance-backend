// controllers/taskController.js
import Task from "../models/Task.js";

// @desc Create new Task
export const createTask = async (req, res) => {
  try {
    const task = await Task.create({ ...req.body, user: req.user._id });
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: "Error creating task", error });
  }
};

// @desc Get all tasks for logged in user
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id });
    res.json(tasks);
  } catch (error) {
    res.status(400).json({ message: "Error fetching tasks", error });
  }
};

// @desc Update a task
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task || task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: "Error updating task", error });
  }
};

// @desc Delete a task
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task || task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await task.deleteOne();
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting task", error });
  }
};
