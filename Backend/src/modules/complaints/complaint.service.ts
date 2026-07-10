import prisma from "../../config/db.js";
import { CreateComplaintInput } from "./complaint.types.js";

export const createComplaint = async (
  userId: string,
  data: CreateComplaintInput
) => {
  const student = await prisma.student.findUnique({
    where: {
      userId,
    },
  });

  if (!student) {
    throw new Error("Student profile not found");
  }

  const category = await prisma.complaintCategory.findUnique({
    where: {
      id: data.categoryId,
    },
  });

  if (!category) {
    throw new Error("Complaint category not found");
  }

  const complaint = await prisma.complaint.create({
    data: {
      title: data.title,
      description: data.description,
      priority: data.priority,
      categoryId: data.categoryId,
      studentId: student.id,
    },
    include: {
      category: true,
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

  await prisma.complaintHistory.create({
    data: {
      complaintId: complaint.id,
      status: complaint.status,
      updatedBy: student.id,
      remarks: "Complaint created",
    },
  });

  return complaint;
};

export const getMyComplaints = async (userId: string) => {
  const student = await prisma.student.findUnique({
    where: {
      userId,
    },
  });

  if (!student) {
    throw new Error("Student profile not found");
  }

  return prisma.complaint.findMany({
    where: {
      studentId: student.id,
    },
    include: {
      category: true,
      history: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getComplaintById = async (
  complaintId: string,
  userId: string
) => {
  const student = await prisma.student.findUnique({
    where: {
      userId,
    },
  });

  if (!student) {
    throw new Error("Student profile not found");
  }

  const complaint = await prisma.complaint.findFirst({
    where: {
      id: complaintId,
      studentId: student.id,
    },
    include: {
      category: true,
      comments: true,
      attachments: true,
      history: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!complaint) {
    throw new Error("Complaint not found");
  }

  return complaint;
};