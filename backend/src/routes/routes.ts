import express from 'express';
import { login } from '../controllers/userController';
import { create, getUserById, getUsers, updateUser, deleteUser } from '../controllers/userController';

const router = express.Router();

router.post("/user", create);

router.get("/user/:id", getUserById);

router.get("/user", getUsers);

router.put("/user/:id", updateUser);

router.delete("/user/:id", deleteUser);

router.post("/login/", login);

export default router;