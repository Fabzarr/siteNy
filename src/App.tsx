import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navigation/Navbar';
import Home from './components/Home/Home';
import About from './components/About/About';
import CartePage from './components/Carte/CartePage';
import Contact from './components/Contact/Contact';
import Karaoke from './components/Karaoke/Karaoke';
import Galerie from './components/Galerie/Galerie';
import Evenements from './components/Evenements/Evenements';
import Footer from './components/Footer/Footer';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import BoissonsPage from './components/BoissonsPage/BoissonsPage';
import './App.css';

function App() {
  const location = useLocation();

  useEffect(() => {
    // Ajout d'un petit délai pour s'assurer que la page est bien chargée
    const timeoutId = setTimeout(() => {
      // Force le défilement vers le haut avec les deux méthodes
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'auto'
      });
      
      // Backup en cas d'échec de la première méthode
      document.body.scrollTop = 0; // Pour Safari
      document.documentElement.scrollTop = 0; // Pour Chrome, Firefox, IE et Opera
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [location.pathname]);

  return (
    <div className="app">
      <Navbar />
      <main className="main-container">
        <div className="background-container"></div>
        <div className="page-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/a-propos" element={<About />} />
            <Route path="/carte" element={<CartePage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/karaoke" element={<Karaoke />} />
            <Route path="/galerie" element={<Galerie />} />
            <Route path="/evenements" element={<Evenements />} />
            <Route path="/boissons" element={<BoissonsPage />} />
          </Routes>
        </div>
      </main>
      <ScrollToTop />
      <Footer />
    </div>
  );
}

export default App;
