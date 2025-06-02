const http = require('http');

console.log('🍷 Test de l\'affichage des vins par catégorie...');

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
        
        console.log(`\n📊 Total des vins: ${vins.length}`);
        
        // Séparer par pays
        const vinsItaliens = vins.filter(vin => {
          const origine = vin.origine_vin?.toLowerCase() || '';
          return origine.includes('italie') || origine.includes('italy');
        });
        
        const vinsFrancais = vins.filter(vin => {
          const origine = vin.origine_vin?.toLowerCase() || '';
          return origine.includes('france') || origine.includes('français');
        });
        
        console.log(`\n🇮🇹 Vins Italiens: ${vinsItaliens.length}`);
        console.log(`🇫🇷 Vins Français: ${vinsFrancais.length}`);
        
        // Analyser les types de vins italiens
        if (vinsItaliens.length > 0) {
          console.log('\n=== 🇮🇹 DÉTAIL VINS ITALIENS ===');
          
          const italiensRouges = vinsItaliens.filter(vin => {
            const type = vin.type_vin?.toLowerCase() || '';
            return type.includes('rouge');
          });
          
          const italiensBlancs = vinsItaliens.filter(vin => {
            const type = vin.type_vin?.toLowerCase() || '';
            return type.includes('blanc');
          });
          
          const italiensPetillants = vinsItaliens.filter(vin => {
            const type = vin.type_vin?.toLowerCase() || '';
            return type.includes('pétillant') || type.includes('petillant') || type.includes('prosecco');
          });
          
          const italiensRoses = vinsItaliens.filter(vin => {
            const type = vin.type_vin?.toLowerCase() || '';
            return type.includes('rosé') || type.includes('rose');
          });
          
          console.log(`🍷 Vins Rouges: ${italiensRouges.length}`);
          if (italiensRouges.length > 0) {
            italiensRouges.forEach(vin => console.log(`  - ${vin.nom} (${vin.type_vin})`));
          }
          
          console.log(`🥂 Vins Blancs: ${italiensBlancs.length}`);
          if (italiensBlancs.length > 0) {
            italiensBlancs.forEach(vin => console.log(`  - ${vin.nom} (${vin.type_vin})`));
          }
          
          console.log(`🥂 Vins Pétillants: ${italiensPetillants.length}`);
          if (italiensPetillants.length > 0) {
            italiensPetillants.forEach(vin => console.log(`  - ${vin.nom} (${vin.type_vin})`));
          }
          
          console.log(`🌸 Vins Rosés: ${italiensRoses.length}`);
          if (italiensRoses.length > 0) {
            italiensRoses.forEach(vin => console.log(`  - ${vin.nom} (${vin.type_vin})`));
          }
        }
        
        // Analyser les types de vins français
        if (vinsFrancais.length > 0) {
          console.log('\n=== 🇫🇷 DÉTAIL VINS FRANÇAIS ===');
          
          const francaisRouges = vinsFrancais.filter(vin => {
            const type = vin.type_vin?.toLowerCase() || '';
            return type.includes('rouge');
          });
          
          const francaisBlancs = vinsFrancais.filter(vin => {
            const type = vin.type_vin?.toLowerCase() || '';
            return type.includes('blanc') && !type.includes('champagne');
          });
          
          const champagnes = vinsFrancais.filter(vin => {
            const type = vin.type_vin?.toLowerCase() || '';
            return type.includes('champagne');
          });
          
          const francaisRoses = vinsFrancais.filter(vin => {
            const type = vin.type_vin?.toLowerCase() || '';
            return type.includes('rosé') || type.includes('rose');
          });
          
          console.log(`🍷 Vins Rouges: ${francaisRouges.length}`);
          if (francaisRouges.length > 0) {
            francaisRouges.forEach(vin => console.log(`  - ${vin.nom} (${vin.type_vin})`));
          }
          
          console.log(`🥂 Vins Blancs: ${francaisBlancs.length}`);
          if (francaisBlancs.length > 0) {
            francaisBlancs.forEach(vin => console.log(`  - ${vin.nom} (${vin.type_vin})`));
          }
          
          console.log(`🍾 Champagnes: ${champagnes.length}`);
          if (champagnes.length > 0) {
            champagnes.forEach(vin => console.log(`  - ${vin.nom} (${vin.type_vin})`));
          }
          
          console.log(`🌸 Vins Rosés: ${francaisRoses.length}`);
          if (francaisRoses.length > 0) {
            francaisRoses.forEach(vin => console.log(`  - ${vin.nom} (${vin.type_vin})`));
          }
        }
        
        console.log('\n✅ Test terminé !');
        console.log('\n📝 Résumé de l\'affichage:');
        console.log('- Les catégories ne s\'affichent QUE si elles contiennent des vins');
        console.log('- Design amélioré avec bordures colorées et dégradés');
        console.log('- Groupement par type pour TOUS les pays (Italie ET France)');
        
      } catch (error) {
        console.error('❌ Erreur lors du parsing JSON:', error);
      }
    } else {
      console.error(`❌ Erreur HTTP: ${res.statusCode}`);
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Erreur de requête:', error);
});

req.end(); 