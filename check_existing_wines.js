const fetch = require('node-fetch');

async function checkExistingWines() {
  try {
    console.log('Récupération des vins existants...');
    
    // Récupérer les vins via l'API publique
    const response = await fetch('http://localhost:4000/api/vins');
    
    if (response.ok) {
      const vins = await response.json();
      console.log(`\n✅ ${vins.length} vins trouvés:\n`);
      
      vins.forEach((vin, index) => {
        console.log(`${index + 1}. ${vin.nom}`);
        console.log(`   - Origine: ${vin.origine_vin || 'Non définie'}`);
        console.log(`   - Type: ${vin.type_vin || 'Non défini'}`);
        console.log(`   - Description: ${vin.description || 'Aucune'}`);
        console.log(`   - Disponible: ${vin.disponible ? 'Oui' : 'Non'}`);
        console.log(`   - Variants: ${vin.variants.length}`);
        
        if (vin.variants.length > 0) {
          vin.variants.forEach(variant => {
            console.log(`     * ${variant.volume_vin} ${variant.contenant_vin} - ${variant.prix}€`);
          });
        }
        console.log('');
      });
    } else {
      console.log('❌ Erreur lors de la récupération des vins');
    }
    
  } catch (error) {
    console.error('❌ Erreur:', error);
  }
}

checkExistingWines(); 