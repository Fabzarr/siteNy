const http = require('http');

console.log('🔍 Vérification de l\'origine du Prosecco...');

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
        
        // Chercher Prosecco
        const prosecco = vins.find(v => v.nom === 'Prosecco');
        
        if (prosecco) {
          console.log('\n=== 🥂 PROSECCO ===');
          console.log(`ID: ${prosecco.id}`);
          console.log(`Nom: ${prosecco.nom}`);
          console.log(`Type: ${prosecco.type_vin}`);
          console.log(`Origine: "${prosecco.origine_vin}"`); // Entre guillemets pour voir exactement
          console.log(`Description: ${prosecco.description}`);
          
          // Vérifier si c'est "Italy" ou "Italie"
          if (prosecco.origine_vin === 'Italy') {
            console.log('\n❌ PROBLÈME DÉTECTÉ: Le Prosecco utilise "Italy" au lieu d\'Italie"');
            console.log('   Cela explique pourquoi le drapeau n\'apparaît pas côté frontend.');
          } else if (prosecco.origine_vin === 'Italie') {
            console.log('\n✅ Le Prosecco utilise bien "Italie" en français');
          } else {
            console.log(`\n⚠️  Le Prosecco utilise une origine inattendue: "${prosecco.origine_vin}"`);
          }
        } else {
          console.log('\n❌ Prosecco non trouvé dans les vins !');
        }
        
      } catch (error) {
        console.error('❌ Erreur de parsing JSON:', error);
      }
    } else {
      console.error(`❌ Erreur HTTP: ${res.statusCode}`);
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Erreur réseau:', error);
});

req.end(); 