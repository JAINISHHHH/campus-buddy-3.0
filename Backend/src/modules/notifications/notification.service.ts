import prisma from "../../config/db.js";

export const createNotification = async (
  userId: string,
  title: string,
  message: string
) => {
  return prisma.notification.create({
    data: {
      userId,
      title,
      message,
    },
  });
};

export const getMyNotifications = async (
  userId: string
) => {
  return prisma.notification.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const markAsRead = async (
  id: string,
  userId: string
) => {
  return prisma.notification.updateMany({
    where: {
      id,
      userId,
    },
    data: {
      isRead: true,
    },
  });
};

export const markAllAsRead = async (
  userId: string
) => {
  return prisma.notification.updateMany({
    where: {
      userId,
      isRead: false,
    },
    data: {
      isRead: true,
    },
  });
};