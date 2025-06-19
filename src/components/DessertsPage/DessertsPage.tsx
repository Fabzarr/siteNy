import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SideMenu from '../Carte/SideMenu';
import CloseButton from '../common/CloseButton';
import './DessertsPage.css';

interface MenuItem {
  nom_plat: string;
  prix: number;
  description: string;
}

interface MenuCategory {
  [key: string]: MenuItem[];
}

interface ApiResponse {
  success: boolean;
  data: MenuCategory;
}

// Données de fallback en cas d'erreur API
const fallbackDesserts = [
  { 
    nom_plat: "Tiramisu Maison", 
    prix: 8, 
    description: "Le classique italien revisité, biscuits imbibés au café, crème mascarpone onctueuse, cacao amer"
  },
  { 
    nom_plat: "New York Cheesecake", 
    prix: 9, 
    description: "Notre spécialité, servi avec coulis de fruits rouges et fruits frais de saison"
  },
  { 
    nom_plat: "Fondant au Chocolat", 
    prix: 9, 
    description: "Cœur coulant au chocolat noir 70%, glace vanille bourbon, éclats de noisettes caramélisées"
  },
  { 
    nom_plat: "Crème Brûlée", 
    prix: 8, 
    description: "À la vanille de Madagascar, caramélisée au sucre roux"
  },
  { 
    nom_plat: "Tarte Tatin", 
    prix: 9, 
    description: "Pommes caramélisées, pâte feuilletée maison, crème fraîche d'Isigny"
  },
  { 
    nom_plat: "Profiteroles", 
    prix: 10, 
    description: "Choux croustillants, glace vanille, sauce chocolat chaud, amandes effilées"
  },
  { 
    nom_plat: "Café Gourmand", 
    prix: 10, 
    description: "Expresso et assortiment de mini desserts maison (4 pièces)"
  },
  { 
    nom_plat: "Pavlova aux Fruits", 
    prix: 9, 
    description: "Meringue croustillante, crème légère, fruits frais, coulis passion"
  },
  { 
    nom_plat: "Mousse au Chocolat", 
    prix: 8, 
    description: "Chocolat noir intense, crumble cacao, chantilly maison"
  },
  { 
    nom_plat: "Coupe Glacée New York", 
    prix: 10, 
    description: "Glace cookie, brownies, sauce caramel, chantilly, éclats de noix de pécan"
  },
  { 
    nom_plat: "Tarte au Citron Meringuée", 
    prix: 8, 
    description: "Crème de citron, meringue italienne, zestes confits"
  },
  { 
    nom_plat: "Assiette de Fromages", 
    prix: 12, 
    description: "Sélection de fromages affinés, fruits secs, confiture de figues, pain aux noix"
  }
];

const DessertsPage: React.FC = () => {
  const [desserts, setDesserts] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDesserts = async () => {
      try {
        console.log('🍰 Chargement des desserts depuis l\'API...');
        const response = await fetch('/api/menu/menu-complet');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: ApiResponse = await response.json();
        console.log('📊 Données API reçues:', data);

        if (data.success && data.data) {
          // Chercher les desserts avec différentes clés possibles
          const possibleKeys = ['nos-desserts', 'desserts', 'dessert', 'nos_desserts'];
          let foundDesserts: MenuItem[] | null = null;

          for (const key of possibleKeys) {
            if (data.data[key] && Array.isArray(data.data[key])) {
              foundDesserts = data.data[key];
              console.log(`✅ Desserts trouvés avec la clé: ${key}`, foundDesserts);
              break;
            }
          }

          if (foundDesserts && foundDesserts.length > 0) {
            setDesserts(foundDesserts);
            console.log(`🍰 ${foundDesserts.length} desserts chargés avec succès`);
          } else {
            console.warn('⚠️ Aucun dessert trouvé dans l\'API, utilisation des données de fallback');
            console.log('🔍 Clés disponibles dans l\'API:', Object.keys(data.data));
            setDesserts(fallbackDesserts);
          }
        } else {
          throw new Error('Format de données invalide');
        }
      } catch (err) {
        console.error('❌ Erreur lors du chargement des desserts:', err);
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
        setDesserts(fallbackDesserts);
      } finally {
        setLoading(false);
      }
    };

    fetchDesserts();
  }, []);

  if (loading) {
    return (
      <div className="page-with-menu">
        <SideMenu isOpen={false} toggleMenu={() => {}} />
        <CloseButton />
        <div className="desserts-page-container">
          <div className="desserts-menu-card">
            <div className="loading-state">
              <p>Chargement des desserts...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error && desserts.length === 0) {
    return (
      <div className="page-with-menu">
        <SideMenu isOpen={false} toggleMenu={() => {}} />
        <CloseButton />
        <div className="desserts-page-container">
          <div className="desserts-menu-card">
            <div className="error-state">
              <p>Erreur lors du chargement des desserts: {error}</p>
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
        <div className="desserts-page-container">
        <div className="desserts-menu-card">
          <div className="desserts-header">
            <h1>New York Café</h1>
            <h2>NOS DESSERTS</h2>
            <p className="subtitle">Douceurs & Gourmandises</p>
          </div>

          <div className="menu-section">
            <div className="desserts-menu">
              {desserts.map((dessert, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                    <div className="dessert-item">
                  <div className="dessert-name-price">
                        <span className="dessert-name">{dessert.nom_plat}</span>
                        <span className="dessert-price">{dessert.prix}€</span>
                  </div>
                  <div className="dessert-description">{dessert.description}</div>
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

export default DessertsPage; 