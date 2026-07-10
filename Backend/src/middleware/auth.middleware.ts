import { Request, Response, NextFunction } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export interface AuthRequest<P = ParamsDictionary> extends Request<P> {
  user?: {
    userId: string;
  };
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization token missing",
      });
    }

    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    const decoded = jwt.verify(token, env.JWT_SECRET) as {
      userId: string;
    };

    req.user = decoded;

    next();
  } catch {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};