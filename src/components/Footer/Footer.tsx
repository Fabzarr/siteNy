import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>New York Café</h3>
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
          <p>&copy; {new Date().getFullYear()} New York Café - Tous droits réservés</p>
        </div>

        <div className="footer-section">
          <p>01 23 45 67 89 - contact@newyorkcafe.fr</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 