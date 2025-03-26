// utils/calcul.js

/**
 * Calcule le prix final d'un produit.
 *
 * @param {Object} params - Les paramètres du calcul.
 * @param {Array} params.matieres - Liste des matières premières, chacune avec { prixUnitaire, quantite }.
 * @param {number} params.heures - Nombre d'heures de travail.
 * @param {number} params.tauxHoraire - Taux horaire de la main d'œuvre.
 * @param {number} params.margePourcentage - Pourcentage de marge (exemple: 0.2 pour 20%).
 * @param {number} params.margeBase - Montant fixe à ajouter.
 * @param {number} params.tva - Taux de TVA (exemple: 0.2 pour 20%).
 * @returns {number} Le prix final calculé.
 */
export function calculerPrixFinal({ matieres, heures, tauxHoraire, margePourcentage, margeBase, tva }) {
    const totalMatieres = matieres.reduce((total, m) => total + m.prixUnitaire * m.quantite, 0)
    const coutMainDoeuvre = heures * tauxHoraire
    const coutTotal = totalMatieres + coutMainDoeuvre
    const prixAvecMarge = coutTotal * (1 + margePourcentage) + margeBase
    const prixFinal = prixAvecMarge * (1 + tva)
    return prixFinal
  }
  