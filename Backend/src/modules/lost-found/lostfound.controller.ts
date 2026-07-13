import { Response } from "express";
import { AuthRequest } from "../../middleware/auth.middleware.js";
import { asyncHandler } from "../../errors/asyncHandler.js";

import {
  createLostFound,
  getAllLostFound,
  getLostFoundById,
  updateLostFound,
  deleteLostFound,
} from "./lostfound.service.js";

import { successResponse } from "../../utils/response.js";

export const create = asyncHandler(async (
  req: AuthRequest,
  res: Response
) => {
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
});

export const getAll = asyncHandler(async (
  req: AuthRequest,
  res: Response
) => {
  const result = await getAllLostFound();

  return successResponse(
    res,
    "Posts fetched successfully",
    result
  );
});

export const getOne = asyncHandler(async (
  req: AuthRequest,
  res: Response
) => {
  const result = await getLostFoundById(
    req.params.id
  );

  return successResponse(
    res,
    "Post fetched successfully",
    result
  );
});

export const update = asyncHandler(async (
  req: AuthRequest,
  res: Response
) => {
  const result = await updateLostFound(
    req.params.id,
    req.body
  );

  return successResponse(
    res,
    "Post updated successfully",
    result
  );
});

export const remove = asyncHandler(async (
  req: AuthRequest,
  res: Response
) => {
  const result = await deleteLostFound(
    req.params.id
  );

  return successResponse(
    res,
    result.message
  );
});