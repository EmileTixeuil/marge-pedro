// pages/api/test-db.js
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  try {
    const matieres = await prisma.matierePremiere.findMany()
    res.status(200).json({
      status: "ok",
      count: matieres.length,
      matieres,
    })
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    })
  } finally {
    await prisma.$disconnect()
  }
}
