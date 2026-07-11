import prisma from "../../config/db.js";

export const getDashboard = async () => {
  const [
    totalStudents,
    totalFaculty,
    totalDepartments,
    totalComplaints,
    pendingComplaints,
    inProgressComplaints,
    resolvedComplaints,
    closedComplaints,
  ] = await Promise.all([
    prisma.student.count(),
    prisma.faculty.count(),
    prisma.department.count(),
    prisma.complaint.count(),

    prisma.complaint.count({
      where: {
        status: "PENDING",
      },
    }),

    prisma.complaint.count({
      where: {
        status: "IN_PROGRESS",
      },
    }),

    prisma.complaint.count({
      where: {
        status: "RESOLVED",
      },
    }),

    prisma.complaint.count({
      where: {
        status: "CLOSED",
      },
    }),
  ]);

  return {
    totalStudents,
    totalFaculty,
    totalDepartments,
    totalComplaints,
    pendingComplaints,
    inProgressComplaints,
    resolvedComplaints,
    closedComplaints,
  };
};

export const getAllComplaints = async () => {
  return prisma.complaint.findMany({
    include: {
      category: true,
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

export const getAllStudents = async () => {
  return prisma.student.findMany({
    include: {
      department: true,
    },
    orderBy: {
      firstName: "asc",
    },
  });
};

export const getAllFaculty = async () => {
  return prisma.faculty.findMany({
    include: {
      department: true,
    },
    orderBy: {
      firstName: "asc",
    },
  });
};