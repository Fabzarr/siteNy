import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useScrollToTop } from '../../hooks/useScrollToTop';
import { useModal } from '../../context/ModalContext';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const scrollToTop = useScrollToTop();
  const { closeModal } = useModal();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Gérer le scroll du body quand le menu est ouvert/fermé
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }

    // Nettoyer au démontage
    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [isOpen]);

  const handleNavClick = (path: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    closeModal();
    
    // Fermer le menu hamburger principal
    setIsOpen(false);
    
    // Fermer le side menu mobile pour toutes les navigations
    const sideMenu = document.querySelector('.side-menu') as HTMLElement;
    if (sideMenu) {
      sideMenu.classList.remove('open');
    }
    document.body.classList.remove('menu-open');
    
    scrollToTop();
    navigate(path);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-logo" onClick={handleNavClick('/')}>
          <img 
            src="/images/karaoke-logo.png" 
            alt="Karaoke Logo" 
            className="navbar-logo-icon"
          />
          NEW YORK CAFÉ
        </Link>
      </div>
      <div className={`navbar-menu ${isOpen ? 'open' : ''}`}>
        <Link to="/" className={location.pathname === '/' ? 'active' : ''} onClick={handleNavClick('/')}>
          ACCUEIL
        </Link>
        <Link to="/carte" className={location.pathname === '/carte' ? 'active' : ''} onClick={handleNavClick('/carte')}>
          CARTE
        </Link>
        <Link to="/menu" className={location.pathname === '/menu' ? 'active' : ''} onClick={handleNavClick('/menu')}>
          MENU
        </Link>
        <Link to="/boissons" className={location.pathname === '/boissons' ? 'active' : ''} onClick={handleNavClick('/boissons')}>
          BOISSONS
        </Link>
        <Link to="/karaoke" className={location.pathname === '/karaoke' ? 'active' : ''} onClick={handleNavClick('/karaoke')}>
          KARAOKÉ
        </Link>
        <Link to="/galerie" className={location.pathname === '/galerie' ? 'active' : ''} onClick={handleNavClick('/galerie')}>
          GALERIE
        </Link>
        <Link to="/evenements" className={location.pathname === '/evenements' ? 'active' : ''} onClick={handleNavClick('/evenements')}>
          ÉVÉNEMENTS
        </Link>
        <Link to="/a-propos" className={location.pathname === '/a-propos' ? 'active' : ''} onClick={handleNavClick('/a-propos')}>
          A PROPOS
        </Link>
        <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''} onClick={handleNavClick('/contact')}>
          CONTACT
        </Link>
      </div>
      <button
        className={`hamburger ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>
  );
};

export default Navbar; 