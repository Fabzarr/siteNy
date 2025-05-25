import React from 'react';
import { motion } from 'framer-motion';
import SideMenu from '../Carte/SideMenu';
import './SaladesPage.css';

const salades = [
  { 
    name: "Salade César", 
    price: 14, 
    description: "Laitue romaine, poulet grillé, croûtons maison, parmesan, sauce César traditionnelle"
  },
  { 
    name: "Salade Niçoise", 
    price: 15, 
    description: "Thon mi-cuit, haricots verts, tomates, œufs, olives noires, anchois, vinaigrette balsamique"
  },
  { 
    name: "Salade de Chèvre Chaud", 
    price: 13, 
    description: "Mesclun, toasts de chèvre chaud au miel, noix, lardons, pommes"
  },
  { 
    name: "Salade Méditerranéenne", 
    price: 14, 
    description: "Roquette, mozzarella di bufala, tomates séchées, olives Kalamata, pesto maison"
  },
  { 
    name: "Salade Thaï au Bœuf", 
    price: 16, 
    description: "Bœuf mariné, nouilles de riz, mangue, coriandre, cacahuètes, sauce asiatique"
  },
  { 
    name: "Salade Quinoa Veggie", 
    price: 13, 
    description: "Quinoa, avocat, pois chiches, grenade, épinards, vinaigrette citron-cumin"
  },
  { 
    name: "Salade de Saumon Fumé", 
    price: 16, 
    description: "Saumon fumé, avocat, fenouil, agrumes, aneth, vinaigrette aux agrumes"
  },
  { 
    name: "Salade Périgourdine", 
    price: 17, 
    description: "Mesclun, magret fumé, gésiers confits, foie gras, noix, vinaigrette à la truffe"
  },
  { 
    name: "Salade Grecque", 
    price: 13, 
    description: "Tomates, concombre, poivrons, feta, olives Kalamata, oignons rouges, origan"
  },
  { 
    name: "Salade de Crevettes", 
    price: 15, 
    description: "Crevettes marinées, avocat, mangue, jeunes pousses, vinaigrette passion"
  },
  { 
    name: "Salade d'Automne", 
    price: 14, 
    description: "Poires, roquefort, noix caramélisées, endives, vinaigrette au miel"
  },
  { 
    name: "Salade Asiatique au Poulet", 
    price: 14, 
    description: "Poulet teriyaki, chou chinois, carottes, edamame, sésame, vinaigrette gingembre"
  }
];

const SaladesPage: React.FC = () => {
  const column1 = salades.slice(0, 4);
  const column2 = salades.slice(4, 8);
  const column3 = salades.slice(8);

  return (
    <div className="page-with-menu">
      <SideMenu />
      <motion.div 
        className="salades-page-container"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="salades-menu-card">
          <div className="salades-header">
            <h1>New York Café</h1>
            <h2>NOS BELLES SALADES</h2>
            <p className="subtitle">Fraîcheur & Saveurs</p>
          </div>

          <div className="salades-menu">
            <div className="menu-column">
              {column1.map((salade, index) => (
                <div key={index} className="salade-item">
                  <div className="salade-name-price">
                    <span className="salade-name">{salade.name}</span>
                    <span className="salade-price">{salade.price}€</span>
                  </div>
                  <div className="salade-description">{salade.description}</div>
                </div>
              ))}
            </div>

            <div className="menu-column">
              {column2.map((salade, index) => (
                <div key={index} className="salade-item">
                  <div className="salade-name-price">
                    <span className="salade-name">{salade.name}</span>
                    <span className="salade-price">{salade.price}€</span>
                  </div>
                  <div className="salade-description">{salade.description}</div>
                </div>
              ))}
            </div>

            <div className="menu-column">
              {column3.map((salade, index) => (
                <div key={index} className="salade-item">
                  <div className="salade-name-price">
                    <span className="salade-name">{salade.name}</span>
                    <span className="salade-price">{salade.price}€</span>
                  </div>
                  <div className="salade-description">{salade.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SaladesPage; 