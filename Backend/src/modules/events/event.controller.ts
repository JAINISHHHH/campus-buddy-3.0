import { Request, Response } from "express";

import { asyncHandler } from "../../errors/asyncHandler.js";

import {
  createEvent,
  getAllEvents,
  getEvent,
  updateEvent,
  deleteEvent,
} from "./event.service.js";

import { successResponse } from "../../utils/response.js";

export const create = asyncHandler(async (
  req: Request,
  res: Response
) => {
  const result = await createEvent(req.body);

  return successResponse(
    res,
    "Event created successfully",
    result,
    201
  );
});

export const getAll = asyncHandler(async (
  req: Request,
  res: Response
) => {
  const result = await getAllEvents();

  return successResponse(
    res,
    "Events fetched successfully",
    result
  );
});

export const getOne = asyncHandler(async (
  req: Request,
  res: Response
) => {
  const result = await getEvent(
    req.params.id as string
  );

  return successResponse(
    res,
    "Event fetched successfully",
    result
  );
});

export const update = asyncHandler(async (
  req: Request,
  res: Response
) => {
  const result = await updateEvent(
    req.params.id as string,
    req.body
  );

  return successResponse(
    res,
    "Event updated successfully",
    result
  );
});

export const remove = asyncHandler(async (
  req: Request,
  res: Response
) => {
  const result = await deleteEvent(
    req.params.id as string
  );

  return successResponse(
    res,
    result.message
  );
});