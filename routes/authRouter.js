import { Router } from "express";
import User from "../db/models/User.js";
import validateBody from "../helpers/validateBody.js";
import { registerSchema, loginSchema } from "../schemas/authSchemas.js";
import {
  registerController,
  loginController,
} from "../controllers/authControllers.js";

const authRouter = Router();

authRouter.post("/register", validateBody(registerSchema), registerController);
authRouter.post("/login", validateBody(loginSchema), loginController);

export default authRouter;
