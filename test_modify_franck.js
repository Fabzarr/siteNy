const http = require('http');

console.log('🍷 Test de modification du vin Franck...');

// Données pour modifier Franck en VINS BLANC
const franckData = {
  nom: 'Franck',
  origine_vin: 'France',
  type_vin: 'VINS BLANC',
  description: 'Vin blanc français de qualité',
  categorie_id: 9,
  variants: [
    {
      volume_vin: '75cl',
      contenant_vin: 'Bouteille', 
      prix: 28.5
    },
    {
      volume_vin: '14cl',
      contenant_vin: 'Verre',
      prix: 7.5
    }
  ]
};

const putData = JSON.stringify(franckData);

const options = {
  hostname: 'localhost',
  port: 4000,
  path: '/admin-nyc-2024-secret/api/admin/vins/12', // ID de Franck
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
      console.log('✅ Franck modifié avec succès!');
      
      // Vérifier la modification
      setTimeout(() => {
        console.log('\n🔍 Vérification de la modification...');
        checkFranck();
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

function checkFranck() {
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
          const franck = vins.find(v => v.nom === 'Franck');
          
          if (franck) {
            console.log(`🍷 Franck trouvé: type=${franck.type_vin}, origine=${franck.origine_vin}`);
            if (franck.type_vin === 'VINS BLANC') {
              console.log('✅ SUCCÈS: Franck est maintenant un VINS BLANC!');
            } else {
              console.log(`❌ ÉCHEC: Franck est toujours ${franck.type_vin}`);
            }
          } else {
            console.log('❌ Franck non trouvé');
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