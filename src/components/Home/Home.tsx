import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaMusic, FaCocktail, FaUtensils, FaCalendarAlt } from 'react-icons/fa';
import { useState } from 'react';
import ReservationModal from '../Reservation/ReservationModal';
import './Home.css';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="home">
      <motion.section 
        className="hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="hero-content">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Bienvenue au New York Café
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Laissez-vous tenter par notre cuisine italienne authentique. Nos excellentes salades et nos pizzas réservent de belles surprises, même à nos visiteurs les plus exigeants.
          </motion.p>
          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Link to="/carte" className="btn primary">Découvrir notre carte</Link>
            <button onClick={() => setIsModalOpen(true)} className="btn secondary">Réserver une table</button>
          </motion.div>
        </div>
      </motion.section>

      <motion.section 
        className="features"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="feature-card" variants={itemVariants}>
          <FaUtensils className="feature-icon" />
          <h3>Restaurant</h3>
          <p>Une cuisine italienne authentique avec des produits de qualité</p>
          <Link to="/carte" className="feature-link">Voir la carte</Link>
        </motion.div>

        <motion.div className="feature-card" variants={itemVariants}>
          <FaCocktail className="feature-icon" />
          <h3>Bar & Cocktails</h3>
          <p>Une carte de cocktails créatifs et une sélection de spiritueux premium</p>
          <Link to="/boissons" className="feature-link">Voir les boissons</Link>
        </motion.div>

        <motion.div className="feature-card" variants={itemVariants}>
          <FaMusic className="feature-icon" />
          <h3>Karaoké</h3>
          <p>Plus de 50 000 titres disponibles dans notre espace karaoké privatif</p>
          <Link to="/karaoke" className="feature-link">En savoir plus</Link>
        </motion.div>

        <motion.div className="feature-card" variants={itemVariants}>
          <FaCalendarAlt className="feature-icon" />
          <h3>Événements</h3>
          <p>Des soirées à thème et des événements spéciaux tout au long de l'année</p>
          <Link to="/evenements" className="feature-link">Voir le programme</Link>
        </motion.div>
      </motion.section>

      <section className="about-preview">
        <div className="about-content">
          <motion.div 
            className="about-text"
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2>Une expérience unique</h2>
            <p>
              Le New York Café vous transporte dans l'ambiance des bars new-yorkais 
              tout en conservant le charme et l'élégance parisienne. Un lieu où la 
              musique, la gastronomie et la convivialité se rencontrent.
            </p>
            <Link to="/a-propos" className="btn secondary">En savoir plus</Link>
          </motion.div>
          <motion.div 
            className="about-image"
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Image placeholder */}
          </motion.div>
        </div>
      </section>

      <ReservationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Home; 