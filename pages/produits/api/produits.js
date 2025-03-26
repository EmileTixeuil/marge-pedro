import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const produits = await prisma.produitFini.findMany()
    res.status(200).json(produits)
  } else if (req.method === 'POST') {
    const { nom, matieres, heures, tauxHoraire, margePourcentage, margeBase, tva, prixFinal } = req.body

    const produit = await prisma.produitFini.create({
      data: {
        nom,
        matieres,
        heures,
        tauxHoraire,
        margePourcentage,
        margeBase,
        tva,
        prixFinal
      }
    })

    res.status(201).json(produit)
  } else {
    res.status(405).json({ message: 'Méthode non autorisée' })
  }
}
