// pages/matieres/index.js
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function MatieresPage() {
  const [matieres, setMatieres] = useState([])

  // Charger la liste des matières au chargement de la page
  useEffect(() => {
    async function fetchMatieres() {
      const res = await fetch('/api/matieres')
      const data = await res.json()
      setMatieres(data)
    }
    fetchMatieres()
  }, [])

  return (
    <div style={{ padding: '20px' }}>
      <h1>Matières Premières</h1>
      
      <Link href="/matieres/new" style={{ display: 'inline-block', marginBottom: '20px' }}>  Créer une nouvelle matière première  </Link>

      <Link href="/calcul">
  <button style={{ marginBottom: '20px', marginLeft: '10px' }}>
    Retourner au calcul
  </button>
</Link>


      {matieres.length === 0 ? (
        <p>Aucune matière première trouvée.</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Type</th>
              <th>Référence</th>
              <th>Prix Unitaire</th>
              <th>Unité</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {matieres.map((matiere) => (
              <tr key={matiere.id}>
                <td>{matiere.id}</td>
                <td>{matiere.nom}</td>
                <td>{matiere.type}</td>
                <td>{matiere.reference}</td>
                <td>{matiere.prixUnitaire}</td>
                <td>{matiere.unite}</td>
                <td>
                  {/* Ici, on pourra rediriger vers une page d'édition (à créer ultérieurement) */}
                  <Link href={`/matieres/${matiere.id}`}>  Éditer  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
