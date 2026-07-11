import prisma from "../../config/db.js";

import {
  CreateEventInput,
  UpdateEventInput,
} from "./event.types.js";

export const createEvent = async (
  data: CreateEventInput
) => {
  return prisma.event.create({
    data: {
      ...data,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
      registrationDeadline: new Date(
        data.registrationDeadline
      ),
    },
  });
};

export const getAllEvents = async () => {
  return prisma.event.findMany({
    orderBy: {
      startDate: "asc",
    },
  });
};

export const getEvent = async (
  id: string
) => {
  const event = await prisma.event.findUnique({
    where: {
      id,
    },
  });

  if (!event) {
    throw new Error("Event not found");
  }

  return event;
};

export const updateEvent = async (
  id: string,
  data: UpdateEventInput
) => {
  const exists = await prisma.event.findUnique({
    where: {
      id,
    },
  });

  if (!exists) {
    throw new Error("Event not found");
  }

  return prisma.event.update({
    where: {
      id,
    },
    data: {
      ...data,
      ...(data.startDate && {
        startDate: new Date(data.startDate),
      }),
      ...(data.endDate && {
        endDate: new Date(data.endDate),
      }),
      ...(data.registrationDeadline && {
        registrationDeadline: new Date(
          data.registrationDeadline
        ),
      }),
    },
  });
};

export const deleteEvent = async (
  id: string
) => {
  const exists = await prisma.event.findUnique({
    where: {
      id,
    },
  });

  if (!exists) {
    throw new Error("Event not found");
  }

  await prisma.event.delete({
    where: {
      id,
    },
  });

  return {
    message: "Event deleted successfully",
  };
};