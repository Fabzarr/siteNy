import React from 'react';
import { motion } from 'framer-motion';
import SideMenu from './SideMenu';
import './CartePage.css';

// Données du menu
const menuData = {
  petitesFaims: [
    { name: "Bruschetta", price: 7, description: "Pain grillé, tomates, basilic, huile d'olive" },
    { name: "Focaccia", price: 6, description: "Pain italien aux herbes et huile d'olive" },
    { name: "Olives Marinées", price: 5, description: "Assortiment d'olives marinées aux herbes" },
    { name: "Soupe du Jour", price: 8, description: "Préparée avec des légumes frais de saison" },
    { name: "Carpaccio de Bœuf", price: 12, description: "Fines tranches de bœuf, parmesan, roquette" },
    { name: "Arancini", price: 8, description: "Boulettes de risotto farcies, sauce tomate" }
  ],
  aPartager: [
    { name: "Antipasti", price: 15, description: "Assortiment de charcuteries et fromages italiens" },
    { name: "Fritto Misto", price: 14, description: "Assortiment de fruits de mer frits" },
    { name: "Plateau de Fromages", price: 16, description: "Sélection de fromages italiens et français" },
    { name: "Calamars Frits", price: 13, description: "Servis avec sauce tartare maison" },
    { name: "Planche Mixte", price: 18, description: "Charcuterie, fromages, légumes grillés" }
  ],
  pizzas: [
    { name: "Margherita", price: 12, description: "Sauce tomate, mozzarella, basilic frais" },
    { name: "Regina", price: 14, description: "Sauce tomate, mozzarella, jambon, champignons" },
    { name: "Quattro Formaggi", price: 15, description: "Mozzarella, gorgonzola, parmesan, chèvre" },
    { name: "Diavola", price: 15, description: "Sauce tomate, mozzarella, salami piquant" },
    { name: "Capricciosa", price: 16, description: "Sauce tomate, mozzarella, jambon, champignons, artichauts, olives" },
    { name: "Napolitaine", price: 14, description: "Sauce tomate, mozzarella, anchois, câpres, olives" },
    { name: "Calzone", price: 16, description: "Pizza soufflée farcie tomate, mozzarella, jambon" },
    { name: "Végétarienne", price: 15, description: "Légumes grillés de saison, mozzarella" }
  ],
  salades: [
    { name: "César", price: 12, description: "Laitue romaine, poulet grillé, parmesan, croûtons" },
    { name: "Niçoise", price: 13, description: "Thon, olives, œufs, anchois, tomates" },
    { name: "Chèvre Chaud", price: 14, description: "Mesclun, toasts de chèvre, miel, noix" },
    { name: "Italienne", price: 13, description: "Roquette, tomates séchées, mozzarella, jambon cru" },
    { name: "Grecque", price: 12, description: "Feta, concombre, olives, oignons rouges" }
  ],
  pates: [
    { name: "Carbonara", price: 13, description: "Spaghetti, œuf, pecorino, guanciale" },
    { name: "Bolognaise", price: 12, description: "Tagliatelles, sauce bolognaise maison" },
    { name: "Arrabiata", price: 11, description: "Penne, sauce tomate piquante, ail" },
    { name: "Frutti di Mare", price: 16, description: "Linguine aux fruits de mer" },
    { name: "Pesto", price: 12, description: "Trofie au pesto de basilic frais" },
    { name: "Quatre Fromages", price: 14, description: "Penne, crème, assortiment de fromages" }
  ],
  burgers: [
    { name: "Classic Burger", price: 14, description: "Bœuf, cheddar, salade, tomate, oignon" },
    { name: "Chicken Burger", price: 13, description: "Poulet croustillant, bacon, avocat" },
    { name: "Veggie Burger", price: 13, description: "Steak végétal, légumes grillés" },
    { name: "Italian Burger", price: 15, description: "Bœuf, mozzarella, pesto, tomates séchées" },
    { name: "Double Cheese", price: 16, description: "Double steak, double cheddar" }
  ],
  viandes: [
    { name: "Entrecôte", price: 22, description: "Entrecôte grillée, sauce au choix" },
    { name: "Scaloppine", price: 18, description: "Escalope de veau à la milanaise" },
    { name: "Tagliata", price: 24, description: "Fines tranches de bœuf, roquette, parmesan" },
    { name: "Côte de Bœuf", price: 65, description: "Pour 2 personnes, environ 1kg" },
    { name: "Filet de Bar", price: 20, description: "Filet de bar grillé, légumes de saison" }
  ],
  desserts: [
    { name: "Tiramisu", price: 8, description: "Le classique italien au café et mascarpone" },
    { name: "Panna Cotta", price: 7, description: "Crème vanille, coulis de fruits rouges" },
    { name: "Fondant au Chocolat", price: 9, description: "Cœur coulant, glace vanille" },
    { name: "Crème Brûlée", price: 8, description: "À la vanille de Madagascar" },
    { name: "Café Gourmand", price: 9, description: "Café et assortiment de mignardises" },
    { name: "Profiteroles", price: 9, description: "Choux, glace vanille, chocolat chaud" }
  ],
  vins: [
    { name: "Champagne Moët & Chandon", price: 85, description: "Brut Impérial, notes de pomme verte et d'agrumes" },
    { name: "Champagne Veuve Clicquot", price: 90, description: "Brut Carte Jaune, arômes de fruits blancs et brioche" },
    { name: "Chianti Classico", price: 35, description: "Vin rouge toscan, notes de cerises et d'épices" },
    { name: "Pinot Grigio", price: 28, description: "Vin blanc sec, arômes de fruits et minéralité" },
    { name: "Prosecco", price: 32, description: "Vin pétillant, notes florales et de pomme" },
    { name: "Bordeaux Saint-Émilion", price: 45, description: "Vin rouge corsé, notes de fruits noirs et de chêne" },
    { name: "Chablis", price: 38, description: "Vin blanc sec, minéral avec notes d'agrumes" },
    { name: "Côtes du Rhône", price: 30, description: "Vin rouge fruité et épicé" },
    { name: "Sancerre", price: 36, description: "Vin blanc vif, notes d'agrumes et de pierre à fusil" },
    { name: "Châteauneuf-du-Pape", price: 55, description: "Vin rouge puissant, notes de fruits mûrs et d'épices" },
    { name: "Pouilly-Fumé", price: 34, description: "Vin blanc élégant, notes de fruits exotiques" },
    { name: "Beaujolais Villages", price: 26, description: "Vin rouge léger et fruité" },
    { name: "Margaux", price: 75, description: "Grand vin de Bordeaux, élégant et complexe" },
    { name: "Meursault", price: 85, description: "Vin blanc de Bourgogne, beurré et minéral" },
    { name: "Crozes-Hermitage", price: 42, description: "Vin rouge de la Vallée du Rhône, notes de poivre et fruits noirs" },
    { name: "Gewurztraminer", price: 32, description: "Vin blanc d'Alsace, aromatique et légèrement sucré" },
    { name: "Gigondas", price: 48, description: "Vin rouge généreux, notes de garrigue et fruits rouges" },
    { name: "Muscadet", price: 24, description: "Vin blanc de Loire, frais et iodé" },
    { name: "Pomerol", price: 65, description: "Vin rouge de Bordeaux, riche et velouté" },
    { name: "Riesling", price: 29, description: "Vin blanc d'Alsace, vif et minéral" }
  ]
};

