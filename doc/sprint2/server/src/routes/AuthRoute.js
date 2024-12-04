import Signup, { Login } from "../controllers/AuthController.js";
import express from "express";
const router = express.Router();

import userVerification from "../middlewares/AuthMiddleware.js";

router.post("/signup", Signup);
router.post("/login", Login);
router.post("/", userVerification);

export default router;
