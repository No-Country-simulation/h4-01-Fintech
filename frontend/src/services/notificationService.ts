'use server'
import { prisma } from "@/db/ConnectPrisma";

export async function createNotification(userId: string, message: string) {
  return prisma.notifications.create({
    data: {
      userId,
      message,
      read_status: false,
    },
  })
}
