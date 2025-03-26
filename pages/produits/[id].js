import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function EditProduitPage() {
  const router = useRouter()
  const { id } = router.query
  const [produit, setProduit] = useState(null)
  const [nom, setNom] = useState('')

  useEffect(() => {
    if (!id) return
    fetch(`/api/produits/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduit(data)
        setNom(data.nom)
      })
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    await fetch(`/api/produits/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...produit, nom })
    })
    router.push('/produits')
  }

  if (!produit) return <div>Chargement...</div>

  return (
    <div style={{ padding: '20px' }}>
      <h1>Modifier le Produit Fini</h1>
      <form onSubmit={handleSubmit}>
        <label>Nom du produit : </label>
        <input
          type="text"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          required
          style={{ marginRight: '10px' }}
        />
        <button type="submit">Mettre à jour</button>
      </form>
    </div>
  )
}
