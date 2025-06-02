-- Migration pour créer les tables du système de menu
-- Tables : categories, plats, ingredients, plat_ingredients

-- Table des catégories de menu
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    ordre_affichage INTEGER DEFAULT 0,
    actif BOOLEAN DEFAULT true,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_modification TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des plats
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

-- Table des ingrédients 
CREATE TABLE IF NOT EXISTS ingredients (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    allergene BOOLEAN DEFAULT false,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table de liaison plats-ingrédients (many-to-many)
CREATE TABLE IF NOT EXISTS plat_ingredients (
    id SERIAL PRIMARY KEY,
    plat_id INTEGER REFERENCES plats(id) ON DELETE CASCADE,
    ingredient_id INTEGER REFERENCES ingredients(id) ON DELETE CASCADE,
    quantite VARCHAR(50), -- Ex: "200g", "1 tranche", etc.
    obligatoire BOOLEAN DEFAULT true,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(plat_id, ingredient_id)
);

-- Création des index pour optimiser les performances
CREATE INDEX IF NOT EXISTS idx_plats_categorie ON plats(categorie_id);
CREATE INDEX IF NOT EXISTS idx_plats_disponible ON plats(disponible);
CREATE INDEX IF NOT EXISTS idx_plat_ingredients_plat ON plat_ingredients(plat_id);
CREATE INDEX IF NOT EXISTS idx_plat_ingredients_ingredient ON plat_ingredients(ingredient_id);
CREATE INDEX IF NOT EXISTS idx_categories_actif ON categories(actif);
CREATE INDEX IF NOT EXISTS idx_categories_ordre ON categories(ordre_affichage);
CREATE INDEX IF NOT EXISTS idx_plats_ordre ON plats(ordre_affichage);

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