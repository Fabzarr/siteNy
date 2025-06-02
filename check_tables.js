const path = require('path');
require('dotenv').config({ path: path.join(__dirname, 'src/server/.env') });
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

async function checkTables() {
  try {
    console.log('Vérification des tables...');
    
    const result = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('vins', 'vin_variants')
      ORDER BY table_name
    `);
    
    console.log('Tables existantes:', result.rows);
    
    if (result.rows.length === 0) {
      console.log('❌ Aucune table de vins trouvée. Il faut créer les tables.');
    } else if (result.rows.length === 2) {
      console.log('✅ Toutes les tables de vins existent.');
    } else {
      console.log('⚠️ Certaines tables manquent.');
    }
    
  } catch (error) {
    console.error('Erreur lors de la vérification:', error);
  } finally {
    pool.end();
  }
}

checkTables(); 