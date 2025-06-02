const http = require('http');

console.log('🔧 Correction de Victor pour qu\'il devienne un CHAMPAGNE français...');

// Données pour modifier Victor
const victorData = {
  nom: 'Victor',
  origine_vin: 'France',
  type_vin: 'CHAMPAGNE',
  description: 'Champagne français de qualité supérieure',
  categorie_id: 9,
  variants: [
    {
      volume_vin: '75cl',
      contenant_vin: 'Bouteille', 
      prix: 65.0
    },
    {
      volume_vin: '14cl',
      contenant_vin: 'Verre',
      prix: 12.0
    }
  ]
};

const putData = JSON.stringify(victorData);

const options = {
  hostname: 'localhost',
  port: 4000,
  path: '/admin-nyc-2024-secret/api/admin/vins/14', // ID de Victor
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(putData)
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
      console.log('✅ Victor modifié avec succès!');
      
      // Vérifier la modification
      setTimeout(() => {
        console.log('\n🔍 Vérification de la modification...');
        checkVictor();
      }, 1000);
    } else {
      console.log('❌ Erreur lors de la modification');
    }
  });
});

req.on('error', (e) => {
  console.error('❌ Erreur:', e.message);
});

req.write(putData);
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
          
          if (victor) {
            console.log(`🍷 Victor: type=${victor.type_vin}, origine=${victor.origine_vin}`);
            if (victor.type_vin === 'CHAMPAGNE' && victor.origine_vin === 'France') {
              console.log('✅ SUCCÈS: Victor est maintenant un CHAMPAGNE français !');
            } else {
              console.log(`❌ ÉCHEC: Victor est toujours ${victor.type_vin} de ${victor.origine_vin}`);
            }
          } else {
            console.log('❌ Victor non trouvé');
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