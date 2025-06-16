-- SAUVEGARDE NEW YORK CAFÉ - 16/06/2025 03:39:14
-- État: Application 100% fonctionnelle
-- Tests: 128/179 réussis (71.5%)
-- Branche Git: tests-optimized-final

-- Table: categories
-- Colonnes: id, nom, slug, description, ordre_affichage, actif, created_at, updated_at

-- Données pour categories (9 lignes)
INSERT INTO categories (id, nom, slug, description, ordre_affichage, actif, created_at, updated_at) VALUES (1, 'PETITES FAIMS', 'petites-faims', 'Entrées & Apéritifs', 1, true, '2025-06-01T12:16:52.035Z', '2025-06-01T12:16:52.035Z');
INSERT INTO categories (id, nom, slug, description, ordre_affichage, actif, created_at, updated_at) VALUES (2, 'A PARTAGER', 'a-partager', 'Plats à partager entre amis', 2, true, '2025-06-01T12:16:52.035Z', '2025-06-01T12:16:52.035Z');
INSERT INTO categories (id, nom, slug, description, ordre_affichage, actif, created_at, updated_at) VALUES (3, 'NOS PIZZAS', 'nos-pizzas', 'Pizzas artisanales au feu de bois', 3, true, '2025-06-01T12:16:52.035Z', '2025-06-01T12:16:52.035Z');
INSERT INTO categories (id, nom, slug, description, ordre_affichage, actif, created_at, updated_at) VALUES (4, 'NOS BELLES SALADES', 'nos-salades', 'Salades fraîches et copieuses', 4, true, '2025-06-01T12:16:52.035Z', '2025-06-01T12:16:52.035Z');
INSERT INTO categories (id, nom, slug, description, ordre_affichage, actif, created_at, updated_at) VALUES (5, 'NOS PÂTES', 'nos-pates', 'Pâtes italiennes maison', 5, true, '2025-06-01T12:16:52.035Z', '2025-06-01T12:16:52.035Z');
INSERT INTO categories (id, nom, slug, description, ordre_affichage, actif, created_at, updated_at) VALUES (6, 'NOS HAMBURGERS & TARTARE', 'nos-burgers', 'Burgers gourmets et tartares', 6, true, '2025-06-01T12:16:52.035Z', '2025-06-01T12:16:52.035Z');
INSERT INTO categories (id, nom, slug, description, ordre_affichage, actif, created_at, updated_at) VALUES (7, 'NOS VIANDES & POISSON', 'nos-viandes', 'Viandes et poissons de qualité', 7, true, '2025-06-01T12:16:52.035Z', '2025-06-01T12:16:52.035Z');
INSERT INTO categories (id, nom, slug, description, ordre_affichage, actif, created_at, updated_at) VALUES (8, 'NOS DESSERTS', 'nos-desserts', 'Desserts maison et gourmandises', 8, true, '2025-06-01T12:16:52.035Z', '2025-06-01T12:16:52.035Z');
INSERT INTO categories (id, nom, slug, description, ordre_affichage, actif, created_at, updated_at) VALUES (9, 'LA CARTE DES VINS', 'carte-des-vins', 'Sélection de vins français et italiens', 9, true, '2025-06-01T12:16:52.035Z', '2025-06-01T12:16:52.035Z');

-- Table: plats
-- Colonnes: id, nom, description, prix, categorie_id, disponible, photo_url, ordre_affichage, allergenes, date_creation, date_modification

