import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './Carte.css';

const Carte = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category: string) => {
    if (category === 'NOS PIZZAS') {
      navigate('/nos-pizzas');
    } else {
      // Pour les autres catégories, on peut ajouter la logique plus tard
      alert('Cette section sera bientôt disponible !');
    }
  };

  return (
    <motion.div 
      className="carte"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Notre Carte</h2>

      <div className="menu-buttons">
        <button onClick={() => handleCategoryClick('NOS PIZZAS')}>NOS PIZZAS</button>
        <button onClick={() => handleCategoryClick('PETITES FAIMS')}>PETITES FAIMS</button>
        <button onClick={() => handleCategoryClick('A PARTAGER')}>A PARTAGER</button>
        <button onClick={() => handleCategoryClick('NOS BELLES SALADES')}>NOS BELLES SALADES</button>
        <button onClick={() => handleCategoryClick('NOS PATES')}>NOS PATES</button>
        <button onClick={() => handleCategoryClick('NOS HAMBURGERS & TARTARE')}>NOS HAMBURGERS & TARTARE</button>
        <button onClick={() => handleCategoryClick('NOS VIANDES & POISSON')}>NOS VIANDES & POISSON</button>
        <button onClick={() => handleCategoryClick('NOS DESSERTS')}>NOS DESSERTS</button>
        <button onClick={() => handleCategoryClick('LA CARTE DES VINS')}>LA CARTE DES VINS</button>
      </div>
    </motion.div>
  );
};

export default Carte; 