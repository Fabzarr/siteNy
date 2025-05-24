import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navigation/Navbar';
import Home from './components/Home/Home';
import APropos from './components/APropos/APropos';
import Carte from './components/Carte/Carte';
import Karaoke from './components/Karaoke/Karaoke';
import Evenements from './components/Evenements/Evenements';
import Galerie from './components/Galerie/Galerie';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/a-propos" element={<APropos />} />
            <Route path="/carte" element={<Carte />} />
            <Route path="/karaoke" element={<Karaoke />} />
            <Route path="/evenements" element={<Evenements />} />
            <Route path="/galerie" element={<Galerie />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
