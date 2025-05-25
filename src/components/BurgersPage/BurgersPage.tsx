import React from 'react';
import { motion } from 'framer-motion';
import SideMenu from '../Carte/SideMenu';
import CloseButton from '../common/CloseButton';
import './BurgersPage.css';

const burgers = [
  { 
    name: "Classic NY Burger", 
    price: 16, 
    description: "Bœuf black angus, cheddar affiné, bacon croustillant, laitue, tomate, oignon rouge, sauce maison"
  },
  { 
    name: "Cheese Lover", 
    price: 17, 
    description: "Double bœuf, cheddar, mozzarella, fromage bleu, oignons caramélisés, sauce au fromage"
  },
  { 
    name: "Spicy Mexican", 
    price: 16, 
    description: "Bœuf épicé, guacamole, jalapeños, cheddar, tomate, oignon rouge, sauce chipotle"
  },
  { 
    name: "Veggie Dream", 
    price: 15, 
    description: "Galette de quinoa aux légumes, avocat, roquette, tomate, oignon rouge grillé, sauce végane"
  },
  { 
    name: "Italian Style", 
    price: 17, 
    description: "Bœuf, mozzarella di bufala, tomates séchées, roquette, pesto, jambon de Parme"
  },
  { 
    name: "BBQ Master", 
    price: 16, 
    description: "Bœuf, cheddar fumé, oignons frits, bacon, salade, sauce BBQ maison"
  }
];

const tartares = [
  { 
    name: "Tartare Classic", 
    price: 18, 
    description: "Bœuf charolais coupé au couteau, câpres, cornichons, oignon rouge, jaune d'œuf, assaisonnement maison"
  },
  { 
    name: "Tartare Italien", 
    price: 19, 
    description: "Bœuf, parmesan, tomates séchées, basilic, pignons de pin, huile d'olive vierge"
  },
  { 
    name: "Tartare Asiatique", 
    price: 19, 
    description: "Bœuf, gingembre, coriandre, sauce soja, sésame, huile de sésame grillé, citron vert"
  },
  { 
    name: "Tartare de Saumon", 
    price: 20, 
    description: "Saumon frais, avocat, mangue, ciboulette, échalote, sauce yuzu"
  },
  { 
    name: "Tartare Méditerranéen", 
    price: 19, 
    description: "Bœuf, olives Kalamata, feta, tomates séchées, origan, huile d'olive"
  },
  { 
    name: "Tartare du Chef", 
    price: 21, 
    description: "Bœuf premium, truffe noire, parmesan 24 mois, roquette, huile de truffe"
  }
];

const BurgersPage: React.FC = () => {
  return (
    <div className="page-with-menu">
      <SideMenu />
      <CloseButton />
      <motion.div 
        className="burgers-page-container"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="burgers-menu-card">
          <div className="burgers-header">
            <h1>New York Café</h1>
            <h2>HAMBURGERS & TARTARES</h2>
            <p className="subtitle">Saveurs & Raffinement</p>
          </div>

          <div className="menu-section">
            <h3 className="section-title">NOS HAMBURGERS</h3>
            <div className="burgers-menu">
              {burgers.map((burger, index) => (
                <div key={index} className="burger-item">
                  <div className="burger-name-price">
                    <span className="burger-name">{burger.name}</span>
                    <span className="burger-price">{burger.price}€</span>
                  </div>
                  <div className="burger-description">{burger.description}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="menu-section">
            <h3 className="section-title">NOS TARTARES</h3>
            <div className="tartares-menu">
              {tartares.map((tartare, index) => (
                <div key={index} className="tartare-item">
                  <div className="tartare-name-price">
                    <span className="tartare-name">{tartare.name}</span>
                    <span className="tartare-price">{tartare.price}€</span>
                  </div>
                  <div className="tartare-description">{tartare.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BurgersPage; 