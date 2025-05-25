import React from 'react';
import { motion } from 'framer-motion';
import SideMenu from '../Carte/SideMenu';
import CloseButton from '../common/CloseButton';
import './PatesPage.css';

const pates = [
  { name: "Spaghetti Carbonara", price: 14, description: "Crème fraîche, lardons, œuf, parmesan" },
  { name: "Penne Arrabiata", price: 12, description: "Sauce tomate piquante, ail, basilic" },
  { name: "Tagliatelles aux Fruits de Mer", price: 16, description: "Crevettes, moules, calamars, sauce crémeuse" },
  { name: "Linguine au Saumon", price: 15, description: "Saumon fumé, crème, aneth" },
  { name: "Rigatoni 4 Fromages", price: 14, description: "Gorgonzola, mozzarella, parmesan, pecorino" },
  { name: "Penne au Poulet", price: 13, description: "Poulet grillé, champignons, crème" },
  { name: "Fusilli Pesto", price: 12, description: "Basilic, pignons, parmesan, huile d'olive" },
  { name: "Farfalle Primavera", price: 13, description: "Légumes de saison, huile d'olive, parmesan" },
  { name: "Spaghetti Bolognaise", price: 13, description: "Sauce bolognaise maison, parmesan" },
  { name: "Penne Vodka", price: 14, description: "Sauce rosée, vodka, parmesan" },
  { name: "Tagliatelles aux Truffes", price: 18, description: "Crème de truffe, champignons, parmesan" },
  { name: "Linguine Vongole", price: 16, description: "Palourdes, ail, persil, vin blanc" }
];

const PatesPage: React.FC = () => {
  const column1 = pates.slice(0, 4);
  const column2 = pates.slice(4, 8);
  const column3 = pates.slice(8);

  return (
    <div className="page-with-menu">
      <SideMenu />
      <CloseButton />
      <motion.div 
        className="pates-page-container"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="pates-menu-card">
          <div className="pates-header">
            <h1>New York Café</h1>
            <h2>NOS PÂTES</h2>
          </div>

          <div className="pates-menu">
            <div className="menu-column">
              {column1.map((pate, index) => (
                <div key={index} className="pate-item">
                  <div className="pate-name-price">
                    <span className="pate-name">{pate.name}</span>
                    <span className="pate-price">{pate.price}€</span>
                  </div>
                  <div className="pate-description">{pate.description}</div>
                </div>
              ))}
            </div>

            <div className="menu-column">
              {column2.map((pate, index) => (
                <div key={index} className="pate-item">
                  <div className="pate-name-price">
                    <span className="pate-name">{pate.name}</span>
                    <span className="pate-price">{pate.price}€</span>
                  </div>
                  <div className="pate-description">{pate.description}</div>
                </div>
              ))}
            </div>

            <div className="menu-column">
              {column3.map((pate, index) => (
                <div key={index} className="pate-item">
                  <div className="pate-name-price">
                    <span className="pate-name">{pate.name}</span>
                    <span className="pate-price">{pate.price}€</span>
                  </div>
                  <div className="pate-description">{pate.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PatesPage; 