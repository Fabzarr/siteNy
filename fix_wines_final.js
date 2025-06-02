const http = require('http');

// Corrections avec variants complets
const corrections = [
  {
    id: 9, // Champagne Veuve Clicquot
    nom: 'Champagne Veuve Clicquot',
    origine_vin: 'France',
    type_vin: 'CHAMPAGNE',
    description: 'Brut Carte Jaune, arômes de fruits blancs et brioche',
    categorie_id: 9,
    variants: [
      { volume_vin: '75cl', contenant_vin: 'Bouteille', prix: 90 }
    ]
  },
  {
    id: 5, // Chablis
    nom: 'Chablis',
    origine_vin: 'France',
    type_vin: 'VINS BLANC',
    description: 'Vin blanc sec, minéral avec notes d\'agrumes',
    categorie_id: 9,
    variants: [
      { volume_vin: '75cl', contenant_vin: 'Bouteille', prix: 38 }
    ]
  },
  {
    id: 7, // Sancerre
    nom: 'Sancerre',
    origine_vin: 'France',
    type_vin: 'VINS BLANC',
    description: 'Vin blanc vif, notes d\'agrumes et de pierre à fusil',
    categorie_id: 9,
    variants: [
      { volume_vin: '75cl', contenant_vin: 'Bouteille', prix: 36 }
    ]
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
      
      const path = `/admin-nyc-2024-secret/api/admin/vins/${correction.id}`;
      
      const response = await makeRequest(path, {
        nom: correction.nom,
        origine_vin: correction.origine_vin,
        type_vin: correction.type_vin,
        description: correction.description,
        categorie_id: correction.categorie_id,
        variants: correction.variants
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