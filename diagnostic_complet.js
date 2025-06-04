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

async function diagnosticComplet() {
  try {
    console.log('🔍 DIAGNOSTIC COMPLET DU PROBLÈME updated_at\n');
    
    // 1. Vérifier la structure de vin_variants
    console.log('📊 1. Structure de la table vin_variants:');
    console.log('==========================================');
    const columns = await pool.query(`
      SELECT column_name, data_type, column_default
      FROM information_schema.columns 
      WHERE table_name = 'vin_variants' 
      ORDER BY ordinal_position;
    `);
    
    columns.rows.forEach(col => {
      console.log(`- ${col.column_name}: ${col.data_type} (default: ${col.column_default || 'none'})`);
    });
    
    const hasUpdatedAt = columns.rows.find(col => col.column_name === 'updated_at');
    console.log(`\n❓ Colonne updated_at présente: ${hasUpdatedAt ? '✅ OUI' : '❌ NON'}\n`);
    
    // 2. Vérifier TOUS les triggers sur vin_variants
    console.log('🔧 2. Triggers sur vin_variants:');
    console.log('================================');
    const triggers = await pool.query(`
      SELECT 
        t.trigger_name, 
        t.event_manipulation, 
        t.action_timing,
        t.action_statement
      FROM information_schema.triggers t
      WHERE t.event_object_table = 'vin_variants';
    `);
    
    if (triggers.rows.length === 0) {
      console.log('✅ Aucun trigger sur vin_variants');
    } else {
      console.log('❌ TRIGGERS TROUVÉS:');
      triggers.rows.forEach(trigger => {
        console.log(`- ${trigger.trigger_name}: ${trigger.action_timing} ${trigger.event_manipulation}`);
        console.log(`  Action: ${trigger.action_statement}`);
      });
    }
    
    // 3. Vérifier les triggers sur vins aussi
    console.log('\n🔧 3. Triggers sur vins:');
    console.log('=======================');
    const vinsTriggers = await pool.query(`
      SELECT 
        t.trigger_name, 
        t.event_manipulation, 
        t.action_timing,
        t.action_statement
      FROM information_schema.triggers t
      WHERE t.event_object_table = 'vins';
    `);
    
    if (vinsTriggers.rows.length === 0) {
      console.log('✅ Aucun trigger sur vins');
    } else {
      vinsTriggers.rows.forEach(trigger => {
        console.log(`- ${trigger.trigger_name}: ${trigger.action_timing} ${trigger.event_manipulation}`);
      });
    }
    
    // 4. Vérifier les fonctions qui pourraient causer le problème
    console.log('\n🔧 4. Fonctions update_modified_column:');
    console.log('=======================================');
    const functions = await pool.query(`
      SELECT proname, prosrc 
      FROM pg_proc 
      WHERE proname = 'update_modified_column';
    `);
    
    if (functions.rows.length > 0) {
      console.log('Fonction trouvée:');
      functions.rows.forEach(func => {
        console.log(`- ${func.proname}`);
        console.log(`  Code: ${func.prosrc}`);
      });
    } else {
      console.log('✅ Aucune fonction update_modified_column');
    }
    
    // 5. Solution recommandée
    console.log('\n🔧 5. SOLUTION COMPLÈTE:');
    console.log('========================');
    
    if (triggers.rows.length > 0) {
      console.log('❌ IL RESTE DES TRIGGERS ! Supprimons-les tous:');
      
      for (const trigger of triggers.rows) {
        try {
          const dropSQL = `DROP TRIGGER IF EXISTS ${trigger.trigger_name} ON vin_variants;`;
          console.log(`🗑️  Suppression: ${dropSQL}`);
          await pool.query(dropSQL);
          console.log(`✅ ${trigger.trigger_name} supprimé`);
        } catch (error) {
          console.log(`❌ Erreur suppression ${trigger.trigger_name}: ${error.message}`);
        }
      }
      
      console.log('\n🎉 Tous les triggers sur vin_variants ont été supprimés !');
    } else if (!hasUpdatedAt) {
      console.log('💡 SOLUTION A: Ajouter la colonne updated_at');
      console.log('ALTER TABLE vin_variants ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;');
      console.log('\n💡 SOLUTION B: Garder sans trigger (recommandée)');
      console.log('Les variants fonctionneront sans timestamp automatique');
    }
    
  } catch (error) {
    console.error('❌ Erreur diagnostic:', error.message);
  } finally {
    await pool.end();
    console.log('\n🔄 Redémarrer le serveur après les corrections !');
  }
}

diagnosticComplet(); 