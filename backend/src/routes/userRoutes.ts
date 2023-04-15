import express from 'express';
import { login, validateToken, create, getUserById, getUsers, updateUser, deleteUser } from '../controllers/userController';

export const userRouter = express.Router();

userRouter.post("/user", create);

userRouter.get("/user/:id", getUserById);

userRouter.get("/user", getUsers);

userRouter.put("/user/:id", updateUser);

userRouter.delete("/user/:id", deleteUser);

userRouter.post("/login/", login);

userRouter.get("/validateToken/", validateToken);