import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SideMenu from '../Carte/SideMenu';
import CloseButton from '../common/CloseButton';
import './PartagerPage.css';

// Interface pour les données de l'API
interface Plat {
  id: number;
  nom: string;
  description: string;
  prix: string;
  disponible?: boolean;
}

const platsPartager = [
  {
    name: "Plateau de Fromages Affinés",
    price: 28,
    description: "Sélection de 6 fromages, fruits secs, raisins frais, miel, confiture de figues et pain aux noix",
    personnes: "2-4"
  },
  {
    name: "Planche de Charcuteries Fines",
    price: 26,
    description: "Jambon de Parme, chorizo ibérique, saucisson aux herbes, terrine maison, cornichons et condiments",
    personnes: "2-4"
  },
  {
    name: "Mixte Terre & Mer",
    price: 32,
    description: "Assortiment de charcuteries et fromages, crevettes marinées, rillettes de saumon, olives et antipasti",
    personnes: "3-4"
  },
  {
    name: "Nachos Suprêmes",
    price: 24,
    description: "Tortillas gratinées, chili con carne, guacamole, crème fraîche, jalapeños et cheddar fondu",
    personnes: "2-3"
  },
  {
    name: "Plateau de Fruits de Mer",
    price: 45,
    description: "Huîtres, crevettes, bulots, bigorneaux, mayonnaise maison et pain de seigle",
    personnes: "2"
  },
  {
    name: "Mezze Oriental",
    price: 30,
    description: "Houmous, caviar d'aubergines, taboulé, falafels, pita grillée et légumes croquants",
    personnes: "3-4"
  }
];

const tapas = [
  {
    name: "Calamars Frits",
    price: 14,
    description: "Servis avec sauce tartare maison et citron"
  },
  {
    name: "Croquetas de Jambon",
    price: 12,
    description: "Croquettes crémeuses au jambon serrano"
  },
  {
    name: "Patatas Bravas",
    price: 10,
    description: "Pommes de terre épicées, sauce tomate piquante et aïoli"
  },
  {
    name: "Gambas al Ajillo",
    price: 16,
    description: "Crevettes sautées à l'ail et au piment"
  },
  {
    name: "Tortilla Española",
    price: 12,
    description: "Omelette traditionnelle aux pommes de terre et oignons"
  },
  {
    name: "Pimientos del Padrón",
    price: 10,
    description: "Petits poivrons verts grillés au sel de mer"
  }
];

const PartagerPage: React.FC = () => {
  const [platsPartager, setPlatsPartager] = useState<Plat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlatsPartager = async () => {
      try {
        const response = await fetch('/api/menu/menu-complet');
        if (!response.ok) {
          throw new Error('Erreur lors du chargement du menu');
        }
        
        const menuData = await response.json();
        
        // Récupérer la catégorie "a-partager"
        const partagerCategory = menuData['a-partager'];
        if (partagerCategory && partagerCategory.plats) {
          setPlatsPartager(partagerCategory.plats);
        } else {
          // Fallback avec données par défaut si pas de données
          setPlatsPartager([
            { id: 1, nom: "Plateau de Fromages Affinés", prix: "28.00", description: "Sélection de 6 fromages, fruits secs, raisins frais, miel, confiture de figues et pain aux noix" },
            { id: 2, nom: "Planche de Charcuteries Fines", prix: "26.00", description: "Jambon de Parme, chorizo ibérique, saucisson aux herbes, terrine maison" }
          ]);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors du chargement des plats à partager:', error);
        setError('Impossible de charger le menu. Veuillez réessayer plus tard.');
        
        // Données de fallback
        setPlatsPartager([
          { id: 1, nom: "Plateau de Fromages Affinés", prix: "28.00", description: "Sélection de 6 fromages, fruits secs, raisins frais, miel, confiture de figues et pain aux noix" },
          { id: 2, nom: "Planche de Charcuteries Fines", prix: "26.00", description: "Jambon de Parme, chorizo ibérique, saucisson aux herbes, terrine maison" }
        ]);
        setLoading(false);
      }
    };

    fetchPlatsPartager();
  }, []);

  if (loading) {
    return (
      <div className="page-with-menu">
        <SideMenu isOpen={false} toggleMenu={() => {}} />
        <CloseButton />
        <div className="partager-page-container">
          <div className="partager-menu-card">
            <div className="partager-header">
              <h1>New York Café</h1>
              <h2>CHARGEMENT...</h2>
              <p className="subtitle">À Partager</p>
            </div>
            <div style={{ textAlign: 'center', color: 'white', padding: '40px' }}>
              <p>🚀 Chargement des plats à partager...</p>
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
        <div className="partager-page-container">
          <div className="partager-menu-card">
            <div className="partager-header">
              <h1>New York Café</h1>
              <h2>À PARTAGER</h2>
              <p className="subtitle">Moments de Convivialité & de Partage</p>
            </div>

            <div className="menu-section">
              <h3 className="section-title">NOS PLATS À PARTAGER</h3>
              <div className="partager-menu">
                {platsPartager.map((plat) => (
                  <motion.div 
                    key={plat.id} 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <div className="partager-item">
                    <div className="partager-name-price">
                      <span className="partager-name">{plat.nom}</span>
                      <div className="price-info">
                        <span className="partager-price">{parseFloat(plat.prix)}€</span>
                      </div>
                    </div>
                    <div className="partager-description">{plat.description}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PartagerPage; 