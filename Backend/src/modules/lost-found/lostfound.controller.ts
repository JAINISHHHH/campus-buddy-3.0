import { Response } from "express";
import { AuthRequest } from "../../middleware/auth.middleware.js";

import {
  createLostFound,
  getAllLostFound,
  getLostFoundById,
  updateLostFound,
  deleteLostFound,
} from "./lostfound.service.js";

import {
  successResponse,
  errorResponse,
} from "../../utils/response.js";

export const create = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const result = await createLostFound(
      req.user!.userId,
      req.body
    );

    return successResponse(
      res,
      "Post created successfully",
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

export const getAll = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const result = await getAllLostFound();

    return successResponse(
      res,
      "Posts fetched successfully",
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

export const getOne = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const result = await getLostFoundById(
      req.params.id as string
    );

    return successResponse(
      res,
      "Post fetched successfully",
      result
    );
  } catch (error: any) {
    return errorResponse(
      res,
      error.message,
      404
    );
  }
};

export const update = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const result = await updateLostFound(
      req.params.id as string,
      req.body
    );

    return successResponse(
      res,
      "Post updated successfully",
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

export const remove = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const result = await deleteLostFound(
      req.params.id as string
    );

    return successResponse(
      res,
      result.message
    );
  } catch (error: any) {
    return errorResponse(
      res,
      error.message,
      400
    );
  }
};