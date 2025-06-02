import React, { useState, useEffect } from 'react';
import './AjouterVinForm.css';

interface VinVariant {
  volume_vin: string;
  contenant_vin: string;
  prix: number;
}

interface VinFormData {
  nom: string;
  categorie_id: number;
  origine_vin: string;
  type_vin: string;
  description: string;
  photo_url: string;
  variants: VinVariant[];
}

interface Categorie {
  id: number;
  nom: string;
}

const TYPES_VIN = ['Rouge', 'Blanc', 'Rosé', 'Champagne', 'Pétillant'];
const VOLUMES_STANDARD = ['14cl', '25cl', '37.5cl', '50cl', '75cl', '1L', '1.5L'];
const CONTENANTS_STANDARD = ['Verre', 'Pichet', 'Bouteille'];

const AjouterVinForm: React.FC = () => {
  const [categories, setCategories] = useState<Categorie[]>([]);
  const [formData, setFormData] = useState<VinFormData>({
    nom: '',
    categorie_id: 0,
    origine_vin: '',
    type_vin: '',
    description: '',
    photo_url: '',
    variants: [{ volume_vin: '75cl', contenant_vin: 'Bouteille', prix: 0 }]
  });

  useEffect(() => {
    // Charger les catégories au chargement du composant
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/vins/categories');
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des catégories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'categorie_id' ? parseInt(value) : value
    }));
  };

  const handleVariantChange = (index: number, field: keyof VinVariant, value: string) => {
    setFormData(prev => {
      const newVariants = [...prev.variants];
      newVariants[index] = {
        ...newVariants[index],
        [field]: field === 'prix' ? parseFloat(value) : value
      };
      return {
        ...prev,
        variants: newVariants
      };
    });
  };

  const ajouterVariant = () => {
    setFormData(prev => ({
      ...prev,
      variants: [...prev.variants, { volume_vin: '75cl', contenant_vin: 'Bouteille', prix: 0 }]
    }));
  };

  const supprimerVariant = (index: number) => {
    setFormData(prev => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.nom || !formData.categorie_id) {
      alert('Le nom et la catégorie sont requis');
      return;
    }
    
    if (formData.variants.length === 0) {
      alert('Au moins un format (volume + contenant + prix) est requis');
      return;
    }
    
    // Vérifier que tous les variants sont complets
    for (let variant of formData.variants) {
      if (!variant.volume_vin || !variant.contenant_vin || variant.prix <= 0) {
        alert('Tous les formats doivent avoir un volume, un contenant et un prix valide');
        return;
      }
    }
    
    try {
      const response = await fetch('http://localhost:4000/api/admin/vins', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const result = await response.json();
        alert('Vin ajouté avec succès !');
        // Réinitialiser le formulaire
        setFormData({
          nom: '',
          categorie_id: 0,
          origine_vin: '',
          type_vin: '',
          description: '',
          photo_url: '',
          variants: [{ volume_vin: '75cl', contenant_vin: 'Bouteille', prix: 0 }]
        });
      } else {
        const error = await response.json();
        alert(`Erreur: ${error.error || error.message}`);
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout du vin:', error);
      alert('Une erreur est survenue lors de l\'ajout du vin');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="ajouter-vin-form">
      <h2>Ajouter un Vin</h2>

      <div className="form-group">
        <label htmlFor="nom">Nom du Vin *</label>
        <input
          type="text"
          id="nom"
          name="nom"
          value={formData.nom}
          onChange={handleChange}
          required
          placeholder="ex: Château Margaux 2015"
        />
      </div>

      <div className="form-group">
        <label htmlFor="categorie_id">Catégorie *</label>
        <select
          id="categorie_id"
          name="categorie_id"
          value={formData.categorie_id}
          onChange={handleChange}
          required
        >
          <option value="">Sélectionnez une catégorie</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.nom}</option>
          ))}
        </select>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="origine_vin">Origine</label>
          <input
            type="text"
            id="origine_vin"
            name="origine_vin"
            value={formData.origine_vin}
            onChange={handleChange}
            placeholder="ex: France, Italie, Espagne..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="type_vin">Type de Vin</label>
          <select
            id="type_vin"
            name="type_vin"
            value={formData.type_vin}
            onChange={handleChange}
          >
            <option value="">Sélectionnez un type</option>
            {TYPES_VIN.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description du vin, notes de dégustation..."
        />
      </div>

      <div className="form-group">
        <label htmlFor="photo_url">URL Photo</label>
        <input
          type="url"
          id="photo_url"
          name="photo_url"
          value={formData.photo_url}
          onChange={handleChange}
          placeholder="https://..."
        />
      </div>

      <div className="variants-section">
        <h3>Formats disponibles *</h3>
        <p style={{ color: '#7f8c8d', marginBottom: '15px' }}>
          Ajoutez les différents formats (volume + contenant + prix) pour ce vin
        </p>
        
        {formData.variants.map((variant, index) => (
          <div key={index} className="variant-row">
            <div className="variant-inputs">
              <div className="form-group">
                <label>Volume</label>
                <select
                  value={variant.volume_vin}
                  onChange={(e) => handleVariantChange(index, 'volume_vin', e.target.value)}
                  required
                >
                  <option value="">Sélectionner...</option>
                  {VOLUMES_STANDARD.map(volume => (
                    <option key={volume} value={volume}>{volume}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Contenant</label>
                <select
                  value={variant.contenant_vin}
                  onChange={(e) => handleVariantChange(index, 'contenant_vin', e.target.value)}
                  required
                >
                  <option value="">Sélectionner...</option>
                  {CONTENANTS_STANDARD.map(contenant => (
                    <option key={contenant} value={contenant}>{contenant}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Prix (€)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={variant.prix}
                  onChange={(e) => handleVariantChange(index, 'prix', e.target.value)}
                  required
                />
              </div>
            </div>
            {index > 0 && (
              <button
                type="button"
                onClick={() => supprimerVariant(index)}
                className="remove-variant-btn"
              >
                Supprimer
              </button>
            )}
          </div>
        ))}
        
        <button
          type="button"
          onClick={ajouterVariant}
          className="add-variant-btn"
        >
          Ajouter un format
        </button>
      </div>

      <button type="submit" className="submit-btn">
        Ajouter le Vin
      </button>
    </form>
  );
};

export default AjouterVinForm; 