import prisma from "../../config/db.js";
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
    throw new Error("Complaint not found");
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
  return prisma.complaintComment.findMany({
    where: {
      complaintId,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
};