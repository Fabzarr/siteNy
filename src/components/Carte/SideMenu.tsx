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

  // Fonction utilitaire pour calculer l'offset en fonction de la taille d'écran
  const getOffset = () => {
    const navbarHeight = parseInt(getComputedStyle(document.documentElement)
      .getPropertyValue('--navbar-height')
      .trim());
    
    return window.innerWidth <= 768 ? navbarHeight + 141 : navbarHeight + 20;
  };

  // Fonction pour vérifier quelle section est visible
  const checkVisibleSection = () => {
    const navbarHeight = parseInt(getComputedStyle(document.documentElement)
      .getPropertyValue('--navbar-height')
      .trim());
    
    let offset;
    if (window.innerWidth <= 768) {
      offset = navbarHeight + 141;
    } else {
      offset = navbarHeight + 20;
    }

    // Obtenir tous les IDs des sections dans l'ordre
    const allSections = [
      ...menuStructure.entrées,
      ...menuStructure.plats,
      ...menuStructure.desserts_vins_boissons,
      ...menuStructure.boissons,
    ].map(item => item.id);

    // Obtenir toutes les sections avec leurs positions
    const sectionPositions = allSections.map(id => {
      const element = document.getElementById(id);
      if (!element) return null;
      return {
        id,
        top: element.offsetTop - offset
      };
    }).filter(Boolean);

    // Position actuelle du scroll
    const scrollPosition = window.scrollY;

    // Trouver la section active
    let activeId = allSections[0];
    
    for (let i = 0; i < sectionPositions.length; i++) {
      const current = sectionPositions[i];
      const next = sectionPositions[i + 1];
      
      if (current && scrollPosition >= current.top) {
        if (!next || scrollPosition < next.top) {
          activeId = current.id;
          break;
        }
      }
    }

    // Si on est tout en haut de la page
    if (scrollPosition === 0) {
      activeId = allSections[0];
    }

    // Si on est tout en bas de la page
    if (scrollPosition + window.innerHeight >= document.documentElement.scrollHeight) {
      activeId = allSections[allSections.length - 1];
    }

    setActiveSection(activeId);
  };

  // Ajouter un effet pour mettre à jour la section active lors du défilement
  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(checkVisibleSection);
    };

    window.addEventListener('scroll', handleScroll);
    // Vérifier la section visible au chargement
    checkVisibleSection();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavigation = (id: string) => {
    setIsOpen(false);
    
    // Si nous sommes sur la page des boissons et que l'ID correspond à une section de boissons
    if (location.pathname === '/boissons' && menuStructure.boissons.some(item => item.id === id)) {
      const element = document.getElementById(id);
      if (element) {
        const navbarHeight = parseInt(getComputedStyle(document.documentElement)
          .getPropertyValue('--navbar-height')
          .trim());
        
        let offset;
        if (window.innerWidth <= 768) {
          offset = navbarHeight + 141;
        } else {
          offset = navbarHeight + 20;
        }
        
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        
        window.scrollTo({
          top: elementPosition - offset,
          behavior: 'smooth'
        });
      }
      return;
    }

    // Si on clique sur le lien de la page actuelle, scroll vers le haut
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
          offset = navbarHeight + 141;
        } else {
          offset = navbarHeight + 20;
        }
        
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        
        const isLastSection = id === 'carte-des-vins';
        
        if (isLastSection && window.innerWidth <= 768) {
          const viewportHeight = window.innerHeight;
          const elementHeight = element.offsetHeight;
          const footerHeight = 100;
          
          const scrollPosition = Math.min(
            elementPosition - offset,
            document.documentElement.scrollHeight - viewportHeight - footerHeight
          );
          
          window.scrollTo({
            top: scrollPosition,
            behavior: 'smooth'
          });
        } else {
          window.scrollTo({
            top: elementPosition - offset,
            behavior: 'smooth'
          });
        }
      }
    }
  };

  // Gérer l'ouverture/fermeture du menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
    // Ajouter/retirer la classe menu-open sur le body
    if (!isOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  };

  // Nettoyer la classe menu-open quand le composant est démonté
  useEffect(() => {
    return () => {
      document.body.classList.remove('menu-open');
    };
  }, []);

  return (
    <>
      <button className="mobile-menu-toggle" onClick={() => setIsOpen(!isOpen)}>
        Menu Navigation
        <span className={`arrow ${isOpen ? 'up' : 'down'}`}></span>
      </button>
      <div className={`side-menu ${isOpen ? 'open' : ''}`}>
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