import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function EditMatierePage() {
  const router = useRouter();
  const { id } = router.query;

  const [loading, setLoading] = useState(true);

  // États pour les champs existants
  const [nom, setNom] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [reference, setReference] = useState('');
  const [prixUnitaire, setPrixUnitaire] = useState('');
  const [unite, setUnite] = useState('');

  // États pour le menu déroulant du type
  const [types, setTypes] = useState(['Métal', 'Alliage', 'Acier']);
  const [showNewTypeInput, setShowNewTypeInput] = useState(false);
  const [newType, setNewType] = useState('');

  // États pour le menu déroulant de l'unité
  const [units, setUnits] = useState(['kg', 'm', 'L']);
  const [showNewUnitInput, setShowNewUnitInput] = useState(false);
  const [newUnit, setNewUnit] = useState('');

  // Charger la matière existante lors du montage
  useEffect(() => {
    if (!id) return;
    async function fetchMatiere() {
      const res = await fetch(`/api/matieres/${id}`);
      if (res.ok) {
        const data = await res.json();
        setNom(data.nom);
        setSelectedType(data.type);
        setReference(data.reference);
        setPrixUnitaire(data.prixUnitaire);
        setUnite(data.unite);
        setLoading(false);
      } else {
        console.error("Erreur lors du chargement de la matière");
      }
    }
    fetchMatiere();
  }, [id]);

  // Ajout d'un nouveau type
  const handleAddNewType = () => {
    const trimmedType = newType.trim();
    if (trimmedType !== '' && !types.includes(trimmedType)) {
      setTypes([...types, trimmedType]);
      setSelectedType(trimmedType);
    }
    setNewType('');
    setShowNewTypeInput(false);
  };

  // Ajout d'une nouvelle unité
  const handleAddNewUnit = () => {
    const trimmedUnit = newUnit.trim();
    if (trimmedUnit !== '' && !units.includes(trimmedUnit)) {
      setUnits([...units, trimmedUnit]);
      setUnite(trimmedUnit);
    }
    setNewUnit('');
    setShowNewUnitInput(false);
  };

  // Soumission du formulaire d'édition
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      nom,
      type: selectedType,
      reference,
      prixUnitaire: parseFloat(prixUnitaire),
      unite,
    };
    const res = await fetch(`/api/matieres/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (res.ok) {
      router.push('/matieres');
    } else {
      console.error("Erreur lors de la mise à jour de la matière");
    }
  };

  if (loading) return <div>Chargement...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Éditer la Matière Première</h1>
      <form onSubmit={handleSubmit}>
        {/* Champ Nom */}
        <div style={{ marginBottom: '10px' }}>
          <label>Nom : </label>
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
          />
        </div>
        {/* Champ Type avec menu déroulant */}
        <div style={{ marginBottom: '10px' }}>
          <label>Type : </label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            required
          >
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => setShowNewTypeInput(!showNewTypeInput)}
            style={{ marginLeft: '10px' }}
          >
            Ajouter nouveau type
          </button>
        </div>
        {showNewTypeInput && (
          <div style={{ marginBottom: '10px' }}>
            <label>Nouveau Type : </label>
            <input
              type="text"
              value={newType}
              onChange={(e) => setNewType(e.target.value)}
            />
            <button
              type="button"
              onClick={handleAddNewType}
              style={{ marginLeft: '10px' }}
            >
              Ajouter
            </button>
          </div>
        )}
        {/* Champ Référence */}
        <div style={{ marginBottom: '10px' }}>
          <label>Référence : </label>
          <input
            type="text"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            required
          />
        </div>
        {/* Champ Prix Unitaire */}
        <div style={{ marginBottom: '10px' }}>
          <label>Prix Unitaire : </label>
          <input
            type="number"
            step="0.01"
            value={prixUnitaire}
            onChange={(e) => setPrixUnitaire(e.target.value)}
            required
          />
        </div>
        {/* Champ Unité avec menu déroulant */}
        <div style={{ marginBottom: '10px' }}>
          <label>Unité : </label>
          <select
            value={unite}
            onChange={(e) => setUnite(e.target.value)}
            required
          >
            {units.map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => setShowNewUnitInput(!showNewUnitInput)}
            style={{ marginLeft: '10px' }}
          >
            Ajouter nouvelle unité
          </button>
        </div>
        {showNewUnitInput && (
          <div style={{ marginBottom: '10px' }}>
            <label>Nouvelle Unité : </label>
            <input
              type="text"
              value={newUnit}
              onChange={(e) => setNewUnit(e.target.value)}
            />
            <button
              type="button"
              onClick={handleAddNewUnit}
              style={{ marginLeft: '10px' }}
            >
              Ajouter
            </button>
          </div>
        )}
        <button type="submit">Mettre à jour</button>
      </form>
      <div style={{ marginTop: '20px' }}>
        <Link href="/matieres" style={{ display: 'inline-block', marginTop: '20px' }}>
          Retour à la liste
        </Link>
      </div>
    </div>
  );
}
