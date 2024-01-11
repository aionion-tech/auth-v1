import { Request, Response, NextFunction } from "express";

const isConstraintError = (err: any) => {
  return err.name === "SequelizeUniqueConstraintError";
};

export const rootError = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (process.env.NODE_ENV === "development") console.log(err);

  if (!isConstraintError(err)) {
    return res.status(400).json({
      message: err.errors[0].message,
    });
  }

  res.status(500).json({
    message: "Something went wrong",
  });
};
