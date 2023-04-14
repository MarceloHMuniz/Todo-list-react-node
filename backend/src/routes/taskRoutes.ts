import express from 'express';
import { createTask, getTaskById, getAllTasks, updateTask, deleteTask } from '../controllers/taskController';

export const taskRouter = express.Router();

taskRouter.post("/task", createTask);

taskRouter.get("/task/:id", getTaskById);

taskRouter.get("/task", getAllTasks);

taskRouter.put("/task/:id", updateTask);

taskRouter.delete("/task/:id", deleteTask);