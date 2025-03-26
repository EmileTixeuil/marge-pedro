import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case 'GET':
      try {
        const matiere = await prisma.matierePremiere.findUnique({
          where: { id: parseInt(id) },
        });
        if (!matiere) {
          return res.status(404).json({ error: "Matière non trouvée" });
        }
        res.status(200).json(matiere);
      } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération de la matière" });
      }
      break;

    case 'PUT':
      const { nom, type, reference, prixUnitaire, unite } = req.body;
      try {
        const updatedMatiere = await prisma.matierePremiere.update({
          where: { id: parseInt(id) },
          data: { nom, type, reference, prixUnitaire, unite },
        });
        res.status(200).json(updatedMatiere);
      } catch (error) {
        res.status(500).json({ error: "Erreur lors de la mise à jour de la matière" });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT']);
      res.status(405).end(`Méthode ${method} non autorisée`);
  }
}
