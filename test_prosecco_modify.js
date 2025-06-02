const http = require('http');

console.log('🔧 Modification du Prosecco en vin blanc italien...');

// Données pour modifier le Prosecco
const proseccoData = {
  nom: 'Prosecco',
  origine_vin: 'Italie',
  type_vin: 'VINS BLANC',
  description: 'Vin blanc italien, notes florales et de pomme',
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
      prix: 6.5
    }
  ]
};

const putData = JSON.stringify(proseccoData);

// D'abord, on trouve l'ID du Prosecco
const findOptions = {
  hostname: 'localhost',
  port: 4000,
  path: '/api/vins',
  method: 'GET'
};

const findReq = http.request(findOptions, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    if (res.statusCode === 200) {
      try {
        const vins = JSON.parse(data);
        const prosecco = vins.find(v => v.nom === 'Prosecco');
        
        if (prosecco) {
          console.log(`✅ Prosecco trouvé avec ID: ${prosecco.id}`);
          console.log(`Actuel: ${prosecco.type_vin} ${prosecco.origine_vin}`);
          
          // Maintenant on le modifie
          const putOptions = {
            hostname: 'localhost',
            port: 4000,
            path: `/admin-nyc-2024-secret/api/admin/vins/${prosecco.id}`,
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Content-Length': Buffer.byteLength(putData)
            }
          };

          const putReq = http.request(putOptions, (res) => {
            let data = '';
            res.on('data', (chunk) => {
              data += chunk;
            });
            
            res.on('end', () => {
              if (res.statusCode === 200) {
                console.log('✅ Prosecco modifié avec succès!');
                console.log('Nouveau: VINS BLANC Italie');
                console.log('Response:', data);
                
                // Vérification
                setTimeout(() => {
                  const verifyReq = http.request(findOptions, (res) => {
                    let data = '';
                    res.on('data', (chunk) => {
                      data += chunk;
                    });
                    
                    res.on('end', () => {
                      const vins = JSON.parse(data);
                      const updatedProsecco = vins.find(v => v.nom === 'Prosecco');
                      console.log('\n=== VÉRIFICATION ===');
                      console.log(`Prosecco: ${updatedProsecco.type_vin} ${updatedProsecco.origine_vin}`);
                    });
                  });
                  
                  verifyReq.on('error', (err) => {
                    console.error('Erreur de vérification:', err.message);
                  });
                  
                  verifyReq.end();
                }, 500);
                
              } else {
                console.error('❌ Erreur lors de la modification:', res.statusCode);
                console.error('Response:', data);
              }
            });
          });

          putReq.on('error', (err) => {
            console.error('❌ Erreur de connexion:', err.message);
          });

          putReq.write(putData);
          putReq.end();
          
        } else {
          console.error('❌ Prosecco non trouvé');
        }
      } catch (error) {
        console.error('❌ Erreur parsing JSON:', error.message);
      }
    } else {
      console.error('❌ Erreur HTTP:', res.statusCode);
    }
  });
});

findReq.on('error', (err) => {
  console.error('❌ Erreur de connexion:', err.message);
});

findReq.end(); 