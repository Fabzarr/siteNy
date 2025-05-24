import React from 'react';
import { motion } from 'framer-motion';
import './Evenements.css';

const Evenements = () => {
  const evenements = [
    {
      id: 1,
      titre: "Saint-Valentin 2024",
      date: "14 février",
      description: "Soirée spéciale en amoureux avec menu spécial et karaoké romantique. Réservation conseillée.",
    },
    {
      id: 2,
      titre: "Fête de la Musique",
      date: "21 juin",
      description: "Grande soirée karaoké spéciale avec animations et surprises. Entrée libre.",
    },
    {
      id: 3,
      titre: "Soirée du Nouvel An",
      date: "31 décembre",
      description: "Célébrez le Nouvel An avec nous ! Menu festif, karaoké et cotillons jusqu'au bout de la nuit.",
    },
  ];

  return (
    <motion.div 
      className="evenements"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Événements Spéciaux</h2>
      <p className="description">Découvrez nos soirées à thème et événements spéciaux</p>

      <div className="evenements-grid">
        {evenements.map((event) => (
          <motion.div 
            key={event.id}
            className="evenement-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: event.id * 0.1 }}
          >
            <div className="evenement-content">
              <h3>{event.titre}</h3>
              <div className="date">{event.date}</div>
              <p>{event.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="info-reservation">
        <h3>Réservations et Informations</h3>
        <p>Pour plus d'informations sur nos événements ou pour réserver :</p>
        <ul>
          <li>Téléphone : 01 45 35 48 43</li>
          <li>Mobile : 06 03 60 02 29</li>
          <li>Sur place : 68 rue Mouffetard, 75005 Paris</li>
        </ul>
      </div>
    </motion.div>
  );
};

export default Evenements; 