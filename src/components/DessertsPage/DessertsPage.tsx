import React from 'react';
import { motion } from 'framer-motion';
import SideMenu from '../Carte/SideMenu';
import CloseButton from '../common/CloseButton';
import './DessertsPage.css';

const desserts = [
  { 
    name: "Tiramisu Maison", 
    price: 8, 
    description: "Le classique italien revisité, biscuits imbibés au café, crème mascarpone onctueuse, cacao amer"
  },
  { 
    name: "New York Cheesecake", 
    price: 9, 
    description: "Notre spécialité, servi avec coulis de fruits rouges et fruits frais de saison"
  },
  { 
    name: "Fondant au Chocolat", 
    price: 9, 
    description: "Cœur coulant au chocolat noir 70%, glace vanille bourbon, éclats de noisettes caramélisées"
  },
  { 
    name: "Crème Brûlée", 
    price: 8, 
    description: "À la vanille de Madagascar, caramélisée au sucre roux"
  },
  { 
    name: "Tarte Tatin", 
    price: 9, 
    description: "Pommes caramélisées, pâte feuilletée maison, crème fraîche d'Isigny"
  },
  { 
    name: "Profiteroles", 
    price: 10, 
    description: "Choux croustillants, glace vanille, sauce chocolat chaud, amandes effilées"
  },
  { 
    name: "Café Gourmand", 
    price: 10, 
    description: "Expresso et assortiment de mini desserts maison (4 pièces)"
  },
  { 
    name: "Pavlova aux Fruits", 
    price: 9, 
    description: "Meringue croustillante, crème légère, fruits frais, coulis passion"
  },
  { 
    name: "Mousse au Chocolat", 
    price: 8, 
    description: "Chocolat noir intense, crumble cacao, chantilly maison"
  },
  { 
    name: "Coupe Glacée New York", 
    price: 10, 
    description: "Glace cookie, brownies, sauce caramel, chantilly, éclats de noix de pécan"
  },
  { 
    name: "Tarte au Citron Meringuée", 
    price: 8, 
    description: "Crème de citron, meringue italienne, zestes confits"
  },
  { 
    name: "Assiette de Fromages", 
    price: 12, 
    description: "Sélection de fromages affinés, fruits secs, confiture de figues, pain aux noix"
  }
];

const DessertsPage: React.FC = () => {
  return (
    <div className="page-with-menu">
      <SideMenu />
      <CloseButton />
      <motion.div 
        className="desserts-page-container"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
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
                  className="dessert-item"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="dessert-name-price">
                    <span className="dessert-name">{dessert.name}</span>
                    <span className="dessert-price">{dessert.price}€</span>
                  </div>
                  <div className="dessert-description">{dessert.description}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DessertsPage; 