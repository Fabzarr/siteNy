-- Migration pour le système de variants de vins
-- Créer la structure pour gérer les vins avec plusieurs formats/contenants/prix

-- 1. Créer la table des vins de base
CREATE TABLE IF NOT EXISTS vins (
  id SERIAL PRIMARY KEY,
  nom VARCHAR(200) NOT NULL,
  origine_vin VARCHAR(50), -- France, Italy, Spain, etc.
  type_vin VARCHAR(50), -- VINS ROUGE, VINS BLANC, CHAMPAGNE, etc.
  description TEXT,
  categorie_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
  disponible BOOLEAN DEFAULT true,
  photo_url VARCHAR(500),
  ordre_affichage INTEGER DEFAULT 0,
  date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  date_modification TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Créer la table des variants de vins (formats/contenants/prix)
CREATE TABLE IF NOT EXISTS vin_variants (
  id SERIAL PRIMARY KEY,
  vin_id INTEGER REFERENCES vins(id) ON DELETE CASCADE,
  volume_vin VARCHAR(20), -- 14cl, 25cl, 37.5cl, 50cl, 75cl, 1L, 1.5L
  contenant_vin VARCHAR(20), -- Verre, Pichet, Bouteille
  prix DECIMAL(10,2) NOT NULL,
  disponible BOOLEAN DEFAULT true,
  ordre_affichage INTEGER DEFAULT 0,
  date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  date_modification TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  -- Contraintes
  CONSTRAINT prix_positif CHECK (prix >= 0),
  UNIQUE(vin_id, volume_vin, contenant_vin) -- Un vin ne peut avoir qu'un seul prix par combinaison volume/contenant
);

-- 3. Créer les index pour optimiser les performances
CREATE INDEX IF NOT EXISTS idx_vins_categorie ON vins(categorie_id);
CREATE INDEX IF NOT EXISTS idx_vins_disponible ON vins(disponible);
CREATE INDEX IF NOT EXISTS idx_vins_ordre ON vins(ordre_affichage);
CREATE INDEX IF NOT EXISTS idx_vin_variants_vin ON vin_variants(vin_id);
CREATE INDEX IF NOT EXISTS idx_vin_variants_disponible ON vin_variants(disponible);
CREATE INDEX IF NOT EXISTS idx_vin_variants_ordre ON vin_variants(ordre_affichage);

-- 4. Fonction pour mettre à jour automatiquement date_modification
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.date_modification = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 5. Triggers pour les dates de modification
DROP TRIGGER IF EXISTS update_vins_modtime ON vins;
CREATE TRIGGER update_vins_modtime BEFORE UPDATE ON vins 
    FOR EACH ROW EXECUTE FUNCTION update_modified_column();

DROP TRIGGER IF EXISTS update_vin_variants_modtime ON vin_variants;
CREATE TRIGGER update_vin_variants_modtime BEFORE UPDATE ON vin_variants 
    FOR EACH ROW EXECUTE FUNCTION update_modified_column();

-- 6. Migrer les données existantes de la table plats vers le nouveau système
-- (Uniquement pour la catégorie des vins)
INSERT INTO vins (nom, origine_vin, type_vin, description, categorie_id, disponible, photo_url, ordre_affichage)
SELECT 
    p.nom,
    'France' as origine_vin, -- Valeur par défaut
    'VINS ROUGE' as type_vin, -- Valeur par défaut
    p.description,
    p.categorie_id,
    p.disponible,
    p.photo_url,
    p.ordre_affichage
FROM plats p
JOIN categories c ON p.categorie_id = c.id
WHERE c.slug = 'carte-des-vins'
AND NOT EXISTS (SELECT 1 FROM vins v WHERE v.nom = p.nom AND v.categorie_id = p.categorie_id);

-- 7. Créer un variant par défaut pour chaque vin migré (75cl Bouteille)
INSERT INTO vin_variants (vin_id, volume_vin, contenant_vin, prix, disponible, ordre_affichage)
SELECT 
    v.id,
    '75cl' as volume_vin,
    'Bouteille' as contenant_vin,
    p.prix,
    p.disponible,
    1 as ordre_affichage
FROM vins v
JOIN plats p ON v.nom = p.nom AND v.categorie_id = p.categorie_id
JOIN categories c ON p.categorie_id = c.id
WHERE c.slug = 'carte-des-vins'
AND NOT EXISTS (SELECT 1 FROM vin_variants vv WHERE vv.vin_id = v.id);

-- 8. Optionnel : Supprimer les anciens plats de vins (décommenter si souhaité)
-- DELETE FROM plats WHERE categorie_id IN (SELECT id FROM categories WHERE slug = 'carte-des-vins');

COMMENT ON TABLE vins IS 'Table des vins de base avec informations générales';
COMMENT ON TABLE vin_variants IS 'Table des variants de vins (volume, contenant, prix)';
COMMENT ON COLUMN vin_variants.volume_vin IS 'Volume: 14cl, 25cl, 37.5cl, 50cl, 75cl, 1L, 1.5L';
COMMENT ON COLUMN vin_variants.contenant_vin IS 'Contenant: Verre, Pichet, Bouteille'; 