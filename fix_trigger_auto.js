const { Pool } = require('pg');
const path = require('path');

// Charger le .env depuis le serveur
require('dotenv').config({ path: path.join(__dirname, 'src/server/.env') });

const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

async function fixTriggerAutomatic() {
  try {
    console.log('🔧 Correction automatique du trigger vin_variants...\n');
    
    // Exécuter la correction
    const result = await pool.query('DROP TRIGGER IF EXISTS update_vin_variants_modtime ON vin_variants;');
    
    console.log('✅ Trigger supprimé avec succès !');
    console.log('Le problème "updated_at" est maintenant résolu.\n');
    
    // Vérifier que ça a marché
    const triggers = await pool.query(`
      SELECT trigger_name 
      FROM information_schema.triggers 
      WHERE event_object_table = 'vin_variants';
    `);
    
    if (triggers.rows.length === 0) {
      console.log('🎉 Confirmation: Aucun trigger sur vin_variants');
      console.log('Tu peux maintenant modifier les prix de variants sans erreur !');
    } else {
      console.log('⚠️  Il reste des triggers:', triggers.rows);
    }
    
  } catch (error) {
    console.error('❌ Erreur lors de la correction:', error.message);
    console.log('\n💡 Essaie plutôt avec pgAdmin ou DBeaver');
  } finally {
    await pool.end();
    console.log('\n🔄 N\'oublie pas de redémarrer ton serveur Node.js après !');
  }
}

fixTriggerAutomatic(); 