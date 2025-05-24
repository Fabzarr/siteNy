import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Modal from '../Modal/Modal';
import './Carte.css';

interface CategoryCardProps {
  title: string;
  onClick: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, onClick }) => {
  return (
    <motion.div
      className="category-card"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      <h3>{title}</h3>
    </motion.div>
  );
};

interface Pizza {
  name: string;
  price: number;
  description: string;
}

const pizzas: Pizza[] = [
  { name: "Margarita", price: 15.00, description: "sauce tomate, mozzarella, roquette, origan" },
  { name: "Napolitaine", price: 15.00, description: "sauce tomate, mozzarella, anchois, champignons, câpres, olive, origan" },
  { name: "Regina", price: 15.00, description: "sauce tomate, mozzarella, thon, olives, roquette, origan" },
  { name: "Reine", price: 15.00, description: "sauce tomate, mozzarella, jambon, champignons, roquette, origan" },
  { name: "Peppéroni", price: 15.00, description: "sauce tomate, mozzarella, pepperoni, tomates séchées, roquette et origan" },
  { name: "Chorizo", price: 15.00, description: "sauce tomate, mozzarella, chorizo, poivrons, roquette, origan" },
  { name: "Orientale", price: 15.00, description: "sauce tomate, mozzarella, poivrons, merguez, œuf, oignons, roquette, origan, piment" },
  { name: "Calzone au Jambon", price: 15.00, description: "sauce tomate, mozzarella, jambon, œuf, origan" },
  { name: "Calzone au Thon", price: 15.00, description: "sauce tomate, mozzarella, thon, œuf, origan" },
  { name: "Spéciale New York", price: 15.00, description: "sauce tomate, mozzarella, parmesan, jambon, chèvre, ail persillé, roquette, origan" },
  { name: "Chef", price: 15.00, description: "crème fraîche, mozzarella, lardons, oignons, roquette, origan" },
  { name: "Vesuvio", price: 15.00, description: "sauce tomate, mozzarella, viande hachée, œuf, champignons, roquette, origan, piment" },
  { name: "Roma", price: 15.00, description: "sauce tomate, mozzarella, poulet, poivrons, champignons, parmesan, origan" },
  { name: "Hawaï", price: 15.00, description: "sauce tomate, mozzarella, poulet, ananas" },
  { name: "Catane", price: 15.00, description: "sauce tomate, mozzarella, salami, œuf, chorizo, coppa, roquette, origan" },
  { name: "Parme", price: 15.00, description: "sauce tomate, mozzarella, jambon de Parme, roquette, origan" },
  { name: "Quatre Fromages", price: 15.00, description: "sauce tomate, mozzarella, gorgonzola, chèvre, camembert, roquette, origan" },
  { name: "Chèvre Miel", price: 15.00, description: "crème fraîche, fromage de chèvre, parmesan, miel, basilic" },
  { name: "Végétarienne", price: 15.00, description: "sauce tomate, mozzarella, aubergines, poivron, artichaut, champignons, olives" },
  { name: "Aux Légumes", price: 15.00, description: "sauce tomate, mozzarella, jambon, olives, champignons, artichauts" },
  { name: "Paysanne", price: 15.00, description: "sauce tomate, mozzarella, jambon, poivrons, pommes de terre, roquette, ail persillé, olives, origan" },
  { name: "Scandinave", price: 17.00, description: "crème fraîche, mozzarella, saumon fumé, citron, origan" },
  { name: "Greco", price: 17.00, description: "sauce tomate, mozzarella, feta, aubergines grillées, tomates séchées, olives, roquette et origan" },
  { name: "Abruzzes", price: 18.00, description: "sauce tomate, mozzarella, pepperoni, feta, aubergines grillées, tomates séchées, olives, roquette et origan" },
  { name: "Crème de Truffes", price: 18.00, description: "crème fraîche, crème de truffes, mozzarella fripée, champignons, roquette" },
  { name: "Burrata Jambon de Parme", price: 18.00, description: "sauce tomate, jambon de Parme, pesto, burrata, tomates cerises, chèvre, basilic frais, origan" },
  { name: "Burrata au Pesto", price: 18.00, description: "sauce tomate, mozzarella, poulet, pesto, burrata, tomates cerises, chèvre, basilic frais, origan" }
];

const Carte = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const handleCloseModal = () => {
    setSelectedCategory(null);
  };

  const renderModalContent = (category: string | null) => {
    switch (category) {
      case 'NOS PIZZAS':
        const sortedPizzas = [...pizzas].sort((a, b) => a.price - b.price);
        return (
          <ul className="menu-list">
            {sortedPizzas.map((pizza, index) => (
              <li key={index}>
                <span className="item-name">{pizza.name}</span>
                <p className="item-description">{pizza.description}</p>
                <span className="item-price">{pizza.price.toFixed(2)}€</span>
              </li>
            ))}
          </ul>
        );
      // Ajoutez d'autres cas pour les autres catégories
      default:
        return <div>Contenu à venir</div>;
    }
  };

  return (
    <motion.div 
      className="carte"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Notre Carte</h2>

      <div className="menu-grid">
        {/* Colonne de gauche */}
        <div className="menu-column">
          <CategoryCard
            title="PETITES FAIMS"
            onClick={() => handleCategoryClick('PETITES FAIMS')}
          />
          <CategoryCard
            title="A PARTAGER"
            onClick={() => handleCategoryClick('A PARTAGER')}
          />
        </div>

        {/* Colonne du milieu */}
        <div className="menu-column center">
          <CategoryCard
            title="NOS BELLES SALADES"
            onClick={() => handleCategoryClick('NOS BELLES SALADES')}
          />
          <CategoryCard
            title="NOS PIZZAS"
            onClick={() => handleCategoryClick('NOS PIZZAS')}
          />
          <CategoryCard
            title="NOS PATES"
            onClick={() => handleCategoryClick('NOS PATES')}
          />
          <CategoryCard
            title="NOS HAMBURGERS & TARTARE"
            onClick={() => handleCategoryClick('NOS HAMBURGERS & TARTARE')}
          />
          <CategoryCard
            title="NOS VIANDES & POISSON"
            onClick={() => handleCategoryClick('NOS VIANDES & POISSON')}
          />
        </div>

        {/* Colonne de droite */}
        <div className="menu-column">
          <CategoryCard
            title="NOS DESSERTS"
            onClick={() => handleCategoryClick('NOS DESSERTS')}
          />
          <CategoryCard
            title="LA CARTE DES VINS"
            onClick={() => handleCategoryClick('LA CARTE DES VINS')}
          />
        </div>
      </div>

      <Modal
        isOpen={selectedCategory !== null}
        onClose={handleCloseModal}
        title={selectedCategory || ''}
      >
        {renderModalContent(selectedCategory)}
      </Modal>

    </motion.div>
  );
};

export default Carte; 