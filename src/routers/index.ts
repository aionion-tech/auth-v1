import { Router } from "express";
import authRouter from "./auth.router";

const router = Router();

// /api/v1/auth
router.use("/auth", authRouter);

export default router;
