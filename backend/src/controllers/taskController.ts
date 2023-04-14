import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllTasks = async (req: Request, res: Response) => {
  const tasks = await prisma.task.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
          last_name: true,
          username: true,
        },
      },
    },
  });

  res.json(tasks);
};

export const getTaskById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const task = await prisma.task.findUnique({
    where: { id: Number(id) },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          last_name: true,
          username: true,
        },
      },
    },
  });

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.json(task);
};

export const createTask = async (req: Request, res: Response) => {
  const { title, userId } = req.body;

  const newTask = await prisma.task.create({
    data: {
      title,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });

  res.status(201).json(newTask);
};

export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, userId } = req.body;

  const updatedTask = await prisma.task.update({
    where: { id: Number(id) },
    data: {
      title,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });

  res.json(updatedTask);
};

export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;

  const deletedTask = await prisma.task.delete({
    where: { id: Number(id) },
  });

  res.json(deletedTask);
};

export const toggleTaskCompletion = async (req: Request, res: Response) => {
  const { id } = req.params;

  const task = await prisma.task.findUnique({
    where: { id: Number(id) },
  });

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  const updatedTask = await prisma.task.update({
    where: { id: Number(id) },
    data: {
      completed: !task.completed,
    },
  });

  res.json(updatedTask);
};