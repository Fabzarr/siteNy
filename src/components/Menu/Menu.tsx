import React from 'react';
import MenuHeader from './MenuHeader';
import './Menu.css';

const Menu: React.FC = () => {
  return (
    <div className="menu-standalone-container">
      <MenuHeader />
      <div className="menu-standalone-content">
        <div className="menu-standalone-section">
          <h1 className="menu-standalone-price-title">Menu à 35 €</h1>
          
          <div className="menu-standalone-formulas">
            <div className="menu-standalone-formula">
              <h2>Entrée + Plat + Dessert</h2>
              <span className="menu-standalone-or">ou</span>
            </div>
            <div className="menu-standalone-formula">
              <h2>Boisson + Plat + Dessert</h2>
              <span className="menu-standalone-or">ou</span>
            </div>
            <div className="menu-standalone-formula">
              <h2>2 Boissons + Plat</h2>
            </div>
          </div>

          <div className="menu-standalone-drinks-info">
            <p>(Boissons : Pichet de vin (25 cl) ou Kir ou pinte de blonde (Herrenbräu) ou cocktail ou soda ou eau ou jus de fruits)</p>
          </div>

          <div className="menu-standalone-karaoke-info">
            <p>Le supplément karaoké est inclus dans cette formule</p>
          </div>

          <div className="menu-standalone-category">
            <h2 className="menu-standalone-category-title">ENTRÉES AU CHOIX</h2>
            <ul className="menu-standalone-items">
              <li>SALADE DE POULET (salade, filet de poulet, tomate, carottes râpées, choux rouge, olives, cantal)</li>
              <li>ŒUFS MAYONNAISE</li>
              <li>TOMATES MOZZARELLA au Pesto</li>
              <li>SAUMON FUMÉ SUR SES TOASTS</li>
              <li>FOIE GRAS ET SES TOASTS (+2 €)</li>
            </ul>
          </div>

          <div className="menu-standalone-category">
            <h2 className="menu-standalone-category-title">PIZZA</h2>
            <ul className="menu-standalone-items">
              <li>MARGARITA - sauce tomate, mozzarella, roquette, origan</li>
              <li>NAPOLITAINE - sauce tomate, mozzarella, anchois, champignons, câpres, olive, origan</li>
              {/* Ajoutez les autres pizzas ici */}
            </ul>
          </div>

          {/* Ajoutez les autres catégories ici */}
        </div>
      </div>
    </div>
  );
};

export default Menu; 