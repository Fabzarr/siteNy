import React, { useState } from 'react';
import './Carte.css';

const Carte = () => {
  const [showPizzaPage, setShowPizzaPage] = useState(false);

  const pizzas = [
    {
      name: "Margherita",
      ingredients: "Tomate, mozzarella, basilic frais",
      price: "9"
    },
    {
      name: "Regina",
      ingredients: "Tomate, ham, eirojons",
      price: "11"
    },
    {
      name: "Quattro Formaggi",
      ingredients: "Mozzarella, poronpola",
      price: "11"
    },
    {
      name: "Reine",
      ingredients: "Tomate, mozzarella, hamum, nustraions",
      price: "12"
    },
    {
      name: "Napolitaine",
      ingredients: "Tomate, mozzarella, hamum, et pictoions",
      price: "10"
    },
    {
      name: "Hawaienne",
      ingredients: "Tomate, mozzarella, iamum, et ainanas",
      price: "11"
    },
    {
      name: "Calzone",
      ingredients: "Tomate, mozzarella, jamum, cashews, caperes",
      price: "12"
    },
    {
      name: "Orientale",
      ingredients: "Tomate, mozzarella, salaimi, pimenti, pairans",
      price: "12"
    },
    {
      name: "Diavola",
      ingredients: "Tomate, mozzarella, sajisimi, salami",
      price: "12"
    }
  ];

  const handlePizzaClick = () => {
    setShowPizzaPage(true);
    document.body.style.overflow = 'hidden';
  };

  const handleBackClick = () => {
    setShowPizzaPage(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      <div className="carte">
        <h2>Notre Carte</h2>
        <div className="menu-buttons">
          <button onClick={handlePizzaClick}>NOS PIZZAS</button>
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

      {showPizzaPage && (
        <div className="modal-content">
          <button className="close-button" onClick={handleBackClick} aria-label="Fermer"></button>
          <div className="menu-header">
            <h2>New York Café</h2>
            <div className="menu-subheader">PIZZAS</div>
          </div>
          <div className="menu-grid">
            {pizzas.map((pizza, index) => (
              <div key={index} className="pizza-card">
                <div className="pizza-name">{pizza.name}</div>
                <div className="pizza-ingredients">{pizza.ingredients}</div>
                <div className="pizza-price">{pizza.price} €</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Carte; 