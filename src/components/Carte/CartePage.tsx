import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SideMenu from './SideMenu';
import './CartePage.css';

// Interface pour typer les données de l'API
interface Plat {
  id: number;
  name: string;
  description: string;
  price: number;
  photo_url?: string;
  allergenes?: string[];
}

interface Categorie {
  id: number;
  nom: string;
  slug: string;
  description: string;
  ordre: number;
  plats: Plat[];
}

interface MenuData {
  [key: string]: Categorie;
}

const MenuSection: React.FC<{ title: string, items: Plat[], id: string }> = ({ title, items, id }) => (
  <div className="menu-section" id={id}>
    <div className="section-header">
      <h2>{title}</h2>
    </div>
    <div className="menu-grid">
      {items.map((item, index) => (
        <div key={item.id || index} className="menu-item">
          <div className="item-name-price">
            <span className="item-name">{item.name}</span>
            <span className="item-price">{item.price}€</span>
          </div>
          <div className="item-description">{item.description}</div>
        </div>
      ))}
    </div>
    {id === "nos-viandes" && (
      <div className="garnitures-info" style={{ marginTop: '20px', textAlign: 'center' }}>
        <p style={{ color: 'rgba(255, 255, 255, 0.9)', marginBottom: '8px' }}>
          GARNITURES AU CHOIX : spaghettis, riz, haricots verts, frites, pommes sautées
        </p>
        <p style={{ color: '#ff4444' }}>
          GARNITURE SUPPLÉMENTAIRE +2€
        </p>
      </div>
    )}
  </div>
);

const CartePage: React.FC = () => {
  const [menuData, setMenuData] = useState<MenuData>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        setLoading(true);
        // Utilisation de l'URL complète du serveur backend
        const response = await fetch('http://localhost:4000/api/menu/menu-complet');
        
        if (!response.ok) {
          throw new Error(`Erreur ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        setMenuData(data);
        setError(null);
      } catch (error) {
        console.error('Erreur lors du chargement du menu:', error);
        setError('Impossible de charger le menu. Veuillez réessayer plus tard.');
        
        // En cas d'erreur, on peut garder les données de base pour que le site reste fonctionnel
        const fallbackData: MenuData = {
          'petites-faims': {
            id: 1,
            nom: "PETITES FAIMS",
            slug: "petites-faims",
            description: "Entrées & Apéritifs",
            ordre: 1,
            plats: [
              { id: 1, name: "Connexion au serveur...", description: "Chargement des données depuis le back office", price: 0 }
            ]
          }
        };
        setMenuData(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuData();
  }, []);

  if (loading) {
    return (
      <div className="page-with-menu">
        <SideMenu />
        <motion.div 
          className="carte-page-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="carte-header">
            <h1>New York Café</h1>
            <h2>CHARGEMENT DE LA CARTE...</h2>
          </div>
          <div style={{ textAlign: 'center', color: 'white', padding: '40px' }}>
            <p>Chargement des plats depuis le back office...</p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="page-with-menu">
      <SideMenu />
      <motion.div 
        className="carte-page-container"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="carte-header">
          <h1>New York Café</h1>
          <h2>NOTRE CARTE</h2>
          {error && (
            <p style={{ color: '#ff6b6b', fontSize: '0.9rem', marginTop: '10px' }}>
              ⚠️ {error}
            </p>
          )}
        </div>

        {/* Affichage dynamique des catégories depuis l'API */}
        {Object.entries(menuData)
          .sort(([, a], [, b]) => a.ordre - b.ordre)
          .map(([slug, categorie]) => (
            <MenuSection 
              key={slug}
              id={slug} 
              title={categorie.nom} 
              items={categorie.plats} 
            />
          ))}

        {/* Message si aucune donnée n'est disponible */}
        {Object.keys(menuData).length === 0 && !loading && (
          <div style={{ textAlign: 'center', color: 'white', padding: '40px' }}>
            <p>Aucun plat disponible pour le moment.</p>
            <p>Vérifiez que le serveur backend est démarré sur le port 4000.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default CartePage; 