import { useState } from 'react'
import { useRouter } from 'next/router'

export default function NewProduitPage() {
  const [nom, setNom] = useState('')
  const [formData, setFormData] = useState(null)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = JSON.parse(localStorage.getItem('dernierCalcul'))

    if (!data) {
      alert("Aucun calcul à enregistrer.")
      return
    }

    const res = await fetch('/api/produits', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, nom })
    })

    if (res.ok) {
      router.push('/produits')
    } else {
      alert("Erreur lors de la création du produit.")
    }
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Créer un Produit Fini</h1>
      <form onSubmit={handleSubmit}>
        <label>Nom du produit : </label>
        <input
          type="text"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          required
          style={{ marginRight: '10px' }}
        />
        <button type="submit">Enregistrer</button>
      </form>
    </div>
  )
}
