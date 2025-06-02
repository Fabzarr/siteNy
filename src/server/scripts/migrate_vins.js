const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'newyorkcafe',
  user: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || '',
});

async function migrateVins() {
  const client = await pool.connect();
  try {
    console.log('🍷 Début de la migration des champs vins...');

    // Ajouter les colonnes spécifiques aux vins
    await client.query('ALTER TABLE plats ADD COLUMN IF NOT EXISTS origine_vin VARCHAR(100)');
    await client.query('ALTER TABLE plats ADD COLUMN IF NOT EXISTS type_vin VARCHAR(50)');
    await client.query('ALTER TABLE plats ADD COLUMN IF NOT EXISTS volume_vin VARCHAR(20)');
    await client.query('ALTER TABLE plats ADD COLUMN IF NOT EXISTS contenant_vin VARCHAR(50)');
    
    console.log('✅ Colonnes ajoutées avec succès');

    // Créer les types enum
    const createEnumQueries = [
      `DO $$ 
       BEGIN
           IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'origine_vin_enum') THEN
               CREATE TYPE origine_vin_enum AS ENUM ('France', 'Italie', 'Espagne', 'Portugal', 'Allemagne', 'Autriche', 'Autre');
           END IF;
       END $$;`,
      
      `DO $$ 
       BEGIN
           IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'type_vin_enum') THEN
               CREATE TYPE type_vin_enum AS ENUM ('VINS ROUGE', 'VINS ROSÉ', 'VINS BLANC', 'CHAMPAGNE', 'PÉTILLANT');
           END IF;
       END $$;`,
      
      `DO $$ 
       BEGIN
           IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'volume_vin_enum') THEN
               CREATE TYPE volume_vin_enum AS ENUM ('14cl', '25cl', '37.5cl', '50cl', '75cl', '1L', '1.5L');
           END IF;
       END $$;`,
      
      `DO $$ 
       BEGIN
           IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'contenant_vin_enum') THEN
               CREATE TYPE contenant_vin_enum AS ENUM ('Verre', 'Pichet', 'Bouteille');
           END IF;
       END $$;`
    ];

    for (const query of createEnumQueries) {
      await client.query(query);
    }
    
    console.log('✅ Types enum créés avec succès');

    // Créer les index
    const indexQueries = [
      'CREATE INDEX IF NOT EXISTS idx_plats_origine_vin ON plats(origine_vin)',
      'CREATE INDEX IF NOT EXISTS idx_plats_type_vin ON plats(type_vin)',
      'CREATE INDEX IF NOT EXISTS idx_plats_volume_vin ON plats(volume_vin)',
      'CREATE INDEX IF NOT EXISTS idx_plats_contenant_vin ON plats(contenant_vin)'
    ];

    for (const query of indexQueries) {
      await client.query(query);
    }
    
    console.log('✅ Index créés avec succès');
    console.log('🎉 Migration des champs vins terminée avec succès !');
    
  } catch (error) {
    console.error('❌ Erreur lors de la migration:', error);
  } finally {
    client.release();
    await pool.end();
  }
}

migrateVins(); 