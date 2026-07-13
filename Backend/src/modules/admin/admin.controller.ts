import { Request, Response } from "express";
import { asyncHandler } from "../../errors/asyncHandler.js";

import {
  getDashboard,
  getAllComplaints,
  getAllStudents,
  getAllFaculty,
} from "./admin.service.js";

import { successResponse } from "../../utils/response.js";

export const dashboard = asyncHandler(async (
  req: Request,
  res: Response
) => {
  const result = await getDashboard();

  return successResponse(
    res,
    "Dashboard fetched successfully",
    result
  );
});

export const complaints = asyncHandler(async (
  req: Request,
  res: Response
) => {
  const result = await getAllComplaints();

  return successResponse(
    res,
    "Complaints fetched successfully",
    result
  );
});

export const students = asyncHandler(async (
  req: Request,
  res: Response
) => {
  const result = await getAllStudents();

  return successResponse(
    res,
    "Students fetched successfully",
    result
  );
});

export const faculty = asyncHandler(async (
  req: Request,
  res: Response
) => {
  const result = await getAllFaculty();

  return successResponse(
    res,
    "Faculty fetched successfully",
    result
  );
});