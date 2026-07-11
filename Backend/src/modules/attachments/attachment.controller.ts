import { Response } from "express";
import { AuthRequest } from "../../middleware/auth.middleware.js";
import {
  uploadAttachment,
  getAttachments,
} from "./attachment.service.js";
import {
  successResponse,
  errorResponse,
} from "../../utils/response.js";

export const upload = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.file) {
      return errorResponse(
        res,
        "Image is required",
        400
      );
    }

    const result = await uploadAttachment(
      req.params.id as string,
      req.file,
      req.user!.userId
    );

    return successResponse(
      res,
      "Attachment uploaded successfully",
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
    const result = await getAttachments(
      req.params.id as string
    );

    return successResponse(
      res,
      "Attachments fetched successfully",
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