const http = require('http');

console.log('🍷 Création du vin Victor...');

// Données pour créer Victor
const victorData = {
  nom: 'Victor',
  origine_vin: 'Italie',
  type_vin: 'VINS ROUGE',
  description: 'Vin rouge italien de qualité',
  categorie_id: 9,
  variants: [
    {
      volume_vin: '75cl',
      contenant_vin: 'Bouteille', 
      prix: 32.0
    },
    {
      volume_vin: '14cl',
      contenant_vin: 'Verre',
      prix: 8.0
    }
  ]
};

const postData = JSON.stringify(victorData);

const options = {
  hostname: 'localhost',
  port: 4000,
  path: '/admin-nyc-2024-secret/api/admin/vins',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = http.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('Response:', data);
    
    if (res.statusCode === 200) {
      console.log('✅ Victor créé avec succès!');
      
      // Vérifier la création
      setTimeout(() => {
        console.log('\n🔍 Vérification de la création...');
        checkVictor();
      }, 1000);
    } else {
      console.log('❌ Erreur lors de la création');
    }
  });
});

req.on('error', (e) => {
  console.error('❌ Erreur:', e.message);
});

req.write(postData);
req.end();

function checkVictor() {
  const getOptions = {
    hostname: 'localhost',
    port: 4000,
    path: '/api/vins',
    method: 'GET'
  };
  
  const getReq = http.request(getOptions, (res) => {
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      if (res.statusCode === 200) {
        try {
          const vins = JSON.parse(data);
          const victor = vins.find(v => v.nom === 'Victor');
          const franck = vins.find(v => v.nom === 'Franck');
          const diane = vins.find(v => v.nom === 'Diane');
          
          console.log('\n=== ÉTAT ACTUEL DES VINS ===');
          if (diane) console.log(`🍷 Diane: type=${diane.type_vin}, origine=${diane.origine_vin}`);
          if (franck) console.log(`🍷 Franck: type=${franck.type_vin}, origine=${franck.origine_vin}`);
          if (victor) console.log(`🍷 Victor: type=${victor.type_vin}, origine=${victor.origine_vin}`);
          
          if (victor) {
            console.log('✅ SUCCÈS: Victor a été créé!');
          } else {
            console.log('❌ ÉCHEC: Victor non trouvé');
          }
        } catch (e) {
          console.log('❌ Erreur parsing:', e.message);
        }
      } else {
        console.log('❌ Erreur API:', res.statusCode);
      }
    });
  });
  
  getReq.end();
} 