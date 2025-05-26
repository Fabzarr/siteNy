import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-logo">
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
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
          ACCUEIL
        </Link>
        <Link to="/carte" className={location.pathname === '/carte' ? 'active' : ''}>
          CARTE
        </Link>
        <Link to="/boissons" className={location.pathname === '/boissons' ? 'active' : ''}>
          BOISSONS
        </Link>
        <Link to="/karaoke" className={location.pathname === '/karaoke' ? 'active' : ''}>
          KARAOKÉ
        </Link>
        <Link to="/galerie" className={location.pathname === '/galerie' ? 'active' : ''}>
          GALERIE
        </Link>
        <Link to="/evenements" className={location.pathname === '/evenements' ? 'active' : ''}>
          ÉVÉNEMENTS
        </Link>
        <Link to="/a-propos" className={location.pathname === '/a-propos' ? 'active' : ''}>
          A PROPOS
        </Link>
        <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>
          CONTACT
        </Link>
      </div>
    </nav>
  );
};

export default Navbar; 