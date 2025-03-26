// pages/calcul.js

import { useState , useEffect } from 'react'
import Link from 'next/link'


export default function CalculPage() {
  // États pour les différents champs du formulaire
  const [matieres, setMatieres] = useState([{ nom: '', type: '', prixUnitaire: '', unite: '', quantite: '' }])
  const [heures, setHeures] = useState('')
  const [tauxHoraire, setTauxHoraire] = useState('50')
  const [margePourcentage, setMargePourcentage] = useState('0.3')
  const [margeBase, setMargeBase] = useState('0')
  const [tva, setTva] = useState('0.2')
  const [prixFinal, setPrixFinal] = useState(null)
  const handleRemoveMatiere = (indexToRemove) => {
    setMatieres(matieres.filter((_, index) => index !== indexToRemove))
  }
  const [matieresDisponibles, setMatieresDisponibles] = useState([])
  const [editionTauxHoraire, setEditionTauxHoraire] = useState(false)
  const [editionMarge, setEditionMarge] = useState(false)
  const [editionMargeBase, setEditionMargeBase] = useState(false)
  const [editionTva, setEditionTva] = useState(false)
  const [prixDetails, setPrixDetails] = useState(null)
  const [produitsDisponibles, setProduitsDisponibles] = useState([])
  const [produitSelectionneId, setProduitSelectionneId] = useState('')

  // Aller chercher la totalité des matières pour les avoir en stock ici
  useEffect(() => {
    async function fetchData() {
      const resMatieres = await fetch('/api/matieres')
      const matieres = await resMatieres.json()
      setMatieresDisponibles(matieres)
  
      const resProduits = await fetch('/api/produits')
      const produits = await resProduits.json()
      setProduitsDisponibles(produits)
    }
  
    fetchData()
  }, [])

  // fonctiion utilitaire pour filtrer les types uniques
  const getTypesDisponibles = () => {
    const types = matieresDisponibles.map((m) => m.type)
    return [...new Set(types)]
  }

  // reset des données du formulaire
  const resetFormulaire = () => {
    setMatieres([{ nom: '', type: '', prixUnitaire: '', unite: '', quantite: '' }])
    setHeures('')
    setTauxHoraire('50')
    setMargePourcentage('0.3')
    setMargeBase('70')
    setTva('0.2')
    setPrixFinal(null)
    setProduitSelectionneId('')
  }


  // Gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Conversion des valeurs en nombres
    const data = {
      matieres: matieres.map(m => ({
        prixUnitaire: parseFloat(m.prixUnitaire),
        quantite: parseFloat(m.quantite)
      })),
      heures: parseFloat(heures) || 0,
      tauxHoraire: parseFloat(tauxHoraire),
      margePourcentage: parseFloat(margePourcentage),
      margeBase: parseFloat(margeBase),
      tva: parseFloat(tva)
    }

    // Appel à l'endpoint API
    const res = await fetch('/api/calcul', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })

    const result = await res.json()
    setPrixFinal(result.prixFinal)
    const produit = {
      matieres,
      heures: parseFloat(heures) || 0,
      tauxHoraire: parseFloat(tauxHoraire),
      margePourcentage: parseFloat(margePourcentage),
      margeBase: parseFloat(margeBase),
      tva: parseFloat(tva),
      prixFinal: result.prixFinal
    }
    
    localStorage.setItem('dernierCalcul', JSON.stringify(produit))
    const prixTTC = result.prixFinal
const prixHT = prixTTC / (1 + parseFloat(tva))
const montantTVA = prixTTC - prixHT

setPrixDetails({
  ht: prixHT,
  tva: montantTVA,
  ttc: prixTTC
})
  }

  // Fonction pour gérer les modifications sur une matière première
  const handleMatiereChange = (index, field, value) => {
    const updatedMatieres = [...matieres]
  
    updatedMatieres[index][field] = value
  
    if (field === 'nom') {
      const matiereTrouvee = matieresDisponibles.find(m => m.nom === value)
      if (matiereTrouvee) {
        updatedMatieres[index].type = matiereTrouvee.type
        updatedMatieres[index].prixUnitaire = matiereTrouvee.prixUnitaire
        updatedMatieres[index].unite = matiereTrouvee.unite
      }
    }
  
    setMatieres(updatedMatieres)
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Calcul de Marge</h1>
      <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: '20px' }}>
  <label style={{ marginRight: '10px' }}>Charger un produit fini : </label>
  <select
    value={produitSelectionneId}
    onChange={(e) => {
      const id = e.target.value
    setProduitSelectionneId(id)

      const produit = produitsDisponibles.find(p => p.id === parseInt(e.target.value))
      if (produit) {
        setMatieres(produit.matieres)
        setHeures(produit.heures.toString())
        setTauxHoraire(produit.tauxHoraire.toString())
        setMargePourcentage(produit.margePourcentage.toString())
        setMargeBase(produit.margeBase.toString())
        setTva(produit.tva.toString())
        setPrixFinal(null)
      }
    }}
    style={{ marginRight: '10px' }}
  >
    <option value="">-- Choisir un produit --</option>
    {produitsDisponibles.map(p => (
      <option key={p.id} value={p.id}>{p.nom}</option>
    ))}
  </select>

  <button type="button" onClick={resetFormulaire}>
    Réinitialiser
  </button>
