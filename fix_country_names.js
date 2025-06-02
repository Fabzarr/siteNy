const http = require('http');

console.log('🌍 Correction des noms de pays en anglais vers le français...');

// Mapping des noms de pays anglais vers français
const countryMapping = {
  'Italy': 'Italie',
  'France': 'France', // déjà correct
  'Spain': 'Espagne',
  'Portugal': 'Portugal', // déjà correct
  'Germany': 'Allemagne',
  'Austria': 'Autriche',
  'Switzerland': 'Suisse',
  'Argentina': 'Argentine',
  'Chile': 'Chili',
  'United States': 'États-Unis',
  'USA': 'États-Unis',
  'Australia': 'Australie',
  'New Zealand': 'Nouvelle-Zélande',
  'South Africa': 'Afrique du Sud',
  'Greece': 'Grèce',
  'Hungary': 'Hongrie'
};

async function getWines() {
  return new Promise((resolve, reject) => {
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
            resolve(JSON.parse(data));
          } catch (error) {
            reject(error);
          }
        } else {
          reject(new Error(`HTTP error! status: ${res.statusCode}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
}

async function updateWine(wineId, wineData) {
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

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(data);
        } else {
          reject(new Error(`HTTP error! status: ${res.statusCode}, response: ${data}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(putData);
    req.end();
  });
}

async function fixCountryNames() {
  try {
    console.log('\n📋 Étape 1: Récupération des vins...');
    const vins = await getWines();
    
    console.log(`✅ ${vins.length} vins récupérés`);
    
    console.log('\n🔍 Étape 2: Analyse des pays d\'origine...');
    
    const winesNeedingFix = [];
    const countriesFound = new Set();
    
    vins.forEach(vin => {
      if (vin.origine_vin) {
        countriesFound.add(vin.origine_vin);
        
        if (countryMapping[vin.origine_vin] && countryMapping[vin.origine_vin] !== vin.origine_vin) {
          winesNeedingFix.push({
            ...vin,
            oldCountry: vin.origine_vin,
            newCountry: countryMapping[vin.origine_vin]
          });
        }
      }
    });
    
    console.log('\n📍 Pays d\'origine trouvés:');
    Array.from(countriesFound).sort().forEach(country => {
      const needsFix = countryMapping[country] && countryMapping[country] !== country;
      console.log(`   ${needsFix ? '❌' : '✅'} "${country}"${needsFix ? ` → "${countryMapping[country]}"` : ''}`);
    });
    
    if (winesNeedingFix.length === 0) {
      console.log('\n🎉 Aucune correction nécessaire ! Tous les pays sont déjà en français.');
      return;
    }
    
    console.log(`\n🔧 Étape 3: Correction de ${winesNeedingFix.length} vin(s)...`);
    
    for (let wine of winesNeedingFix) {
      console.log(`\n🍷 Correction de "${wine.nom}":`);
      console.log(`   "${wine.oldCountry}" → "${wine.newCountry}"`);
      
      try {
        const wineData = {
          nom: wine.nom,
          origine_vin: wine.newCountry,
          type_vin: wine.type_vin,
          description: wine.description,
          categorie_id: wine.categorie_id,
          variants: wine.variants || []
        };
        
        await updateWine(wine.id, wineData);
        console.log(`   ✅ "${wine.nom}" corrigé avec succès !`);
        
      } catch (error) {
        console.log(`   ❌ Erreur lors de la correction de "${wine.nom}":`, error.message);
      }
    }
    
    console.log('\n🎯 RÉSUMÉ:');
    console.log(`- ${winesNeedingFix.length} vin(s) corrigé(s)`);
    console.log('- Les drapeaux devraient maintenant s\'afficher correctement côté frontend ! 🇮🇹🇫🇷🇪🇸');
    
  } catch (error) {
    console.error('❌ Erreur:', error);
  }
}

fixCountryNames(); 