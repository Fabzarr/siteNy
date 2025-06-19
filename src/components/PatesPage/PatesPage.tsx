import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SideMenu from '../Carte/SideMenu';
import CloseButton from '../common/CloseButton';
import './PatesPage.css';

// Interface pour les données de l'API
interface Pate {
  id: number;
  nom: string;
  prix: string;
  description: string;
  disponible?: boolean;
}

const PatesPage: React.FC = () => {
  const [pates, setPates] = useState<Pate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPates = async () => {
      try {
        const response = await fetch('/api/menu/menu-complet');
        if (!response.ok) {
          throw new Error('Erreur lors du chargement du menu');
        }
        
        const menuData = await response.json();
        
        // Récupérer la catégorie pâtes (tester plusieurs clés possibles)
        console.log('🍝 Clés disponibles dans l\'API:', Object.keys(menuData));
        
        const patesCategory = menuData['nos-pates'] || 
                             menuData['pates'] || 
                             menuData['nos-pasta'] || 
                             menuData['pasta'];
                             
        console.log('🍝 Catégorie pâtes trouvée:', patesCategory);
        
        if (patesCategory && patesCategory.plats) {
          console.log('🍝 Nombre de pâtes trouvées:', patesCategory.plats.length);
          setPates(patesCategory.plats);
        } else {
          console.log('🍝 Aucune catégorie pâtes trouvée, utilisation des données de fallback');
          // Fallback avec données par défaut si pas de données
          setPates([
            { id: 1, nom: "Spaghetti Carbonara", prix: "14.00", description: "Crème fraîche, lardons, œuf, parmesan" },
            { id: 2, nom: "Penne Arrabiata", prix: "12.00", description: "Sauce tomate piquante, ail, basilic" }
          ]);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors du chargement des pâtes:', error);
        setError('Impossible de charger le menu. Veuillez réessayer plus tard.');
        
        // Données de fallback
        setPates([
          { id: 1, nom: "Spaghetti Carbonara", prix: "14.00", description: "Crème fraîche, lardons, œuf, parmesan" },
          { id: 2, nom: "Penne Arrabiata", prix: "12.00", description: "Sauce tomate piquante, ail, basilic" }
        ]);
        setLoading(false);
      }
    };

    fetchPates();
  }, []);

  if (loading) {
    return (
      <div className="page-with-menu">
        <SideMenu isOpen={false} toggleMenu={() => {}} />
        <CloseButton />
        <div className="pates-page-container">
          <div className="pates-menu-card">
            <div className="pates-header">
              <h1>New York Café</h1>
              <h2>CHARGEMENT...</h2>
            </div>
            <div style={{ textAlign: 'center', color: 'white', padding: '40px' }}>
              <p>🚀 Chargement des pâtes...</p>
              {error && <p style={{ color: '#ff6b6b' }}>⚠️ {error}</p>}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Diviser les données en colonnes
  const column1 = pates.slice(0, Math.ceil(pates.length / 3));
  const column2 = pates.slice(Math.ceil(pates.length / 3), Math.ceil(pates.length * 2 / 3));
  const column3 = pates.slice(Math.ceil(pates.length * 2 / 3));

  return (
    <div className="page-with-menu">
      <SideMenu isOpen={false} toggleMenu={() => {}} />
      <CloseButton />
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="pates-page-container">
          <div className="pates-menu-card">
            <div className="pates-header">
              <h1>New York Café</h1>
              <h2>NOS PÂTES</h2>
            </div>

            <div className="pates-menu">
              <div className="menu-column">
                {column1.map((pate) => (
                  <div key={pate.id} className="pate-item">
                    <div className="pate-name-price">
                      <span className="pate-name">{pate.nom}</span>
                      <span className="pate-price">{parseFloat(pate.prix)}€</span>
                    </div>
                    <div className="pate-description">{pate.description}</div>
                  </div>
                ))}
              </div>

              <div className="menu-column">
                {column2.map((pate) => (
                  <div key={pate.id} className="pate-item">
                    <div className="pate-name-price">
                      <span className="pate-name">{pate.nom}</span>
                      <span className="pate-price">{parseFloat(pate.prix)}€</span>
                    </div>
                    <div className="pate-description">{pate.description}</div>
                  </div>
                ))}
              </div>

              <div className="menu-column">
                {column3.map((pate) => (
                  <div key={pate.id} className="pate-item">
                    <div className="pate-name-price">
                      <span className="pate-name">{pate.nom}</span>
                      <span className="pate-price">{parseFloat(pate.prix)}€</span>
                    </div>
                    <div className="pate-description">{pate.description}</div>
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

export default PatesPage; 