import { Response } from "express";
import { AuthRequest } from "../../middleware/auth.middleware.js";
import { asyncHandler } from "../../errors/asyncHandler.js";

import {
  createComment,
  getComments,
} from "./comment.service.js";

import { successResponse } from "../../utils/response.js";

export const create = asyncHandler(async (
  req: AuthRequest,
  res: Response
) => {
  const result = await createComment(
    req.params.id,
    req.user!.userId,
    req.body
  );

  return successResponse(
    res,
    "Comment added successfully",
    result,
    201
  );
});

export const getAll = asyncHandler(async (
  req: AuthRequest,
  res: Response
) => {
  const result = await getComments(
    req.params.id
  );

  return successResponse(
    res,
    "Comments fetched successfully",
    result
  );
});