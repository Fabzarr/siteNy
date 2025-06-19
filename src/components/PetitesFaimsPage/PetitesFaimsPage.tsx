import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SideMenu from '../Carte/SideMenu';
import CloseButton from '../common/CloseButton';
import './PetitesFaimsPage.css';

// Interface pour les données de l'API
interface Plat {
  id: number;
  nom: string;
  description: string;
  prix: string;
  disponible?: boolean;
}

const PetitesFaimsPage: React.FC = () => {
  const [petitesFaims, setPetitesFaims] = useState<Plat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPetitesFaims = async () => {
      try {
        const response = await fetch('/api/menu/menu-complet');
        if (!response.ok) {
          throw new Error('Erreur lors du chargement du menu');
        }
        
        const menuData = await response.json();
        
        // Récupérer la catégorie "petites-faims"
        const petitesFaimsCategory = menuData['petites-faims'];
        if (petitesFaimsCategory && petitesFaimsCategory.plats) {
          setPetitesFaims(petitesFaimsCategory.plats);
        } else {
          // Fallback avec données par défaut si pas de données
          setPetitesFaims([
            { id: 1, nom: "Bruschetta à l'Italienne", prix: "8.00", description: "Pain grillé, tomates, basilic, ail, huile d'olive" },
            { id: 2, nom: "Carpaccio de Bœuf", prix: "12.00", description: "Fines tranches de bœuf, parmesan, roquette, câpres" }
          ]);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors du chargement des petites faims:', error);
        setError('Impossible de charger le menu. Veuillez réessayer plus tard.');
        
        // Données de fallback
        setPetitesFaims([
          { id: 1, nom: "Bruschetta à l'Italienne", prix: "8.00", description: "Pain grillé, tomates, basilic, ail, huile d'olive" },
          { id: 2, nom: "Carpaccio de Bœuf", prix: "12.00", description: "Fines tranches de bœuf, parmesan, roquette, câpres" }
        ]);
        setLoading(false);
      }
    };

    fetchPetitesFaims();
  }, []);

  if (loading) {
    return (
      <div className="page-with-menu">
        <SideMenu isOpen={false} toggleMenu={() => {}} />
        <CloseButton />
        <div className="petites-faims-page-container">
          <div className="petites-faims-menu-card">
            <div className="petites-faims-header">
              <h1>New York Café</h1>
              <h2>CHARGEMENT...</h2>
              <p className="subtitle">Entrées & Apéritifs</p>
            </div>
            <div style={{ textAlign: 'center', color: 'white', padding: '40px' }}>
              <p>🚀 Chargement des petites faims...</p>
              {error && <p style={{ color: '#ff6b6b' }}>⚠️ {error}</p>}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Diviser les données en colonnes
  const column1 = petitesFaims.slice(0, Math.ceil(petitesFaims.length / 3));
  const column2 = petitesFaims.slice(Math.ceil(petitesFaims.length / 3), Math.ceil(petitesFaims.length * 2 / 3));
  const column3 = petitesFaims.slice(Math.ceil(petitesFaims.length * 2 / 3));

  return (
    <div className="page-with-menu">
      <SideMenu isOpen={false} toggleMenu={() => {}} />
      <CloseButton />
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="petites-faims-page-container">
        <div className="petites-faims-menu-card">
          <div className="petites-faims-header">
            <h1>New York Café</h1>
            <h2>PETITES FAIMS</h2>
            <p className="subtitle">Entrées & Apéritifs</p>
          </div>

          <div className="petites-faims-menu">
            <div className="menu-column">
                {column1.map((item) => (
                  <div key={item.id} className="petites-faims-item">
                  <div className="petites-faims-name-price">
                      <span className="petites-faims-name">{item.nom}</span>
                      <span className="petites-faims-price">{parseFloat(item.prix)}€</span>
                  </div>
                  <div className="petites-faims-description">{item.description}</div>
                </div>
              ))}
            </div>

            <div className="menu-column">
                {column2.map((item) => (
                  <div key={item.id} className="petites-faims-item">
                  <div className="petites-faims-name-price">
                      <span className="petites-faims-name">{item.nom}</span>
                      <span className="petites-faims-price">{parseFloat(item.prix)}€</span>
                  </div>
                  <div className="petites-faims-description">{item.description}</div>
                </div>
              ))}
            </div>

            <div className="menu-column">
                {column3.map((item) => (
                  <div key={item.id} className="petites-faims-item">
                  <div className="petites-faims-name-price">
                      <span className="petites-faims-name">{item.nom}</span>
                      <span className="petites-faims-price">{parseFloat(item.prix)}€</span>
                  </div>
                  <div className="petites-faims-description">{item.description}</div>
                </div>
              ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PetitesFaimsPage; 