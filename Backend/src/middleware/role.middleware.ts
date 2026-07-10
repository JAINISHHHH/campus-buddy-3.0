import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware.js";
import prisma from "../config/db.js";

export const authorize = (
  ...allowedRoles: ("STUDENT" | "FACULTY" | "ADMIN" | "SUPER_ADMIN")[]
) => {
  return async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      const user = await prisma.user.findUnique({
        where: {
          id: req.user.userId,
        },
        select: {
          role: true,
        },
      });

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "User not found",
        });
      }

      if (!allowedRoles.includes(user.role)) {
        return res.status(403).json({
          success: false,
          message: "Access denied",
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };
};