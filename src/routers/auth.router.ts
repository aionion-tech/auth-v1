import { Router } from "express";
import { register } from "../controllers/auth.controller";
import { validate } from "../middlewares";
import { regiserSchema } from "../middlewares/register.middleware";

const router = Router();

router.post("/register", validate(regiserSchema), register);

export default router;
