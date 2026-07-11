import { Response } from "express";
import { AuthRequest } from "../../middleware/auth.middleware.js";
import {
  createComment,
  getComments,
} from "./comment.service.js";
import {
  successResponse,
  errorResponse,
} from "../../utils/response.js";

export const create = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    console.log("Comment Params:", req.params);

    const complaintId = req.params.id as string;

    const result = await createComment(
      complaintId,
      req.user!.userId,
      req.body
    );

    return successResponse(
      res,
      "Comment added successfully",
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
    console.log("Comment Params:", req.params);

    const complaintId = req.params.id as string;

    const result = await getComments(
      complaintId
    );

    return successResponse(
      res,
      "Comments fetched successfully",
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