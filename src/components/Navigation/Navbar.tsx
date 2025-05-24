import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">New York Café</Link>
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
        <Link to="/" className="nav-link">Accueil</Link>
        <Link to="/a-propos" className="nav-link">À propos</Link>
        <Link to="/carte" className="nav-link">Notre Carte</Link>
        <Link to="/karaoke" className="nav-link">Karaoké</Link>
        <Link to="/evenements" className="nav-link">Événements</Link>
        <Link to="/galerie" className="nav-link">Galerie</Link>
        <Link to="/contact" className="nav-link">Contact</Link>
      </div>
    </nav>
  );
};

export default Navbar; 