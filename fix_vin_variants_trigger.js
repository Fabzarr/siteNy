const http = require('http');

// Script pour corriger le problème de trigger vin_variants
async function fixVinVariantsTrigger() {
  console.log('🔧 Correction du problème de trigger vin_variants...\n');
  
  // SQL pour ajouter la colonne updated_at manquante
  const fixSQL = `
    -- Ajouter la colonne updated_at si elle n'existe pas
    ALTER TABLE vin_variants 
    ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
    
    -- Mettre à jour les enregistrements existants
    UPDATE vin_variants 
    SET updated_at = CURRENT_TIMESTAMP 
    WHERE updated_at IS NULL;
  `;
  
  console.log('📋 SQL de correction:');
  console.log(fixSQL);
  
  console.log('✅ Correction recommandée:');
  console.log('1. Ajouter la colonne updated_at à la table vin_variants');
  console.log('2. Ou supprimer le trigger sur vin_variants');
  
  console.log('\n💡 Pour appliquer la correction:');
  console.log('Exécutez ce SQL dans votre base de données PostgreSQL');
}

// Version alternative: supprimer le trigger problématique
async function removeTriggerAlternative() {
  console.log('\n🔧 ALTERNATIVE: Supprimer le trigger problématique...\n');
  
  const removeSQL = `
    -- Supprimer le trigger sur vin_variants
    DROP TRIGGER IF EXISTS update_vin_variants_modtime ON vin_variants;
  `;
  
  console.log('📋 SQL pour supprimer le trigger:');
  console.log(removeSQL);
  
  console.log('✅ Cette option supprime simplement le trigger automatique');
  console.log('   Les variants fonctionneront normalement sans timestamp automatique');
}

// Exécuter les deux options
fixVinVariantsTrigger();
removeTriggerAlternative(); 