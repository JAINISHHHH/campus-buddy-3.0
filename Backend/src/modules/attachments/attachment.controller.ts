import { Response } from "express";
import { AuthRequest } from "../../middleware/auth.middleware.js";
import { asyncHandler } from "../../errors/asyncHandler.js";
import { AppError } from "../../errors/AppError.js";

import {
  uploadAttachment,
  getAttachments,
} from "./attachment.service.js";

import { successResponse } from "../../utils/response.js";

export const upload = asyncHandler(async (
  req: AuthRequest,
  res: Response
) => {
  if (!req.file) {
    throw new AppError(
      "Image is required",
      400
    );
  }

  const result = await uploadAttachment(
    req.params.id,
    req.file,
    req.user!.userId
  );

  return successResponse(
    res,
    "Attachment uploaded successfully",
    result,
    201
  );
});

export const getAll = asyncHandler(async (
  req: AuthRequest,
  res: Response
) => {
  const result = await getAttachments(
    req.params.id
  );

  return successResponse(
    res,
    "Attachments fetched successfully",
    result
  );
});