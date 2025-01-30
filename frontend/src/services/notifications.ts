'use server'

import { prisma } from '@/db/ConnectPrisma'

// Obtener la cantidad de notificaciones sin leer
export const getUnreadCount = async (userId: string): Promise<number> => {
  const count = await prisma.notifications.count({
    where: {
      userId,
      read_status: false,
    },
  })
  return count
}

// Obtener todas las notificaciones de un usuario
export const getAllNotifications = async (userId: string) => {
  return await prisma.notifications.findMany({
    where: { userId },
    orderBy: { timestamp: 'desc' },
  })
}

// Marcar notificación como leída
export const markNotificationAsRead = async (notificationId: string) => {
  return await prisma.notifications.update({
    where: { id: notificationId },
    data: { read_status: true },
  })
}

export const deleteNotification = async (
  userId: string,
  notificationId: string
) => {
  return await prisma.notifications.deleteMany({
    where: {
      id: notificationId,
      userId, //
    },
  })
}