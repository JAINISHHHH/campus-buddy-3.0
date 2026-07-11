import prisma from "../../config/db.js";
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
    throw new Error("Student profile not found");
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
  const item = await prisma.lostFound.findUnique({
    where: {
      id,
    },
    include: {
      student: {
        select: {
          firstName: true,
          lastName: true,
          enrollmentNumber: true,
        },
      },
    },
  });

  if (!item) {
    throw new Error("Post not found");
  }

  return item;
};

export const updateLostFound = async (
  id: string,
  data: UpdateLostFoundInput
) => {
  const exists = await prisma.lostFound.findUnique({
    where: {
      id,
    },
  });

  if (!exists) {
    throw new Error("Post not found");
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
  const exists = await prisma.lostFound.findUnique({
    where: {
      id,
    },
  });

  if (!exists) {
    throw new Error("Post not found");
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