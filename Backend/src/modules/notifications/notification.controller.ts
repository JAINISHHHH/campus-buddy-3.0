import { Response } from "express";
import { AuthRequest } from "../../middleware/auth.middleware.js";
import {
  createNotification,
  getMyNotifications,
  markAsRead,
  markAllAsRead,
} from "./notification.service.js";

import {
  successResponse,
  errorResponse,
} from "../../utils/response.js";

export const create = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const result = await createNotification(
      req.user!.userId,
      req.body.title,
      req.body.message
    );

    return successResponse(
      res,
      "Notification created successfully",
      result,
      201
    );
  } catch (error: any) {
    return errorResponse(res, error.message, 400);
  }
};

export const getMine = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const result = await getMyNotifications(
      req.user!.userId
    );

    return successResponse(
      res,
      "Notifications fetched successfully",
      result
    );
  } catch (error: any) {
    return errorResponse(res, error.message, 400);
  }
};

export const read = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    await markAsRead(
      req.params.id as string,
      req.user!.userId
    );

    return successResponse(
      res,
      "Notification marked as read"
    );
  } catch (error: any) {
    return errorResponse(res, error.message, 400);
  }
};

export const readAll = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    await markAllAsRead(
      req.user!.userId
    );

    return successResponse(
      res,
      "All notifications marked as read"
    );
  } catch (error: any) {
    return errorResponse(res, error.message, 400);
  }
};