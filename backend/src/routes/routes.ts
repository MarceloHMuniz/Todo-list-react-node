import express from 'express';
import { login } from '../controllers/userController';
// import { create, getById, getAll, update, del } from '../controllers/userController';

const router = express.Router();

// router.post("/user", create);

// router.get("/user/:id", getById);

// router.get("/user", getAll);

// router.put("/user/:id", update);

// router.delete("/user/:id", del);

router.post("/auth/", login);

export default router;