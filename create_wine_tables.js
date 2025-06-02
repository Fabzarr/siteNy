const fs = require('fs');
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

async function createWineTables() {
  try {
    console.log('Lecture du fichier SQL...');
    const sqlContent = fs.readFileSync('create_wine_tables.sql', 'utf8');
    
    console.log('Exécution du script SQL...');
    await pool.query(sqlContent);
    
    console.log('✅ Tables de vins créées avec succès !');
    
    // Vérifier que les tables ont été créées
    const result = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('vins', 'vin_variants')
      ORDER BY table_name
    `);
    
    console.log('Tables créées:', result.rows);
    
  } catch (error) {
    console.error('❌ Erreur lors de la création des tables:', error);
  } finally {
    pool.end();
  }
}

createWineTables(); 