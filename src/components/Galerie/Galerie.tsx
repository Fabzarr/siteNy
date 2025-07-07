import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import './Galerie.css';
import { FaPlay, FaPause } from 'react-icons/fa';

const Galerie = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    // Marquer comme chargé après un court délai pour laisser le CSS s'appliquer
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const toggleVideo = (e?: React.MouseEvent) => {
    // Si l'événement vient du bouton, empêcher la propagation
    if (e) {
      e.stopPropagation();
    }
    
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const handleContainerClick = (e: React.MouseEvent) => {
    // Gérer le play/pause sur le clic
    toggleVideo();
    
    // Gérer l'affichage des contrôles
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    
    if (!isVideoPlaying) { // On va commencer la lecture
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 2500);
    }
  };

  const handleVideoEnded = () => {
    setIsVideoPlaying(false);
    setShowControls(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  // Note: Ces URLs devront être remplacées par les vraies images du restaurant
  const images = [
    { id: 1, alt: "Intérieur du restaurant", placeholder: "Restaurant", category: "interieur" },
    { id: 2, alt: "Bar et cocktails", placeholder: "Bar", category: "bar" },
    { id: 3, alt: "Espace karaoké", placeholder: "Karaoké", category: "karaoke" },
    { id: 4, alt: "Ambiance soirée", placeholder: "Soirée", category: "ambiance" },
    { id: 5, alt: "Plats signature", placeholder: "Cuisine", category: "cuisine" },
    { id: 6, alt: "Événements spéciaux", placeholder: "Événements", category: "evenements" },
  ];

  return (
    <div className="page-with-gallery">
      <AnimatePresence>
        {isLoaded && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="galerie-page-container">
              {/* Header fixe moderne comme CartePage */}
              <div className="galerie-header">
                <div className="galerie-header-left">
                  {/* Espace réservé pour équilibrer */}
                </div>
                <div className="galerie-header-center">
                  <h2>NOTRE GALERIE</h2>
                  <p>DÉCOUVREZ L'AMBIANCE & L'UNIVERS</p>
                </div>
                <div className="galerie-header-right">
                  {/* Espace réservé pour équilibrer */}
                </div>
              </div>

              {/* Section vidéo mise en avant avec le design moderne */}
              <div className="galerie-section video-section">
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <div className="section-header">
                    <h2>🎬 Restaurant • Bar • Karaoké</h2>
                  </div>
                  <div 
                    className={`video-container ${isVideoPlaying ? 'playing' : ''}`}
                    onClick={handleContainerClick}
                  >
                    <video 
                      ref={videoRef}
                      className="gallery-video"
                      poster="/images/video-poster.jpg"
                      preload="metadata"
                      onEnded={handleVideoEnded}
                      playsInline
                    >
                      <source 
                        src="https://video.wixstatic.com/video/20db43_7f2aee679e2748a99f85566bbded3cd4/480p/mp4/file.mp4" 
                        type="video/mp4" 
                      />
                      Votre navigateur ne supporte pas la lecture de vidéos.
                    </video>
                    <div 
                      className={`custom-video-controls ${showControls || !isVideoPlaying ? 'visible' : ''}`}
                      onClick={toggleVideo}
                    >
                      <button className="video-control-button" aria-label={isVideoPlaying ? 'Pause' : 'Play'}>
                        {isVideoPlaying ? <FaPause /> : <FaPlay />}
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Section images avec le même style que CartePage */}
              <div className="galerie-section images-section">
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <div className="section-header">
                    <h2>📸 Nos Espaces</h2>
                  </div>
                  <div className="galerie-grid">
                    {images.map((image, index) => (
                      <motion.div 
                        key={image.id} 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ 
                          duration: 0.3,
                          delay: 0.4 + (index * 0.1)
                        }}
                      >
                        <div className="galerie-item">
                          <div className="image-placeholder">
                            <span className="image-icon">
                              {image.category === 'interieur' && '🏛️'}
                              {image.category === 'bar' && '🍸'}
                              {image.category === 'karaoke' && '🎤'}
                              {image.category === 'ambiance' && '✨'}
                              {image.category === 'cuisine' && '🍽️'}
                              {image.category === 'evenements' && '🎉'}
                            </span>
                            <span className="image-text">{image.placeholder}</span>
                          </div>
                          <div className="image-overlay">
                            <p>{image.alt}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Section informations supplémentaires */}
              <div className="galerie-section info-section">
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                >
                  <div className="section-header">
                    <h2>ℹ️ Informations Pratiques</h2>
                  </div>
                  <div className="info-grid">
                    <div className="info-item">
                      <h3>📍 Adresse</h3>
                      <p>68 rue Mouffetard<br/>75005 Paris</p>
                    </div>
                    <div className="info-item">
                      <h3>🕐 Horaires</h3>
                      <p>Dimanche au jeudi : 16h00 - 2h00<br/>Vendredi & samedi : 16h00 - 5h00</p>
                    </div>
                    <div className="info-item">
                      <h3>📞 Réservation</h3>
                      <p>01 45 35 48 43<br/>06 03 60 02 29</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Galerie; 