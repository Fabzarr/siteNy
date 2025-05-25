import React from 'react';
import { motion } from 'framer-motion';
import SideMenu from '../Carte/SideMenu';
import CloseButton from '../common/CloseButton';
import './ViandesPage.css';

const viandes = [
  { 
    name: "Entrecôte Black Angus", 
    price: 28, 
    description: "300g de bœuf Black Angus, sauce au choix (poivre, béarnaise, roquefort), pommes grenailles"
  },
  { 
    name: "Côte de Bœuf à Partager", 
    price: 65, 
    description: "1kg de viande maturée, sauce au choix, pommes grenailles, salade verte (pour 2 personnes)"
  },
  { 
    name: "Magret de Canard", 
    price: 24, 
    description: "Magret entier, sauce au miel et balsamique, purée de patates douces"
  },
  { 
    name: "Filet Mignon de Veau", 
    price: 26, 
    description: "Sauce aux morilles, écrasé de pommes de terre aux herbes fraîches"
  },
  { 
    name: "Côtelettes d'Agneau", 
    price: 25, 
    description: "En croûte d'herbes, jus corsé, ratatouille confite"
  },
  { 
    name: "Suprême de Volaille", 
    price: 22, 
    description: "Farci aux champignons, sauce crème, risotto aux légumes"
  }
];

const poissons = [
  { 
    name: "Pavé de Saumon", 
    price: 23, 
    description: "Mi-cuit, sauce vierge aux agrumes, riz basmati aux herbes"
  },
  { 
    name: "Dos de Cabillaud", 
    price: 24, 
    description: "En croûte d'herbes, beurre blanc, légumes de saison"
  },
  { 
    name: "Saint-Jacques Snackées", 
    price: 28, 
    description: "Risotto crémeux au parmesan, chips de pancetta"
  },
  { 
    name: "Bar Entier Grillé", 
    price: 26, 
    description: "À la plancha, huile d'olive vierge, légumes grillés"
  },
  { 
    name: "Thon Mi-Cuit", 
    price: 25, 
    description: "Croûte de sésame, sauce teriyaki, wok de légumes"
  },
  { 
    name: "Gambas Flambées", 
    price: 27, 
    description: "Au cognac, linguine à l'ail et persil, bisque maison"
  }
];

const ViandesPage: React.FC = () => {
  return (
    <div className="page-with-menu">
      <SideMenu />
      <CloseButton />
      <motion.div 
        className="viandes-page-container"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="viandes-menu-card">
          <div className="viandes-header">
            <h1>New York Café</h1>
            <h2>VIANDES & POISSONS</h2>
            <p className="subtitle">Terre & Mer</p>
          </div>

          <div className="menu-section">
            <h3 className="section-title">NOS VIANDES</h3>
            <div className="viandes-menu">
              {viandes.map((viande, index) => (
                <div key={index} className="viande-item">
                  <div className="viande-name-price">
                    <span className="viande-name">{viande.name}</span>
                    <span className="viande-price">{viande.price}€</span>
                  </div>
                  <div className="viande-description">{viande.description}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="menu-section">
            <h3 className="section-title">NOS POISSONS</h3>
            <div className="poissons-menu">
              {poissons.map((poisson, index) => (
                <div key={index} className="poisson-item">
                  <div className="poisson-name-price">
                    <span className="poisson-name">{poisson.name}</span>
                    <span className="poisson-price">{poisson.price}€</span>
                  </div>
                  <div className="poisson-description">{poisson.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ViandesPage; 