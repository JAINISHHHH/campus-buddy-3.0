import prisma from "../../config/db.js";
import { AppError } from "../../errors/AppError.js";

import {
  hashPassword,
  comparePassword,
} from "../../utils/bcrypt.js";

import { generateToken } from "../../utils/jwt.js";

import {
  RegisterInput,
  LoginInput,
} from "./auth.types.js";

export const registerUser = async (
  data: RegisterInput
) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (existingUser) {
    throw new AppError(
      "Email already exists",
      409
    );
  }

  const hashedPassword = await hashPassword(
    data.password
  );

  const result = await prisma.$transaction(
    async (tx) => {
      const user = await tx.user.create({
        data: {
          email: data.email,
          passwordHash: hashedPassword,
          role: data.role,
        },
      });

      const student = await tx.student.create({
        data: {
          userId: user.id,
          firstName: data.firstName,
          lastName: data.lastName,
          enrollmentNumber:
            data.enrollmentNumber,
          semester: data.semester,
          departmentId: data.departmentId,
          phone: data.phone,
        },
      });

      const token = generateToken(user.id);

      return {
        token,

        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          isVerified: user.isVerified,
          isActive: user.isActive,
          createdAt: user.createdAt,
        },

        student: {
          id: student.id,
          firstName: student.firstName,
          lastName: student.lastName,
          enrollmentNumber:
            student.enrollmentNumber,
          semester: student.semester,
          phone: student.phone,
          profileImage:
            student.profileImage,
          departmentId:
            student.departmentId,
          createdAt:
            student.createdAt,
        },
      };
    }
  );

  return result;
};

export const loginUser = async (
  data: LoginInput
) => {
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!user) {
    throw new AppError(
      "Invalid email or password",
      401
    );
  }

  if (!user.isActive) {
    throw new AppError(
      "Account has been disabled",
      403
    );
  }

  const isPasswordCorrect =
    await comparePassword(
      data.password,
      user.passwordHash
    );

  if (!isPasswordCorrect) {
    throw new AppError(
      "Invalid email or password",
      401
    );
  }

  const token = generateToken(user.id);

  return {
    token,

    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
      isActive: user.isActive,
    },
  };
};