-- Insertion des catégories
INSERT INTO categories (nom, slug, description, ordre_affichage) VALUES
('PETITES FAIMS', 'petites-faims', 'Entrées & Apéritifs', 1),
('A PARTAGER', 'a-partager', 'Plats à partager entre amis', 2),
('NOS PIZZAS', 'nos-pizzas', 'Pizzas artisanales au feu de bois', 3),
('NOS BELLES SALADES', 'nos-salades', 'Salades fraîches et copieuses', 4),
('NOS PÂTES', 'nos-pates', 'Pâtes italiennes maison', 5),
('NOS HAMBURGERS & TARTARE', 'nos-burgers', 'Burgers gourmets et tartares', 6),
('NOS VIANDES & POISSON', 'nos-viandes', 'Viandes et poissons de qualité', 7),
('NOS DESSERTS', 'nos-desserts', 'Desserts maison et gourmandises', 8),
('LA CARTE DES VINS', 'carte-des-vins', 'Notre sélection de vins', 9);

-- Insertion des plats - PETITES FAIMS
INSERT INTO plats (nom, description, prix, categorie_id, ordre_affichage) VALUES
('Bruschetta', 'Pain grillé, tomates, basilic, huile d''olive', 7.00, 1, 1),
('Focaccia', 'Pain italien aux herbes et huile d''olive', 6.00, 1, 2),
('Olives Marinées', 'Assortiment d''olives marinées aux herbes', 5.00, 1, 3),
('Soupe du Jour', 'Préparée avec des légumes frais de saison', 8.00, 1, 4),
('Carpaccio de Bœuf', 'Fines tranches de bœuf, parmesan, roquette', 12.00, 1, 5),
('Arancini', 'Boulettes de risotto farcies, sauce tomate', 8.00, 1, 6);

-- Insertion des plats - A PARTAGER
INSERT INTO plats (nom, description, prix, categorie_id, ordre_affichage) VALUES
('Antipasti', 'Assortiment de charcuteries et fromages italiens', 15.00, 2, 1),
('Fritto Misto', 'Assortiment de fruits de mer frits', 14.00, 2, 2),
('Plateau de Fromages', 'Sélection de fromages italiens et français', 16.00, 2, 3),
('Calamars Frits', 'Servis avec sauce tartare maison', 13.00, 2, 4),
('Planche Mixte', 'Charcuterie, fromages, légumes grillés', 18.00, 2, 5);

-- Insertion des plats - PIZZAS
INSERT INTO plats (nom, description, prix, categorie_id, ordre_affichage) VALUES
('Margherita', 'Sauce tomate, mozzarella, basilic frais', 12.00, 3, 1),
('Regina', 'Sauce tomate, mozzarella, jambon, champignons', 14.00, 3, 2),
('Quattro Formaggi', 'Mozzarella, gorgonzola, parmesan, chèvre', 15.00, 3, 3),
('Diavola', 'Sauce tomate, mozzarella, salami piquant', 15.00, 3, 4),
('Capricciosa', 'Sauce tomate, mozzarella, jambon, champignons, artichauts, olives', 16.00, 3, 5),
('Napolitaine', 'Sauce tomate, mozzarella, anchois, câpres, olives', 14.00, 3, 6),
('Calzone', 'Pizza soufflée farcie tomate, mozzarella, jambon', 16.00, 3, 7),
('Végétarienne', 'Légumes grillés de saison, mozzarella', 15.00, 3, 8);

-- Insertion des plats - SALADES
INSERT INTO plats (nom, description, prix, categorie_id, ordre_affichage) VALUES
('César', 'Laitue romaine, poulet grillé, parmesan, croûtons', 12.00, 4, 1),
('Niçoise', 'Thon, olives, œufs, anchois, tomates', 13.00, 4, 2),
('Chèvre Chaud', 'Mesclun, toasts de chèvre, miel, noix', 14.00, 4, 3),
('Italienne', 'Roquette, tomates séchées, mozzarella, jambon cru', 13.00, 4, 4),
('Grecque', 'Feta, concombre, olives, oignons rouges', 12.00, 4, 5);

-- Insertion des plats - PÂTES
INSERT INTO plats (nom, description, prix, categorie_id, ordre_affichage) VALUES
('Carbonara', 'Spaghetti, œuf, pecorino, guanciale', 13.00, 5, 1),
('Bolognaise', 'Tagliatelles, sauce bolognaise maison', 12.00, 5, 2),
('Arrabiata', 'Penne, sauce tomate piquante, ail', 11.00, 5, 3),
('Frutti di Mare', 'Linguine aux fruits de mer', 16.00, 5, 4),
('Pesto', 'Trofie au pesto de basilic frais', 12.00, 5, 5),
('Quatre Fromages', 'Penne, crème, assortiment de fromages', 14.00, 5, 6);

