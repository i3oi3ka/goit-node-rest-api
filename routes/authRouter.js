import { Router } from "express";
import User from "../db/models/User.js";
import validateBody from "../helpers/validateBody.js";
import { registerSchema, loginSchema } from "../schemas/authSchemas.js";
import {
  registerController,
  loginController,
  getCurrentController,
  logoutController,
} from "../controllers/authControllers.js";
import authenticate from "../middlewares/authenticate.js";

const authRouter = Router();

authRouter.post("/register", validateBody(registerSchema), registerController);

authRouter.post("/login", validateBody(loginSchema), loginController);

authRouter.get("/current", authenticate, getCurrentController);

authRouter.post("/logout", authenticate, logoutController);

export default authRouter;
