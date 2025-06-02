-- Supprimer les tables existantes
DROP TABLE IF EXISTS service_vins CASCADE;
DROP TABLE IF EXISTS vins CASCADE;
DROP TABLE IF EXISTS plat_ingredients CASCADE;
DROP TABLE IF EXISTS ingredients CASCADE;
DROP TABLE IF EXISTS plats CASCADE;
DROP TABLE IF EXISTS reservations CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TYPE IF EXISTS statut_reservation CASCADE;

-- Créer le type pour les statuts de réservation
CREATE TYPE statut_reservation AS ENUM ('en_attente', 'confirmee', 'annulee');

-- Créer la table des catégories
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  ordre_affichage INTEGER DEFAULT 0,
  actif BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Créer la table des réservations
CREATE TABLE IF NOT EXISTS reservations (
  id SERIAL PRIMARY KEY,
  prenom VARCHAR(100) NOT NULL,
  nom VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  telephone VARCHAR(20) NOT NULL,
  date DATE NOT NULL,
  heure TIME NOT NULL,
  nombre_personnes INTEGER NOT NULL CHECK (nombre_personnes >= 1 AND nombre_personnes <= 20),
  statut statut_reservation DEFAULT 'en_attente',
  date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  -- Contraintes
  CONSTRAINT email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  CONSTRAINT telephone_format CHECK (telephone ~* '^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$')
);

-- Créer la table des plats
CREATE TABLE IF NOT EXISTS plats (
  id SERIAL PRIMARY KEY,
  nom VARCHAR(200) NOT NULL,
  description TEXT,
  prix DECIMAL(10,2) NOT NULL,
  categorie_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
  disponible BOOLEAN DEFAULT true,
  photo_url VARCHAR(500),
  ordre_affichage INTEGER DEFAULT 0,
  allergenes TEXT[], -- Array pour stocker les allergènes
  date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  date_modification TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  CONSTRAINT prix_positif CHECK (prix >= 0)
);

-- Créer la table des ingrédients
CREATE TABLE IF NOT EXISTS ingredients (
  id SERIAL PRIMARY KEY,
  nom VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  allergene BOOLEAN DEFAULT false,
  date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Créer la table de liaison plats-ingrédients
CREATE TABLE IF NOT EXISTS plat_ingredients (
  id SERIAL PRIMARY KEY,
  plat_id INTEGER REFERENCES plats(id) ON DELETE CASCADE,
  ingredient_id INTEGER REFERENCES ingredients(id) ON DELETE CASCADE,
  quantite VARCHAR(50), -- Ex: "200g", "1 tranche", etc.
  obligatoire BOOLEAN DEFAULT true,
  date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  UNIQUE(plat_id, ingredient_id)
);

-- Créer les index pour optimiser les performances
CREATE INDEX IF NOT EXISTS idx_reservations_date_heure ON reservations(date, heure);
CREATE INDEX IF NOT EXISTS idx_plats_categorie ON plats(categorie_id);
CREATE INDEX IF NOT EXISTS idx_plats_disponible ON plats(disponible);
CREATE INDEX IF NOT EXISTS idx_plat_ingredients_plat ON plat_ingredients(plat_id);
CREATE INDEX IF NOT EXISTS idx_plat_ingredients_ingredient ON plat_ingredients(ingredient_id);
CREATE INDEX IF NOT EXISTS idx_categories_actif ON categories(actif);
CREATE INDEX IF NOT EXISTS idx_categories_ordre ON categories(ordre_affichage);
CREATE INDEX IF NOT EXISTS idx_plats_ordre ON plats(ordre_affichage);

-- Fonction pour vérifier la disponibilité des réservations
CREATE OR REPLACE FUNCTION verifier_disponibilite(
  date_reservation DATE,
  heure_reservation TIME,
  nb_personnes INTEGER
) RETURNS BOOLEAN AS $$
DECLARE
  total_personnes INTEGER;
BEGIN
  SELECT COALESCE(SUM(nombre_personnes), 0)
  INTO total_personnes
  FROM reservations
  WHERE date = date_reservation
    AND heure = heure_reservation
    AND statut = 'confirmee';
    
  RETURN (total_personnes + nb_personnes) <= 40;
END;
$$ LANGUAGE plpgsql;

-- Fonction pour mettre à jour automatiquement date_modification
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.date_modification = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers pour les dates de modification
DROP TRIGGER IF EXISTS update_categories_modtime ON categories;
CREATE TRIGGER update_categories_modtime BEFORE UPDATE ON categories 
    FOR EACH ROW EXECUTE FUNCTION update_modified_column();
    
DROP TRIGGER IF EXISTS update_plats_modtime ON plats;
CREATE TRIGGER update_plats_modtime BEFORE UPDATE ON plats 
    FOR EACH ROW EXECUTE FUNCTION update_modified_column(); 