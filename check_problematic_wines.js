const http = require('http');

console.log('🔍 Vérification des vins problématiques...');

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
        
        // Chercher Pinot Grigio et Chianti Classico
        const problematicWines = ['Pinot Grigio', 'Chianti Classico'];
        
        problematicWines.forEach(wineName => {
          const wine = vins.find(v => v.nom === wineName);
          
          if (wine) {
            console.log(`\n=== 🍷 ${wineName.toUpperCase()} ===`);
            console.log(`ID: ${wine.id}`);
            console.log(`Nom: ${wine.nom}`);
            console.log(`Type: ${wine.type_vin}`);
            console.log(`Origine: ${wine.origine_vin}`);
            console.log(`Description: ${wine.description}`);
          } else {
            console.log(`\n❌ ${wineName} non trouvé`);
          }
        });
        
        // Afficher tous les vins italiens
        console.log('\n\n=== 🇮🇹 TOUS LES VINS ITALIENS ===');
        const vinsItaliens = vins.filter(v => 
          v.origine_vin && v.origine_vin.toLowerCase().includes('itali')
        );
        
        vinsItaliens.forEach(wine => {
          console.log(`- ${wine.nom}: ${wine.type_vin} (${wine.origine_vin})`);
        });
        
      } catch (error) {
        console.error('Erreur lors du parsing JSON:', error);
      }
    } else {
      console.error(`Erreur HTTP: ${res.statusCode}`);
    }
  });
});

req.on('error', (error) => {
  console.error('Erreur réseau:', error);
});

req.end(); 