-- Migration pour ajouter les champs spécifiques aux vins
-- Date: 2024

-- Ajouter les colonnes spécifiques aux vins dans la table plats
ALTER TABLE plats ADD COLUMN IF NOT EXISTS origine_vin VARCHAR(100);
ALTER TABLE plats ADD COLUMN IF NOT EXISTS type_vin VARCHAR(50);
ALTER TABLE plats ADD COLUMN IF NOT EXISTS volume_vin VARCHAR(20);
ALTER TABLE plats ADD COLUMN IF NOT EXISTS contenant_vin VARCHAR(50);

-- Créer les types pour les contraintes
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'origine_vin_enum') THEN
        CREATE TYPE origine_vin_enum AS ENUM ('France', 'Italie', 'Espagne', 'Portugal', 'Allemagne', 'Autriche', 'Autre');
    END IF;
END $$;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'type_vin_enum') THEN
        CREATE TYPE type_vin_enum AS ENUM ('VINS ROUGE', 'VINS ROSÉ', 'VINS BLANC', 'CHAMPAGNE', 'PÉTILLANT');
    END IF;
END $$;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'volume_vin_enum') THEN
        CREATE TYPE volume_vin_enum AS ENUM ('14cl', '25cl', '37.5cl', '50cl', '75cl', '1L', '1.5L');
    END IF;
END $$;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'contenant_vin_enum') THEN
        CREATE TYPE contenant_vin_enum AS ENUM ('Verre', 'Pichet', 'Bouteille');
    END IF;
END $$;

-- Modifier les colonnes pour utiliser les types enum
ALTER TABLE plats ALTER COLUMN origine_vin TYPE origine_vin_enum USING origine_vin::origine_vin_enum;
ALTER TABLE plats ALTER COLUMN type_vin TYPE type_vin_enum USING type_vin::type_vin_enum;
ALTER TABLE plats ALTER COLUMN volume_vin TYPE volume_vin_enum USING volume_vin::volume_vin_enum;
ALTER TABLE plats ALTER COLUMN contenant_vin TYPE contenant_vin_enum USING contenant_vin::contenant_vin_enum;

-- Créer des index pour optimiser les requêtes sur les vins
CREATE INDEX IF NOT EXISTS idx_plats_origine_vin ON plats(origine_vin);
CREATE INDEX IF NOT EXISTS idx_plats_type_vin ON plats(type_vin);
CREATE INDEX IF NOT EXISTS idx_plats_volume_vin ON plats(volume_vin);
CREATE INDEX IF NOT EXISTS idx_plats_contenant_vin ON plats(contenant_vin);

-- Commentaires pour documenter les colonnes
COMMENT ON COLUMN plats.origine_vin IS 'Origine géographique du vin (utilisé uniquement pour la catégorie vins)';
COMMENT ON COLUMN plats.type_vin IS 'Type de vin: rouge, blanc, rosé, champagne, etc. (utilisé uniquement pour la catégorie vins)';
COMMENT ON COLUMN plats.volume_vin IS 'Volume du vin servi (utilisé uniquement pour la catégorie vins)';
COMMENT ON COLUMN plats.contenant_vin IS 'Type de contenant: verre, pichet, bouteille (utilisé uniquement pour la catégorie vins)'; 