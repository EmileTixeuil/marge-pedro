import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handler(req, res) {
  const { id } = req.query

  if (req.method === 'GET') {
    const produit = await prisma.produitFini.findUnique({
      where: { id: parseInt(id) }
    })
    if (!produit) return res.status(404).json({ error: 'Produit non trouvé' })
    res.status(200).json(produit)

  } else if (req.method === 'PUT') {
    const { nom, matieres, heures, tauxHoraire, margePourcentage, margeBase, tva, prixFinal } = req.body

    const updated = await prisma.produitFini.update({
      where: { id: parseInt(id) },
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

    res.status(200).json(updated)

  } else {
    res.status(405).json({ message: 'Méthode non autorisée' })
  }
}