</div>


        <h2>Matières Premières</h2>
          <Link href="/matieres">
          <button style={{ marginBottom: '20px' }}>
          Gérer les matières premières
          </button>
          </Link>
          

          {matieres.map((matiere, index) => {
  const typesDisponibles = getTypesDisponibles()
  const nomsFiltres = matieresDisponibles.filter(m =>
    !matiere.type || m.type === matiere.type
  )

  return (
    <div key={index} style={{ marginBottom: '10px' }}>
      <select
        value={matiere.type}
        onChange={(e) => handleMatiereChange(index, 'type', e.target.value)}
        style={{ marginRight: '10px' }}
      >
        <option value="">-- Type --</option>
        {typesDisponibles.map((type) => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>

      <select
        value={matiere.nom}
        onChange={(e) => handleMatiereChange(index, 'nom', e.target.value)}
        style={{ marginRight: '10px' }}
      >
        <option value="">-- Nom --</option>
        {nomsFiltres.map((m) => (
          <option key={m.id} value={m.nom}>{m.nom}</option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Prix Unitaire"
        value={matiere.prixUnitaire}
        onChange={(e) => handleMatiereChange(index, 'prixUnitaire', e.target.value)}
        style={{ marginRight: '10px' }}
      />

      <input
        type="text"
        placeholder="Unité"
        value={matiere.unite}
        onChange={(e) => handleMatiereChange(index, 'unite', e.target.value)}
        style={{ marginRight: '10px' }}
      />

      <input
        type="text"
        placeholder="Quantité"
        value={matiere.quantite}
        onChange={(e) => handleMatiereChange(index, 'quantite', e.target.value)}
      />

      <button
        type="button"
        onClick={() => handleRemoveMatiere(index)}
        style={{ marginLeft: '10px' }}
      >
        Supprimer
      </button>
    </div>
  )
})}



<button
  type="button"
  onClick={() => setMatieres([...matieres, {
    nom: '',
    type: '',
    prixUnitaire: '',
    unite: '',
    quantite: ''
  }])}
  style={{ marginTop: '10px' }}
>
  + Ajouter une matière
</button>
        <h2>Main d'Œuvre et Paramètres</h2>
        <div>
          <label>Heures: </label>
          <input
            type="text"
            value={heures}
            onChange={(e) => setHeures(e.target.value)}
          />
        </div>
        <div>
        <label>Taux Horaire: </label>
        {editionTauxHoraire ? (
        <>
        <input
        type="text"
        value={tauxHoraire}
        onChange={(e) => setTauxHoraire(e.target.value)}
        style={{ marginRight: '10px' }}
        />
        <button type="button" onClick={() => setEditionTauxHoraire(false)}>
        OK
        </button>
        </>
        ) : (
        <>
        <span style={{ marginRight: '10px' }}>{tauxHoraire} €/h</span>
        <button type="button" onClick={() => setEditionTauxHoraire(true)}>
        Modifier
        </button>
        </>
        )}
        </div>

          <div>
          <label>Marge : </label>
          {editionMarge ? (
          <>
          <input
          type="number"
          value={parseFloat(margePourcentage) * 100}
          onChange={(e) => {
          const value = e.target.value
          const valueAsFloat = parseFloat(value)
          if (!isNaN(valueAsFloat)) {
            setMargePourcentage((valueAsFloat / 100).toString())
          }
          }}
         style={{ marginRight: '10px' }}
          />
          <span>%</span>
        <button type="button" onClick={() => setEditionMarge(false)} style={{ marginLeft: '10px' }}>
        OK
        </button>
    </>
  ) : (
    <>
      <span style={{ marginRight: '10px' }}>{parseFloat(margePourcentage) * 100}%</span>
      <button type="button" onClick={() => setEditionMarge(true)}>
        Modifier
      </button>
    </>
  )}
</div>

        <div>
        <label>Marge Fixe : </label>
        {editionMargeBase ? (
         <>
        <input
        type="number"
        value={margeBase}
        onChange={(e) => setMargeBase(e.target.value)}
        style={{ marginRight: '10px' }}
          />
        <span>€</span>
        <button type="button" onClick={() => setEditionMargeBase(false)} style={{ marginLeft: '10px' }}>
        OK
        </button>
      </>
          ) : (
        <>
      <span style={{ marginRight: '10px' }}>{margeBase} €</span>
      <button type="button" onClick={() => setEditionMargeBase(true)}>
        Modifier
      </button>
      </>
        )}
</div>

<div>
  <label>TVA : </label>
  {editionTva ? (
    <>
      <input
        type="number"
        value={parseFloat(tva) * 100}
        onChange={(e) => {
          const value = e.target.value
          const valueAsFloat = parseFloat(value)
          if (!isNaN(valueAsFloat)) {
            setTva((valueAsFloat / 100).toString())
          }
        }}
        style={{ marginRight: '10px' }}
      />
      <span>%</span>
      <button type="button" onClick={() => setEditionTva(false)} style={{ marginLeft: '10px' }}>
        OK
      </button>
    </>
  ) : (
    <>
      <span style={{ marginRight: '10px' }}>{parseFloat(tva) * 100}%</span>
      <button type="button" onClick={() => setEditionTva(true)}>
        Modifier
      </button>
    </>
  )}
</div>


        <button type="submit" style={{ marginTop: '10px' }}>Calculer</button>
      </form>
      <Link href="/produits/new">
  <button type="button" style={{ marginTop: '10px', marginLeft: '10px' }}>
    Enregistrer comme produit fini
  </button>
</Link>
      {prixDetails && (
  <div style={{ marginTop: '20px' }}>
    <h2>Résultat :</h2>
    <p>Prix HT : {prixDetails.ht?.toFixed(2)} €</p>
    <p>TVA ({parseFloat(tva) * 100}%) : {prixDetails.tva?.toFixed(2)} €</p>
    <p><strong>Prix TTC : {prixDetails.ttc?.toFixed(2)} €</strong></p>
  </div>
)}

    </div>
  )
}
