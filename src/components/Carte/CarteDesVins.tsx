import React, { useState, useEffect } from 'react';
import './CarteDesVins.css';

interface ServiceSize {
  taille: number;
  prix: number;
}

interface Vin {
  id: number;
  nom: string;
  type?: string;
  categorie: string;
  serviceSizes: ServiceSize[];
}

interface VinCategorie {
  nom: string;
  types?: string[];
  vins: Vin[];
}

const CarteDesVins: React.FC = () => {
  const [categories, setCategories] = useState<VinCategorie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVins = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/vins');
        if (!response.ok) {
          throw new Error('Erreur lors du chargement de la carte des vins');
        }
        const data = await response.json();
        setCategories(data);
        setError(null);
      } catch (err) {
        console.error('Erreur:', err);
        setError('Impossible de charger la carte des vins');
      } finally {
        setLoading(false);
      }
    };

    fetchVins();
  }, []);

  if (loading) {
    return <div>Chargement de la carte des vins...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="carte-des-vins">
      <h2 className="carte-title">LA CARTE DES VINS</h2>
      
      {categories.map((categorie, index) => (
        <div key={index} className="categorie-vins">
          <h3 className="categorie-title">{categorie.nom}</h3>
          
          {categorie.types ? (
            // Si la catégorie a des types (rouge, blanc, rosé)
            categorie.types.map((type, typeIndex) => (
              <div key={typeIndex} className="type-vins">
                <h4 className="type-title">{type}</h4>
                <div className="vins-list">
                  {categorie.vins
                    .filter(vin => vin.type === type)
                    .map((vin, vinIndex) => (
                      <div key={vinIndex} className="vin-item">
                        <span className="vin-nom">{vin.nom}</span>
                        <div className="vin-prices">
                          {vin.serviceSizes.map((size, sizeIndex) => (
                            <span key={sizeIndex} className="price-item">
                              {size.taille}cl: {size.prix}€
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))
          ) : (
            // Si la catégorie n'a pas de types
            <div className="vins-list">
              {categorie.vins.map((vin, vinIndex) => (
                <div key={vinIndex} className="vin-item">
                  <span className="vin-nom">{vin.nom}</span>
                  <div className="vin-prices">
                    {vin.serviceSizes.map((size, sizeIndex) => (
                      <span key={sizeIndex} className="price-item">
                        {size.taille}cl: {size.prix}€
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CarteDesVins; 