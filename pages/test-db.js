// pages/test-db.js
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  try {
    const matieres = await prisma.matierePremiere.findMany()
    console.log('Connexion OK. Matières trouvées :', matieres.length)
    res.setHeader('Content-Type', 'text/plain')
    res.status(200).end(`✅ Connexion OK. ${matieres.length} matière(s) trouvée(s).`)
  } catch (error) {
    console.error('❌ Erreur de connexion à Supabase :', error)
    res.setHeader('Content-Type', 'text/plain')
    res.status(500).end('❌ Connexion échouée : ' + error.message)
  } finally {
    await prisma.$disconnect()
  }
}
