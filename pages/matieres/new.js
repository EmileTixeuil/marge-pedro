import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function NewMatierePage() {
  // États pour le type de matière
  const [types, setTypes] = useState(['Métal', 'Alliage', 'Acier']); // liste initiale de types
  const [selectedType, setSelectedType] = useState('Métal'); // type sélectionné par défaut
  const [showNewTypeInput, setShowNewTypeInput] = useState(false);
  const [newType, setNewType] = useState('');

  // États pour l'unité
  const [units, setUnits] = useState(['kg', 'm', 'L']); // liste initiale d'unités
  const [unite, setUnite] = useState('kg'); // unité sélectionnée par défaut
  const [showNewUnitInput, setShowNewUnitInput] = useState(false);
  const [newUnit, setNewUnit] = useState('');

  // Autres états
  const [nom, setNom] = useState('');
  const [reference, setReference] = useState('');
  const [prixUnitaire, setPrixUnitaire] = useState('');
  const router = useRouter();

  // Fonction pour ajouter un nouveau type
  const handleAddNewType = () => {
    const trimmedType = newType.trim();
    if (trimmedType !== '' && !types.includes(trimmedType)) {
      setTypes([...types, trimmedType]);
      setSelectedType(trimmedType);
    }
    setNewType('');
    setShowNewTypeInput(false);
  };

  // Fonction pour ajouter une nouvelle unité
  const handleAddNewUnit = () => {
    const trimmedUnit = newUnit.trim();
    if (trimmedUnit !== '' && !units.includes(trimmedUnit)) {
      setUnits([...units, trimmedUnit]);
      setUnite(trimmedUnit);
    }
    setNewUnit('');
    setShowNewUnitInput(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      nom,
      type: selectedType,
      reference,
      prixUnitaire: parseFloat(prixUnitaire),
      unite,
    };

    const res = await fetch('/api/matieres', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (res.ok) {
      router.push('/matieres');
    } else {
      console.error('Erreur lors de la création de la matière première.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Créer une Nouvelle Matière Première</h1>
      <div style={{ marginBottom: '10px' }}>
       <label>Nom : </label>
        <input
          type="text"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          required
        />
      </div>
      <form onSubmit={handleSubmit}>
        {/* Champ pour le Type de matière */}
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

        {/* Champ pour la Référence */}
        <div style={{ marginBottom: '10px' }}>
          <label>Référence : </label>
          <input
            type="text"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            required
          />
        </div>

        {/* Champ pour le Prix Unitaire */}
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

        {/* Champ pour l'Unité */}
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

        <button type="submit">Créer</button>
      </form>
      <div style={{ marginTop: '20px' }}>
        <Link href="/matieres" style={{ display: 'inline-block', marginTop: '20px' }}>
          Retour à la liste
        </Link>
      </div>
    </div>
  );
}
