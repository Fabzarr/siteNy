-- Nettoyage des données existantes
DELETE FROM plat_ingredients;
DELETE FROM ingredients;
DELETE FROM plats;
DELETE FROM categories;

-- Réinitialisation des séquences
ALTER SEQUENCE categories_id_seq RESTART WITH 1;
ALTER SEQUENCE plats_id_seq RESTART WITH 1;
ALTER SEQUENCE ingredients_id_seq RESTART WITH 1;
ALTER SEQUENCE plat_ingredients_id_seq RESTART WITH 1;

-- Insertion des catégories avec récupération des IDs
WITH inserted_categories AS (
  INSERT INTO categories (nom, slug, description, ordre_affichage) VALUES
  ('PETITES FAIMS', 'petites-faims', 'Entrées & Apéritifs', 1),
  ('A PARTAGER', 'a-partager', 'Plats à partager entre amis', 2),
  ('NOS PIZZAS', 'nos-pizzas', 'Pizzas artisanales au feu de bois', 3),
  ('NOS BELLES SALADES', 'nos-salades', 'Salades fraîches et copieuses', 4),
  ('NOS PÂTES', 'nos-pates', 'Pâtes italiennes maison', 5),
  ('NOS HAMBURGERS & TARTARE', 'nos-burgers', 'Burgers gourmets et tartares', 6),
  ('NOS VIANDES & POISSON', 'nos-viandes', 'Viandes et poissons de qualité', 7),
  ('NOS DESSERTS', 'nos-desserts', 'Desserts maison et gourmandises', 8),
  ('LA CARTE DES VINS', 'carte-des-vins', 'Sélection de vins français et italiens', 9)
  RETURNING id, nom
)
-- Insertion des plats en utilisant les IDs des catégories
INSERT INTO plats (nom, description, prix, categorie_id, ordre_affichage) 
SELECT p.nom, p.description, p.prix, c.id, p.ordre
FROM (
  VALUES
    -- PETITES FAIMS
    ('Bruschetta', 'Pain grillé, tomates, basilic, huile d''olive', 7.00, 'PETITES FAIMS', 1),
    ('Focaccia', 'Pain italien aux herbes et huile d''olive', 6.00, 'PETITES FAIMS', 2),
    ('Olives Marinées', 'Assortiment d''olives marinées aux herbes', 5.00, 'PETITES FAIMS', 3),
    ('Soupe du Jour', 'Préparée avec des légumes frais de saison', 8.00, 'PETITES FAIMS', 4),
    ('Carpaccio de Bœuf', 'Fines tranches de bœuf, parmesan, roquette', 12.00, 'PETITES FAIMS', 5),
    ('Arancini', 'Boulettes de risotto farcies, sauce tomate', 8.00, 'PETITES FAIMS', 6),
    
    -- A PARTAGER
    ('Antipasti', 'Assortiment de charcuteries et fromages italiens', 15.00, 'A PARTAGER', 1),
    ('Fritto Misto', 'Assortiment de fruits de mer frits', 14.00, 'A PARTAGER', 2),
    ('Plateau de Fromages', 'Sélection de fromages italiens et français', 16.00, 'A PARTAGER', 3),
    ('Calamars Frits', 'Servis avec sauce tartare maison', 13.00, 'A PARTAGER', 4),
    ('Planche Mixte', 'Charcuterie, fromages, légumes grillés', 18.00, 'A PARTAGER', 5),

    -- PIZZAS
    ('Margherita', 'Sauce tomate, mozzarella, basilic frais', 12.00, 'NOS PIZZAS', 1),
    ('Regina', 'Sauce tomate, mozzarella, jambon, champignons', 14.00, 'NOS PIZZAS', 2),
    ('Quattro Formaggi', 'Mozzarella, gorgonzola, parmesan, chèvre', 15.00, 'NOS PIZZAS', 3),
    ('Diavola', 'Sauce tomate, mozzarella, salami piquant', 15.00, 'NOS PIZZAS', 4),
    ('Capricciosa', 'Sauce tomate, mozzarella, jambon, champignons, artichauts, olives', 16.00, 'NOS PIZZAS', 5),
    ('Napolitaine', 'Sauce tomate, mozzarella, anchois, câpres, olives', 14.00, 'NOS PIZZAS', 6),
    ('Calzone', 'Pizza soufflée farcie tomate, mozzarella, jambon', 16.00, 'NOS PIZZAS', 7),
    ('Végétarienne', 'Légumes grillés de saison, mozzarella', 15.00, 'NOS PIZZAS', 8),

    -- SALADES
    ('César', 'Laitue romaine, poulet grillé, parmesan, croûtons', 12.00, 'NOS BELLES SALADES', 1),
    ('Niçoise', 'Thon, olives, œufs, anchois, tomates', 13.00, 'NOS BELLES SALADES', 2),
    ('Chèvre Chaud', 'Mesclun, toasts de chèvre, miel, noix', 14.00, 'NOS BELLES SALADES', 3),
    ('Italienne', 'Roquette, tomates séchées, mozzarella, jambon cru', 13.00, 'NOS BELLES SALADES', 4),
    ('Grecque', 'Feta, concombre, olives, oignons rouges', 12.00, 'NOS BELLES SALADES', 5),

    -- PÂTES
    ('Carbonara', 'Spaghetti, œuf, pecorino, guanciale', 13.00, 'NOS PÂTES', 1),
    ('Bolognaise', 'Tagliatelles, sauce bolognaise maison', 12.00, 'NOS PÂTES', 2),
    ('Arrabiata', 'Penne, sauce tomate piquante, ail', 11.00, 'NOS PÂTES', 3),
    ('Frutti di Mare', 'Linguine aux fruits de mer', 16.00, 'NOS PÂTES', 4),
    ('Pesto', 'Trofie au pesto de basilic frais', 12.00, 'NOS PÂTES', 5),
    ('Quatre Fromages', 'Penne, crème, assortiment de fromages', 14.00, 'NOS PÂTES', 6),

    -- BURGERS
    ('Classic Burger', 'Bœuf, cheddar, salade, tomate, oignon', 14.00, 'NOS HAMBURGERS & TARTARE', 1),
    ('Chicken Burger', 'Poulet croustillant, bacon, avocat', 13.00, 'NOS HAMBURGERS & TARTARE', 2),
    ('Veggie Burger', 'Steak végétal, légumes grillés', 13.00, 'NOS HAMBURGERS & TARTARE', 3),
    ('Italian Burger', 'Bœuf, mozzarella, pesto, tomates séchées', 15.00, 'NOS HAMBURGERS & TARTARE', 4),
    ('Double Cheese', 'Double steak, double cheddar', 16.00, 'NOS HAMBURGERS & TARTARE', 5),

    -- VIANDES & POISSON
    ('Entrecôte', 'Entrecôte grillée, sauce au choix', 22.00, 'NOS VIANDES & POISSON', 1),
    ('Scaloppine', 'Escalope de veau à la milanaise', 18.00, 'NOS VIANDES & POISSON', 2),
    ('Tagliata', 'Fines tranches de bœuf, roquette, parmesan', 24.00, 'NOS VIANDES & POISSON', 3),
    ('Côte de Bœuf', 'Pour 2 personnes, environ 1kg', 65.00, 'NOS VIANDES & POISSON', 4),
    ('Filet de Bar', 'Filet de bar grillé, légumes de saison', 20.00, 'NOS VIANDES & POISSON', 5),

    -- DESSERTS
    ('Tiramisu', 'Le classique italien au café et mascarpone', 8.00, 'NOS DESSERTS', 1),
    ('Panna Cotta', 'Crème vanille, coulis de fruits rouges', 7.00, 'NOS DESSERTS', 2),
    ('Fondant au Chocolat', 'Cœur coulant, glace vanille', 9.00, 'NOS DESSERTS', 3),
    ('Crème Brûlée', 'À la vanille de Madagascar', 8.00, 'NOS DESSERTS', 4),
    ('Café Gourmand', 'Café et assortiment de mignardises', 9.00, 'NOS DESSERTS', 5),
    ('Profiteroles', 'Choux, glace vanille, chocolat chaud', 9.00, 'NOS DESSERTS', 6),

    -- VINS
    ('Champagne Moët & Chandon', 'Brut Impérial, notes de pomme verte et d''agrumes', 85.00, 'LA CARTE DES VINS', 1),
    ('Champagne Veuve Clicquot', 'Brut Carte Jaune, arômes de fruits blancs et brioche', 90.00, 'LA CARTE DES VINS', 2),
    ('Chianti Classico', 'Vin rouge toscan, notes de cerises et d''épices', 35.00, 'LA CARTE DES VINS', 3),
    ('Pinot Grigio', 'Vin blanc sec, arômes de fruits et minéralité', 28.00, 'LA CARTE DES VINS', 4),
    ('Prosecco', 'Vin pétillant, notes florales et de pomme', 32.00, 'LA CARTE DES VINS', 5),
    ('Bordeaux Saint-Émilion', 'Vin rouge corsé, notes de fruits noirs et de chêne', 45.00, 'LA CARTE DES VINS', 6),
    ('Chablis', 'Vin blanc sec, minéral avec notes d''agrumes', 38.00, 'LA CARTE DES VINS', 7),
    ('Côtes du Rhône', 'Vin rouge fruité et épicé', 30.00, 'LA CARTE DES VINS', 8),
    ('Sancerre', 'Vin blanc vif, notes d''agrumes et de pierre à fusil', 36.00, 'LA CARTE DES VINS', 9),
    ('Châteauneuf-du-Pape', 'Vin rouge puissant, notes de fruits mûrs et d''épices', 55.00, 'LA CARTE DES VINS', 10)
) AS p(nom, description, prix, categorie_nom, ordre)
JOIN inserted_categories c ON c.nom = p.categorie_nom;

-- Insertion des ingrédients
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
WITH pizza_ingredients AS (
  SELECT p.id as plat_id, i.id as ingredient_id, p.nom as plat_nom, i.nom as ingredient_nom
  FROM plats p
  CROSS JOIN ingredients i
  WHERE p.nom IN ('Margherita', 'Regina', 'Quattro Formaggi')
)
INSERT INTO plat_ingredients (plat_id, ingredient_id, obligatoire)
SELECT pi.plat_id, pi.ingredient_id, true
FROM pizza_ingredients pi
WHERE 
  (pi.plat_nom = 'Margherita' AND pi.ingredient_nom IN ('Sauce tomate', 'Mozzarella', 'Basilic frais'))
  OR (pi.plat_nom = 'Regina' AND pi.ingredient_nom IN ('Sauce tomate', 'Mozzarella', 'Jambon', 'Champignons'))
  OR (pi.plat_nom = 'Quattro Formaggi' AND pi.ingredient_nom IN ('Mozzarella', 'Gorgonzola', 'Parmesan', 'Chèvre')); 