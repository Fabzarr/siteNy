import React from 'react';
import { motion } from 'framer-motion';
import SideMenu from '../Carte/SideMenu';
import './PetitesFaimsPage.css';

const petitesFaims = [
  { name: "Bruschetta à l'Italienne", price: 8, description: "Pain grillé, tomates, basilic, ail, huile d'olive" },
  { name: "Carpaccio de Bœuf", price: 12, description: "Fines tranches de bœuf, parmesan, roquette, câpres" },
  { name: "Calamars Frits", price: 10, description: "Servis avec sauce tartare maison" },
  { name: "Antipasti Mixte", price: 14, description: "Légumes grillés, charcuterie italienne, olives" },
  { name: "Soupe à l'Oignon", price: 9, description: "Gratinée au fromage, croûtons" },
  { name: "Arancini", price: 9, description: "Boulettes de risotto farcies, sauce tomate" },
  { name: "Focaccia", price: 7, description: "Huile d'olive, romarin, fleur de sel" },
  { name: "Mozzarella Sticks", price: 8, description: "Servis avec sauce marinara" },
  { name: "Salade Caprese", price: 10, description: "Tomates, mozzarella di bufala, basilic" },
  { name: "Croquettes de Pommes de Terre", price: 8, description: "Aux herbes fraîches, sauce aïoli" },
  { name: "Assiette de Charcuterie", price: 15, description: "Sélection de charcuteries italiennes" },
  { name: "Olives Marinées", price: 6, description: "Mélange d'olives, herbes, agrumes" }
];

const PetitesFaimsPage: React.FC = () => {
  const column1 = petitesFaims.slice(0, 4);
  const column2 = petitesFaims.slice(4, 8);
  const column3 = petitesFaims.slice(8);

  return (
    <div className="page-with-menu">
      <SideMenu />
      <motion.div 
        className="petites-faims-page-container"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="petites-faims-menu-card">
          <div className="petites-faims-header">
            <h1>New York Café</h1>
            <h2>PETITES FAIMS</h2>
            <p className="subtitle">Entrées & Apéritifs</p>
          </div>

          <div className="petites-faims-menu">
            <div className="menu-column">
              {column1.map((item, index) => (
                <div key={index} className="petites-faims-item">
                  <div className="petites-faims-name-price">
                    <span className="petites-faims-name">{item.name}</span>
                    <span className="petites-faims-price">{item.price}€</span>
                  </div>
                  <div className="petites-faims-description">{item.description}</div>
                </div>
              ))}
            </div>

            <div className="menu-column">
              {column2.map((item, index) => (
                <div key={index} className="petites-faims-item">
                  <div className="petites-faims-name-price">
                    <span className="petites-faims-name">{item.name}</span>
                    <span className="petites-faims-price">{item.price}€</span>
                  </div>
                  <div className="petites-faims-description">{item.description}</div>
                </div>
              ))}
            </div>

            <div className="menu-column">
              {column3.map((item, index) => (
                <div key={index} className="petites-faims-item">
                  <div className="petites-faims-name-price">
                    <span className="petites-faims-name">{item.name}</span>
                    <span className="petites-faims-price">{item.price}€</span>
                  </div>
                  <div className="petites-faims-description">{item.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PetitesFaimsPage; 