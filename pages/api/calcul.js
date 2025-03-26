// pages/api/calcul.js
import { calculerPrixFinal } from '../../utils/calcul'

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { matieres, heures, tauxHoraire, margePourcentage, margeBase, tva } = req.body

    // Vérifier que toutes les données nécessaires sont présentes (tu peux ajouter plus de validations)
    if (!matieres || heures == null || tauxHoraire == null || margePourcentage == null || margeBase == null || tva == null) {
      return res.status(400).json({ error: "Données manquantes" })
    }

    const prixFinal = calculerPrixFinal({ matieres, heures, tauxHoraire, margePourcentage, margeBase, tva })
    return res.status(200).json({ prixFinal })
  } else {
    res.status(405).json({ message: 'Méthode non autorisée' })
  }
}
