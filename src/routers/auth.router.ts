import { Router } from "express";
import { login, register } from "../controllers/auth.controller";
import { validate } from "../middlewares";
import { regiserSchema } from "../middlewares/schemas/register.schema";
import { loginSchema } from "../middlewares/schemas/login.schema";

const router = Router();

// /api/v1/auth/register
router.post("/register", validate(regiserSchema), register);

// /api/v1/auth/login
router.post("/login", validate(loginSchema), login);

export default router;
