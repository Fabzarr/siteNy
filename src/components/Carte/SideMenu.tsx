import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './SideMenu.css';

const SideMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
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

  // Mettre à jour la section active en fonction de l'URL
  useEffect(() => {
    const path = location.pathname.replace('/', '');
    
    // Correspondance exacte avec les pages spécifiques - même logique que handleNavigation
    const pathToSection: { [key: string]: string } = {
      'petites-faims': 'petites-faims',
      'a-partager': 'a-partager',
      'nos-pizzas': 'nos-pizzas',
      'nos-salades': 'nos-salades', 
      'nos-pates': 'nos-pates',
      'nos-burgers': 'nos-burgers',
      'nos-viandes': 'nos-viandes',
      'nos-desserts': 'nos-desserts',
      'carte-des-vins': 'carte-des-vins',
      'boissons': 'boissons'
    };

    if (pathToSection[path]) {
      // Si on est sur une page spécifique, définir la section active et arrêter là
      setActiveSection(pathToSection[path]);
      return; // Sortir immédiatement pour éviter la logique de scroll
    } else if (path === 'carte' || path === '') {
      // Sur la page carte principale, utiliser la même logique de détection que pour la navigation
      const detectActiveSection = () => {
        const navbarHeight = parseInt(getComputedStyle(document.documentElement)
          .getPropertyValue('--navbar-height').trim()) || 70;
        
        // Utiliser exactement les mêmes sections et dans le même ordre que handleNavigation
        const sections = [
          'petites-faims', 'a-partager', 'nos-pizzas', 'nos-salades', 
          'nos-pates', 'nos-burgers', 'nos-viandes', 'nos-desserts', 'carte-des-vins'
        ];
        
        let currentSection = null;
        let offset;
        
        if (window.innerWidth <= 768) {
          offset = navbarHeight + 220; // Mobile : même offset que handleNavigation
        } else {
          offset = navbarHeight + 100; // Desktop : même offset que handleNavigation
        }
        
        // Parcourir les sections pour trouver celle qui est visible
        for (const sectionId of sections) {
          const element = document.getElementById(sectionId);
          if (element) {
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            const scrollPosition = window.scrollY + offset;
            
            // Utiliser la même logique de positionnement que handleNavigation
            if (scrollPosition >= elementPosition - 50 && scrollPosition < elementPosition + element.offsetHeight) {
              currentSection = sectionId;
              break;
            }
          }
        }
        
        if (currentSection && currentSection !== activeSection) {
          setActiveSection(currentSection);
        }
      };

      window.addEventListener('scroll', detectActiveSection);
      detectActiveSection(); // Appel initial
      
      return () => window.removeEventListener('scroll', detectActiveSection);
    } else {
      setActiveSection(null);
    }
  }, [location.pathname]); // Retirer activeSection des dépendances pour éviter les boucles

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
    desserts_vins_boissons: [
      { id: 'nos-desserts', label: 'NOS DESSERTS' },
      { id: 'carte-des-vins', label: 'LA CARTE DES VINS' },
    ],
    boissons: [
      { id: 'softs', label: 'SOFTS & JUS DE FRUITS' },
      { id: 'eaux', label: 'EAUX' },
      { id: 'bieres', label: 'BIÈRES' },
      { id: 'aperitifs', label: 'APÉRITIFS' },
      { id: 'cocktails', label: 'COCKTAILS' },
    ],
  };

  const handleNavigation = (id: string) => {
    // FERMETURE IMMÉDIATE DE LA MODAL
    setIsOpen(false);
    document.body.classList.remove('menu-open');
    
    // FORCER LA FERMETURE VISUELLE DE LA MODAL
    const modalElement = document.querySelector('.side-menu');
    if (modalElement) {
      modalElement.classList.remove('open');
    }
    
    // Navigation après fermeture de la modal
    setTimeout(() => {
      const currentPath = location.pathname.replace('/', '');
      
      if (id === currentPath || 
          (id === 'petites-faims' && currentPath === 'petites-faims') ||
          (id === 'a-partager' && currentPath === 'a-partager') ||
          (id === 'nos-pizzas' && currentPath === 'nos-pizzas') ||
          (id === 'nos-salades' && currentPath === 'nos-salades') ||
          (id === 'nos-pates' && currentPath === 'nos-pates') ||
          (id === 'nos-burgers' && currentPath === 'nos-burgers') ||
          (id === 'nos-viandes' && currentPath === 'nos-viandes') ||
          (id === 'nos-desserts' && currentPath === 'nos-desserts') ||
          (id === 'carte-des-vins' && currentPath === 'carte-des-vins') ||
          (id === 'boissons' && currentPath === 'boissons')) {
        // Scroll vers le haut si on est déjà sur la bonne page
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        return;
      }

      // Pour les autres sections, naviguer vers la page appropriée
      if (id === 'boissons') {
        navigate('/boissons');
      } else {
        const element = document.getElementById(id);
        if (element) {
          const navbarHeight = parseInt(getComputedStyle(document.documentElement)
            .getPropertyValue('--navbar-height')
            .trim());
          
          let offset;
          if (window.innerWidth <= 768) {
            // Mobile : augmenter l'offset pour arriver pile sur le titre
            offset = navbarHeight + 220; // 220px pour mobile
          } else {
            // Desktop : ajuster l'offset pour correspondre au nouveau positionnement
            offset = navbarHeight + 100;
          }
          
          const elementPosition = element.getBoundingClientRect().top + window.scrollY;
          
          window.scrollTo({
            top: elementPosition - offset,
            behavior: 'smooth'
          });
        }
      }
    }, 10);
  };

  // Fonction simple pour toggle
  const toggleMenu = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    
    if (newIsOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
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
      <button className="mobile-menu-toggle" onClick={toggleMenu}>
        NAVIGATION MENU ▼
      </button>
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
            {menuStructure.desserts_vins_boissons.map((item) => (
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