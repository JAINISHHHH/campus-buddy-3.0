import { Request, Response } from "express";

import {
  createEvent,
  getAllEvents,
  getEvent,
  updateEvent,
  deleteEvent,
} from "./event.service.js";

import {
  successResponse,
  errorResponse,
} from "../../utils/response.js";

export const create = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await createEvent(req.body);

    return successResponse(
      res,
      "Event created successfully",
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
  req: Request,
  res: Response
) => {
  try {
    const result = await getAllEvents();

    return successResponse(
      res,
      "Events fetched successfully",
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
  req: Request,
  res: Response
) => {
  try {
    const result = await getEvent(
      req.params.id as string
    );

    return successResponse(
      res,
      "Event fetched successfully",
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

export const update = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await updateEvent(
      req.params.id as string,
      req.body
    );

    return successResponse(
      res,
      "Event updated successfully",
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

export const remove = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await deleteEvent(
      req.params.id as string
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