import React, { useState } from 'react';
import './Menu.css';

const Menu = () => {
  const [showPizzaMenu, setShowPizzaMenu] = useState(false);

  const pizzas = [
    {
      name: "Margarita",
      ingredients: "sauce tomate, mozzarella, roquette, origan",
      price: "15.00"
    },
    {
      name: "Napolitaine",
      ingredients: "sauce tomate, mozzarella, anchois, champignons, câpres, olive, origan",
      price: "15.00"
    },
    // ... ajoutez toutes les autres pizzas ici
  ];

  const togglePizzaMenu = () => {
    setShowPizzaMenu(!showPizzaMenu);
  };

  return (
    <>
      {!showPizzaMenu ? (
        <div className="carte">
          <div className="menu-categories">
            <button onClick={togglePizzaMenu}>NOS PIZZAS</button>
            <button>PETITES FAIMS</button>
            <button>A PARTAGER</button>
            <button>NOS BELLES SALADES</button>
            <button>NOS PATES</button>
            <button>NOS HAMBURGERS & TARTARE</button>
            <button>NOS VIANDES & POISSON</button>
            <button>NOS DESSERTS</button>
            <button>LA CARTE DES VINS</button>
          </div>
        </div>
      ) : (
        <div className="menu-page">
          <div className="menu-header">
            <h2>New York Café</h2>
            <div className="menu-subheader">NOS PIZZAS</div>
          </div>
          <div className="menu-container">
            <ul className="menu-list">
              {pizzas.map((pizza, index) => (
                <li key={index}>
                  <div className="item-header">
                    <span className="item-name">{pizza.name}</span>
                    <span className="item-price">{pizza.price}€</span>
                  </div>
                  <div className="item-description">{pizza.ingredients}</div>
                </li>
              ))}
            </ul>
          </div>
          <button className="back-button" onClick={togglePizzaMenu}>
            Retour au menu
          </button>
        </div>
      )}
    </>
  );
};

export default Menu; 