import { Request, Response, NextFunction } from "express";
import { User } from "../models/User.model";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password, email } = req.body;

    const user = await User.findOne({ where: { email } });

    if (user) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const newUser = await User.create({
      username,
      password,
      email,
    });

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};
