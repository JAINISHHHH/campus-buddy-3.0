import { Response } from "express";
import { AuthRequest } from "../../middleware/auth.middleware.js";
import { asyncHandler } from "../../errors/asyncHandler.js";

import {
  createComplaint,
  getMyComplaints,
  getComplaintById,
  updateComplaintStatus,
  deleteComplaint,
} from "./complaint.service.js";

import { successResponse } from "../../utils/response.js";

export const create = asyncHandler(async (
  req: AuthRequest,
  res: Response
) => {
  const result = await createComplaint(
    req.user!.userId,
    req.body
  );

  return successResponse(
    res,
    "Complaint submitted successfully",
    result,
    201
  );
});

export const getMy = asyncHandler(async (
  req: AuthRequest,
  res: Response
) => {
const result = await getMyComplaints(
  req.user!.userId,
  req.query
);

  return successResponse(
    res,
    "Complaints fetched successfully",
    result
  );
});

export const getOne = asyncHandler(async (
  req: AuthRequest,
  res: Response
) => {
  const result = await getComplaintById(
    req.params.id,
    req.user!.userId
  );

  return successResponse(
    res,
    "Complaint fetched successfully",
    result
  );
});

export const updateStatus = asyncHandler(async (
  req: AuthRequest,
  res: Response
) => {
  const result = await updateComplaintStatus(
    req.params.id,
    req.body,
    req.user!.userId
  );

  return successResponse(
    res,
    "Complaint status updated successfully",
    result
  );
});

export const remove = asyncHandler(async (
  req: AuthRequest,
  res: Response
) => {
  const result = await deleteComplaint(
    req.params.id,
    req.user!.userId
  );

  return successResponse(
    res,
    result.message
  );
});