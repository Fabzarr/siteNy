import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SideMenu from '../Carte/SideMenu';
import CloseButton from '../common/CloseButton';
import './PizzaPage.css';

// Interface pour les données de l'API
interface Pizza {
  id: number;
  nom: string;
  prix: string;
  description: string;
  disponible?: boolean;
}

const PizzaPage: React.FC = () => {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const response = await fetch('/api/menu/menu-complet');
        if (!response.ok) {
          throw new Error('Erreur lors du chargement du menu');
        }
        
        const menuData = await response.json();
        
        // Récupérer la catégorie "nos-pizzas"
        const pizzasCategory = menuData['nos-pizzas'];
        if (pizzasCategory && pizzasCategory.plats) {
          setPizzas(pizzasCategory.plats);
        } else {
          // Fallback avec données par défaut si pas de données
          setPizzas([
            { id: 1, nom: "Margherita", prix: "14.00", description: "Tomate, mozzarella, basilic" },
            { id: 2, nom: "Regina", prix: "16.00", description: "Tomate, mozzarella, jambon, champignons" }
          ]);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors du chargement des pizzas:', error);
        setError('Impossible de charger le menu. Veuillez réessayer plus tard.');
        
        // Données de fallback
        setPizzas([
          { id: 1, nom: "Margherita", prix: "14.00", description: "Tomate, mozzarella, basilic" },
          { id: 2, nom: "Regina", prix: "16.00", description: "Tomate, mozzarella, jambon, champignons" }
        ]);
        setLoading(false);
      }
    };

    fetchPizzas();
  }, []);

  if (loading) {
    return (
      <div className="page-with-menu">
        <SideMenu isOpen={false} toggleMenu={() => {}} />
        <CloseButton />
        <div className="pizza-page-container">
          <div className="pizza-menu-card">
            <div className="pizza-header">
              <h1>New York Café</h1>
              <h2>CHARGEMENT...</h2>
            </div>
            <div style={{ textAlign: 'center', color: 'white', padding: '40px' }}>
              <p>🚀 Chargement des pizzas...</p>
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="pizza-page-container">
          <div className="pizza-menu-card">
            <div className="pizza-header">
              <h1>New York Café</h1>
              <h2>NOS PIZZAS</h2>
            </div>

            <div className="pizza-menu">
              {pizzas.map((pizza) => (
                <div key={pizza.id} className="pizza-item">
                  <div className="pizza-name-price">
                    <span className="pizza-name">{pizza.nom}</span>
                    <span className="pizza-price">{parseFloat(pizza.prix)}€</span>
                  </div>
                  <div className="pizza-description">{pizza.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PizzaPage; 