const https = require('https');
const http = require('http');

// Test login pour récupérer le token
const loginData = JSON.stringify({
  username: 'admin',
  password: 'admin123'
});

const loginOptions = {
  hostname: 'localhost',
  port: 4000,
  path: '/admin-nyc-2024-secret/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(loginData)
  }
};

console.log('🔐 Test de connexion admin...');

const loginReq = http.request(loginOptions, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log(`Status: ${res.statusCode}`);
    console.log('Response:', data);
    
    if (res.statusCode === 200) {
      try {
        const response = JSON.parse(data);
        const token = response.token;
        console.log('\n✅ Token récupéré !');
        
        // Test de l'API des vins avec le token
        testWinesAPI(token);
      } catch (e) {
        console.log('❌ Erreur parsing JSON:', e.message);
      }
    }
  });
});

loginReq.on('error', (e) => {
  console.error('❌ Erreur login:', e.message);
});

loginReq.write(loginData);
loginReq.end();

function testWinesAPI(token) {
  console.log('\n🍷 Test API des vins...');
  
  const winesOptions = {
    hostname: 'localhost',
    port: 4000,
    path: '/admin-nyc-2024-secret/api/admin/vins',
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  };

  const winesReq = http.request(winesOptions, (res) => {
    let data = '';
    
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      console.log(`Status: ${res.statusCode}`);
      
      if (res.statusCode === 200) {
        try {
          const vins = JSON.parse(data);
          console.log(`\n✅ ${vins.length} vins trouvés:`);
          
          // Chercher Franck, Victor, Diane
          const cherches = ['Franck', 'Victor', 'Diane'];
          cherches.forEach(nom => {
            const vin = vins.find(v => v.nom === nom);
            if (vin) {
              console.log(`🍷 ${vin.nom}: ID=${vin.id}, origine=${vin.origine_vin}, type=${vin.type_vin}, variants=${vin.variants.length}`);
            } else {
              console.log(`❌ ${nom}: NON TROUVÉ`);
            }
          });
        } catch (e) {
          console.log('❌ Erreur parsing vins:', e.message);
        }
      } else {
        console.log('❌ Erreur API vins:', data);
      }
    });
  });

  winesReq.on('error', (e) => {
    console.error('❌ Erreur vins API:', e.message);
  });

  winesReq.end();
} 