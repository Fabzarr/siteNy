import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SideMenu from '../Carte/SideMenu';
import CloseButton from '../common/CloseButton';
import './BurgersPage.css';

// Interface pour les données de l'API
interface Plat {
  id: number;
  nom: string;
  prix: string;
  description: string;
  disponible?: boolean;
}

const BurgersPage: React.FC = () => {
  const [burgers, setBurgers] = useState<Plat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBurgers = async () => {
      try {
        const response = await fetch('/api/menu/menu-complet');
        if (!response.ok) {
          throw new Error('Erreur lors du chargement du menu');
        }
        
        const menuData = await response.json();
        
        // Récupérer la catégorie "nos-burgers" ou "nos-hamburgers"
        const burgersCategory = menuData['nos-burgers'] || menuData['nos-hamburgers'];
        if (burgersCategory && burgersCategory.plats) {
          setBurgers(burgersCategory.plats);
        } else {
          // Fallback avec données par défaut si pas de données
          setBurgers([
            { id: 1, nom: "Classic NY Burger", prix: "16.00", description: "Bœuf black angus, cheddar affiné, bacon croustillant, laitue, tomate, oignon rouge, sauce maison" },
            { id: 2, nom: "Tartare Classic", prix: "18.00", description: "Bœuf charolais coupé au couteau, câpres, cornichons, oignon rouge, jaune d'œuf" }
          ]);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors du chargement des burgers:', error);
        setError('Impossible de charger le menu. Veuillez réessayer plus tard.');
        
        // Données de fallback
        setBurgers([
          { id: 1, nom: "Classic NY Burger", prix: "16.00", description: "Bœuf black angus, cheddar affiné, bacon croustillant, laitue, tomate, oignon rouge, sauce maison" },
          { id: 2, nom: "Tartare Classic", prix: "18.00", description: "Bœuf charolais coupé au couteau, câpres, cornichons, oignon rouge, jaune d'œuf" }
        ]);
        setLoading(false);
      }
    };

    fetchBurgers();
  }, []);

  if (loading) {
    return (
      <div className="page-with-menu">
        <SideMenu isOpen={false} toggleMenu={() => {}} />
        <CloseButton />
        <div className="burgers-page-container">
          <div className="burgers-menu-card">
            <div className="burgers-header">
              <h1>New York Café</h1>
              <h2>CHARGEMENT...</h2>
              <p className="subtitle">Hamburgers & Tartares</p>
            </div>
            <div style={{ textAlign: 'center', color: 'white', padding: '40px' }}>
              <p>🚀 Chargement des hamburgers & tartares...</p>
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
        <div className="burgers-page-container">
          <div className="burgers-menu-card">
            <div className="burgers-header">
              <h1>New York Café</h1>
              <h2>HAMBURGERS & TARTARES</h2>
              <p className="subtitle">Saveurs & Raffinement</p>
            </div>

            <div className="menu-section">
              <h3 className="section-title">NOS SPÉCIALITÉS</h3>
              <div className="burgers-menu">
                {burgers.map((item) => (
                  <div key={item.id} className="burger-item">
                    <div className="burger-name-price">
                      <span className="burger-name">{item.nom}</span>
                      <span className="burger-price">{parseFloat(item.prix)}€</span>
                    </div>
                    <div className="burger-description">{item.description}</div>
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

export default BurgersPage; 