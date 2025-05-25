import React from 'react';
import { motion } from 'framer-motion';
import SideMenu from '../Carte/SideMenu';
import './VinsPage.css';

const champagnes = [
  {
    name: "Moët & Chandon Impérial",
    price: 85,
    description: "Brut, équilibré et élégant, notes de pomme verte et d'agrumes"
  },
  {
    name: "Veuve Clicquot",
    price: 90,
    description: "Brut, arômes de fruits blancs, raisins secs et brioche"
  },
  {
    name: "Ruinart Blanc de Blancs",
    price: 120,
    description: "100% Chardonnay, notes d'agrumes confits et de fleurs blanches"
  }
];

const vinsRouges = [
  {
    name: "Château Margaux 2015",
    price: 95,
    description: "Bordeaux, complexe et élégant, notes de fruits noirs et d'épices"
  },
  {
    name: "Côte-Rôtie 'La Mouline'",
    price: 85,
    description: "Vallée du Rhône, intense et soyeux, arômes de violette et d'olive noire"
  },
  {
    name: "Gevrey-Chambertin 1er Cru",
    price: 110,
    description: "Bourgogne, puissant et raffiné, notes de cerises et de sous-bois"
  },
  {
    name: "Saint-Émilion Grand Cru",
    price: 65,
    description: "Bordeaux, rond et velouté, arômes de fruits mûrs et de vanille"
  },
  {
    name: "Châteauneuf-du-Pape",
    price: 70,
    description: "Vallée du Rhône, riche et épicé, notes de fruits noirs et de garrigue"
  }
];

const vinsBlancs = [
  {
    name: "Chablis 1er Cru",
    price: 55,
    description: "Bourgogne, minéral et vif, notes d'agrumes et de silex"
  },
  {
    name: "Pouilly-Fumé",
    price: 45,
    description: "Loire, frais et aromatique, notes de pamplemousse et de pierre à fusil"
  },
  {
    name: "Condrieu",
    price: 75,
    description: "Vallée du Rhône, opulent et parfumé, arômes d'abricot et de fleurs blanches"
  },
  {
    name: "Meursault",
    price: 85,
    description: "Bourgogne, riche et beurré, notes de noisette et de miel"
  }
];

const vinsRoses = [
  {
    name: "Côtes de Provence",
    price: 35,
    description: "Provence, délicat et fruité, notes de pêche et d'agrumes"
  },
  {
    name: "Bandol Rosé",
    price: 45,
    description: "Provence, structuré et élégant, arômes de fruits rouges et d'épices"
  },
  {
    name: "Tavel",
    price: 40,
    description: "Vallée du Rhône, corsé et complexe, notes de fraise et de garrigue"
  }
];

const VinsPage: React.FC = () => {
  return (
    <div className="page-with-menu">
      <SideMenu />
      <motion.div 
        className="vins-page-container"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="vins-menu-card">
          <div className="vins-header">
            <h1>New York Café</h1>
            <h2>CARTE DES VINS</h2>
            <p className="subtitle">Sélection de Grands Crus & Vins d'Exception</p>
          </div>

          <div className="menu-section">
            <h3 className="section-title">CHAMPAGNES</h3>
            <div className="vins-menu">
              {champagnes.map((vin, index) => (
                <motion.div 
                  key={index} 
                  className="vin-item"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="vin-name-price">
                    <span className="vin-name">{vin.name}</span>
                    <span className="vin-price">{vin.price}€</span>
                  </div>
                  <div className="vin-description">{vin.description}</div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="menu-section">
            <h3 className="section-title">VINS ROUGES</h3>
            <div className="vins-menu">
              {vinsRouges.map((vin, index) => (
                <motion.div 
                  key={index} 
                  className="vin-item"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="vin-name-price">
                    <span className="vin-name">{vin.name}</span>
                    <span className="vin-price">{vin.price}€</span>
                  </div>
                  <div className="vin-description">{vin.description}</div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="menu-section">
            <h3 className="section-title">VINS BLANCS</h3>
            <div className="vins-menu">
              {vinsBlancs.map((vin, index) => (
                <motion.div 
                  key={index} 
                  className="vin-item"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="vin-name-price">
                    <span className="vin-name">{vin.name}</span>
                    <span className="vin-price">{vin.price}€</span>
                  </div>
                  <div className="vin-description">{vin.description}</div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="menu-section">
            <h3 className="section-title">VINS ROSÉS</h3>
            <div className="vins-menu">
              {vinsRoses.map((vin, index) => (
                <motion.div 
                  key={index} 
                  className="vin-item"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="vin-name-price">
                    <span className="vin-name">{vin.name}</span>
                    <span className="vin-price">{vin.price}€</span>
                  </div>
                  <div className="vin-description">{vin.description}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default VinsPage; 