import React from 'react';
import { motion } from 'framer-motion';
import SideMenu from '../Carte/SideMenu';
import CloseButton from '../common/CloseButton';
import './PizzaPage.css';

const pizzas = [
  { name: "Margherita", price: 9, description: "Tomato, mozzarella, basille" },
  { name: "Regina", price: 11, description: "Tomato, ham, eirojons" },
  { name: "Quattro Formaggi", price: 11, description: "Mozzarella, poronpola" },
  { name: "Reine", price: 12, description: "Tomato, mozzarella, hamum, nustraions" },
  { name: "Napolitaine", price: 10, description: "Tomato, mozzarella, hamum, et pictoions" },
  { name: "Hawaienne", price: 11, description: "Tomato, mozzarella, iamum, et ainanas" },
  { name: "Calzone", price: 12, description: "Tomato, mozzarella, jamum, cashews, caperes" },
  { name: "Orientale", price: 12, description: "Tomato, mozzarella, salaimi, pimenti, pairans" },
  { name: "Diavola", price: 12, description: "Tomato, mozzarella, sajisimi, salami" },
  { name: "Paysanne", price: 11, description: "Tomato, mozzrella, bacon, oignons" },
  { name: "4 Saisons", price: 12, description: "Tomato, mozzaella, hamum, mushr soms artichicots, alives" },
  { name: "Capricciosa", price: 12, description: "Tomato, mozzarella, ham, mushroona, artichicots, olives" },
  { name: "Sicilienne", price: 12, description: "Tomato, mozzarella ancholes, capers, ainons, olives" },
  { name: "Romana", price: 10, description: "Tomato, mozzarella ancholes" },
  { name: "Montanara", price: 12, description: "Tomato, mozzarella speek, muchrooms" },
  { name: "Vegetariana", price: 11, description: "Tomato, mozzarella legumes" },
  { name: "Parigina", price: 12, description: "Tomato, mozzarella namum, potates" },
  { name: "Parma", price: 13, description: "Tomato, mozzarella, prosciutta, arugala" },
  { name: "Bufala", price: 13, description: "Tomato, bufcella mozzarella, basil" },
  { name: "Tonno", price: 11, description: "Tomato, mozzarella" },
  { name: "Rustica", price: 12, description: "Tomato, mozzarella, bacon, petates, rogemarin" },
  { name: "Gorgonzola", price: 11, description: "Tomato, mozzarella gorgonzala" },
  { name: "Savoyarde", price: 13, description: "Crame traiche, mozzarella, potatoes, bacon" },
  { name: "Marinara", price: 9, description: "Tomato, garlic oregano" },
  { name: "Piccante", price: 12, description: "Tomato, mozzarella sauce spusage" },
  { name: "Valenciana", price: 12, description: "Tomato, mozzarella chicken, olgnerons" }
];

const PizzaPage: React.FC = () => {
  const column1 = pizzas.slice(0, 9);
  const column2 = pizzas.slice(9, 18);
  const column3 = pizzas.slice(18);

  return (
    <div className="page-with-menu">
      <SideMenu />
      <CloseButton />
      <motion.div 
        className="pizza-page-container"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="pizza-menu-card">
          <div className="pizza-header">
            <h1>New York Café</h1>
            <h2>PIZZAS</h2>
          </div>

          <div className="pizza-menu">
            <div className="menu-column">
              {column1.map((pizza, index) => (
                <div key={index} className="pizza-item">
                  <div className="pizza-name-price">
                    <span className="pizza-name">{pizza.name}</span>
                    <span className="pizza-price">{pizza.price}€</span>
                  </div>
                  <div className="pizza-description">{pizza.description}</div>
                </div>
              ))}
            </div>

            <div className="menu-column">
              {column2.map((pizza, index) => (
                <div key={index} className="pizza-item">
                  <div className="pizza-name-price">
                    <span className="pizza-name">{pizza.name}</span>
                    <span className="pizza-price">{pizza.price}€</span>
                  </div>
                  <div className="pizza-description">{pizza.description}</div>
                </div>
              ))}
            </div>

            <div className="menu-column">
              {column3.map((pizza, index) => (
                <div key={index} className="pizza-item">
                  <div className="pizza-name-price">
                    <span className="pizza-name">{pizza.name}</span>
                    <span className="pizza-price">{pizza.price}€</span>
                  </div>
                  <div className="pizza-description">{pizza.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PizzaPage; 