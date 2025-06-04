// Tests d'intégrité des données pour le New York Café

describe('Data Integrity Tests', () => {

  describe('Menu Data Consistency', () => {
    const validateMenuStructure = (menuData) => {
      const errors = [];

      if (!Array.isArray(menuData)) {
        errors.push('Menu doit être un tableau');
        return { isValid: false, errors };
      }

      menuData.forEach((category, index) => {
        // Validation catégorie
        if (!category.id || typeof category.id !== 'number') {
          errors.push(`Catégorie ${index}: ID manquant ou invalide`);
        }

        if (!category.nom || typeof category.nom !== 'string' || category.nom.trim().length === 0) {
          errors.push(`Catégorie ${index}: Nom manquant ou invalide`);
        }

        if (typeof category.ordre !== 'number' || category.ordre < 0) {
          errors.push(`Catégorie ${index}: Ordre invalide`);
        }

        if (!Array.isArray(category.plats)) {
          errors.push(`Catégorie ${index}: Plats doit être un tableau`);
          return;
        }

        // Validation plats
        category.plats.forEach((plat, platIndex) => {
          if (!plat.id || typeof plat.id !== 'number') {
            errors.push(`Catégorie ${index}, Plat ${platIndex}: ID manquant`);
          }

          if (!plat.nom || typeof plat.nom !== 'string') {
            errors.push(`Catégorie ${index}, Plat ${platIndex}: Nom manquant`);
          }

          if (typeof plat.prix !== 'number' && typeof plat.prix !== 'string') {
            errors.push(`Catégorie ${index}, Plat ${platIndex}: Prix manquant`);
          }

          if (plat.prix && (parseFloat(plat.prix) <= 0 || parseFloat(plat.prix) > 1000)) {
            errors.push(`Catégorie ${index}, Plat ${platIndex}: Prix invalide`);
          }
        });
      });

      return {
        isValid: errors.length === 0,
        errors
      };
    };

    test('should validate correct menu structure', () => {
      const validMenu = [
        {
          id: 1,
          nom: 'Entrées',
          ordre: 1,
          plats: [
            {
              id: 1,
              nom: 'Salade César',
              description: 'Salade fraîche',
              prix: 12.50
            },
            {
              id: 2,
              nom: 'Bruschetta',
              description: 'Pain grillé',
              prix: '8.50'
            }
          ]
        },
        {
          id: 2,
          nom: 'Plats',
          ordre: 2,
          plats: [
            {
              id: 3,
              nom: 'Pizza Margherita',
              description: 'Pizza classique',
              prix: 14.00
            }
          ]
        }
      ];

      const result = validateMenuStructure(validMenu);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should detect invalid menu structure', () => {
      const invalidMenu = [
        {
          // ID manquant
          nom: 'Entrées',
          ordre: 'invalid', // Ordre invalide
          plats: [
            {
              id: 1,
              // Nom manquant
              prix: -5 // Prix négatif
            }
          ]
        }
      ];

      const result = validateMenuStructure(invalidMenu);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    test('should validate prix data types', () => {
      const menuWithMixedPrices = [
        {
          id: 1,
          nom: 'Test',
          ordre: 1,
          plats: [
            { id: 1, nom: 'Plat1', prix: 15.50 }, // Number - Valid
            { id: 2, nom: 'Plat2', prix: '12.00' }, // String - Valid
            { id: 3, nom: 'Plat3', prix: 'invalid' }, // Invalid - 1 error
            { id: 4, nom: 'Plat4', prix: 0 }, // Zero (invalid) - 1 error
            { id: 5, nom: 'Plat5', prix: 1001 } // Too high - 1 error
          ]
        }
      ];

      const result = validateMenuStructure(menuWithMixedPrices);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBe(1); // 1 prix "invalid" ne peut pas être parsé
    });
  });

  describe('Wine Data Consistency', () => {
    const validateWineData = (wineData) => {
      const errors = [];

      if (!Array.isArray(wineData)) {
        errors.push('Données vins doivent être un tableau');
        return { isValid: false, errors };
      }

      wineData.forEach((wine, index) => {
        if (!wine.id || typeof wine.id !== 'number') {
          errors.push(`Vin ${index}: ID manquant`);
        }

        if (!wine.nom || typeof wine.nom !== 'string') {
          errors.push(`Vin ${index}: Nom manquant`);
        }

        const validTypes = ['Rouge', 'Blanc', 'Rosé', 'Pétillant', 'Dessert'];
        if (!wine.type || !validTypes.includes(wine.type)) {
          errors.push(`Vin ${index}: Type invalide`);
        }

        if (!wine.origine || typeof wine.origine !== 'string') {
          errors.push(`Vin ${index}: Origine manquante`);
        }

        if (!Array.isArray(wine.variants)) {
          errors.push(`Vin ${index}: Variants doivent être un tableau`);
          return;
        }

        wine.variants.forEach((variant, variantIndex) => {
          if (!variant.id || typeof variant.id !== 'number') {
            errors.push(`Vin ${index}, Variant ${variantIndex}: ID manquant`);
          }

          const validVolumes = [187, 375, 500, 750, 1000, 1500, 3000];
          if (!validVolumes.includes(variant.volume)) {
            errors.push(`Vin ${index}, Variant ${variantIndex}: Volume invalide`);
          }

          if (typeof variant.prix_unitaire !== 'number' || variant.prix_unitaire <= 0) {
            errors.push(`Vin ${index}, Variant ${variantIndex}: Prix invalide`);
          }

          const validContenants = ['Bouteille', 'Demi-bouteille', 'Magnum', 'Verre'];
          if (!validContenants.includes(variant.contenant)) {
            errors.push(`Vin ${index}, Variant ${variantIndex}: Contenant invalide`);
          }

          if (typeof variant.stock_actuel !== 'number' || variant.stock_actuel < 0) {
            errors.push(`Vin ${index}, Variant ${variantIndex}: Stock invalide`);
          }
        });
      });

      return {
        isValid: errors.length === 0,
        errors
      };
    };

    test('should validate correct wine data', () => {
      const validWines = [
        {
          id: 1,
          nom: 'Bordeaux Rouge 2020',
          type: 'Rouge',
          origine: 'France',
          variants: [
            {
              id: 1,
              volume: 750,
              contenant: 'Bouteille',
              prix_unitaire: 25.50,
              stock_actuel: 50
            },
            {
              id: 2,
              volume: 375,
              contenant: 'Demi-bouteille',
              prix_unitaire: 15.00,
              stock_actuel: 20
            }
          ]
        }
      ];

      const result = validateWineData(validWines);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should detect invalid wine data', () => {
      const invalidWines = [
        {
          id: 1,
          nom: 'Test Wine',
          type: 'Invalid Type', // Type invalide
          origine: 'France',
          variants: [
            {
              id: 1,
              volume: 999, // Volume invalide
              contenant: 'Invalid Container', // Contenant invalide
              prix_unitaire: -10, // Prix négatif
              stock_actuel: -5 // Stock négatif
            }
          ]
        }
      ];

      const result = validateWineData(invalidWines);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });
  });

  describe('Reservation Data Integrity', () => {
    const validateReservationsIntegrity = (reservations) => {
      const errors = [];

      if (!Array.isArray(reservations)) {
        errors.push('Réservations doivent être un tableau');
        return { isValid: false, errors };
      }

      const usedIds = new Set();
      const timeSlots = new Map(); // date -> [heures occupées]

      reservations.forEach((reservation, index) => {
        // Unicité des IDs
        if (usedIds.has(reservation.id)) {
          errors.push(`Réservation ${index}: ID dupliqué (${reservation.id})`);
        } else {
          usedIds.add(reservation.id);
        }

        // Validation des champs obligatoires
        if (!reservation.nom || typeof reservation.nom !== 'string') {
          errors.push(`Réservation ${index}: Nom invalide`);
        }

        if (!reservation.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(reservation.email)) {
          errors.push(`Réservation ${index}: Email invalide`);
        }

        if (!reservation.date || isNaN(Date.parse(reservation.date))) {
          errors.push(`Réservation ${index}: Date invalide`);
        }

        if (!reservation.heure || !/^\d{2}:\d{2}$/.test(reservation.heure)) {
          errors.push(`Réservation ${index}: Heure invalide`);
        }

        if (!reservation.nombrePersonnes || reservation.nombrePersonnes < 1 || reservation.nombrePersonnes > 25) {
          errors.push(`Réservation ${index}: Nombre de personnes invalide`);
        }

        // Vérification des conflits de créneaux
        if (reservation.date && reservation.heure) {
          const dateKey = reservation.date;
          const timeSlot = reservation.heure;

          if (!timeSlots.has(dateKey)) {
            timeSlots.set(dateKey, []);
          }

          const existingSlots = timeSlots.get(dateKey);
          if (existingSlots.includes(timeSlot)) {
            errors.push(`Réservation ${index}: Créneau déjà occupé (${dateKey} ${timeSlot})`);
          } else {
            existingSlots.push(timeSlot);
          }
        }

        // Validation statut
        const validStatuses = ['en_attente', 'confirmee', 'annulee'];
        if (reservation.statut && !validStatuses.includes(reservation.statut)) {
          errors.push(`Réservation ${index}: Statut invalide`);
        }
      });

      return {
        isValid: errors.length === 0,
        errors
      };
    };

    test('should validate consistent reservation data', () => {
      const validReservations = [
        {
          id: 1,
          nom: 'Jean Dupont',
          email: 'jean@example.com',
          date: '2024-12-25',
          heure: '19:00',
          nombrePersonnes: 4,
          statut: 'confirmee'
        },
        {
          id: 2,
          nom: 'Marie Martin',
          email: 'marie@example.com',
          date: '2024-12-25',
          heure: '20:00',
          nombrePersonnes: 2,
          statut: 'en_attente'
        }
      ];

      const result = validateReservationsIntegrity(validReservations);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should detect reservation conflicts', () => {
      const conflictingReservations = [
        {
          id: 1,
          nom: 'Jean Dupont',
          email: 'jean@example.com',
          date: '2024-12-25',
          heure: '19:00',
          nombrePersonnes: 4
        },
        {
          id: 2,
          nom: 'Marie Martin',
          email: 'marie@example.com',
          date: '2024-12-25',
          heure: '19:00', // Même créneau !
          nombrePersonnes: 2
        }
      ];

      const result = validateReservationsIntegrity(conflictingReservations);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Réservation 1: Créneau déjà occupé (2024-12-25 19:00)');
    });

    test('should detect duplicate IDs', () => {
      const duplicateIdReservations = [
        {
          id: 1,
          nom: 'Jean Dupont',
          email: 'jean@example.com',
          date: '2024-12-25',
          heure: '19:00',
          nombrePersonnes: 4
        },
        {
          id: 1, // ID dupliqué !
          nom: 'Marie Martin',
          email: 'marie@example.com',
          date: '2024-12-25',
          heure: '20:00',
          nombrePersonnes: 2
        }
      ];

      const result = validateReservationsIntegrity(duplicateIdReservations);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Réservation 1: ID dupliqué (1)');
    });
  });

  describe('Database Consistency Checks', () => {
    const validateDatabaseRelations = (data) => {
      const errors = [];
      const { categories, plats, vins, variants } = data;

      // Vérifier que tous les plats ont une catégorie valide
      if (plats && categories) {
        const categoryIds = new Set(categories.map(c => c.id));
        plats.forEach((plat, index) => {
          if (!categoryIds.has(plat.categorie_id)) {
            errors.push(`Plat ${index}: Catégorie inexistante (ID: ${plat.categorie_id})`);
          }
        });
      }

      // Vérifier que tous les variants ont un vin valide
      if (variants && vins) {
        const vinIds = new Set(vins.map(v => v.id));
        variants.forEach((variant, index) => {
          if (!vinIds.has(variant.vin_id)) {
            errors.push(`Variant ${index}: Vin inexistant (ID: ${variant.vin_id})`);
          }
        });
      }

      // Vérifier les contraintes d'unicité
      const checkUniqueness = (items, field, label) => {
        const seen = new Set();
        items.forEach((item, index) => {
          if (seen.has(item[field])) {
            errors.push(`${label} ${index}: ${field} dupliqué (${item[field]})`);
          } else {
            seen.add(item[field]);
          }
        });
      };

      if (categories) checkUniqueness(categories, 'nom', 'Catégorie');
      if (vins) checkUniqueness(vins, 'nom', 'Vin');

      return {
        isValid: errors.length === 0,
        errors
      };
    };

    test('should validate correct database relations', () => {
      const validData = {
        categories: [
          { id: 1, nom: 'Entrées' },
          { id: 2, nom: 'Plats' }
        ],
        plats: [
          { id: 1, nom: 'Salade', categorie_id: 1 },
          { id: 2, nom: 'Pizza', categorie_id: 2 }
        ],
        vins: [
          { id: 1, nom: 'Bordeaux' },
          { id: 2, nom: 'Champagne' }
        ],
        variants: [
          { id: 1, vin_id: 1, volume: 750 },
          { id: 2, vin_id: 2, volume: 750 }
        ]
      };

      const result = validateDatabaseRelations(validData);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should detect orphaned records', () => {
      const invalidData = {
        categories: [
          { id: 1, nom: 'Entrées' }
        ],
        plats: [
          { id: 1, nom: 'Salade', categorie_id: 1 },
          { id: 2, nom: 'Pizza', categorie_id: 999 } // Catégorie inexistante
        ],
        vins: [
          { id: 1, nom: 'Bordeaux' }
        ],
        variants: [
          { id: 1, vin_id: 1, volume: 750 },
          { id: 2, vin_id: 999, volume: 750 } // Vin inexistant
        ]
      };

      const result = validateDatabaseRelations(invalidData);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Plat 1: Catégorie inexistante (ID: 999)');
      expect(result.errors).toContain('Variant 1: Vin inexistant (ID: 999)');
    });

    test('should detect duplicate names', () => {
      const duplicateData = {
        categories: [
          { id: 1, nom: 'Entrées' },
          { id: 2, nom: 'Entrées' } // Nom dupliqué
        ],
        plats: [],
        vins: [
          { id: 1, nom: 'Bordeaux' },
          { id: 2, nom: 'Bordeaux' } // Nom dupliqué
        ],
        variants: []
      };

      const result = validateDatabaseRelations(duplicateData);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Catégorie 1: nom dupliqué (Entrées)');
      expect(result.errors).toContain('Vin 1: nom dupliqué (Bordeaux)');
    });
  });

  describe('Price Consistency', () => {
    const validatePriceConsistency = (items) => {
      const errors = [];

      items.forEach((item, index) => {
        if (item.prix_ancien && item.prix_nouveau) {
          if (item.prix_nouveau >= item.prix_ancien) {
            errors.push(`Item ${index}: Prix nouveau doit être inférieur à l'ancien prix`);
          }
        }

        if (item.variants && Array.isArray(item.variants)) {
          // Les variants plus grands doivent coûter plus cher
          const sortedVariants = [...item.variants].sort((a, b) => a.volume - b.volume);
          for (let i = 1; i < sortedVariants.length; i++) {
            if (sortedVariants[i].prix_unitaire <= sortedVariants[i-1].prix_unitaire) {
              errors.push(`Item ${index}: Prix incohérent entre volumes ${sortedVariants[i-1].volume}ml et ${sortedVariants[i].volume}ml`);
            }
          }
        }
      });

      return {
        isValid: errors.length === 0,
        errors
      };
    };

    test('should validate consistent pricing', () => {
      const consistentItems = [
        {
          nom: 'Bordeaux',
          variants: [
            { volume: 375, prix_unitaire: 15.00 },
            { volume: 750, prix_unitaire: 25.00 },
            { volume: 1500, prix_unitaire: 45.00 }
          ]
        }
      ];

      const result = validatePriceConsistency(consistentItems);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should detect price inconsistencies', () => {
      const inconsistentItems = [
        {
          nom: 'Bordeaux',
          variants: [
            { volume: 375, prix_unitaire: 25.00 }, // Plus cher que le 750ml !
            { volume: 750, prix_unitaire: 20.00 },
            { volume: 1500, prix_unitaire: 15.00 } // Encore moins cher !
          ]
        }
      ];

      const result = validatePriceConsistency(inconsistentItems);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });
  });
}); 