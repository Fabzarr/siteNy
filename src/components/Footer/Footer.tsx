import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>New York Café</h3>
          <p>Un lieu unique à Paris où la culture américaine rencontre l'art de vivre à la française.</p>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebookF />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h3>Navigation</h3>
          <nav>
            <Link to="/">Accueil</Link>
            <Link to="/a-propos">À propos</Link>
            <Link to="/carte">Notre Carte</Link>
            <Link to="/karaoke">Karaoké</Link>
            <Link to="/evenements">Événements</Link>
            <Link to="/galerie">Galerie</Link>
            <Link to="/contact">Contact</Link>
          </nav>
        </div>

        <div className="footer-section">
          <h3>Horaires</h3>
          <p>Lundi - Jeudi: 11h - 00h</p>
          <p>Vendredi - Samedi: 11h - 02h</p>
          <p>Dimanche: 11h - 23h</p>
        </div>

        <div className="footer-section">
          <h3>Contact</h3>
          <p>123 Rue de Paris</p>
          <p>75001 Paris</p>
          <p>01 23 45 67 89</p>
          <p>contact@newyorkcafe.fr</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} New York Café. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer; 