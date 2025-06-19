import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './BoissonsPage.css';

const BoissonsPage = () => {
  const [activeMenu, setActiveMenu] = useState('boissons');

  // Fonction pour changer de menu et remonter en haut
  const handleMenuChange = (menu: string) => {
    setActiveMenu(menu);
    // Scroll to top avec un léger délai pour permettre le changement de contenu
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 100);
  };

  const boissonsData = {
    boissons_fraiches: [
      { name: "Coca-Cola / Coca-Cola Zero", price: 4, description: "33cl" },
      { name: "Orangina / Sprite / Fanta", price: 4, description: "33cl" },
      { name: "Ice Tea Pêche", price: 4, description: "33cl" },
      { name: "Perrier", price: 4, description: "33cl" },
      { name: "Jus de Fruits", price: 4, description: "Pomme, Ananas, Tomate, Abricot - 25cl" },
      { name: "Jus de Fruits Frais", price: 5, description: "Orange, Citron, Pamplemousse - 25cl" }
    ],
    aperitifs: [
      { name: "Kir", price: 5, description: "Cassis, Pêche, Mûre - 12cl" },
      { name: "Martini Blanc/Rouge", price: 5, description: "6cl" },
      { name: "Ricard", price: 4, description: "2cl" },
      { name: "Campari", price: 6, description: "4cl" }
    ],
    bieres_pression: [
      { name: "Herrenbräu", price: 4, description: "25cl" },
      { name: "Herrenbräu", price: 7.5, description: "50cl" }
    ],
    bieres_bouteilles: [
      { name: "Desperados", price: 6, description: "33cl" },
      { name: "Heineken 0.0%", price: 5, description: "33cl" }
    ],
    vins: [
      { name: "Verre de vin rouge", price: 5, description: "12cl" },
      { name: "Verre de vin blanc", price: 5, description: "12cl" },
      { name: "Verre de rosé", price: 5, description: "12cl" }
    ],
    champagnes: [
      { name: "Moët & Chandon", price: 80, description: "75cl" },
      { name: "Prosecco", price: 35, description: "75cl" }
    ],
    alcools_4cl: [
      { name: "Vodka", price: 8, description: "avec ou sans soft" },
      { name: "Gin", price: 8, description: "avec ou sans soft" },
      { name: "Rhum blanc", price: 8, description: "avec ou sans soft" }
    ],
    alcools_superieurs: [
      { name: "Jack Daniel's", price: 9, description: "avec ou sans soft" },
      { name: "Hendrick's", price: 10, description: "avec ou sans soft" }
    ],
    alcools_premium: [
      { name: "Grey Goose", price: 12, description: "5cl" },
      { name: "Patron Silver", price: 12, description: "5cl" }
    ],
    bouteilles_70cl: [
      { name: "Vodka", price: 90, description: "avec softs inclus" },
      { name: "Gin", price: 90, description: "avec softs inclus" }
    ],
    bouteilles_superieures: [
      { name: "Jack Daniel's", price: 110, description: "avec softs inclus" },
      { name: "Hendrick's", price: 120, description: "avec softs inclus" }
    ],
    bouteilles_premium: [
      { name: "Grey Goose", price: 140, description: "avec softs inclus" },
      { name: "Patron Silver", price: 160, description: "avec softs inclus" }
    ]
  };

  const cocktailsData = {
    cocktails_standards: [
      { name: "Mojito", price: 10, description: "Rhum blanc, menthe fraîche, citron vert, sucre de canne, eau gazeuse" },
      { name: "Piña Colada", price: 10, description: "Rhum blanc, jus d'ananas, lait de coco" },
      { name: "Caipirinha", price: 10, description: "Cachaça, citron vert, sucre" }
    ],
    rhum: [
      { name: "Ti Punch", price: 10, description: "Rhum agricole, citron vert, sirop de sucre de canne" },
      { name: "Daiquiri", price: 10, description: "Rhum blanc, jus de citron vert, sucre" },
      { name: "Dark & Stormy", price: 10, description: "Rhum brun, ginger beer, citron vert" }
    ],
    vodka: [
      { name: "Moscow Mule", price: 10, description: "Vodka, ginger beer, citron vert" },
      { name: "Cosmopolitan", price: 10, description: "Vodka, triple sec, jus de cranberry, citron vert" },
      { name: "Sex on the Beach", price: 10, description: "Vodka, liqueur de pêche, jus d'orange, jus de cranberry" }
    ],
    gin: [
      { name: "Gin Tonic", price: 10, description: "Gin, tonic, citron" },
      { name: "Gin Fizz", price: 10, description: "Gin, jus de citron, sucre, eau gazeuse" },
      { name: "Negroni", price: 10, description: "Gin, vermouth rouge, campari" }
    ],
    tequila: [
      { name: "Margarita", price: 10, description: "Tequila, triple sec, jus de citron vert" },
      { name: "Tequila Sunrise", price: 10, description: "Tequila, jus d'orange, grenadine" },
      { name: "Paloma", price: 10, description: "Tequila, soda pamplemousse, citron vert" }
    ],
    whisky: [
      { name: "Old Fashioned", price: 10, description: "Whisky, angostura, sucre" },
      { name: "Whisky Sour", price: 10, description: "Whisky, jus de citron, sucre" },
      { name: "Manhattan", price: 10, description: "Whisky, vermouth rouge, angostura" }
    ],
    funs: [
      { name: "Blue Lagoon", price: 10, description: "Vodka, curaçao bleu, limonade" },
      { name: "Sex on the Beach", price: 10, description: "Vodka, liqueur de pêche, jus d'orange, jus de cranberry" },
      { name: "Rainbow", price: 10, description: "Vodka, curaçao bleu, jus d'orange, grenadine" }
    ],
    mocktails: [
      { name: "Virgin Mojito", price: 8, description: "Menthe fraîche, citron vert, sucre de canne, eau gazeuse" },
      { name: "Virgin Piña Colada", price: 8, description: "Jus d'ananas, lait de coco" },
      { name: "Fruity Paradise", price: 8, description: "Jus de fruits frais mélangés, sirop de grenadine" },
      { name: "Big Virgin Mojito", price: 10, description: "Version XL du Virgin Mojito" },
      { name: "Big Fruity Paradise", price: 10, description: "Version XL du Fruity Paradise" }
    ]
  };

  const InfoSection = () => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '10px', width: '100%', maxWidth: '600px', margin: '0 auto' }}>
      <p style={{
        color: '#2ECC71', 
        margin: '0', 
        fontSize: '1.1rem', 
        fontWeight: '500',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        width: '100%'
      }}>
        <span style={{ fontSize: '1.2rem', width: '28px', textAlign: 'center', flexShrink: 0 }}>🍻</span>
        <span>Happy Hours 16h-21h : Pinte Herrenbräu 4€ - Cocktails 5€</span>
      </p>
      <p style={{
        color: '#5DADE2', 
        margin: '0', 
        fontSize: '1.1rem', 
        fontWeight: '500',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        width: '100%'
      }}>
        <span style={{ fontSize: '1.2rem', width: '28px', textAlign: 'center', flexShrink: 0 }}>🎤</span>
        <span>Karaoké : consommation hors happy hours obligatoire</span>
      </p>
    </div>
  );

  return (
    <motion.div 
      className="boissons-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="boissons-content">
          <div className="boissons-header">
          <div className="boissons-header-left">
            <h1>New York Café</h1>
          </div>
          <div className="boissons-header-center">
            <h2>CARTE DES BOISSONS</h2>
            <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '1.1rem', margin: '0', letterSpacing: '2px' }}>
              BOISSONS, COCKTAILS & MOCKTAILS
            </p>
          </div>
          <div className="boissons-header-right">
            {/* Espace réservé pour équilibrer */}
          </div>
          
          {/* Titres et boutons pour mobile/tablette - directement dans header */}
          <h2 className="mobile-subtitle">CARTE DES BOISSONS</h2>
          <p className="mobile-description">BOISSONS, COCKTAILS & MOCKTAILS</p>
          
          <div className="mobile-menu-selector">
            <button 
              className={`menu-button ${activeMenu === 'boissons' ? 'active' : ''}`}
              onClick={() => handleMenuChange('boissons')}
            >
              <span>BOISSONS</span>
            </button>
            <button 
              className={`menu-button ${activeMenu === 'cocktails' ? 'active' : ''}`}
              onClick={() => handleMenuChange('cocktails')}
            >
              <span>COCKTAILS</span>
            </button>
          </div>
        </div>

        <div className="menu-selector desktop-only">
          <button 
            className={`menu-button ${activeMenu === 'boissons' ? 'active' : ''}`}
            onClick={() => handleMenuChange('boissons')}
          >
            <span>BOISSONS</span>
          </button>
          <button 
            className={`menu-button ${activeMenu === 'cocktails' ? 'active' : ''}`}
            onClick={() => handleMenuChange('cocktails')}
          >
            <span>COCKTAILS</span>
          </button>
                </div>
        
        <InfoSection />

        {activeMenu === 'boissons' ? (
          <div className="boissons-columns">
            <div className="boissons-column">
              <div className="boissons-section">
                <h2>Boissons fraîches</h2>
                {boissonsData.boissons_fraiches.map((item, index) => (
                  <div key={index} className="boisson-item">
                    <div className="boisson-info">
                      <span className="boisson-name">{item.name}</span>
                      <span className="boisson-price">{item.price}€</span>
                    </div>
                    <span className="boisson-description">{item.description}</span>
                  </div>
                ))}
              </div>

              <div className="boissons-section">
                <h2>Apéritifs</h2>
                {boissonsData.aperitifs.map((item, index) => (
                  <div key={index} className="boisson-item">
                    <div className="boisson-info">
                      <span className="boisson-name">{item.name}</span>
                      <span className="boisson-price">{item.price}€</span>
                    </div>
                    <span className="boisson-description">{item.description}</span>
                  </div>
                ))}
              </div>

              <div className="boissons-section">
                <h2>Bières pression</h2>
                {boissonsData.bieres_pression.map((item, index) => (
                  <div key={index} className="boisson-item">
                    <div className="boisson-info">
                      <span className="boisson-name">{item.name}</span>
                      <span className="boisson-price">{item.price}€</span>
                    </div>
                    <span className="boisson-description">{item.description}</span>
                  </div>
                ))}
              </div>

              <div className="boissons-section">
                <h2>Bières & cidres bouteilles</h2>
                {boissonsData.bieres_bouteilles.map((item, index) => (
                  <div key={index} className="boisson-item">
                    <div className="boisson-info">
                      <span className="boisson-name">{item.name}</span>
                      <span className="boisson-price">{item.price}€</span>
                    </div>
                    <span className="boisson-description">{item.description}</span>
                  </div>
                ))}
              </div>

              <div className="boissons-section">
                <h2>Vins</h2>
                {boissonsData.vins.map((item, index) => (
                  <div key={index} className="boisson-item">
                    <div className="boisson-info">
                      <span className="boisson-name">{item.name}</span>
                      <span className="boisson-price">{item.price}€</span>
                    </div>
                    <span className="boisson-description">{item.description}</span>
                  </div>
                ))}
              </div>

              <div className="boissons-section">
                <h2>Bouteilles champagne et bulles</h2>
                {boissonsData.champagnes.map((item, index) => (
                  <div key={index} className="boisson-item">
                    <div className="boisson-info">
                      <span className="boisson-name">{item.name}</span>
                      <span className="boisson-price">{item.price}€</span>
                    </div>
                    <span className="boisson-description">{item.description}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="boissons-column">
              <div className="boissons-section">
                <h2>Alcools 4 cl (avec ou sans soft)</h2>
                {boissonsData.alcools_4cl.map((item, index) => (
                  <div key={index} className="boisson-item">
                    <div className="boisson-info">
                      <span className="boisson-name">{item.name}</span>
                      <span className="boisson-price">{item.price}€</span>
                    </div>
                    <span className="boisson-description">{item.description}</span>
                  </div>
                ))}
              </div>

              <div className="boissons-section">
                <h2>Alcools supérieurs 4 cl (avec ou sans soft)</h2>
                {boissonsData.alcools_superieurs.map((item, index) => (
                  <div key={index} className="boisson-item">
                    <div className="boisson-info">
                      <span className="boisson-name">{item.name}</span>
                      <span className="boisson-price">{item.price}€</span>
                    </div>
                    <span className="boisson-description">{item.description}</span>
                  </div>
                ))}
              </div>

              <div className="boissons-section">
                <h2>Alcools premium 5 cl</h2>
                {boissonsData.alcools_premium.map((item, index) => (
                  <div key={index} className="boisson-item">
                    <div className="boisson-info">
                      <span className="boisson-name">{item.name}</span>
                      <span className="boisson-price">{item.price}€</span>
                    </div>
                    <span className="boisson-description">{item.description}</span>
                  </div>
                ))}
              </div>

              <div className="boissons-section">
                <h2>Bouteilles alcool 70 cl</h2>
                {boissonsData.bouteilles_70cl.map((item, index) => (
                  <div key={index} className="boisson-item">
                    <div className="boisson-info">
                      <span className="boisson-name">{item.name}</span>
                      <span className="boisson-price">{item.price}€</span>
                    </div>
                    <span className="boisson-description">{item.description}</span>
                  </div>
                ))}
              </div>

              <div className="boissons-section">
                <h2>Bouteilles supérieurs 70 cl</h2>
                {boissonsData.bouteilles_superieures.map((item, index) => (
                  <div key={index} className="boisson-item">
                    <div className="boisson-info">
                      <span className="boisson-name">{item.name}</span>
                      <span className="boisson-price">{item.price}€</span>
                    </div>
                    <span className="boisson-description">{item.description}</span>
                  </div>
                ))}
              </div>

              <div className="boissons-section">
                <h2>Bouteilles premium 70 cl</h2>
                {boissonsData.bouteilles_premium.map((item, index) => (
                  <div key={index} className="boisson-item">
                    <div className="boisson-info">
                      <span className="boisson-name">{item.name}</span>
                      <span className="boisson-price">{item.price}€</span>
                    </div>
                    <span className="boisson-description">{item.description}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="cocktails-container">
            <div className="cocktails-section">
              <h2>COCKTAILS - 10.00 €</h2>
              {cocktailsData.cocktails_standards.map((item, index) => (
                <div key={index} className="boisson-item">
                  <div className="boisson-info">
                    <span className="boisson-name">{item.name}</span>
                    <span className="boisson-price">{item.price}€</span>
                  </div>
                  <span className="boisson-description">{item.description}</span>
                </div>
              ))}
            </div>

            <div className="cocktails-section">
              <h2>RHUM</h2>
              {cocktailsData.rhum.map((item, index) => (
                <div key={index} className="boisson-item">
                  <div className="boisson-info">
                    <span className="boisson-name">{item.name}</span>
                    <span className="boisson-price">{item.price}€</span>
                  </div>
                  <span className="boisson-description">{item.description}</span>
                </div>
              ))}
            </div>

            <div className="cocktails-section">
              <h2>VODKA</h2>
              {cocktailsData.vodka.map((item, index) => (
                <div key={index} className="boisson-item">
                  <div className="boisson-info">
                    <span className="boisson-name">{item.name}</span>
                    <span className="boisson-price">{item.price}€</span>
                  </div>
                  <span className="boisson-description">{item.description}</span>
                </div>
              ))}
            </div>

            <div className="cocktails-section">
              <h2>GIN</h2>
              {cocktailsData.gin.map((item, index) => (
                <div key={index} className="boisson-item">
                  <div className="boisson-info">
                    <span className="boisson-name">{item.name}</span>
                    <span className="boisson-price">{item.price}€</span>
                  </div>
                  <span className="boisson-description">{item.description}</span>
                </div>
              ))}
            </div>

            <div className="cocktails-section">
              <h2>TEQUILA</h2>
              {cocktailsData.tequila.map((item, index) => (
                <div key={index} className="boisson-item">
                  <div className="boisson-info">
                    <span className="boisson-name">{item.name}</span>
                    <span className="boisson-price">{item.price}€</span>
                  </div>
                  <span className="boisson-description">{item.description}</span>
                </div>
              ))}
            </div>

            <div className="cocktails-section">
              <h2>WHISKY</h2>
              {cocktailsData.whisky.map((item, index) => (
                <div key={index} className="boisson-item">
                  <div className="boisson-info">
                    <span className="boisson-name">{item.name}</span>
                    <span className="boisson-price">{item.price}€</span>
                  </div>
                  <span className="boisson-description">{item.description}</span>
                </div>
              ))}
            </div>

            <div className="cocktails-section">
              <h2>FUNS</h2>
              {cocktailsData.funs.map((item, index) => (
                <div key={index} className="boisson-item">
                  <div className="boisson-info">
                    <span className="boisson-name">{item.name}</span>
                    <span className="boisson-price">{item.price}€</span>
                  </div>
                  <span className="boisson-description">{item.description}</span>
                </div>
              ))}
            </div>

            <div className="cocktails-section">
              <h2>MOCKTAILS 8.00 € - BIG MOCKTAILS 10.00 €</h2>
              {cocktailsData.mocktails.map((item, index) => (
                <div key={index} className="boisson-item">
                  <div className="boisson-info">
                    <span className="boisson-name">{item.name}</span>
                    <span className="boisson-price">{item.price}€</span>
                  </div>
                  <span className="boisson-description">{item.description}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ marginTop: '40px', textAlign: 'center', padding: '20px 0' }}>
          <p style={{
            color: '#FFD700', 
            textAlign: 'center', 
            margin: '10px 0', 
            fontSize: '1rem', 
            fontWeight: '700',
            textShadow: '0 0 10px #FFD700, 0 0 20px #FFD700, 0 0 30px #FFD700, 0 0 40px #FF6B00, 0 0 50px #FF6B00',
            animation: 'glow-gold-spectacular 1.5s ease-in-out infinite alternate',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            fontFamily: 'Arial Black, sans-serif'
          }}>
            PRIX NETS EN EUROS - CB MINIMUM 10 € - L'ÉTABLISSEMENT N'ACCEPTE NI CHÈQUES NI TICKETS RESTAURANTS
          </p>
        </div>
        </div>
      </motion.div>
  );
};

export default BoissonsPage; 