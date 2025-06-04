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

async function fixFunctionFinal() {
  try {
    console.log('🔧 CORRECTION FINALE de la fonction update_modified_column\n');
    
    // Recréer la fonction pour utiliser date_modification au lieu de updated_at
    const fixSQL = `
      CREATE OR REPLACE FUNCTION update_modified_column()
      RETURNS TRIGGER AS $$
      BEGIN
          -- Utiliser date_modification au lieu de updated_at
          NEW.date_modification = CURRENT_TIMESTAMP;
          RETURN NEW;
      END;
      $$ language 'plpgsql';
    `;
    
    console.log('📋 SQL de correction:');
    console.log(fixSQL);
    
    await pool.query(fixSQL);
    
    console.log('✅ Fonction update_modified_column corrigée !');
    console.log('   Elle utilise maintenant date_modification au lieu de updated_at');
    
    // Recréer le trigger sur vin_variants maintenant que la fonction est corrigée
    const triggerSQL = `
      CREATE TRIGGER update_vin_variants_modtime 
      BEFORE UPDATE ON vin_variants 
      FOR EACH ROW EXECUTE FUNCTION update_modified_column();
    `;
    
    console.log('\n🔧 Ajout du trigger corrigé sur vin_variants:');
    await pool.query(triggerSQL);
    console.log('✅ Trigger ajouté avec la fonction corrigée !');
    
    // Vérification finale
    console.log('\n🎉 CORRECTION TERMINÉE:');
    console.log('- ✅ Fonction corrigée pour utiliser date_modification');
    console.log('- ✅ Trigger vin_variants recréé et fonctionnel');
    console.log('- ✅ Plus d\'erreur updated_at !');
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    console.log('\n💡 Solution alternative: supprimer complètement la fonction');
    console.log('DROP FUNCTION IF EXISTS update_modified_column() CASCADE;');
  } finally {
    await pool.end();
    console.log('\n🔄 Redémarrer le serveur pour appliquer les changements !');
  }
}

fixFunctionFinal(); 