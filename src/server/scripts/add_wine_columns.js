const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'newyorkcafe',
  user: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || '',
});

async function addWineColumns() {
  const client = await pool.connect();
  try {
    console.log('🍷 Ajout des colonnes vins...');

    // Ajouter simplement les colonnes sans les types enum pour l'instant
    await client.query('ALTER TABLE plats ADD COLUMN IF NOT EXISTS origine_vin VARCHAR(100)');
    await client.query('ALTER TABLE plats ADD COLUMN IF NOT EXISTS type_vin VARCHAR(50)');
    await client.query('ALTER TABLE plats ADD COLUMN IF NOT EXISTS volume_vin VARCHAR(20)');
    await client.query('ALTER TABLE plats ADD COLUMN IF NOT EXISTS contenant_vin VARCHAR(50)');
    
    console.log('✅ Colonnes vins ajoutées avec succès !');
    
  } catch (error) {
    console.error('❌ Erreur lors de l\'ajout des colonnes:', error);
  } finally {
    client.release();
    await pool.end();
  }
}

addWineColumns(); 