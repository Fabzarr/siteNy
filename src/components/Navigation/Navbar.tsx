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

  const handleNavClick = (path: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    closeModal();
    scrollToTop();
    navigate(path);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-logo" onClick={handleNavClick('/')}>
          NEW YORK CAFÉ
        </Link>
        <button
          className={`hamburger ${isOpen ? 'open' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      <div className={`navbar-menu ${isOpen ? 'open' : ''}`}>
        <Link to="/" className={location.pathname === '/' ? 'active' : ''} onClick={handleNavClick('/')}>
          ACCUEIL
        </Link>
        <Link to="/carte" className={location.pathname === '/carte' ? 'active' : ''} onClick={handleNavClick('/carte')}>
          CARTE
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
    </nav>
  );
};

export default Navbar; 