const http = require('http');

// Test de correction du trigger via API
function testFixTrigger() {
  const sqlFix = `
    -- Supprimer le trigger problématique
    DROP TRIGGER IF EXISTS update_vin_variants_modtime ON vin_variants;
  `;
  
  console.log('🔧 Tentative de correction du trigger via API...\n');
  console.log('SQL à exécuter:', sqlFix);
  
  // Pour l'instant, affichons juste les instructions
  console.log('\n💡 INSTRUCTIONS POUR CORRIGER:');
  console.log('===============================');
  console.log('1. Ouvrez votre outil de base de données (pgAdmin, DBeaver, etc.)');
  console.log('2. Connectez-vous à la base "newyorkcafe"');
  console.log('3. Exécutez cette commande SQL:');
  console.log('');
  console.log('   DROP TRIGGER IF EXISTS update_vin_variants_modtime ON vin_variants;');
  console.log('');
  console.log('4. Redémarrez votre serveur Node.js');
  console.log('5. Réessayez de modifier le prix du variant');
  console.log('');
  console.log('✅ Après ça, plus d\'erreur "updated_at" !');
}

testFixTrigger(); 