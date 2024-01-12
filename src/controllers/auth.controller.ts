import jwt from "jsonwebtoken";
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

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const accessToken = await new Promise((resolve, reject) => {
      jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET!,
        {
          expiresIn: "1d",
        },
        (err, token) => {
          if (err) {
            reject();
          }
          resolve(token);
        }
      );
    });

    const refreshToken = await new Promise((resolve, reject) => {
      jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET!,
        {
          expiresIn: "7d",
        },
        (err, token) => {
          if (err) {
            reject(err);
          }
          resolve(token);
        }
      );
    });

    res.status(200).json({
      accessToken,
      refreshToken,
      message: "Logged in successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split("Bearer ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET!);

    if (!payload) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    res.status(200).json(payload);
  } catch (error) {
    next(error);
  }
};
