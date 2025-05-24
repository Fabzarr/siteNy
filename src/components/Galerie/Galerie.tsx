import { motion } from 'framer-motion';
import './Galerie.css';

const Galerie = () => {
  // Note: Ces URLs devront être remplacées par les vraies images du restaurant
  const images = [
    { id: 1, alt: "Intérieur du restaurant", placeholder: "Restaurant" },
    { id: 2, alt: "Bar et cocktails", placeholder: "Bar" },
    { id: 3, alt: "Espace karaoké", placeholder: "Karaoké" },
    { id: 4, alt: "Ambiance soirée", placeholder: "Soirée" },
    { id: 5, alt: "Plats signature", placeholder: "Cuisine" },
    { id: 6, alt: "Événements spéciaux", placeholder: "Événements" },
  ];

  return (
    <motion.div 
      className="galerie"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1>Notre Galerie</h1>
      <div className="galerie-grid">
        {images.map((image) => (
          <div key={image.id} className="galerie-item">
            <div className="image-placeholder">
              {image.placeholder}
            </div>
            <p>{image.alt}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Galerie; 