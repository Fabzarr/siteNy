const http = require('http');

const corrections = [
  {
    nom: 'Champagne Veuve Clicquot',
    type_vin: 'CHAMPAGNE',
    origine_vin: 'France'
  },
  {
    nom: 'Chablis',
    type_vin: 'VINS BLANC',
    origine_vin: 'France'
  },
  {
    nom: 'Sancerre',
    type_vin: 'VINS BLANC',
    origine_vin: 'France'
  }
];

function makeRequest(path, data) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(data);
    
    const options = {
      hostname: 'localhost',
      port: 4000,
      path: path,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = http.request(options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          data: responseData
        });
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    req.write(postData);
    req.end();
  });
}

async function fixWineData() {
  console.log('🔧 Correction des données de vins mal classées...\n');
  
  for (const correction of corrections) {
    try {
      console.log(`📝 Correction de "${correction.nom}"`);
      console.log(`   Type: ${correction.type_vin}`);
      console.log(`   Origine: ${correction.origine_vin}`);
      
      const encodedName = encodeURIComponent(correction.nom);
      const path = `/api/vins/${encodedName}`;
      
      const response = await makeRequest(path, {
        type_vin: correction.type_vin,
        origine_vin: correction.origine_vin
      });
      
      if (response.statusCode === 200) {
        console.log(`✅ ${correction.nom} corrigé avec succès\n`);
      } else {
        console.log(`❌ Erreur pour ${correction.nom}: ${response.statusCode}\n`);
        console.log(`Réponse: ${response.data}\n`);
      }
    } catch (error) {
      console.log(`❌ Erreur pour ${correction.nom}: ${error.message}\n`);
    }
  }
  
  console.log('🎉 Corrections terminées !\n');
}

fixWineData(); 