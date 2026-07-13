import prisma from "../../config/db.js";
import { AppError } from "../../errors/AppError.js";

import {
  CreateLostFoundInput,
  UpdateLostFoundInput,
} from "./lostfound.types.js";

export const createLostFound = async (
  userId: string,
  data: CreateLostFoundInput
) => {
  const student = await prisma.student.findUnique({
    where: {
      userId,
    },
  });

  if (!student) {
    throw new AppError(
      "Student profile not found",
      404
    );
  }

  return prisma.lostFound.create({
    data: {
      title: data.title,
      description: data.description,
      type: data.type,
      location: data.location,
      imageUrl: data.imageUrl,
      studentId: student.id,
    },
    include: {
      student: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          enrollmentNumber: true,
        },
      },
    },
  });
};

export const getAllLostFound = async () => {
  return prisma.lostFound.findMany({
    include: {
      student: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          enrollmentNumber: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getLostFoundById = async (
  id: string
) => {
  const post = await prisma.lostFound.findUnique({
    where: {
      id,
    },
    include: {
      student: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          enrollmentNumber: true,
        },
      },
    },
  });

  if (!post) {
    throw new AppError(
      "Post not found",
      404
    );
  }

  return post;
};

export const updateLostFound = async (
  id: string,
  data: UpdateLostFoundInput
) => {
  const post = await prisma.lostFound.findUnique({
    where: {
      id,
    },
  });

  if (!post) {
    throw new AppError(
      "Post not found",
      404
    );
  }

  return prisma.lostFound.update({
    where: {
      id,
    },
    data,
  });
};

export const deleteLostFound = async (
  id: string
) => {
  const post = await prisma.lostFound.findUnique({
    where: {
      id,
    },
  });

  if (!post) {
    throw new AppError(
      "Post not found",
      404
    );
  }

  await prisma.lostFound.delete({
    where: {
      id,
    },
  });

  return {
    message: "Post deleted successfully",
  };
};