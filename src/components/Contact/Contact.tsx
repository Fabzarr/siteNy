import React from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
  return (
    <motion.div 
      className="contact"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Contact</h2>
      <div className="contact-info">
        <div className="contact-card">
          <FaMapMarkerAlt className="contact-icon" />
          <h3>Adresse</h3>
          <p>68 rue Mouffetard</p>
          <p>75005 Paris</p>
          <p>Métro ligne 7 - Place Monge</p>
        </div>

        <div className="contact-card">
          <FaPhone className="contact-icon" />
          <h3>Téléphone</h3>
          <p>Fixe : 01 45 35 48 43</p>
          <p>Mobile : 06 03 60 02 29</p>
        </div>

        <div className="contact-card">
          <FaClock className="contact-icon" />
          <h3>Horaires</h3>
          <ul className="hours-list">
            <li>Dimanche au jeudi : 16h00 - 2h00</li>
            <li>Vendredi & samedi : 16h00 - 5h00</li>
            <li>Happy Hour : 16h00 - 21h00</li>
            <li>Karaoké : tous les jours dès 21h00</li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact; 