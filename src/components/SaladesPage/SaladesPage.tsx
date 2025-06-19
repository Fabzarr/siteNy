import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SideMenu from '../Carte/SideMenu';
import CloseButton from '../common/CloseButton';
import './SaladesPage.css';

// Interface pour les données de l'API
interface Salade {
  id: number;
  nom: string;
  prix: string;
  description: string;
  disponible?: boolean;
}

const SaladesPage: React.FC = () => {
  const [salades, setSalades] = useState<Salade[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSalades = async () => {
      try {
        const response = await fetch('/api/menu/menu-complet');
        if (!response.ok) {
          throw new Error('Erreur lors du chargement du menu');
        }
        
        const menuData = await response.json();
        
        // Récupérer la catégorie salades (tester plusieurs clés possibles)
        console.log('🥗 Clés disponibles dans l\'API:', Object.keys(menuData));
        
        const saladesCategory = menuData['nos-salades'] || 
                               menuData['nos-belles-salades'] || 
                               menuData['salades'] || 
                               menuData['belles-salades'];
                               
        console.log('🥗 Catégorie salades trouvée:', saladesCategory);
        
        if (saladesCategory && saladesCategory.plats) {
          console.log('🥗 Nombre de salades trouvées:', saladesCategory.plats.length);
          setSalades(saladesCategory.plats);
        } else {
          console.log('🥗 Aucune catégorie salades trouvée, utilisation des données de fallback');
          // Fallback avec données par défaut si pas de données
          setSalades([
            { id: 1, nom: "Salade César", prix: "14.00", description: "Laitue romaine, poulet grillé, croûtons maison, parmesan, sauce César traditionnelle" },
            { id: 2, nom: "Salade Niçoise", prix: "15.00", description: "Thon mi-cuit, haricots verts, tomates, œufs, olives noires, anchois, vinaigrette balsamique" }
          ]);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors du chargement des salades:', error);
        setError('Impossible de charger le menu. Veuillez réessayer plus tard.');
        
        // Données de fallback
        setSalades([
          { id: 1, nom: "Salade César", prix: "14.00", description: "Laitue romaine, poulet grillé, croûtons maison, parmesan, sauce César traditionnelle" },
          { id: 2, nom: "Salade Niçoise", prix: "15.00", description: "Thon mi-cuit, haricots verts, tomates, œufs, olives noires, anchois, vinaigrette balsamique" }
        ]);
        setLoading(false);
      }
    };

    fetchSalades();
  }, []);

  if (loading) {
    return (
      <div className="page-with-menu">
        <SideMenu isOpen={false} toggleMenu={() => {}} />
        <CloseButton />
        <div className="salades-page-container">
          <div className="salades-menu-card">
            <div className="salades-header">
              <h1>New York Café</h1>
              <h2>CHARGEMENT...</h2>
              <p className="subtitle">Nos Belles Salades</p>
            </div>
            <div style={{ textAlign: 'center', color: 'white', padding: '40px' }}>
              <p>🚀 Chargement des salades...</p>
              {error && <p style={{ color: '#ff6b6b' }}>⚠️ {error}</p>}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Diviser les données en colonnes
  const column1 = salades.slice(0, Math.ceil(salades.length / 3));
  const column2 = salades.slice(Math.ceil(salades.length / 3), Math.ceil(salades.length * 2 / 3));
  const column3 = salades.slice(Math.ceil(salades.length * 2 / 3));

  return (
    <div className="page-with-menu">
      <SideMenu isOpen={false} toggleMenu={() => {}} />
      <CloseButton />
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="salades-page-container">
        <div className="salades-menu-card">
          <div className="salades-header">
            <h1>New York Café</h1>
            <h2>NOS BELLES SALADES</h2>
            <p className="subtitle">Fraîcheur & Saveurs</p>
          </div>

          <div className="salades-menu">
            <div className="menu-column">
                {column1.map((salade) => (
                  <div key={salade.id} className="salade-item">
                  <div className="salade-name-price">
                      <span className="salade-name">{salade.nom}</span>
                      <span className="salade-price">{parseFloat(salade.prix)}€</span>
                  </div>
                  <div className="salade-description">{salade.description}</div>
                </div>
              ))}
            </div>

            <div className="menu-column">
                {column2.map((salade) => (
                  <div key={salade.id} className="salade-item">
                  <div className="salade-name-price">
                      <span className="salade-name">{salade.nom}</span>
                      <span className="salade-price">{parseFloat(salade.prix)}€</span>
                  </div>
                  <div className="salade-description">{salade.description}</div>
                </div>
              ))}
            </div>

            <div className="menu-column">
                {column3.map((salade) => (
                  <div key={salade.id} className="salade-item">
                  <div className="salade-name-price">
                      <span className="salade-name">{salade.nom}</span>
                      <span className="salade-price">{parseFloat(salade.prix)}€</span>
                  </div>
                  <div className="salade-description">{salade.description}</div>
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

export default SaladesPage; 