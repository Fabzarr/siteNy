// Tests de performance et stress pour le New York Café

describe('Performance Tests', () => {

  describe('Data Processing Performance', () => {
    test('should process large menu dataset efficiently', () => {
      const startTime = Date.now();
      
      // Générer un grand dataset de menu
      const largeMenu = Array.from({ length: 100 }, (_, categoryIndex) => ({
        id: categoryIndex + 1,
        nom: `Catégorie ${categoryIndex + 1}`,
        ordre: categoryIndex + 1,
        plats: Array.from({ length: 50 }, (_, platIndex) => ({
          id: categoryIndex * 50 + platIndex + 1,
          nom: `Plat ${platIndex + 1}`,
          description: `Description du plat ${platIndex + 1}`,
          prix: Math.round((Math.random() * 50 + 10) * 100) / 100
        }))
      }));

      // Traitement des données
      const processedMenu = largeMenu.map(category => ({
        ...category,
        plats: category.plats.filter(plat => plat.prix > 0).sort((a, b) => a.prix - b.prix)
      }));

      const endTime = Date.now();
      const processingTime = endTime - startTime;

      expect(processedMenu).toHaveLength(100);
      expect(processedMenu[0].plats.length).toBeGreaterThan(0);
      expect(processingTime).toBeLessThan(1000); // Moins d'1 seconde
    });

    test('should handle wine data aggregation efficiently', () => {
      const startTime = Date.now();

      // Générer un dataset de vins avec variants
      const largeWineData = Array.from({ length: 500 }, (_, wineIndex) => ({
        id: wineIndex + 1,
        nom: `Vin ${wineIndex + 1}`,
        type: ['Rouge', 'Blanc', 'Rosé', 'Pétillant'][wineIndex % 4],
        origine: ['France', 'Italie', 'Espagne', 'Portugal'][wineIndex % 4],
        variants: Array.from({ length: 3 }, (_, variantIndex) => ({
          id: wineIndex * 3 + variantIndex + 1,
          volume: [375, 750, 1500][variantIndex],
          contenant: ['Demi-bouteille', 'Bouteille', 'Magnum'][variantIndex],
          prix_unitaire: Math.round((Math.random() * 100 + 20) * 100) / 100,
          stock_actuel: Math.floor(Math.random() * 100)
        }))
      }));

      // Agrégation par type
      const aggregatedByType = largeWineData.reduce((acc, wine) => {
        if (!acc[wine.type]) {
          acc[wine.type] = [];
        }
        acc[wine.type].push(wine);
        return acc;
      }, {});

      const endTime = Date.now();
      const processingTime = endTime - startTime;

      expect(Object.keys(aggregatedByType)).toHaveLength(4);
      expect(processingTime).toBeLessThan(500); // Moins de 500ms
    });
  });

  describe('Search Performance', () => {
    test('should search through large dataset quickly', () => {
      // Créer un grand dataset de plats
      const largePlatsData = Array.from({ length: 10000 }, (_, index) => ({
        id: index + 1,
        nom: `Plat ${index + 1}`,
        description: `Description détaillée du plat ${index + 1} avec des mots-clés`,
        prix: Math.round((Math.random() * 50 + 5) * 100) / 100,
        categorie: ['Entrées', 'Plats', 'Desserts'][index % 3]
      }));

      const searchTerm = 'Plat 1';
      const startTime = Date.now();

      // Recherche simple
      const results = largePlatsData.filter(plat => 
        plat.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plat.description.toLowerCase().includes(searchTerm.toLowerCase())
      );

      const endTime = Date.now();
      const searchTime = endTime - startTime;

      expect(results.length).toBeGreaterThan(0);
      expect(searchTime).toBeLessThan(100); // Moins de 100ms
    });

    test('should handle complex filtering efficiently', () => {
      const largeData = Array.from({ length: 5000 }, (_, index) => ({
        id: index + 1,
        nom: `Item ${index + 1}`,
        prix: Math.round((Math.random() * 100 + 10) * 100) / 100,
        type: ['Rouge', 'Blanc', 'Rosé'][index % 3],
        origine: ['France', 'Italie', 'Espagne'][index % 3],
        stock: Math.floor(Math.random() * 100),
        actif: Math.random() > 0.1 // 90% actifs
      }));

      const startTime = Date.now();

      // Filtrage complexe
      const filteredData = largeData
        .filter(item => item.actif)
        .filter(item => item.prix >= 20 && item.prix <= 80)
        .filter(item => item.stock > 10)
        .filter(item => item.origine === 'France')
        .sort((a, b) => a.prix - b.prix);

      const endTime = Date.now();
      const filterTime = endTime - startTime;

      expect(filteredData.length).toBeGreaterThan(0);
      expect(filterTime).toBeLessThan(200); // Moins de 200ms
    });
  });

  describe('Memory Usage Tests', () => {
    test('should not create memory leaks with repeated operations', () => {
      const initialMemory = process.memoryUsage().heapUsed;

      // Répéter des opérations qui pourraient créer des fuites
      for (let i = 0; i < 1000; i++) {
        const tempData = Array.from({ length: 100 }, (_, index) => ({
          id: index,
          data: `Data ${index}`,
          timestamp: Date.now()
        }));

        // Traitement des données
        const processed = tempData
          .filter(item => item.id % 2 === 0)
          .map(item => ({ ...item, processed: true }));

        // Nettoyage explicite
        tempData.length = 0;
        processed.length = 0;
      }

      // Forcer le garbage collection si possible
      if (global.gc) {
        global.gc();
      }

      const finalMemory = process.memoryUsage().heapUsed;
      const memoryIncrease = finalMemory - initialMemory;

      // L'augmentation de mémoire ne devrait pas être excessive
      expect(memoryIncrease).toBeLessThan(50 * 1024 * 1024); // Moins de 50MB
    });
  });

  describe('Concurrent Operations', () => {
    test('should handle multiple simultaneous validations', async () => {
      const validationTasks = Array.from({ length: 100 }, (_, index) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            const data = {
              nom: `Test ${index}`,
              email: `test${index}@example.com`,
              telephone: '0123456789',
              date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              nombrePersonnes: Math.floor(Math.random() * 10) + 1
            };

            // Validation simple
            const isValid = data.nom && data.email && data.telephone && data.date && data.nombrePersonnes;
            resolve({ index, isValid, data });
          }, Math.random() * 10); // Délai aléatoire jusqu'à 10ms
        });
      });

      const startTime = Date.now();
      const results = await Promise.all(validationTasks);
      const endTime = Date.now();

      const totalTime = endTime - startTime;
      const validResults = results.filter(r => r.isValid);

      expect(results).toHaveLength(100);
      expect(validResults.length).toBeGreaterThan(90); // La plupart devraient être valides
      expect(totalTime).toBeLessThan(1000); // Moins d'1 seconde pour tout traiter
    });
  });

  describe('Stress Tests', () => {
    test('should handle extreme data volumes', () => {
      const startTime = Date.now();

      // Créer un dataset extrêmement large
      const extremeData = {
        categories: Array.from({ length: 1000 }, (_, i) => ({ id: i + 1, nom: `Cat ${i}` })),
        plats: Array.from({ length: 50000 }, (_, i) => ({
          id: i + 1,
          nom: `Plat ${i}`,
          prix: Math.random() * 100,
          categorie_id: (i % 1000) + 1
        })),
        vins: Array.from({ length: 5000 }, (_, i) => ({
          id: i + 1,
          nom: `Vin ${i}`,
          type: ['Rouge', 'Blanc', 'Rosé'][i % 3]
        }))
      };

      // Opérations sur les données
      const expensivePlats = extremeData.plats.filter(p => p.prix > 50);
      const groupedByCategory = extremeData.plats.reduce((acc, plat) => {
        if (!acc[plat.categorie_id]) acc[plat.categorie_id] = [];
        acc[plat.categorie_id].push(plat);
        return acc;
      }, {});

      const endTime = Date.now();
      const processingTime = endTime - startTime;

      expect(expensivePlats.length).toBeGreaterThan(0);
      expect(Object.keys(groupedByCategory)).toHaveLength(1000);
      expect(processingTime).toBeLessThan(5000); // Moins de 5 secondes
    });

    test('should handle rapid successive operations', () => {
      const operations = [];
      const startTime = Date.now();

      // Effectuer 1000 opérations rapidement
      for (let i = 0; i < 1000; i++) {
        const operation = () => {
          const data = Array.from({ length: 100 }, (_, j) => ({
            id: i * 100 + j,
            value: Math.random(),
            processed: false
          }));

          return data
            .filter(item => item.value > 0.5)
            .map(item => ({ ...item, processed: true }))
            .sort((a, b) => a.value - b.value);
        };

        operations.push(operation());
      }

      const endTime = Date.now();
      const totalTime = endTime - startTime;

      expect(operations).toHaveLength(1000);
      expect(operations.every(op => Array.isArray(op))).toBe(true);
      expect(totalTime).toBeLessThan(2000); // Moins de 2 secondes
    });
  });

  describe('Edge Cases Performance', () => {
    test('should handle empty datasets gracefully', () => {
      const startTime = Date.now();

      const emptyData = {
        categories: [],
        plats: [],
        vins: [],
        reservations: []
      };

      // Opérations sur données vides
      const results = {
        totalCategories: emptyData.categories.length,
        totalPlats: emptyData.plats.length,
        averagePrice: emptyData.plats.reduce((sum, p) => sum + p.prix, 0) / (emptyData.plats.length || 1),
        groupedVins: emptyData.vins.reduce((acc, v) => {
          if (!acc[v.type]) acc[v.type] = [];
          acc[v.type].push(v);
          return acc;
        }, {})
      };

      const endTime = Date.now();
      const processingTime = endTime - startTime;

      expect(results.totalCategories).toBe(0);
      expect(results.totalPlats).toBe(0);
      expect(Object.keys(results.groupedVins)).toHaveLength(0);
      expect(processingTime).toBeLessThan(10); // Très rapide pour données vides
    });

    test('should handle malformed data without crashing', () => {
      const malformedData = [
        null,
        undefined,
        {},
        { nom: null },
        { prix: 'invalid' },
        { date: 'not-a-date' },
        { array: [null, undefined, {}] }
      ];

      const startTime = Date.now();

      // Traitement défensif
      const cleanedData = malformedData
        .filter(item => item !== null && item !== undefined)
        .filter(item => typeof item === 'object')
        .map(item => {
          const cleaned = {};
          Object.keys(item).forEach(key => {
            if (item[key] !== null && item[key] !== undefined) {
              cleaned[key] = item[key];
            }
          });
          return cleaned;
        })
        .filter(item => Object.keys(item).length > 0);

      const endTime = Date.now();
      const processingTime = endTime - startTime;

      expect(cleanedData.length).toBeGreaterThan(0);
      expect(processingTime).toBeLessThan(50); // Rapide même avec données malformées
    });
  });
}); 