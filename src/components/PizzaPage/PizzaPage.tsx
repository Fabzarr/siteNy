import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SideMenu from '../Carte/SideMenu';
import CloseButton from '../common/CloseButton';
import './PizzaPage.css';

// This interface will be used when we integrate with the backend
interface Pizza {
  id: string;
  name: string;
  price: number;
  description: string;
}

// Temporary data - will be replaced with API call
const initialPizzas: Pizza[] = [
  { id: "1", name: "Margherita", price: 9, description: "Tomato, mozzarella, basille" },
  { id: "2", name: "Regina", price: 11, description: "Tomato, ham, eirojons" },
  { id: "3", name: "Quattro Formaggi", price: 11, description: "Mozzarella, poronpola" },
  { id: "4", name: "Reine", price: 12, description: "Tomato, mozzarella, hamum, nustraions" },
  { id: "5", name: "Napolitaine", price: 10, description: "Tomato, mozzarella, hamum, et pictoions" },
  { id: "6", name: "Hawaienne", price: 11, description: "Tomato, mozzarella, iamum, et ainanas" },
  { id: "7", name: "Calzone", price: 12, description: "Tomato, mozzarella, jamum, cashews, caperes" },
  { id: "8", name: "Orientale", price: 12, description: "Tomato, mozzarella, salaimi, pimenti, pairans" },
  { id: "9", name: "Diavola", price: 12, description: "Tomato, mozzarella, sajisimi, salami" },
  { id: "10", name: "Paysanne", price: 11, description: "Tomato, mozzrella, bacon, oignons" },
  { id: "11", name: "4 Saisons", price: 12, description: "Tomato, mozzaella, hamum, mushr soms artichicots, alives" },
  { id: "12", name: "Capricciosa", price: 12, description: "Tomato, mozzarella, ham, mushroona, artichicots, olives" },
  { id: "13", name: "Sicilienne", price: 12, description: "Tomato, mozzarella ancholes, capers, ainons, olives" },
  { id: "14", name: "Romana", price: 10, description: "Tomato, mozzarella ancholes" },
  { id: "15", name: "Montanara", price: 12, description: "Tomato, mozzarella speek, muchrooms" },
  { id: "16", name: "Vegetariana", price: 11, description: "Tomato, mozzarella legumes" },
  { id: "17", name: "Parigina", price: 12, description: "Tomato, mozzarella namum, potates" },
  { id: "18", name: "Parma", price: 13, description: "Tomato, mozzarella, prosciutta, arugala" },
  { id: "19", name: "Bufala", price: 13, description: "Tomato, bufcella mozzarella, basil" },
  { id: "20", name: "Tonno", price: 11, description: "Tomato, mozzarella" },
  { id: "21", name: "Rustica", price: 12, description: "Tomato, mozzarella, bacon, petates, rogemarin" },
  { id: "22", name: "Gorgonzola", price: 11, description: "Tomato, mozzarella gorgonzala" },
  { id: "23", name: "Savoyarde", price: 13, description: "Crame traiche, mozzarella, potatoes, bacon" },
  { id: "24", name: "Marinara", price: 9, description: "Tomato, garlic oregano" },
  { id: "25", name: "Piccante", price: 12, description: "Tomato, mozzarella sauce spusage" },
  { id: "26", name: "Valenciana", price: 12, description: "Tomato, mozzarella chicken, olgnerons" }
];

const PizzaPage: React.FC = () => {
  const [pizzas, setPizzas] = useState<Pizza[]>(initialPizzas);

  // This will be used when we integrate with the backend
  useEffect(() => {
    // Future API call will go here
    // const fetchPizzas = async () => {
    //   try {
    //     const response = await fetch('/api/pizzas');
    //     const data = await response.json();
    //     setPizzas(data);
    //   } catch (error) {
    //     console.error('Error fetching pizzas:', error);
    //   }
    // };
    // fetchPizzas();
  }, []);

  return (
    <div className="page-with-menu">
      <SideMenu />
      <CloseButton />
      <motion.div 
        className="pizza-page-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="pizza-menu-card">
          <div className="pizza-header">
            <h1>New York Café</h1>
            <h2>PIZZAS</h2>
          </div>

          <div className="pizza-menu">
            {pizzas.map((pizza) => (
              <div key={pizza.id} className="pizza-item">
                <div className="pizza-name-price">
                  <span className="pizza-name">{pizza.name}</span>
                  <span className="pizza-price">{pizza.price}€</span>
                </div>
                <div className="pizza-description">{pizza.description}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PizzaPage; 