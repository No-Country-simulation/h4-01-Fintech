
// src/lib/generateUniqueCVU.ts
import { prisma } from "@/db/ConnectPrisma"

export async function generateUniqueCVU(): Promise<string> {
  let cvu: string = ''
  let isUnique = false

  while (!isUnique) {
    cvu = Array.from({ length: 22 }, () => Math.floor(Math.random() * 10)).join('')
    const existingBalance = await prisma.balance.findUnique({ where: { cvu } })

    if (!existingBalance) {
      isUnique = true
    }
  }

  return cvu
}