import { motion } from 'framer-motion';
import { FaMicrophone, FaMusic, FaStar, FaClock, FaUsers, FaGlassCheers } from 'react-icons/fa';
import './Karaoke.css';

const Karaoke = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="karaoke">
      <motion.div 
        className="karaoke-header"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Notre Karaoké</h1>
        <p className="subtitle">Une expérience musicale unique à Paris</p>
      </motion.div>

      <div className="karaoke-content container">
        <motion.section 
          className="system-info"
          {...fadeInUp}
        >
          <h2>Équipement Professionnel</h2>
          <div className="features-grid">
            <div className="feature-item">
              <FaMicrophone className="icon" />
              <h3>Micros Pro</h3>
              <p>Micros Shure SM58 pour une qualité studio</p>
            </div>
            <div className="feature-item">
              <FaMusic className="icon" />
              <h3>Catalogue</h3>
              <p>Plus de 50,000 titres en français et en anglais</p>
            </div>
            <div className="feature-item">
              <FaStar className="icon" />
              <h3>Son Premium</h3>
              <p>Système audio JBL professionnel</p>
            </div>
          </div>
        </motion.section>

        <motion.section 
          className="horaires-tarifs"
          {...fadeInUp}
          transition={{ delay: 0.2 }}
        >
          <div className="horaires">
            <h2>Horaires</h2>
            <div className="horaires-grid">
              <div className="horaire-item">
                <FaClock className="icon" />
                <h3>Mercredi - Jeudi</h3>
                <p>19h00 - 01h00</p>
              </div>
              <div className="horaire-item">
                <FaUsers className="icon" />
                <h3>Vendredi - Samedi</h3>
                <p>19h00 - 02h00</p>
              </div>
              <div className="horaire-item">
                <FaGlassCheers className="icon" />
                <h3>Dimanche</h3>
                <p>17h00 - 00h00</p>
              </div>
            </div>
          </div>

          <div className="tarifs">
            <h2>Nos Formules</h2>
            <div className="tarifs-grid">
              <div className="tarif-card">
                <h3>À la chanson</h3>
                <div className="price">2€</div>
                <p>Par chanson</p>
                <ul>
                  <li>Choix illimité de titres</li>
                  <li>Sans réservation</li>
                  <li>Micro professionnel</li>
                </ul>
              </div>
              <div className="tarif-card featured">
                <h3>Forfait Soirée</h3>
                <div className="price">15€</div>
                <p>Par personne</p>
                <ul>
                  <li>Chansons illimitées</li>
                  <li>1 cocktail offert</li>
                  <li>Accès prioritaire</li>
                </ul>
              </div>
              <div className="tarif-card">
                <h3>Privatisation</h3>
                <div className="price">Sur devis</div>
                <p>Groupe & Entreprise</p>
                <ul>
                  <li>Salle privée</li>
                  <li>Formules sur mesure</li>
                  <li>Service dédié</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section 
          className="reservation-info"
          {...fadeInUp}
          transition={{ delay: 0.4 }}
        >
          <h2>Réservation</h2>
          <p>Pour garantir la meilleure expérience possible, nous vous conseillons de réserver votre table à l'avance, particulièrement les vendredis et samedis soirs.</p>
          <div className="contact-buttons">
            <a href="tel:+33123456789" className="contact-button phone">
              01 23 45 67 89
            </a>
            <a href="mailto:contact@newyorkcafe.fr" className="contact-button email">
              contact@newyorkcafe.fr
            </a>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Karaoke; 