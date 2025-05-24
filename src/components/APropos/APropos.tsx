import React from 'react';
import { motion } from 'framer-motion';
import './APropos.css';

const APropos = () => {
  return (
    <motion.div 
      className="a-propos"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2>À Propos du New York Café</h2>
      <div className="a-propos-content">
        <div className="history-section">
          <h3>Notre Histoire</h3>
          <p>Depuis 1985, le New York Café est un établissement incontournable du karaoké parisien. Situé au cœur du quartier Latin, dans la pittoresque rue Mouffetard, nous vous accueillons tous les jours dans une ambiance chaleureuse et conviviale.</p>
        </div>

        <div className="history-section">
          <h3>Notre Concept</h3>
          <p>Le New York Café vous propose une expérience unique combinant :</p>
          <ul>
            <li>Un restaurant italien authentique avec pizzas au four et desserts maison</li>
            <li>Un pub musical avec une carte de cocktails premium</li>
            <li>Une scène de karaoké professionnelle ouverte tous les soirs</li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default APropos; 