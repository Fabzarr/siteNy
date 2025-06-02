const http = require('http');

console.log('🔍 Vérification de l\'état de Victor...');

const options = {
  hostname: 'localhost',
  port: 4000,
  path: '/api/vins',
  method: 'GET'
};

const req = http.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    if (res.statusCode === 200) {
      try {
        const vins = JSON.parse(data);
        
        // Chercher Victor
        const victor = vins.find(v => v.nom === 'Victor');
        
        if (victor) {
          console.log('\n=== 🍷 VICTOR TROUVÉ ===');
          console.log(`ID: ${victor.id}`);
          console.log(`Nom: ${victor.nom}`);
          console.log(`Type: ${victor.type_vin}`);
          console.log(`Origine: ${victor.origine_vin}`);
          console.log(`Description: ${victor.description}`);
          console.log(`Variants: ${victor.variants ? victor.variants.length : 'N/A'}`);
          
          if (victor.variants) {
            victor.variants.forEach((variant, index) => {
              console.log(`  Variant ${index + 1}: ${variant.volume_vin} ${variant.contenant_vin} - ${variant.prix}€`);
            });
          }
          
          // Vérifier si c'est champagne français
          if (victor.type_vin === 'CHAMPAGNE' && victor.origine_vin === 'France') {
            console.log('\n✅ Victor est bien un CHAMPAGNE français !');
          } else {
            console.log('\n❌ Victor n\'est PAS un champagne français');
            console.log(`   Type actuel: ${victor.type_vin}`);
            console.log(`   Origine actuelle: ${victor.origine_vin}`);
          }
        } else {
          console.log('❌ Victor NON TROUVÉ');
        }
        
        console.log(`\nTotal vins dans l'API: ${vins.length}`);
        
      } catch (e) {
        console.log('❌ Erreur parsing:', e.message);
      }
    } else {
      console.log('❌ Erreur API:', res.statusCode);
    }
  });
});

req.on('error', (e) => {
  console.error('❌ Erreur:', e.message);
});

req.end(); 