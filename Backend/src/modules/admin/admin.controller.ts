import { Request, Response } from "express";
import {
  getDashboard,
  getAllComplaints,
  getAllStudents,
  getAllFaculty,
} from "./admin.service.js";

import {
  successResponse,
  errorResponse,
} from "../../utils/response.js";

export const dashboard = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await getDashboard();

    return successResponse(
      res,
      "Dashboard fetched successfully",
      result
    );
  } catch (error: any) {
    return errorResponse(
      res,
      error.message,
      500
    );
  }
};

export const complaints = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await getAllComplaints();

    return successResponse(
      res,
      "Complaints fetched successfully",
      result
    );
  } catch (error: any) {
    return errorResponse(
      res,
      error.message,
      500
    );
  }
};

export const students = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await getAllStudents();

    return successResponse(
      res,
      "Students fetched successfully",
      result
    );
  } catch (error: any) {
    return errorResponse(
      res,
      error.message,
      500
    );
  }
};

export const faculty = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await getAllFaculty();

    return successResponse(
      res,
      "Faculty fetched successfully",
      result
    );
  } catch (error: any) {
    return errorResponse(
      res,
      error.message,
      500
    );
  }
};