const MenuSection: React.FC<{ title: string, items: any[], id: string }> = ({ title, items, id }) => (
  <div className="menu-section" id={id}>
    <div className="section-header">
      <h2>{title}</h2>
    </div>
    <div className="menu-grid">
      {items.map((item, index) => (
        <div key={index} className="menu-item">
          <div className="item-name-price">
            <span className="item-name">{item.name}</span>
            <span className="item-price">{item.price}€</span>
          </div>
          <div className="item-description">{item.description}</div>
        </div>
      ))}
    </div>
  </div>
);

const CartePage: React.FC = () => {
  return (
    <div className="page-with-menu">
      <SideMenu />
      <motion.div 
        className="carte-page-container"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="carte-header">
          <h1>New York Café</h1>
          <h2>NOTRE CARTE</h2>
        </div>

        <MenuSection id="petites-faims" title="PETITES FAIMS" items={menuData.petitesFaims} />
        <MenuSection id="a-partager" title="A PARTAGER" items={menuData.aPartager} />
        <MenuSection id="nos-pizzas" title="NOS PIZZAS" items={menuData.pizzas} />
        <MenuSection id="nos-salades" title="NOS BELLES SALADES" items={menuData.salades} />
        <MenuSection id="nos-pates" title="NOS PÂTES" items={menuData.pates} />
        <MenuSection id="nos-burgers" title="NOS HAMBURGERS & TARTARE" items={menuData.burgers} />
        <MenuSection id="nos-viandes" title="NOS VIANDES & POISSON" items={menuData.viandes} />
        <MenuSection id="nos-desserts" title="NOS DESSERTS" items={menuData.desserts} />
        <MenuSection id="carte-des-vins" title="LA CARTE DES VINS" items={menuData.vins} />
      </motion.div>
    </div>
  );
};

export default CartePage; 