-- Données pour plats (55 lignes)
INSERT INTO plats (id, nom, description, prix, categorie_id, disponible, photo_url, ordre_affichage, allergenes, date_creation, date_modification) VALUES (57, 'chablis', '', '53.00', 9, true, NULL, 11, , '2025-06-02T02:52:50.713Z', '2025-06-02T02:52:50.713Z');
INSERT INTO plats (id, nom, description, prix, categorie_id, disponible, photo_url, ordre_affichage, allergenes, date_creation, date_modification) VALUES (60, 'blahh', 'rouget, citron, melon, fleurs', '12.00', 1, true, NULL, 8, NULL, '2025-06-03T23:03:42.525Z', '2025-06-03T23:03:57.518Z');
INSERT INTO plats (id, nom, description, prix, categorie_id, disponible, photo_url, ordre_affichage, allergenes, date_creation, date_modification) VALUES (10, 'Calamars Frits', 'Servis avec sauce tartare maison', '13.00', 2, true, NULL, 4, NULL, '2025-06-01T12:16:52.035Z', '2025-06-01T12:16:52.035Z');
INSERT INTO plats (id, nom, description, prix, categorie_id, disponible, photo_url, ordre_affichage, allergenes, date_creation, date_modification) VALUES (11, 'Planche Mixte', 'Charcuterie, fromages, légumes grillés', '18.00', 2, true, NULL, 5, NULL, '2025-06-01T12:16:52.035Z', '2025-06-01T12:16:52.035Z');
INSERT INTO plats (id, nom, description, prix, categorie_id, disponible, photo_url, ordre_affichage, allergenes, date_creation, date_modification) VALUES (12, 'Margherita', 'Sauce tomate, mozzarella, basilic frais', '12.00', 3, true, NULL, 1, NULL, '2025-06-01T12:16:52.035Z', '2025-06-01T12:16:52.035Z');
INSERT INTO plats (id, nom, description, prix, categorie_id, disponible, photo_url, ordre_affichage, allergenes, date_creation, date_modification) VALUES (13, 'Regina', 'Sauce tomate, mozzarella, jambon, champignons', '14.00', 3, true, NULL, 2, NULL, '2025-06-01T12:16:52.035Z', '2025-06-01T12:16:52.035Z');
INSERT INTO plats (id, nom, description, prix, categorie_id, disponible, photo_url, ordre_affichage, allergenes, date_creation, date_modification) VALUES (14, 'Quattro Formaggi', 'Mozzarella, gorgonzola, parmesan, chèvre', '15.00', 3, true, NULL, 3, NULL, '2025-06-01T12:16:52.035Z', '2025-06-01T12:16:52.035Z');
INSERT INTO plats (id, nom, description, prix, categorie_id, disponible, photo_url, ordre_affichage, allergenes, date_creation, date_modification) VALUES (15, 'Diavola', 'Sauce tomate, mozzarella, salami piquant', '15.00', 3, true, NULL, 4, NULL, '2025-06-01T12:16:52.035Z', '2025-06-01T12:16:52.035Z');
INSERT INTO plats (id, nom, description, prix, categorie_id, disponible, photo_url, ordre_affichage, allergenes, date_creation, date_modification) VALUES (16, 'Capricciosa', 'Sauce tomate, mozzarella, jambon, champignons, artichauts, olives', '16.00', 3, true, NULL, 5, NULL, '2025-06-01T12:16:52.035Z', '2025-06-01T12:16:52.035Z');
INSERT INTO plats (id, nom, description, prix, categorie_id, disponible, photo_url, ordre_affichage, allergenes, date_creation, date_modification) VALUES (17, 'Napolitaine', 'Sauce tomate, mozzarella, anchois, câpres, olives', '14.00', 3, true, NULL, 6, NULL, '2025-06-01T12:16:52.035Z', '2025-06-01T12:16:52.035Z');
INSERT INTO plats (id, nom, description, prix, categorie_id, disponible, photo_url, ordre_affichage, allergenes, date_creation, date_modification) VALUES (18, 'Calzone', 'Pizza soufflée farcie tomate, mozzarella, jambon', '16.00', 3, true, NULL, 7, NULL, '2025-06-01T12:16:52.035Z', '2025-06-01T12:16:52.035Z');
INSERT INTO plats (id, nom, description, prix, categorie_id, disponible, photo_url, ordre_affichage, allergenes, date_creation, date_modification) VALUES (19, 'Végétarienne', 'Légumes grillés de saison, mozzarella', '15.00', 3, true, NULL, 8, NULL, '2025-06-01T12:16:52.035Z', '2025-06-01T12:16:52.035Z');
INSERT INTO plats (id, nom, description, prix, categorie_id, disponible, photo_url, ordre_affichage, allergenes, date_creation, date_modification) VALUES (20, 'César', 'Laitue romaine, poulet grillé, parmesan, croûtons', '12.00', 4, true, NULL, 1, NULL, '2025-06-01T12:16:52.035Z', '2025-06-01T12:16:52.035Z');
INSERT INTO plats (id, nom, description, prix, categorie_id, disponible, photo_url, ordre_affichage, allergenes, date_creation, date_modification) VALUES (21, 'Niçoise', 'Thon, olives, œufs, anchois, tomates', '13.00', 4, true, NULL, 2, NULL, '2025-06-01T12:16:52.035Z', '2025-06-01T12:16:52.035Z');
INSERT INTO plats (id, nom, description, prix, categorie_id, disponible, photo_url, ordre_affichage, allergenes, date_creation, date_modification) VALUES (22, 'Chèvre Chaud', 'Mesclun, toasts de chèvre, miel, noix', '14.00', 4, true, NULL, 3, NULL, '2025-06-01T12:16:52.035Z', '2025-06-01T12:16:52.035Z');
INSERT INTO plats (id, nom, description, prix, categorie_id, disponible, photo_url, ordre_affichage, allergenes, date_creation, date_modification) VALUES (23, 'Italienne', 'Roquette, tomates séchées, mozzarella, jambon cru', '13.00', 4, true, NULL, 4, NULL, '2025-06-01T12:16:52.035Z', '2025-06-01T12:16:52.035Z');
INSERT INTO plats (id, nom, description, prix, categorie_id, disponible, photo_url, ordre_affichage, allergenes, date_creation, date_modification) VALUES (24, 'Grecque', 'Feta, concombre, olives, oignons rouges', '12.00', 4, true, NULL, 5, NULL, '2025-06-01T12:16:52.035Z', '2025-06-01T12:16:52.035Z');
INSERT INTO plats (id, nom, description, prix, categorie_id, disponible, photo_url, ordre_affichage, allergenes, date_creation, date_modification) VALUES (25, 'Carbonara', 'Spaghetti, œuf, pecorino, guanciale', '13.00', 5, true, NULL, 1, NULL, '2025-06-01T12:16:52.035Z', '2025-06-01T12:16:52.035Z');
INSERT INTO plats (id, nom, description, prix, categorie_id, disponible, photo_url, ordre_affichage, allergenes, date_creation, date_modification) VALUES (26, 'Bolognaise', 'Tagliatelles, sauce bolognaise maison', '12.00', 5, true, NULL, 2, NULL, '2025-06-01T12:16:52.035Z', '2025-06-01T12:16:52.035Z');
INSERT INTO plats (id, nom, description, prix, categorie_id, disponible, photo_url, ordre_affichage, allergenes, date_creation, date_modification) VALUES (27, 'Arrabiata', 'Penne, sauce tomate piquante, ail', '11.00', 5, true, NULL, 3, NULL, '2025-06-01T12:16:52.035Z', '2025-06-01T12:16:52.035Z');
INSERT INTO plats (id, nom, description, prix, categorie_id, disponible, photo_url, ordre_affichage, allergenes, date_creation, date_modification) VALUES (28, 'Frutti di Mare', 'Linguine aux fruits de mer', '16.00', 5, true, NULL, 4, NULL, '2025-06-01T12:16:52.035Z', '2025-06-01T12:16:52.035Z');
INSERT INTO plats (id, nom, description, prix, categorie_id, disponible, photo_url, ordre_affichage, allergenes, date_creation, date_modification) VALUES (29, 'Pesto', 'Trofie au pesto de basilic frais', '12.00', 5, true, NULL, 5, NULL, '2025-06-01T12:16:52.035Z', '2025-06-01T12:16:52.035Z');
INSERT INTO plats (id, nom, description, prix, categorie_id, disponible, photo_url, ordre_affichage, allergenes, date_creation, date_modification) VALUES (30, 'Quatre Fromages', 'Penne, crème, assortiment de fromages', '14.00', 5, true, NULL, 6, NULL, '2025-06-01T12:16:52.035Z', '2025-06-01T12:16:52.035Z');
INSERT INTO plats (id, nom, description, prix, categorie_id, disponible, photo_url, ordre_affichage, allergenes, date_creation, date_modification) VALUES (31, 'Classic Burger', 'Bœuf, cheddar, salade, tomate, oignon', '14.00', 6, true, NULL, 1, NULL, '2025-06-01T12:16:52.035Z', '2025-06-01T12:16:52.035Z');
INSERT INTO plats (id, nom, description, prix, categorie_id, disponible, photo_url, ordre_affichage, allergenes, date_creation, date_modification) VALUES (32, 'Chicken Burger', 'Poulet croustillant, bacon, avocat', '13.00', 6, true, NULL, 2, NULL, '2025-06-01T12:16:52.035Z', '2025-06-01T12:16:52.035Z');
INSERT INTO plats (id, nom, description, prix, categorie_id, disponible, photo_url, ordre_affichage, allergenes, date_creation, date_modification) VALUES (33, 'Veggie Burger', 'Steak végétal, légumes grillés', '13.00', 6, true, NULL, 3, NULL, '2025-06-01T12:16:52.035Z', '2025-06-01T12:16:52.035Z');
INSERT INTO plats (id, nom, description, prix, categorie_id, disponible, photo_url, ordre_affichage, allergenes, date_creation, date_modification) VALUES (34, 'Italian Burger', 'Bœuf, mozzarella, pesto, tomates séchées', '15.00', 6, true, NULL, 4, NULL, '2025-06-01T12:16:52.035Z', '2025-06-01T12:16:52.035Z');
INSERT INTO plats (id, nom, description, prix, categorie_id, disponible, photo_url, ordre_affichage, allergenes, date_creation, date_modification) VALUES (35, 'Double Cheese', 'Double steak, double cheddar', '16.00', 6, true, NULL, 5, NULL, '2025-06-01T12:16:52.035Z', '2025-06-01T12:16:52.035Z');
INSERT INTO plats (id, nom, description, prix, categorie_id, disponible, photo_url, ordre_affichage, allergenes, date_creation, date_modification) VALUES (36, 'Entrecôte', 'Entrecôte grillée, sauce au choix', '22.00', 7, true, NULL, 1, NULL, '2025-06-01T12:16:52.035Z', '2025-06-01T12:16:52.035Z');
INSERT INTO plats (id, nom, description, prix, categorie_id, disponible, photo_url, ordre_affichage, allergenes, date_creation, date_modification) VALUES (37, 'Scaloppine', 'Escalope de veau à la milanaise', '18.00', 7, true, NULL, 2, NULL, '2025-06-01T12:16:52.035Z', '2025-06-01T12:16:52.035Z');
INSERT INTO plats (id, nom, description, prix, categorie_id, disponible, photo_url, ordre_affichage, allergenes, date_creation, date_modification) VALUES (38, 'Tagliata', 'Fines tranches de bœuf, roquette, parmesan', '24.00', 7, true, NULL, 3, NULL, '2025-06-01T12:16:52.035Z', '2025-06-01T12:16:52.035Z');
INSERT INTO plats (id, nom, description, prix, categorie_id, disponible, photo_url, ordre_affichage, allergenes, date_creation, date_modification) VALUES (39, 'Côte de Bœuf', 'Pour 2 personnes, environ 1kg', '65.00', 7, true, NULL, 4, NULL, '2025-06-01T12:16:52.035Z', '2025-06-01T12:16:52.035Z');
INSERT INTO plats (id, nom, description, prix, categorie_id, disponible, photo_url, ordre_affichage, allergenes, date_creation, date_modification) VALUES (40, 'Filet de Bar', 'Filet de bar grillé, légumes de saison', '20.00', 7, true, NULL, 5, NULL, '2025-06-01T12:16:52.035Z', '2025-06-01T12:16:52.035Z');
INSERT INTO plats (id, nom, description, prix, categorie_id, disponible, photo_url, ordre_affichage, allergenes, date_creation, date_modification) VALUES (41, 'Tiramisu', 'Le classique italien au café et mascarpone', '8.00', 8, true, NULL, 1, NULL, '2025-06-01T12:16:52.035Z', '2025-06-01T12:16:52.035Z');
INSERT INTO plats (id, nom, description, prix, categorie_id, disponible, photo_url, ordre_affichage, allergenes, date_creation, date_modification) VALUES (42, 'Panna Cotta', 'Crème vanille, coulis de fruits rouges', '7.00', 8, true, NULL, 2, NULL, '2025-06-01T12:16:52.035Z', '2025-06-01T12:16:52.035Z');
INSERT INTO plats (id, nom, description, prix, categorie_id, disponible, photo_url, ordre_affichage, allergenes, date_creation, date_modification) VALUES (43, 'Fondant au Chocolat', 'Cœur coulant, glace vanille', '9.00', 8, true, NULL, 3, NULL, '2025-06-01T12:16:52.035Z', '2025-06-01T12:16:52.035Z');
INSERT INTO plats (id, nom, description, prix, categorie_id, disponible, photo_url, ordre_affichage, allergenes, date_creation, date_modification) VALUES (44, 'Crème Brûlée', 'À la vanille de Madagascar', '8.00', 8, true, NULL, 4, NULL, '2025-06-01T12:16:52.035Z', '2025-06-01T12:16:52.035Z');
INSERT INTO plats (id, nom, description, prix, categorie_id, disponible, photo_url, ordre_affichage, allergenes, date_creation, date_modification) VALUES (45, 'Café Gourmand', 'Café et assortiment de mignardises', '9.00', 8, true, NULL, 5, NULL, '2025-06-01T12:16:52.035Z', '2025-06-01T12:16:52.035Z');
INSERT INTO plats (id, nom, description, prix, categorie_id, disponible, photo_url, ordre_affichage, allergenes, date_creation, date_modification) VALUES (46, 'Profiteroles', 'Choux, glace vanille, chocolat chaud', '9.00', 8, true, NULL, 6, NULL, '2025-06-01T12:16:52.035Z', '2025-06-01T12:16:52.035Z');
INSERT INTO plats (id, nom, description, prix, categorie_id, disponible, photo_url, ordre_affichage, allergenes, date_creation, date_modification) VALUES (50, 'Pinot Grigio', 'Vin blanc sec, arômes de fruits et minéralité', '28.00', 9, true, NULL, 4, NULL, '2025-06-01T12:16:52.035Z', '2025-06-01T12:16:52.035Z');
INSERT INTO plats (id, nom, description, prix, categorie_id, disponible, photo_url, ordre_affichage, allergenes, date_creation, date_modification) VALUES (51, 'Prosecco', 'Vin pétillant, notes florales et de pomme', '32.00', 9, true, NULL, 5, NULL, '2025-06-01T12:16:52.035Z', '2025-06-01T12:16:52.035Z');
INSERT INTO plats (id, nom, description, prix, categorie_id, disponible, photo_url, ordre_affichage, allergenes, date_creation, date_modification) VALUES (52, 'Bordeaux Saint-Émilion', 'Vin rouge corsé, notes de fruits noirs et de chêne', '45.00', 9, true, NULL, 6, NULL, '2025-06-01T12:16:52.035Z', '2025-06-01T12:16:52.035Z');
INSERT INTO plats (id, nom, description, prix, categorie_id, disponible, photo_url, ordre_affichage, allergenes, date_creation, date_modification) VALUES (53, 'Chablis', 'Vin blanc sec, minéral avec notes d''agrumes', '38.00', 9, true, NULL, 7, NULL, '2025-06-01T12:16:52.035Z', '2025-06-01T12:16:52.035Z');
INSERT INTO plats (id, nom, description, prix, categorie_id, disponible, photo_url, ordre_affichage, allergenes, date_creation, date_modification) VALUES (54, 'Côtes du Rhône', 'Vin rouge fruité et épicé', '30.00', 9, true, NULL, 8, NULL, '2025-06-01T12:16:52.035Z', '2025-06-01T12:16:52.035Z');
INSERT INTO plats (id, nom, description, prix, categorie_id, disponible, photo_url, ordre_affichage, allergenes, date_creation, date_modification) VALUES (55, 'Sancerre', 'Vin blanc vif, notes d''agrumes et de pierre à fusil', '36.00', 9, true, NULL, 9, NULL, '2025-06-01T12:16:52.035Z', '2025-06-01T12:16:52.035Z');
INSERT INTO plats (id, nom, description, prix, categorie_id, disponible, photo_url, ordre_affichage, allergenes, date_creation, date_modification) VALUES (56, 'Châteauneuf-du-Pape', 'Vin rouge puissant, notes de fruits mûrs et d''épices', '55.00', 9, true, NULL, 10, NULL, '2025-06-01T12:16:52.035Z', '2025-06-01T12:16:52.035Z');
INSERT INTO plats (id, nom, description, prix, categorie_id, disponible, photo_url, ordre_affichage, allergenes, date_creation, date_modification) VALUES (48, 'Champagne Veuve Clicquot', 'Brut Carte Jaune, arômes de fruits blancs et brioche', '90.00', 9, true, NULL, 3, , '2025-06-01T12:16:52.035Z', '2025-06-02T02:33:10.422Z');
INSERT INTO plats (id, nom, description, prix, categorie_id, disponible, photo_url, ordre_affichage, allergenes, date_creation, date_modification) VALUES (6, 'Arancini', 'Boulettes de risotto farcies, sauce tomate', '8.00', 1, true, NULL, 6, NULL, '2025-06-01T12:16:52.035Z', '2025-06-02T04:22:15.971Z');
INSERT INTO plats (id, nom, description, prix, categorie_id, disponible, photo_url, ordre_affichage, allergenes, date_creation, date_modification) VALUES (4, 'Azop', 'Préparée avec des légumes frais de saison', '12.00', 1, true, NULL, 1, NULL, '2025-06-01T12:16:52.035Z', '2025-06-02T04:24:49.222Z');
INSERT INTO plats (id, nom, description, prix, categorie_id, disponible, photo_url, ordre_affichage, allergenes, date_creation, date_modification) VALUES (5, 'Carpaccio de Bœuf', 'Fines tranches de bœuf, parmesan, roquette', '12.00', 1, true, NULL, 5, , '2025-06-01T12:16:52.035Z', '2025-06-02T04:24:49.222Z');
INSERT INTO plats (id, nom, description, prix, categorie_id, disponible, photo_url, ordre_affichage, allergenes, date_creation, date_modification) VALUES (8, 'Fritto Misto', 'Assortiment de fruits de mer frits', '14.00', 2, true, NULL, 2, , '2025-06-01T12:16:52.035Z', '2025-06-02T04:26:23.566Z');
INSERT INTO plats (id, nom, description, prix, categorie_id, disponible, photo_url, ordre_affichage, allergenes, date_creation, date_modification) VALUES (49, 'Chianti Classico', 'Vin rouge toscan, notes de cerises noires et d''épices
VINS BLANC - Italie', '35.00', 9, true, NULL, 2, NULL, '2025-06-01T12:16:52.035Z', '2025-06-03T23:13:02.577Z');
INSERT INTO plats (id, nom, description, prix, categorie_id, disponible, photo_url, ordre_affichage, allergenes, date_creation, date_modification) VALUES (61, 'Diane', 'Vin rouge élégant avec des notes de fruits rouges', '42.00', 9, true, NULL, 1, NULL, '2025-06-03T23:30:15.644Z', '2025-06-03T23:30:15.644Z');
INSERT INTO plats (id, nom, description, prix, categorie_id, disponible, photo_url, ordre_affichage, allergenes, date_creation, date_modification) VALUES (62, 'Franck', 'Vin blanc sec et fruité', '38.00', 9, true, NULL, 12, NULL, '2025-06-03T23:30:15.651Z', '2025-06-03T23:30:15.651Z');
INSERT INTO plats (id, nom, description, prix, categorie_id, disponible, photo_url, ordre_affichage, allergenes, date_creation, date_modification) VALUES (63, 'Victor', 'Vin rouge puissant et charpenté', '45.00', 9, true, NULL, 13, NULL, '2025-06-03T23:30:15.664Z', '2025-06-03T23:30:15.664Z');

-- Table: vins
-- Colonnes: id, nom, origine_vin, type_vin, description, categorie_id, disponible, photo_url, ordre_affichage, date_creation, date_modification

-- Données pour vins (19 lignes)
INSERT INTO vins (id, nom, origine_vin, type_vin, description, categorie_id, disponible, photo_url, ordre_affichage, date_creation, date_modification) VALUES (1, 'chablis', 'France', 'VINS ROUGE', '', 9, true, NULL, 12, '2025-06-02T03:22:16.630Z', '2025-06-02T03:37:49.232Z');
INSERT INTO vins (id, nom, origine_vin, type_vin, description, categorie_id, disponible, photo_url, ordre_affichage, date_creation, date_modification) VALUES (8, 'Châteauneuf-du-Pape', 'France', 'VINS ROUGE', 'Vin rouge puissant, notes de fruits mûrs et d''épices', 9, true, NULL, 11, '2025-06-02T03:22:16.630Z', '2025-06-02T03:37:51.320Z');
INSERT INTO vins (id, nom, origine_vin, type_vin, description, categorie_id, disponible, photo_url, ordre_affichage, date_creation, date_modification) VALUES (6, 'Côtes du Rhône', 'France', 'VINS ROUGE', 'Vin rouge fruité et épicé', 9, true, NULL, 9, '2025-06-02T03:22:16.630Z', '2025-06-02T03:37:54.514Z');
INSERT INTO vins (id, nom, origine_vin, type_vin, description, categorie_id, disponible, photo_url, ordre_affichage, date_creation, date_modification) VALUES (4, 'Bordeaux Saint-Émilion', 'France', 'VINS ROUGE', 'Vin rouge corsé, notes de fruits noirs et de chêne', 9, true, NULL, 7, '2025-06-02T03:22:16.630Z', '2025-06-02T03:37:57.869Z');
INSERT INTO vins (id, nom, origine_vin, type_vin, description, categorie_id, disponible, photo_url, ordre_affichage, date_creation, date_modification) VALUES (5, 'Chablis', 'France', 'VINS BLANC', 'Vin blanc sec, minéral avec notes d''agrumes', 9, true, NULL, 8, '2025-06-02T03:22:16.630Z', '2025-06-02T14:20:48.468Z');
INSERT INTO vins (id, nom, origine_vin, type_vin, description, categorie_id, disponible, photo_url, ordre_affichage, date_creation, date_modification) VALUES (12, 'Franck', 'France', 'VINS BLANC', 'Vin blanc français de qualité', 9, true, NULL, 13, '2025-06-02T12:37:23.675Z', '2025-06-02T13:27:08.372Z');
INSERT INTO vins (id, nom, origine_vin, type_vin, description, categorie_id, disponible, photo_url, ordre_affichage, date_creation, date_modification) VALUES (14, 'Victor', 'France', 'CHAMPAGNE', 'Champagne français de qualité supérieure', 9, true, NULL, 14, '2025-06-02T13:11:31.232Z', '2025-06-02T13:37:35.643Z');
INSERT INTO vins (id, nom, origine_vin, type_vin, description, categorie_id, disponible, photo_url, ordre_affichage, date_creation, date_modification) VALUES (7, 'Sancerre', 'France', 'VINS BLANC', 'Vin blanc vif, notes d''agrumes et de pierre à fusil', 9, true, NULL, 10, '2025-06-02T03:22:16.630Z', '2025-06-02T14:20:48.473Z');
INSERT INTO vins (id, nom, origine_vin, type_vin, description, categorie_id, disponible, photo_url, ordre_affichage, date_creation, date_modification) VALUES (18, 'Chantal', 'France', 'VINS BLANC', '', 9, true, '', 15, '2025-06-02T13:45:39.558Z', '2025-06-02T13:45:39.558Z');
INSERT INTO vins (id, nom, origine_vin, type_vin, description, categorie_id, disponible, photo_url, ordre_affichage, date_creation, date_modification) VALUES (2, 'Pinot Grigio', 'Italie', 'VINS BLANC', 'Vin blanc sec italien, arômes de fruits et minéralité', 9, true, NULL, 5, '2025-06-02T03:22:16.630Z', '2025-06-02T13:49:11.969Z');
INSERT INTO vins (id, nom, origine_vin, type_vin, description, categorie_id, disponible, photo_url, ordre_affichage, date_creation, date_modification) VALUES (10, 'Chianti Classico', 'Italie', 'VINS ROUGE', 'Vin rouge toscan, notes de cerises et d''épices', 9, true, NULL, 4, '2025-06-02T03:22:16.630Z', '2025-06-02T13:49:11.998Z');
INSERT INTO vins (id, nom, origine_vin, type_vin, description, categorie_id, disponible, photo_url, ordre_affichage, date_creation, date_modification) VALUES (19, 'Test Vin Valide', 'France', 'VINS ROUGE', 'Test de validation réussi', 9, true, NULL, 16, '2025-06-02T13:52:35.618Z', '2025-06-02T13:52:35.618Z');
INSERT INTO vins (id, nom, origine_vin, type_vin, description, categorie_id, disponible, photo_url, ordre_affichage, date_creation, date_modification) VALUES (20, 'Test Sans Origine', '', 'VINS ROUGE', 'Test de validation', 9, true, NULL, 17, '2025-06-02T13:52:35.640Z', '2025-06-02T13:52:35.640Z');
INSERT INTO vins (id, nom, origine_vin, type_vin, description, categorie_id, disponible, photo_url, ordre_affichage, date_creation, date_modification) VALUES (21, 'Test Sans Type', 'France', '', 'Test de validation', 9, true, NULL, 18, '2025-06-02T13:52:35.645Z', '2025-06-02T13:52:35.645Z');
INSERT INTO vins (id, nom, origine_vin, type_vin, description, categorie_id, disponible, photo_url, ordre_affichage, date_creation, date_modification) VALUES (13, 'Prosecco', 'Italie', 'PÉTILLANT', 'Vin blanc italien, notes florales et de pomme', 9, true, NULL, 5, '2025-06-02T13:09:35.652Z', '2025-06-02T13:54:39.291Z');
INSERT INTO vins (id, nom, origine_vin, type_vin, description, categorie_id, disponible, photo_url, ordre_affichage, date_creation, date_modification) VALUES (9, 'Champagne Veuve Clicquot', 'France', 'CHAMPAGNE', 'Brut Carte Jaune, arômes de fruits blancs et brioche', 9, true, NULL, 3, '2025-06-02T03:22:16.630Z', '2025-06-02T14:20:48.444Z');
INSERT INTO vins (id, nom, origine_vin, type_vin, description, categorie_id, disponible, photo_url, ordre_affichage, date_creation, date_modification) VALUES (11, 'Diane', 'Portugal', 'VINS BLANC', '', 9, true, '', 2, '2025-06-02T03:31:39.763Z', '2025-06-04T00:26:34.742Z');
INSERT INTO vins (id, nom, origine_vin, type_vin, description, categorie_id, disponible, photo_url, ordre_affichage, date_creation, date_modification) VALUES (22, 'Bourgogne', 'France', 'VINS ROUGE', '', 9, true, '', 19, '2025-06-04T14:02:42.215Z', '2025-06-04T14:15:20.686Z');
INSERT INTO vins (id, nom, origine_vin, type_vin, description, categorie_id, disponible, photo_url, ordre_affichage, date_creation, date_modification) VALUES (23, 'Vincent d''or', 'Italie', 'VINS BLANC', '', 9, true, '', 20, '2025-06-04T18:02:11.635Z', '2025-06-04T18:02:11.635Z');

-- Table: vin_variants
-- Colonnes: id, vin_id, volume_vin, contenant_vin, prix, disponible, ordre_affichage, date_creation, date_modification

-- Données pour vin_variants (34 lignes)
INSERT INTO vin_variants (id, vin_id, volume_vin, contenant_vin, prix, disponible, ordre_affichage, date_creation, date_modification) VALUES (1, 1, '75cl', 'Bouteille', '53.00', true, 1, '2025-06-02T03:22:16.630Z', '2025-06-02T03:22:16.630Z');
INSERT INTO vin_variants (id, vin_id, volume_vin, contenant_vin, prix, disponible, ordre_affichage, date_creation, date_modification) VALUES (4, 4, '75cl', 'Bouteille', '45.00', true, 1, '2025-06-02T03:22:16.630Z', '2025-06-02T03:22:16.630Z');
INSERT INTO vin_variants (id, vin_id, volume_vin, contenant_vin, prix, disponible, ordre_affichage, date_creation, date_modification) VALUES (6, 6, '75cl', 'Bouteille', '30.00', true, 1, '2025-06-02T03:22:16.630Z', '2025-06-02T03:22:16.630Z');
INSERT INTO vin_variants (id, vin_id, volume_vin, contenant_vin, prix, disponible, ordre_affichage, date_creation, date_modification) VALUES (8, 8, '75cl', 'Bouteille', '55.00', true, 1, '2025-06-02T03:22:16.630Z', '2025-06-02T03:22:16.630Z');
INSERT INTO vin_variants (id, vin_id, volume_vin, contenant_vin, prix, disponible, ordre_affichage, date_creation, date_modification) VALUES (21, 12, '75cl', 'Bouteille', '28.50', true, 1, '2025-06-02T13:27:08.372Z', '2025-06-02T13:27:08.372Z');
INSERT INTO vin_variants (id, vin_id, volume_vin, contenant_vin, prix, disponible, ordre_affichage, date_creation, date_modification) VALUES (22, 12, '14cl', 'Verre', '7.50', true, 2, '2025-06-02T13:27:08.372Z', '2025-06-02T13:27:08.372Z');
INSERT INTO vin_variants (id, vin_id, volume_vin, contenant_vin, prix, disponible, ordre_affichage, date_creation, date_modification) VALUES (26, 14, '75cl', 'Bouteille', '65.00', true, 1, '2025-06-02T13:37:35.643Z', '2025-06-02T13:37:35.643Z');
INSERT INTO vin_variants (id, vin_id, volume_vin, contenant_vin, prix, disponible, ordre_affichage, date_creation, date_modification) VALUES (27, 14, '14cl', 'Verre', '12.00', true, 2, '2025-06-02T13:37:35.643Z', '2025-06-02T13:37:35.643Z');
INSERT INTO vin_variants (id, vin_id, volume_vin, contenant_vin, prix, disponible, ordre_affichage, date_creation, date_modification) VALUES (32, 18, '14cl', 'Verre', '10.00', true, 1, '2025-06-02T13:45:39.558Z', '2025-06-02T13:45:39.558Z');
INSERT INTO vin_variants (id, vin_id, volume_vin, contenant_vin, prix, disponible, ordre_affichage, date_creation, date_modification) VALUES (33, 18, '25cl', 'Pichet', '16.00', true, 2, '2025-06-02T13:45:39.558Z', '2025-06-02T13:45:39.558Z');
INSERT INTO vin_variants (id, vin_id, volume_vin, contenant_vin, prix, disponible, ordre_affichage, date_creation, date_modification) VALUES (34, 18, '1L', 'Bouteille', '33.00', true, 3, '2025-06-02T13:45:39.558Z', '2025-06-02T13:45:39.558Z');
INSERT INTO vin_variants (id, vin_id, volume_vin, contenant_vin, prix, disponible, ordre_affichage, date_creation, date_modification) VALUES (35, 2, '75cl', 'Bouteille', '28.00', true, 1, '2025-06-02T13:49:11.969Z', '2025-06-02T13:49:11.969Z');
INSERT INTO vin_variants (id, vin_id, volume_vin, contenant_vin, prix, disponible, ordre_affichage, date_creation, date_modification) VALUES (36, 2, '14cl', 'Verre', '6.00', true, 2, '2025-06-02T13:49:11.969Z', '2025-06-02T13:49:11.969Z');
INSERT INTO vin_variants (id, vin_id, volume_vin, contenant_vin, prix, disponible, ordre_affichage, date_creation, date_modification) VALUES (37, 10, '75cl', 'Bouteille', '35.00', true, 1, '2025-06-02T13:49:11.998Z', '2025-06-02T13:49:11.998Z');
INSERT INTO vin_variants (id, vin_id, volume_vin, contenant_vin, prix, disponible, ordre_affichage, date_creation, date_modification) VALUES (38, 10, '14cl', 'Verre', '7.00', true, 2, '2025-06-02T13:49:11.998Z', '2025-06-02T13:49:11.998Z');
INSERT INTO vin_variants (id, vin_id, volume_vin, contenant_vin, prix, disponible, ordre_affichage, date_creation, date_modification) VALUES (39, 19, '75cl', 'Bouteille', '25.00', true, 1, '2025-06-02T13:52:35.618Z', '2025-06-02T13:52:35.618Z');
INSERT INTO vin_variants (id, vin_id, volume_vin, contenant_vin, prix, disponible, ordre_affichage, date_creation, date_modification) VALUES (40, 19, '14cl', 'Verre', '5.00', true, 2, '2025-06-02T13:52:35.618Z', '2025-06-02T13:52:35.618Z');
INSERT INTO vin_variants (id, vin_id, volume_vin, contenant_vin, prix, disponible, ordre_affichage, date_creation, date_modification) VALUES (41, 20, '75cl', 'Bouteille', '25.00', true, 1, '2025-06-02T13:52:35.640Z', '2025-06-02T13:52:35.640Z');
INSERT INTO vin_variants (id, vin_id, volume_vin, contenant_vin, prix, disponible, ordre_affichage, date_creation, date_modification) VALUES (42, 21, '75cl', 'Bouteille', '25.00', true, 1, '2025-06-02T13:52:35.645Z', '2025-06-02T13:52:35.645Z');
INSERT INTO vin_variants (id, vin_id, volume_vin, contenant_vin, prix, disponible, ordre_affichage, date_creation, date_modification) VALUES (43, 13, '75cl', 'Bouteille', '32.00', true, 1, '2025-06-02T13:54:39.291Z', '2025-06-02T13:54:39.291Z');
INSERT INTO vin_variants (id, vin_id, volume_vin, contenant_vin, prix, disponible, ordre_affichage, date_creation, date_modification) VALUES (44, 13, '14cl', 'Verre', '6.50', true, 2, '2025-06-02T13:54:39.291Z', '2025-06-02T13:54:39.291Z');
INSERT INTO vin_variants (id, vin_id, volume_vin, contenant_vin, prix, disponible, ordre_affichage, date_creation, date_modification) VALUES (45, 9, '75cl', 'Bouteille', '90.00', true, 1, '2025-06-02T14:20:48.444Z', '2025-06-02T14:20:48.444Z');
INSERT INTO vin_variants (id, vin_id, volume_vin, contenant_vin, prix, disponible, ordre_affichage, date_creation, date_modification) VALUES (46, 5, '75cl', 'Bouteille', '38.00', true, 1, '2025-06-02T14:20:48.468Z', '2025-06-02T14:20:48.468Z');
INSERT INTO vin_variants (id, vin_id, volume_vin, contenant_vin, prix, disponible, ordre_affichage, date_creation, date_modification) VALUES (47, 7, '75cl', 'Bouteille', '36.00', true, 1, '2025-06-02T14:20:48.473Z', '2025-06-02T14:20:48.473Z');
INSERT INTO vin_variants (id, vin_id, volume_vin, contenant_vin, prix, disponible, ordre_affichage, date_creation, date_modification) VALUES (51, 11, '14cl', 'Verre', '8.00', true, 1, '2025-06-04T00:26:34.742Z', '2025-06-04T00:26:34.742Z');
INSERT INTO vin_variants (id, vin_id, volume_vin, contenant_vin, prix, disponible, ordre_affichage, date_creation, date_modification) VALUES (52, 11, '75cl', 'Pichet', '12.00', true, 2, '2025-06-04T00:26:34.742Z', '2025-06-04T00:26:34.742Z');
INSERT INTO vin_variants (id, vin_id, volume_vin, contenant_vin, prix, disponible, ordre_affichage, date_creation, date_modification) VALUES (53, 11, '1L', 'Bouteille', '22.00', true, 3, '2025-06-04T00:26:34.742Z', '2025-06-04T00:26:34.742Z');
INSERT INTO vin_variants (id, vin_id, volume_vin, contenant_vin, prix, disponible, ordre_affichage, date_creation, date_modification) VALUES (58, 22, '14cl', 'Verre', '6.00', true, 1, '2025-06-04T14:15:20.686Z', '2025-06-04T14:15:20.686Z');
INSERT INTO vin_variants (id, vin_id, volume_vin, contenant_vin, prix, disponible, ordre_affichage, date_creation, date_modification) VALUES (59, 22, '37.5cl', 'Pichet', '10.00', true, 2, '2025-06-04T14:15:20.686Z', '2025-06-04T14:15:20.686Z');
INSERT INTO vin_variants (id, vin_id, volume_vin, contenant_vin, prix, disponible, ordre_affichage, date_creation, date_modification) VALUES (60, 22, '50cl', 'Bouteille', '15.00', true, 3, '2025-06-04T14:15:20.686Z', '2025-06-04T14:15:20.686Z');
INSERT INTO vin_variants (id, vin_id, volume_vin, contenant_vin, prix, disponible, ordre_affichage, date_creation, date_modification) VALUES (61, 22, '1.5L', 'Bouteille', '24.00', true, 4, '2025-06-04T14:15:20.686Z', '2025-06-04T14:15:20.686Z');
INSERT INTO vin_variants (id, vin_id, volume_vin, contenant_vin, prix, disponible, ordre_affichage, date_creation, date_modification) VALUES (62, 23, '14cl', 'Verre', '8.00', true, 1, '2025-06-04T18:02:11.635Z', '2025-06-04T18:02:11.635Z');
INSERT INTO vin_variants (id, vin_id, volume_vin, contenant_vin, prix, disponible, ordre_affichage, date_creation, date_modification) VALUES (63, 23, '37.5cl', 'Pichet', '15.00', true, 2, '2025-06-04T18:02:11.635Z', '2025-06-04T18:02:11.635Z');
INSERT INTO vin_variants (id, vin_id, volume_vin, contenant_vin, prix, disponible, ordre_affichage, date_creation, date_modification) VALUES (64, 23, '1L', 'Bouteille', '22.00', true, 3, '2025-06-04T18:02:11.635Z', '2025-06-04T18:02:11.635Z');

-- Table: reservations
-- Colonnes: id, prenom, nom, email, telephone, date, heure, nombre_personnes, statut, date_creation

-- Données pour reservations (4 lignes)
INSERT INTO reservations (id, prenom, nom, email, telephone, date, heure, nombre_personnes, statut, date_creation) VALUES (1, 'Fabien', 'Richard', 'fabiengrasgarcia@gmail.com', '0650505050', '2025-06-05T22:00:00.000Z', '23:15:00', 3, 'confirmee', '2025-06-04T18:00:05.107Z');
INSERT INTO reservations (id, prenom, nom, email, telephone, date, heure, nombre_personnes, statut, date_creation) VALUES (2, 'paul', 'gras', 'fabiengrasgarcia@gmail.com', '0650505050', '2025-06-05T22:00:00.000Z', '23:30:00', 4, 'confirmee', '2025-06-05T08:21:44.336Z');
INSERT INTO reservations (id, prenom, nom, email, telephone, date, heure, nombre_personnes, statut, date_creation) VALUES (3, 'paul', 'gras', 'fabiengrasgarcia@gmail.com', '0650505050', '2025-06-05T22:00:00.000Z', '23:30:00', 4, 'confirmee', '2025-06-05T08:21:46.346Z');
INSERT INTO reservations (id, prenom, nom, email, telephone, date, heure, nombre_personnes, statut, date_creation) VALUES (4, 'stephane', 'Durant', 'fabiengrasgarcia@gmail.com', '0650525252', '2025-06-16T22:00:00.000Z', '18:45:00', 3, 'confirmee', '2025-06-16T01:05:02.173Z');

-- Table: utilisateurs
-- Colonnes: 

-- ERREUR: Table utilisateurs - la relation « utilisateurs » n'existe pas

-- Séquence: vin_variants_id_seq
SELECT setval('vin_variants_id_seq', 64);

-- Séquence: vins_id_seq
SELECT setval('vins_id_seq', 23);

-- Séquence: categories_vins_id_seq
SELECT setval('categories_vins_id_seq', 1);

-- Séquence: types_vins_id_seq
SELECT setval('types_vins_id_seq', 1);

-- Séquence: service_sizes_id_seq
SELECT setval('service_sizes_id_seq', 1);

-- Séquence: categories_id_seq
SELECT setval('categories_id_seq', 9);

-- Séquence: reservations_id_seq
SELECT setval('reservations_id_seq', 4);

-- Séquence: plats_id_seq
SELECT setval('plats_id_seq', 63);

-- Séquence: ingredients_id_seq
SELECT setval('ingredients_id_seq', 14);

-- Séquence: plat_ingredients_id_seq
SELECT setval('plat_ingredients_id_seq', 11);

