// pages/api/matieres.js
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Récupérer la liste des matières premières
    const matieres = await prisma.matierePremiere.findMany()
    res.status(200).json(matieres)
  } else if (req.method === 'POST') {
    // Créer une nouvelle matière première
    const { nom, type, reference, prixUnitaire, unite } = req.body
    const nouvelleMatiere = await prisma.matierePremiere.create({
      data: { nom, type, reference, prixUnitaire, unite }
    })
    res.status(201).json(nouvelleMatiere)
  } else {
    res.status(405).json({ message: 'Méthode non autorisée' })
  }

}
