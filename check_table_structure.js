const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

async function checkTableStructure() {
  try {
    console.log('🔍 Vérification de la structure de la table vin_variants...\n');
    
    // Vérifier la structure de la table vin_variants
    const result = await pool.query(`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns 
      WHERE table_name = 'vin_variants' 
      ORDER BY ordinal_position;
    `);
    
    console.log('📊 Structure de la table vin_variants:');
    console.log('=======================================');
    result.rows.forEach(row => {
      console.log(`- ${row.column_name}: ${row.data_type} (nullable: ${row.is_nullable}, default: ${row.column_default || 'none'})`);
    });
    
    // Vérifier les triggers
    console.log('\n🔧 Triggers sur vin_variants:');
    console.log('==============================');
    const triggers = await pool.query(`
      SELECT trigger_name, event_manipulation, action_timing 
      FROM information_schema.triggers 
      WHERE event_object_table = 'vin_variants';
    `);
    
    triggers.rows.forEach(trigger => {
      console.log(`- ${trigger.trigger_name}: ${trigger.action_timing} ${trigger.event_manipulation}`);
    });
    
    // Vérifier si updated_at existe
    const hasUpdatedAt = result.rows.find(row => row.column_name === 'updated_at');
    
    if (!hasUpdatedAt) {
      console.log('\n❌ PROBLÈME IDENTIFIÉ:');
      console.log('La colonne updated_at n\'existe pas dans vin_variants mais le trigger essaie de l\'utiliser!');
      
      console.log('\n🔧 SOLUTION:');
      console.log('Nous devons soit:');
      console.log('1. Ajouter la colonne updated_at à vin_variants');
      console.log('2. Ou supprimer le trigger sur vin_variants');
    } else {
      console.log('\n✅ La colonne updated_at existe dans vin_variants');
    }
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  } finally {
    await pool.end();
  }
}

checkTableStructure(); 