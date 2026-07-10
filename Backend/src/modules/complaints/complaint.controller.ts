import { Response } from "express";
import { AuthRequest } from "../../middleware/auth.middleware.js";
import {
  createComplaint,
  getMyComplaints,
  getComplaintById,
} from "./complaint.service.js";
import { successResponse, errorResponse } from "../../utils/response.js";

export const create = async (
  req: AuthRequest,
  res: Response
) => {
  try {
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
  } catch (error: any) {
    return errorResponse(
      res,
      error.message,
      400
    );
  }
};

export const getMy = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const result = await getMyComplaints(
      req.user!.userId
    );

    return successResponse(
      res,
      "Complaints fetched successfully",
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
  req: AuthRequest<{ id: string }>,
  res: Response
) => {
  try {
    const result = await getComplaintById(
      req.params.id,
      req.user!.userId
    );

    return successResponse(
      res,
      "Complaint fetched successfully",
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