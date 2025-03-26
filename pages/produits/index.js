import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function ProduitsPage() {
  const [produits, setProduits] = useState([])

  useEffect(() => {
    async function fetchProduits() {
      const res = await fetch('/api/produits')
      const data = await res.json()
      setProduits(data)
    }
    fetchProduits()
  }, [])

  return (
    <div style={{ padding: '20px' }}>
      <h1>Produits Finis</h1>

      <Link href="/produits/new" style={{ display: 'inline-block', marginBottom: '20px' }}>
        Créer un nouveau produit
      </Link>
      
      <Link href="/calcul">
  <button style={{ marginBottom: '20px', marginLeft: '10px' }}>
    Retour au calcul
  </button>
</Link>

      {produits.length === 0 ? (
        <p>Aucun produit fini pour le moment.</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Temps de travail</th>
              <th>Prix calculé</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {produits.map((produit) => (
              <tr key={produit.id}>
                <td>{produit.id}</td>
                <td>{produit.nom}</td>
                <td>{produit.heures} h</td>
                <td>{parseFloat(produit.prixFinal).toFixed(2)} €</td>
                <td>
                  <Link href={`/produits/${produit.id}`}>Éditer</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
