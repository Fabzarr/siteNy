import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import './StandaloneMenu.css';

interface Plat {
  id: number;
  nom: string;
  description: string;
  prix: number;
  categorie_id: number;
  ordre: number;
  est_epuise?: boolean;
  est_visible?: boolean;
}

interface Categorie {
  id: number;
  nom: string;
  description: string;
  ordre: number;
  plats: Plat[];
}

interface MenuData {
  categories: Categorie[];
}

const StandaloneMenu = () => {
  const [menuData, setMenuData] = useState<MenuData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch('/api/menu/menu-complet');
        if (!response.ok) {
          throw new Error('Erreur lors du chargement du menu');
        }
        const data = await response.json();
        setMenuData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenu();
  }, []);

  if (isLoading) {
    return (
      <div className="standalone-menu-loading-container">
        <motion.div
          className="standalone-menu-loading-spinner"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="standalone-menu-error-container">
        <p className="standalone-menu-error-message">{error}</p>
      </div>
    );
  }

  return (
    <div className="standalone-menu-root">
      <header className="standalone-menu-header">
        <h1 className="standalone-menu-title">Notre Carte</h1>
        <p className="standalone-menu-subtitle">Une sélection raffinée de plats authentiques</p>
      </header>

      <main className="standalone-menu-content">
        <AnimatePresence>
          {menuData?.categories.map((categorie) => (
            <motion.div
              key={categorie.id}
              className="standalone-menu-category-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="standalone-menu-category-title">{categorie.nom}</h2>
              {categorie.description && (
                <p className="standalone-menu-category-description">{categorie.description}</p>
              )}
              
              <div className="standalone-menu-dishes-grid">
                {categorie.plats
                  .filter(plat => plat.est_visible !== false)
                  .sort((a, b) => a.ordre - b.ordre)
                  .map((plat) => (
                    <motion.div
                      key={plat.id}
                      className="standalone-menu-dish-card"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      layout
                    >
                      <h3 className="standalone-menu-dish-name">{plat.nom}</h3>
                      <p className="standalone-menu-dish-description">{plat.description}</p>
                      <span className="standalone-menu-dish-price">{plat.prix.toFixed(2)} €</span>
                      {plat.est_epuise && (
                        <span className="standalone-menu-dish-unavailable">Épuisé</span>
                      )}
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default StandaloneMenu; 