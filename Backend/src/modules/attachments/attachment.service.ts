import prisma from "../../config/db.js";
import { AppError } from "../../errors/AppError.js";

export const uploadAttachment = async (
  complaintId: string,
  file: Express.Multer.File,
  userId: string
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

  const attachment = await prisma.complaintAttachment.create({
    data: {
      complaintId,
      fileUrl: `/uploads/${file.filename}`,
    },
  });

  await prisma.complaintHistory.create({
    data: {
      complaintId,
      status: complaint.status,
      updatedBy: userId,
      remarks: "Attachment Uploaded",
    },
  });

  return attachment;
};

export const getAttachments = async (
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

  return prisma.complaintAttachment.findMany({
    where: {
      complaintId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const deleteAttachment = async (
  attachmentId: string
) => {
  const attachment =
    await prisma.complaintAttachment.findUnique({
      where: {
        id: attachmentId,
      },
    });

  if (!attachment) {
    throw new AppError(
      "Attachment not found",
      404
    );
  }

  await prisma.complaintAttachment.delete({
    where: {
      id: attachmentId,
    },
  });

  return {
    message: "Attachment deleted successfully",
  };
};