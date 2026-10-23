import { loginUser } from "../controller/loginController.js";
import { registerUser } from "../controller/userController.js";
import express from "express";

const router = express.Router();

router.post("/register", registerUser);
router.post('/login',loginUser);

export default router;

