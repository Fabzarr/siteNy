import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './SideMenu.css';

const SideMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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
                className="menu-button"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="menu-section">
            <h3 className="section-title">Plats</h3>
            {menuStructure.plats.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className="menu-button"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="menu-section">
            <h3 className="section-title">Desserts & Vins</h3>
            {menuStructure.desserts_vins_boissons.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className="menu-button"
              >
                {item.label}
              </button>
            ))}
          </div>

          {location.pathname === '/boissons' && (
            <div className="menu-section">
              <h3 className="section-title">Boissons</h3>
              {menuStructure.boissons.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.id)}
                  className="menu-button"
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SideMenu; 