-- Insertion des plats - BURGERS
INSERT INTO plats (nom, description, prix, categorie_id, ordre_affichage) VALUES
('Classic Burger', 'Bœuf, cheddar, salade, tomate, oignon', 14.00, 6, 1),
('Chicken Burger', 'Poulet croustillant, bacon, avocat', 13.00, 6, 2),
('Veggie Burger', 'Steak végétal, légumes grillés', 13.00, 6, 3),
('Italian Burger', 'Bœuf, mozzarella, pesto, tomates séchées', 15.00, 6, 4),
('Double Cheese', 'Double steak, double cheddar', 16.00, 6, 5);

-- Insertion des plats - VIANDES & POISSON
INSERT INTO plats (nom, description, prix, categorie_id, ordre_affichage) VALUES
('Entrecôte', 'Entrecôte grillée, sauce au choix', 22.00, 7, 1),
('Scaloppine', 'Escalope de veau à la milanaise', 18.00, 7, 2),
('Tagliata', 'Fines tranches de bœuf, roquette, parmesan', 24.00, 7, 3),
('Côte de Bœuf', 'Pour 2 personnes, environ 1kg', 65.00, 7, 4),
('Filet de Bar', 'Filet de bar grillé, légumes de saison', 20.00, 7, 5);

-- Insertion des plats - DESSERTS
INSERT INTO plats (nom, description, prix, categorie_id, ordre_affichage) VALUES
('Tiramisu', 'Le classique italien au café et mascarpone', 8.00, 8, 1),
('Panna Cotta', 'Crème vanille, coulis de fruits rouges', 7.00, 8, 2),
('Fondant au Chocolat', 'Cœur coulant, glace vanille', 9.00, 8, 3),
('Crème Brûlée', 'À la vanille de Madagascar', 8.00, 8, 4),
('Café Gourmand', 'Café et assortiment de mignardises', 9.00, 8, 5),
('Profiteroles', 'Choux, glace vanille, chocolat chaud', 9.00, 8, 6);

-- Insertion des ingrédients de base pour les pizzas
INSERT INTO ingredients (nom, description, allergene) VALUES
('Sauce tomate', 'Sauce tomate maison aux herbes', false),
('Mozzarella', 'Mozzarella di bufala', true),
('Basilic frais', 'Basilic frais du jardin', false),
('Jambon', 'Jambon de Parme', false),
('Champignons', 'Champignons de Paris', false),
('Gorgonzola', 'Fromage gorgonzola AOP', true),
('Parmesan', 'Parmesan reggiano 24 mois', true),
('Chèvre', 'Fromage de chèvre crémeux', true),
('Salami piquant', 'Salami calabrese épicé', false),
('Artichauts', 'Artichauts marinés', false),
('Olives noires', 'Olives noires de Kalamata', false),
('Anchois', 'Filets d''anchois', false),
('Câpres', 'Câpres de Sicile', false),
('Légumes grillés', 'Mélange de légumes de saison grillés', false);

-- Association des ingrédients aux pizzas
-- Margherita
INSERT INTO plat_ingredients (plat_id, ingredient_id, obligatoire) VALUES
((SELECT id FROM plats WHERE nom = 'Margherita'), (SELECT id FROM ingredients WHERE nom = 'Sauce tomate'), true),
((SELECT id FROM plats WHERE nom = 'Margherita'), (SELECT id FROM ingredients WHERE nom = 'Mozzarella'), true),
((SELECT id FROM plats WHERE nom = 'Margherita'), (SELECT id FROM ingredients WHERE nom = 'Basilic frais'), true);

-- Regina
INSERT INTO plat_ingredients (plat_id, ingredient_id, obligatoire) VALUES
((SELECT id FROM plats WHERE nom = 'Regina'), (SELECT id FROM ingredients WHERE nom = 'Sauce tomate'), true),
((SELECT id FROM plats WHERE nom = 'Regina'), (SELECT id FROM ingredients WHERE nom = 'Mozzarella'), true),
((SELECT id FROM plats WHERE nom = 'Regina'), (SELECT id FROM ingredients WHERE nom = 'Jambon'), true),
((SELECT id FROM plats WHERE nom = 'Regina'), (SELECT id FROM ingredients WHERE nom = 'Champignons'), true);

-- Quattro Formaggi
INSERT INTO plat_ingredients (plat_id, ingredient_id, obligatoire) VALUES
((SELECT id FROM plats WHERE nom = 'Quattro Formaggi'), (SELECT id FROM ingredients WHERE nom = 'Mozzarella'), true),
((SELECT id FROM plats WHERE nom = 'Quattro Formaggi'), (SELECT id FROM ingredients WHERE nom = 'Gorgonzola'), true),
((SELECT id FROM plats WHERE nom = 'Quattro Formaggi'), (SELECT id FROM ingredients WHERE nom = 'Parmesan'), true),
((SELECT id FROM plats WHERE nom = 'Quattro Formaggi'), (SELECT id FROM ingredients WHERE nom = 'Chèvre'), true); 