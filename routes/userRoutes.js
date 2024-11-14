import express from "express";
import { createUserController, loginUserController} from "../controllers/userController.js";

const router = express.Router();

// Define the route for creating a user
router.post("/auth/register", createUserController);

// User login route
router.post("/auth/login",loginUserController)

export default router;
