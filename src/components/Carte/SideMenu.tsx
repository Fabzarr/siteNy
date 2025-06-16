import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './SideMenu.css';

interface SideMenuProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ isOpen, toggleMenu }) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();
  const location = useLocation();

  // Détecter si on est en version mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Détection de section active - Version unifiée et simplifiée
  useEffect(() => {
    const path = location.pathname.replace('/', '');
    
    // Pages spécifiques
    const pathToSection: { [key: string]: string } = {
      'petites-faims': 'petites-faims',
      'a-partager': 'a-partager',
      'nos-pizzas': 'nos-pizzas',
      'nos-salades': 'nos-salades', 
      'nos-pates': 'nos-pates',
      'nos-burgers': 'nos-burgers',
      'nos-viandes': 'nos-viandes',
      'nos-desserts': 'nos-desserts',
      'carte-des-vins': 'carte-des-vins'
    };

    if (pathToSection[path]) {
      setActiveSection(pathToSection[path]);
      return;
    }
    
    // Page carte principale - Logique unifiée pour desktop et mobile
    if (path === 'carte' || path === '') {
      const sections = [
        'petites-faims', 'a-partager', 'nos-pizzas', 'nos-salades', 
        'nos-pates', 'nos-burgers', 'nos-viandes', 'nos-desserts', 'carte-des-vins'
      ];
      
      const detectActiveSection = () => {
        const offset = window.innerWidth <= 768 ? 250 : 180;
        const scrollPosition = window.scrollY;
        
        for (const sectionId of sections) {
          const element = document.getElementById(sectionId);
          if (element) {
            const rect = element.getBoundingClientRect();
            const elementPosition = rect.top + window.scrollY;
            
            if (scrollPosition + offset >= elementPosition - 50 && 
                scrollPosition + offset < elementPosition + rect.height) {
              setActiveSection(sectionId);
              return;
            }
          }
        }
        
        // Fallback: si en haut de page, activer la première section
        if (scrollPosition < 200) {
          setActiveSection('petites-faims');
        }
      };

      // Initialisation avec retry
      let retryCount = 0;
      const initDetection = () => {
        const firstElement = document.getElementById('petites-faims');
        if (firstElement || retryCount > 10) {
          detectActiveSection();
          window.addEventListener('scroll', detectActiveSection, { passive: true });
        } else {
          retryCount++;
          setTimeout(initDetection, 100);
        }
      };

      setTimeout(initDetection, 50);
      
      return () => {
        window.removeEventListener('scroll', detectActiveSection);
      };
    } else {
      setActiveSection(null);
    }
  }, [location.pathname]);

  const menuStructure = {
    entrées: [
      { id: 'petites-faims', label: 'PETITES FAIMS' },
      { id: 'a-partager', label: 'A PARTAGER' },
    ],
    plats: [
      { id: 'nos-pizzas', label: 'NOS PIZZAS' },
      { id: 'nos-salades', label: 'NOS BELLES SALADES' },
      { id: 'nos-pates', label: 'NOS PÂTES' },
      { id: 'nos-burgers', label: 'NOS HAMBURGERS & TARTARE' },
      { id: 'nos-viandes', label: 'NOS VIANDES & POISSON' },
    ],
    desserts_vins: [
      { id: 'nos-desserts', label: 'NOS DESSERTS' },
      { id: 'carte-des-vins', label: 'LA CARTE DES VINS' },
    ],
  };

  const handleNavigation = (id: string) => {
    // Fermeture du menu mobile seulement
    if (isOpen && isMobile) {
      toggleMenu();
      document.body.classList.remove('menu-open');
      
      const modalElement = document.querySelector('.side-menu');
      if (modalElement) {
        modalElement.classList.remove('open');
      }
    }
    
    // Scroll vers la section
    const element = document.getElementById(id);
    
    if (element) {
      const offset = window.innerWidth <= 768 ? 250 : 180;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY - offset;
      
      window.scrollTo({
        top: Math.max(0, elementPosition),
        behavior: 'smooth'
      });
    }
  };

  // Nettoyer au démontage
  useEffect(() => {
    return () => {
      document.body.classList.remove('menu-open');
    };
  }, []);

  return (
    <>
      {/* Overlay pour mobile */}
      {isOpen && isMobile && (
        <div 
          className="menu-overlay" 
          onClick={toggleMenu}
        />
      )}
      
      {/* Menu latéral */}
      <div className={`side-menu ${isOpen ? 'open' : ''}`}>
        {/* Bouton de fermeture - Style du formulaire de réservation */}
        <button className="close-menu-btn" onClick={toggleMenu} aria-label="Fermer le menu">
          ×
        </button>
        
        <div className="menu-title">Notre Carte</div>
        <div className="menu-sections">
          <div className="menu-section">
            <h3 className="section-title">Entrées</h3>
            {menuStructure.entrées.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className={`menu-button ${activeSection === item.id ? 'active' : ''}`}
                data-section-id={item.id}
              >
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <div className="menu-section">
            <h3 className="section-title">Plats</h3>
            {menuStructure.plats.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className={`menu-button ${activeSection === item.id ? 'active' : ''}`}
                data-section-id={item.id}
              >
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <div className="menu-section">
            <h3 className="section-title">Desserts & Vins</h3>
            {menuStructure.desserts_vins.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className={`menu-button ${activeSection === item.id ? 'active' : ''}`}
                data-section-id={item.id}
              >
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SideMenu;