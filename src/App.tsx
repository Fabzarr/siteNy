import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navigation/Navbar';
import Home from './components/Home/Home';
import About from './components/About/About';
import Carte from './components/Carte/Carte';
import Contact from './components/Contact/Contact';
import Karaoke from './components/Karaoke/Karaoke';
import Galerie from './components/Galerie/Galerie';
import Evenements from './components/Evenements/Evenements';
import PizzaPage from './components/PizzaPage/PizzaPage';
import Footer from './components/Footer/Footer';
import './App.css';

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="/carte" element={<Carte />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/karaoke" element={<Karaoke />} />
          <Route path="/galerie" element={<Galerie />} />
          <Route path="/evenements" element={<Evenements />} />
          <Route path="/nos-pizzas" element={<PizzaPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
