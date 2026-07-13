import prisma from "../../config/db.js";
import { AppError } from "../../errors/AppError.js";

export const getCurrentUser = async (
  userId: string
) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },

    select: {
      id: true,
      email: true,
      role: true,
      isVerified: true,
      isActive: true,
      createdAt: true,

      student: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          enrollmentNumber: true,
          semester: true,
          phone: true,
          profileImage: true,
          departmentId: true,
        },
      },

      faculty: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          employeeId: true,
          designation: true,
          phone: true,
          departmentId: true,
        },
      },
    },
  });

  if (!user) {
    throw new AppError(
      "User not found",
      404
    );
  }

  return user;
};