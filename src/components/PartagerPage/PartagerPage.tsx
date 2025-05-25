import React from 'react';
import { motion } from 'framer-motion';
import SideMenu from '../Carte/SideMenu';
import CloseButton from '../common/CloseButton';
import './PartagerPage.css';

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
  return (
    <div className="page-with-menu">
      <SideMenu />
      <CloseButton />
      <motion.div 
        className="partager-page-container"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="partager-menu-card">
          <div className="partager-header">
            <h1>New York Café</h1>
            <h2>À PARTAGER</h2>
            <p className="subtitle">Moments de Convivialité & de Partage</p>
          </div>

          <div className="menu-section">
            <h3 className="section-title">GRANDES PLANCHES</h3>
            <div className="partager-menu">
              {platsPartager.map((plat, index) => (
                <motion.div 
                  key={index} 
                  className="partager-item"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="partager-name-price">
                    <span className="partager-name">{plat.name}</span>
                    <div className="price-info">
                      <span className="personnes">{plat.personnes} pers.</span>
                      <span className="partager-price">{plat.price}€</span>
                    </div>
                  </div>
                  <div className="partager-description">{plat.description}</div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="menu-section">
            <h3 className="section-title">TAPAS & PETITES PORTIONS</h3>
            <div className="tapas-menu">
              {tapas.map((tapa, index) => (
                <motion.div 
                  key={index} 
                  className="tapas-item"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="tapas-name-price">
                    <span className="tapas-name">{tapa.name}</span>
                    <span className="tapas-price">{tapa.price}€</span>
                  </div>
                  <div className="tapas-description">{tapa.description}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PartagerPage; 