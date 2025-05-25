import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavClick = (path: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(false);
    navigate(path);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" onClick={handleNavClick('/')}>New York Café</Link>
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
        <Link to="/" className="nav-link" onClick={handleNavClick('/')}>Accueil</Link>
        <Link to="/a-propos" className="nav-link" onClick={handleNavClick('/a-propos')}>À propos</Link>
        <Link to="/carte" className="nav-link" onClick={handleNavClick('/carte')}>Notre Carte</Link>
        <Link to="/karaoke" className="nav-link" onClick={handleNavClick('/karaoke')}>Karaoké</Link>
        <Link to="/evenements" className="nav-link" onClick={handleNavClick('/evenements')}>Événements</Link>
        <Link to="/galerie" className="nav-link" onClick={handleNavClick('/galerie')}>Galerie</Link>
        <Link to="/contact" className="nav-link" onClick={handleNavClick('/contact')}>Contact</Link>
      </div>
    </nav>
  );
};

export default Navbar; 