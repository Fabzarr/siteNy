import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SideMenu from '../Carte/SideMenu';
import CloseButton from '../common/CloseButton';
import './ViandesPage.css';

// Interface pour les données de l'API
interface Plat {
  id: number;
  nom: string;
  prix: string;
  description: string;
  disponible?: boolean;
}

const ViandesPage: React.FC = () => {
  const [viandes, setViandes] = useState<Plat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchViandes = async () => {
      try {
        const response = await fetch('/api/menu/menu-complet');
        if (!response.ok) {
          throw new Error('Erreur lors du chargement du menu');
        }
        
        const menuData = await response.json();
        
        // Récupérer la catégorie viandes (tester plusieurs clés possibles)
        console.log('🥩 Clés disponibles dans l\'API:', Object.keys(menuData));
        
        const viandesCategory = menuData['nos-viandes'] || 
                               menuData['nos-viandes-poisson'] || 
                               menuData['viandes-poisson'] || 
                               menuData['viandes'] ||
                               menuData['nos-viandes-et-poisson'];
                               
        console.log('🥩 Catégorie viandes trouvée:', viandesCategory);
        
        if (viandesCategory && viandesCategory.plats) {
          console.log('🥩 Nombre de plats trouvés:', viandesCategory.plats.length);
          setViandes(viandesCategory.plats);
        } else {
          console.log('🥩 Aucune catégorie viandes trouvée, utilisation des données de fallback');
          // Fallback avec données par défaut si pas de données
          setViandes([
            { id: 1, nom: "Entrecôte Black Angus", prix: "28.00", description: "300g de bœuf Black Angus, sauce au choix (poivre, béarnaise, roquefort), pommes grenailles" },
            { id: 2, nom: "Pavé de Saumon", prix: "23.00", description: "Mi-cuit, sauce vierge aux agrumes, riz basmati aux herbes" }
          ]);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors du chargement des viandes:', error);
        setError('Impossible de charger le menu. Veuillez réessayer plus tard.');
        
        // Données de fallback
        setViandes([
          { id: 1, nom: "Entrecôte Black Angus", prix: "28.00", description: "300g de bœuf Black Angus, sauce au choix (poivre, béarnaise, roquefort), pommes grenailles" },
          { id: 2, nom: "Pavé de Saumon", prix: "23.00", description: "Mi-cuit, sauce vierge aux agrumes, riz basmati aux herbes" }
        ]);
        setLoading(false);
      }
    };

    fetchViandes();
  }, []);

  if (loading) {
    return (
      <div className="page-with-menu">
        <SideMenu isOpen={false} toggleMenu={() => {}} />
        <CloseButton />
        <div className="viandes-page-container">
          <div className="viandes-menu-card">
            <div className="viandes-header">
              <h1>New York Café</h1>
              <h2>CHARGEMENT...</h2>
              <p className="subtitle">Viandes & Poissons</p>
            </div>
            <div style={{ textAlign: 'center', color: 'white', padding: '40px' }}>
              <p>🚀 Chargement des viandes & poissons...</p>
              {error && <p style={{ color: '#ff6b6b' }}>⚠️ {error}</p>}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-with-menu">
      <SideMenu isOpen={false} toggleMenu={() => {}} />
      <CloseButton />
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="viandes-page-container">
          <div className="viandes-menu-card">
            <div className="viandes-header">
              <h1>New York Café</h1>
              <h2>VIANDES & POISSONS</h2>
              <p className="subtitle">Terre & Mer</p>
            </div>

            <div className="menu-section">
              <h3 className="section-title">NOS SPÉCIALITÉS</h3>
              <div className="viandes-menu">
                {viandes.map((plat) => (
                  <div key={plat.id} className="viande-item">
                    <div className="viande-name-price">
                      <span className="viande-name">{plat.nom}</span>
                      <span className="viande-price">{parseFloat(plat.prix)}€</span>
                    </div>
                    <div className="viande-description">{plat.description}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Message de garniture en rouge - À PERSONNALISER */}
            <div style={{ 
              textAlign: 'center', 
              marginTop: '30px', 
              padding: '15px',
              color: '#ff4444',
              fontStyle: 'italic',
              fontSize: '0.9rem',
              borderTop: '1px dashed rgba(255, 68, 68, 0.3)'
            }}>
              <p>
                🍽️ Toutes nos viandes sont servies avec garniture au choix : 
                frites maison, pommes grenailles, riz, légumes de saison ou salade verte
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ViandesPage; 