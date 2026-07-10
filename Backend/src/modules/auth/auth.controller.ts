import { Request, Response } from "express";
import {
  registerUser,
  loginUser,
} from "./auth.service.js";
import {
  successResponse,
  errorResponse,
} from "../../utils/response.js";

export const register = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await registerUser(req.body);

    return successResponse(
      res,
      "User registered successfully",
      result,
      201
    );
  } catch (error: any) {
    return errorResponse(
      res,
      error.message,
      400
    );
  }
};

export const login = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await loginUser(req.body);

    return successResponse(
      res,
      "Login successful",
      result
    );
  } catch (error: any) {
    return errorResponse(
      res,
      error.message,
      400
    );
  }
};