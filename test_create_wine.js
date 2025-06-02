const fetch = require('node-fetch');

async function testCreateWine() {
  try {
    console.log('Test de création d\'un vin...');
    
    const vinData = {
      nom: 'Test Franck',
      origine_vin: 'France',
      type_vin: 'Rouge',
      description: 'Vin de test pour Franck',
      categorie_id: 9, // ID de la catégorie "carte des vins"
      photo_url: '',
      variants: [
        {
          volume_vin: '75cl',
          contenant_vin: 'Bouteille',
          prix: 25.00
        },
        {
          volume_vin: '14cl',
          contenant_vin: 'Verre',
          prix: 6.50
        }
      ]
    };
    
    const response = await fetch('http://localhost:4000/api/admin/vins', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(vinData)
    });
    
    if (response.ok) {
      const result = await response.json();
      console.log('✅ Vin créé avec succès:', result);
    } else {
      const error = await response.json();
      console.log('❌ Erreur lors de la création:', error);
    }
    
  } catch (error) {
    console.error('❌ Erreur:', error);
  }
}

testCreateWine(); 