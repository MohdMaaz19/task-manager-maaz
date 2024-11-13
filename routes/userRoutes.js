import express from "express";
import { createUserController } from "../controllers/userController.js";

const router = express.Router();

// Define the route for creating a user
router.post("/auth/register", createUserController);


export default router;
