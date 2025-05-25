import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" onClick={handleNavClick}>New York Café</Link>
      </div>
      
      <button 
        className={`hamburger ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`navbar-menu ${isOpen ? 'active' : ''}`}>
        <Link to="/" className="nav-link" onClick={handleNavClick}>Accueil</Link>
        <Link to="/a-propos" className="nav-link" onClick={handleNavClick}>À propos</Link>
        <Link to="/carte" className="nav-link" onClick={handleNavClick}>Notre Carte</Link>
        <Link to="/karaoke" className="nav-link" onClick={handleNavClick}>Karaoké</Link>
        <Link to="/evenements" className="nav-link" onClick={handleNavClick}>Événements</Link>
        <Link to="/galerie" className="nav-link" onClick={handleNavClick}>Galerie</Link>
        <Link to="/contact" className="nav-link" onClick={handleNavClick}>Contact</Link>
      </div>
    </nav>
  );
};

export default Navbar; 