import prisma from "../../config/db.js";

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
    throw new Error("Complaint not found");
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
  return prisma.complaintAttachment.findMany({
    where: {
      complaintId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};