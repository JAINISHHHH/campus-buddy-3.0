import prisma from "../../config/db.js";
import { AppError } from "../../errors/AppError.js";
import { buildQuery } from "../../utils/queryBuilder.js";
import { paginationResponse } from "../../utils/paginationResponse.js";

import {
  CreateComplaintInput,
  UpdateComplaintStatusInput,
} from "./complaint.types.js";

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
    throw new AppError(
      "Student profile not found",
      404
    );
  }

  const category = await prisma.complaintCategory.findUnique({
    where: {
      id: data.categoryId,
    },
  });

  if (!category) {
    throw new AppError(
      "Complaint category not found",
      404
    );
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
      remarks: "Complaint Created",
    },
  });

  return complaint;
};

export const getMyComplaints = async (
  userId: string,
  query: any
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

  const {
    skip,
    take,
    where,
    orderBy,
    page,
    limit,
  } = buildQuery(query, [
    "title",
    "description",
  ]);

  where.studentId = student.id;

  const [complaints, total] =
    await prisma.$transaction([
      prisma.complaint.findMany({
        where,
        include: {
          category: true,
        },
        skip,
        take,
        orderBy,
      }),

      prisma.complaint.count({
        where,
      }),
    ]);

  return paginationResponse(
    complaints,
    total,
    page,
    limit
  );
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
    throw new AppError(
      "Student profile not found",
      404
    );
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
    throw new AppError(
      "Complaint not found",
      404
    );
  }

  return complaint;
};

export const updateComplaintStatus = async (
  complaintId: string,
  data: UpdateComplaintStatusInput,
  updatedBy: string
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

  const updatedComplaint = await prisma.complaint.update({
    where: {
      id: complaintId,
    },
    data: {
      status: data.status,
    },
    include: {
      category: true,
      student: true,
    },
  });

  await prisma.complaintHistory.create({
    data: {
      complaintId,
      status: data.status,
      updatedBy,
      remarks: `Status changed to ${data.status}`,
    },
  });

  return updatedComplaint;
};

export const deleteComplaint = async (
  complaintId: string,
  userId: string
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

  const complaint = await prisma.complaint.findFirst({
    where: {
      id: complaintId,
      studentId: student.id,
    },
  });

  if (!complaint) {
    throw new AppError(
      "Complaint not found",
      404
    );
  }

  if (complaint.status !== "PENDING") {
    throw new AppError(
      "Only pending complaints can be deleted.",
      400
    );
  }

  await prisma.complaintHistory.create({
    data: {
      complaintId,
      status: complaint.status,
      updatedBy: student.id,
      remarks: "Complaint deleted by student",
    },
  });

  await prisma.complaint.delete({
    where: {
      id: complaintId,
    },
  });

  return {
    message: "Complaint deleted successfully",
  };
};