-- Récupérer l'ID de la catégorie des vins
DO $$
DECLARE
  categorie_vins_id INTEGER;
BEGIN
  SELECT id INTO categorie_vins_id FROM categories WHERE slug = 'carte-des-vins';

  -- Insertion des vins
  INSERT INTO vins (nom, categorie_id, types, pays, description) VALUES
  ('Champagne Moët & Chandon', categorie_vins_id, ARRAY['Champagne', 'Brut'], 'France', 'Brut Impérial, notes de pomme verte et d''agrumes'),
  ('Champagne Veuve Clicquot', categorie_vins_id, ARRAY['Champagne', 'Brut'], 'France', 'Brut Carte Jaune, arômes de fruits blancs et brioche'),
  ('Chianti Classico', categorie_vins_id, ARRAY['Rouge', 'Sangiovese'], 'Italie', 'Vin rouge toscan, notes de cerises et d''épices'),
  ('Pinot Grigio', categorie_vins_id, ARRAY['Blanc', 'Pinot Grigio'], 'Italie', 'Vin blanc sec, arômes de fruits et minéralité'),
  ('Prosecco', categorie_vins_id, ARRAY['Pétillant', 'Prosecco'], 'Italie', 'Vin pétillant, notes florales et de pomme'),
  ('Bordeaux Saint-Émilion', categorie_vins_id, ARRAY['Rouge', 'Merlot', 'Cabernet Franc'], 'France', 'Vin rouge corsé, notes de fruits noirs et de chêne'),
  ('Chablis', categorie_vins_id, ARRAY['Blanc', 'Chardonnay'], 'France', 'Vin blanc sec, minéral avec notes d''agrumes'),
  ('Côtes du Rhône', categorie_vins_id, ARRAY['Rouge', 'Grenache', 'Syrah'], 'France', 'Vin rouge fruité et épicé'),
  ('Sancerre', categorie_vins_id, ARRAY['Blanc', 'Sauvignon Blanc'], 'France', 'Vin blanc vif, notes d''agrumes et de pierre à fusil'),
  ('Châteauneuf-du-Pape', categorie_vins_id, ARRAY['Rouge', 'Grenache', 'Syrah', 'Mourvèdre'], 'France', 'Vin rouge puissant, notes de fruits mûrs et d''épices');

  -- Insertion des services de vin
  INSERT INTO service_vins (vin_id, taille, prix, ordre) VALUES
  ((SELECT id FROM vins WHERE nom = 'Champagne Moët & Chandon'), 75, 85.00, 1),
  ((SELECT id FROM vins WHERE nom = 'Champagne Moët & Chandon'), 15, 17.00, 2),
  ((SELECT id FROM vins WHERE nom = 'Champagne Veuve Clicquot'), 75, 90.00, 1),
  ((SELECT id FROM vins WHERE nom = 'Champagne Veuve Clicquot'), 15, 18.00, 2),
  ((SELECT id FROM vins WHERE nom = 'Chianti Classico'), 75, 35.00, 1),
  ((SELECT id FROM vins WHERE nom = 'Chianti Classico'), 15, 7.00, 2),
  ((SELECT id FROM vins WHERE nom = 'Pinot Grigio'), 75, 28.00, 1),
  ((SELECT id FROM vins WHERE nom = 'Pinot Grigio'), 15, 6.00, 2),
  ((SELECT id FROM vins WHERE nom = 'Prosecco'), 75, 32.00, 1),
  ((SELECT id FROM vins WHERE nom = 'Prosecco'), 15, 7.00, 2),
  ((SELECT id FROM vins WHERE nom = 'Bordeaux Saint-Émilion'), 75, 45.00, 1),
  ((SELECT id FROM vins WHERE nom = 'Bordeaux Saint-Émilion'), 15, 9.00, 2),
  ((SELECT id FROM vins WHERE nom = 'Chablis'), 75, 38.00, 1),
  ((SELECT id FROM vins WHERE nom = 'Chablis'), 15, 8.00, 2),
  ((SELECT id FROM vins WHERE nom = 'Côtes du Rhône'), 75, 30.00, 1),
  ((SELECT id FROM vins WHERE nom = 'Côtes du Rhône'), 15, 6.00, 2),
  ((SELECT id FROM vins WHERE nom = 'Sancerre'), 75, 36.00, 1),
  ((SELECT id FROM vins WHERE nom = 'Sancerre'), 15, 8.00, 2),
  ((SELECT id FROM vins WHERE nom = 'Châteauneuf-du-Pape'), 75, 55.00, 1),
  ((SELECT id FROM vins WHERE nom = 'Châteauneuf-du-Pape'), 15, 11.00, 2);
END $$; 