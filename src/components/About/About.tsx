import { motion } from 'framer-motion';
import './About.css';

const About = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="about">
      <div className="about-header">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Notre Histoire
        </motion.h1>
      </div>

      <div className="about-content container">
        <motion.div 
          className="about-section story"
          {...fadeInUp}
        >
          <h2>L'histoire du New York Café</h2>
          <p>
            Fondé en 2020, le New York Café est né de la passion de deux amis pour la culture américaine 
            et la musique. Situé au cœur du Quartier Latin, notre établissement combine l'élégance d'un 
            restaurant gastronomique, l'ambiance festive d'un bar new-yorkais et le divertissement unique 
            d'un karaoké professionnel.
          </p>
        </motion.div>

        <motion.div 
          className="about-section concept"
          {...fadeInUp}
          transition={{ delay: 0.2 }}
        >
          <h2>Notre Concept</h2>
          <p>
            Le New York Café réinvente l'expérience du karaoké en proposant un cadre sophistiqué où 
            la gastronomie rencontre le divertissement. Notre équipement audio haut de gamme, notre 
            carte de cocktails créatifs et notre cuisine fusion créent une expérience unique à Paris.
          </p>
        </motion.div>

        <motion.div 
          className="team-section"
          {...fadeInUp}
          transition={{ delay: 0.4 }}
        >
          <h2>Notre Équipe</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-photo chef"></div>
              <h3>Chef James Wilson</h3>
              <p>Chef exécutif, formé à New York</p>
            </div>
            <div className="team-member">
              <div className="member-photo bartender"></div>
              <h3>Lisa Chen</h3>
              <p>Mixologue en chef</p>
            </div>
            <div className="team-member">
              <div className="member-photo manager"></div>
              <h3>Thomas Martin</h3>
              <p>Directeur</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="values-section"
          {...fadeInUp}
          transition={{ delay: 0.6 }}
        >
          <h2>Nos Valeurs</h2>
          <div className="values-grid">
            <div className="value-item">
              <span className="value-icon">🌟</span>
              <h3>Excellence</h3>
              <p>Qualité irréprochable dans chaque aspect</p>
            </div>
            <div className="value-item">
              <span className="value-icon">🤝</span>
              <h3>Convivialité</h3>
              <p>Une ambiance chaleureuse et accueillante</p>
            </div>
            <div className="value-item">
              <span className="value-icon">🎵</span>
              <h3>Passion</h3>
              <p>L'amour de la musique et de la gastronomie</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About; 