-- Création des tables pour le système de vins avancé
CREATE TABLE IF NOT EXISTS vins (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    origine_vin VARCHAR(255),
    type_vin VARCHAR(100),
    description TEXT,
    categorie_id INTEGER NOT NULL REFERENCES categories(id),
    disponible BOOLEAN DEFAULT true,
    photo_url VARCHAR(500),
    ordre_affichage INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS vin_variants (
    id SERIAL PRIMARY KEY,
    vin_id INTEGER NOT NULL REFERENCES vins(id) ON DELETE CASCADE,
    volume_vin VARCHAR(50) NOT NULL,
    contenant_vin VARCHAR(50) NOT NULL,
    prix DECIMAL(10,2) NOT NULL,
    disponible BOOLEAN DEFAULT true,
    ordre_affichage INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index pour optimiser les performances
CREATE INDEX IF NOT EXISTS idx_vins_categorie ON vins(categorie_id);
CREATE INDEX IF NOT EXISTS idx_vins_disponible ON vins(disponible);
CREATE INDEX IF NOT EXISTS idx_vins_ordre ON vins(ordre_affichage);
CREATE INDEX IF NOT EXISTS idx_vin_variants_vin ON vin_variants(vin_id);
CREATE INDEX IF NOT EXISTS idx_vin_variants_disponible ON vin_variants(disponible);
CREATE INDEX IF NOT EXISTS idx_vin_variants_ordre ON vin_variants(ordre_affichage);

-- Fonction pour mettre à jour le timestamp
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers pour mettre à jour automatiquement les timestamps
CREATE TRIGGER update_vins_modtime BEFORE UPDATE ON vins 
    FOR EACH ROW EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_vin_variants_modtime BEFORE UPDATE ON vin_variants 
    FOR EACH ROW EXECUTE FUNCTION update_modified_column();

-- Migration des données existantes de la table plats vers les nouvelles tables
INSERT INTO vins (nom, origine_vin, type_vin, description, categorie_id, disponible, photo_url, ordre_affichage)
SELECT 
    nom,
    NULL as origine_vin,
    NULL as type_vin,
    description,
    categorie_id,
    disponible,
    photo_url,
    ordre_affichage
FROM plats 
WHERE categorie_id = (SELECT id FROM categories WHERE slug = 'carte-des-vins' LIMIT 1)
AND NOT EXISTS (SELECT 1 FROM vins WHERE nom = plats.nom);

-- Créer une variante par défaut (75cl Bouteille) pour chaque vin migré
INSERT INTO vin_variants (vin_id, volume_vin, contenant_vin, prix, disponible, ordre_affichage)
SELECT 
    v.id,
    '75cl' as volume_vin,
    'Bouteille' as contenant_vin,
    p.prix,
    p.disponible,
    1 as ordre_affichage
FROM vins v
JOIN plats p ON p.nom = v.nom AND p.categorie_id = v.categorie_id
WHERE NOT EXISTS (SELECT 1 FROM vin_variants WHERE vin_id = v.id); 