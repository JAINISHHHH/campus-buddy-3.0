import prisma from "../../config/db.js";
import { AppError } from "../../errors/AppError.js";

import { CreateCommentInput } from "./comment.types.js";

export const createComment = async (
  complaintId: string,
  userId: string,
  data: CreateCommentInput
) => {
  const complaint = await prisma.complaint.findUnique({
    where: {
      id: complaintId,
    },
  });

  if (!complaint) {
    throw new AppError(
      "Complaint not found",
      404
    );
  }

  const comment = await prisma.complaintComment.create({
    data: {
      complaintId,
      message: data.message,
      createdBy: userId,
    },
  });

  await prisma.complaintHistory.create({
    data: {
      complaintId,
      status: complaint.status,
      updatedBy: userId,
      remarks: "Comment Added",
    },
  });

  return comment;
};

export const getComments = async (
  complaintId: string
) => {
  const complaint = await prisma.complaint.findUnique({
    where: {
      id: complaintId,
    },
  });

  if (!complaint) {
    throw new AppError(
      "Complaint not found",
      404
    );
  }

  return prisma.complaintComment.findMany({
    where: {
      complaintId,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
};

export const deleteComment = async (
  commentId: string
) => {
  const comment = await prisma.complaintComment.findUnique({
    where: {
      id: commentId,
    },
  });

  if (!comment) {
    throw new AppError(
      "Comment not found",
      404
    );
  }

  await prisma.complaintComment.delete({
    where: {
      id: commentId,
    },
  });

  return {
    message: "Comment deleted successfully",
  };
};