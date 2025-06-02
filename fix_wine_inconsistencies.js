const http = require('http');

console.log('🔧 Correction des incohérences des vins...');

// Correction du Pinot Grigio
const pinotGrigioData = {
  nom: 'Pinot Grigio',
  origine_vin: 'Italie',
  type_vin: 'VINS BLANC',
  description: 'Vin blanc sec italien, arômes de fruits et minéralité',
  categorie_id: 9,
  variants: [
    {
      volume_vin: '75cl',
      contenant_vin: 'Bouteille', 
      prix: 28.0
    },
    {
      volume_vin: '14cl',
      contenant_vin: 'Verre',
      prix: 6.0
    }
  ]
};

// Correction du Chianti Classico
const chiantiData = {
  nom: 'Chianti Classico',
  origine_vin: 'Italie',
  type_vin: 'VINS ROUGE',
  description: 'Vin rouge toscan, notes de cerises et d\'épices',
  categorie_id: 9,
  variants: [
    {
      volume_vin: '75cl',
      contenant_vin: 'Bouteille', 
      prix: 35.0
    },
    {
      volume_vin: '14cl',
      contenant_vin: 'Verre',
      prix: 7.0
    }
  ]
};

async function fixWine(wineData, wineId, wineName) {
  return new Promise((resolve, reject) => {
    const putData = JSON.stringify(wineData);

    const options = {
      hostname: 'localhost',
      port: 4000,
      path: `/admin-nyc-2024-secret/api/admin/vins/${wineId}`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(putData)
      }
    };

    console.log(`\n📤 Correction de ${wineName}...`);
    console.log(`- Nouvelle origine: ${wineData.origine_vin}`);
    console.log(`- Nouveau type: ${wineData.type_vin}`);

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode === 200) {
          console.log(`✅ ${wineName} corrigé avec succès !`);
          resolve(data);
        } else {
          console.error(`❌ Erreur HTTP ${res.statusCode} pour ${wineName}`);
          reject(new Error(`HTTP ${res.statusCode}`));
        }
      });
    });

    req.on('error', (error) => {
      console.error(`❌ Erreur réseau pour ${wineName}:`, error);
      reject(error);
    });

    req.write(putData);
    req.end();
  });
}

async function fixAllWines() {
  try {
    // Corriger Pinot Grigio (ID: 2)
    await fixWine(pinotGrigioData, 2, 'Pinot Grigio');
    
    // Corriger Chianti Classico (ID: 10)
    await fixWine(chiantiData, 10, 'Chianti Classico');
    
    console.log('\n🎉 Toutes les corrections terminées !');
    
    // Vérifier les modifications
    console.log('\n🔍 Vérification des corrections...');
    setTimeout(() => {
      require('child_process').exec('node check_problematic_wines.js', (error, stdout) => {
        if (error) {
          console.error('Erreur lors de la vérification:', error);
        } else {
          console.log(stdout);
        }
      });
    }, 1000);
    
  } catch (error) {
    console.error('❌ Erreur lors de la correction:', error);
  }
}

fixAllWines(); 