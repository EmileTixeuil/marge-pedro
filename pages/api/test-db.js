import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  try {
    const matieres = await prisma.matierePremiere.findMany()
    console.log("✅ Connexion OK. Matières :", matieres.length)
    res.status(200).json({
      status: "ok",
      matieres: matieres,
    })
  } catch (error) {
    console.error("❌ Erreur de connexion à Supabase :", error)
    res.status(500).json({
      status: "error",
      message: error.message,
    })
  } finally {
    await prisma.$disconnect()
  }
}
