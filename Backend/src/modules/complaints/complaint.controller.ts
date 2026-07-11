import { Response } from "express";
import { AuthRequest } from "../../middleware/auth.middleware.js";
import {
  createComplaint,
  getMyComplaints,
  getComplaintById,
  updateComplaintStatus,
  deleteComplaint,
} from "./complaint.service.js";
import { successResponse, errorResponse } from "../../utils/response.js";

export const create = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const result = await createComplaint(req.user!.userId, req.body);

    return successResponse(
      res,
      "Complaint submitted successfully",
      result,
      201
    );
  } catch (error: any) {
    return errorResponse(res, error.message, 400);
  }
};

export const getMy = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const result = await getMyComplaints(req.user!.userId);

    return successResponse(
      res,
      "Complaints fetched successfully",
      result
    );
  } catch (error: any) {
    return errorResponse(res, error.message, 400);
  }
};

export const getOne = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const result = await getComplaintById(
      req.params.id as string,
      req.user!.userId
    );

    return successResponse(
      res,
      "Complaint fetched successfully",
      result
    );
  } catch (error: any) {
    return errorResponse(res, error.message, 404);
  }
};

export const updateStatus = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const result = await updateComplaintStatus(
      req.params.id as string,
      req.body,
      req.user!.userId
    );

    return successResponse(
      res,
      "Complaint status updated successfully",
      result
    );
  } catch (error: any) {
    return errorResponse(res, error.message, 400);
  }
};

export const remove = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const result = await deleteComplaint(
      req.params.id as string,
      req.user!.userId
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