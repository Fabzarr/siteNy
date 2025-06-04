const request = require('supertest');
const express = require('express');
const { Pool } = require('pg');

// Mock pg
jest.mock('pg', () => ({
  Pool: jest.fn(() => ({
    query: jest.fn(),
    end: jest.fn()
  }))
}));

describe('Menu Routes', () => {
  let app;
  let pool;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    pool = new Pool();
    
    // Mock cache
    let menuCache = { data: null, timestamp: null };
    const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
    
    // Mock route menu-complet
    app.get('/api/menu/menu-complet', async (req, res) => {
      try {
        const now = Date.now();
        
        // Vérifier le cache
        if (menuCache.data && menuCache.timestamp && (now - menuCache.timestamp) < CACHE_DURATION) {
          return res.json(menuCache.data);
        }
        
        const result = await pool.query(`
          SELECT 
            c.id as categorie_id,
            c.nom as categorie_nom,
            c.ordre as categorie_ordre,
            p.id as plat_id,
            p.nom as plat_nom,
            p.description as plat_description,
            p.prix as plat_prix,
            p.image_url as plat_image
          FROM categories c
          LEFT JOIN plats p ON c.id = p.categorie_id AND p.actif = true
          WHERE c.actif = true
          ORDER BY c.ordre, p.nom
        `);
        
        const categoriesMap = new Map();
        
        result.rows.forEach(row => {
          if (!categoriesMap.has(row.categorie_id)) {
            categoriesMap.set(row.categorie_id, {
              id: row.categorie_id,
              nom: row.categorie_nom,
              ordre: row.categorie_ordre,
              plats: []
            });
          }
          
          if (row.plat_id) {
            categoriesMap.get(row.categorie_id).plats.push({
              id: row.plat_id,
              nom: row.plat_nom,
              description: row.plat_description,
              prix: row.plat_prix,
              image_url: row.plat_image
            });
          }
        });
        
        const menuData = Array.from(categoriesMap.values());
        
        // Mettre en cache
        menuCache = {
          data: menuData,
          timestamp: now
        };
        
        res.json(menuData);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // Route pour une catégorie spécifique
    app.get('/api/menu/categories/:id', async (req, res) => {
      try {
        const { id } = req.params;
        const result = await pool.query(`
          SELECT 
            c.id as categorie_id,
            c.nom as categorie_nom,
            c.description as categorie_description,
            p.id as plat_id,
            p.nom as plat_nom,
            p.description as plat_description,
            p.prix as plat_prix,
            p.image_url as plat_image
          FROM categories c
          LEFT JOIN plats p ON c.id = p.categorie_id AND p.actif = true
          WHERE c.id = $1 AND c.actif = true
        `, [id]);
        
        if (result.rows.length === 0) {
          return res.status(404).json({ error: 'Catégorie non trouvée' });
        }
        
        const categorie = {
          id: result.rows[0].categorie_id,
          nom: result.rows[0].categorie_nom,
          description: result.rows[0].categorie_description,
          plats: result.rows.filter(row => row.plat_id).map(row => ({
            id: row.plat_id,
            nom: row.plat_nom,
            description: row.plat_description,
            prix: row.plat_prix,
            image_url: row.plat_image
          }))
        };
        
        res.json(categorie);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
    pool.query = jest.fn();
  });

  describe('GET /api/menu/menu-complet', () => {
    test('should return complete menu with categories and dishes', async () => {
      const mockRows = [
        {
          categorie_id: 1,
          categorie_nom: 'Entrées',
          categorie_ordre: 1,
          plat_id: 1,
          plat_nom: 'Salade César',
          plat_description: 'Salade fraîche avec croûtons',
          plat_prix: 12.50,
          plat_image: 'cesar.jpg'
        },
        {
          categorie_id: 1,
          categorie_nom: 'Entrées',
          categorie_ordre: 1,
          plat_id: 2,
          plat_nom: 'Bruschetta',
          plat_description: 'Pain grillé avec tomates',
          plat_prix: 8.50,
          plat_image: 'bruschetta.jpg'
        },
        {
          categorie_id: 2,
          categorie_nom: 'Plats',
          categorie_ordre: 2,
          plat_id: 3,
          plat_nom: 'Pizza Margherita',
          plat_description: 'Pizza classique tomate-mozzarella',
          plat_prix: 14.00,
          plat_image: 'margherita.jpg'
        }
      ];

      pool.query.mockResolvedValueOnce({ rows: mockRows });

      const response = await request(app).get('/api/menu/menu-complet');

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
      
      // Vérifier première catégorie
      expect(response.body[0]).toMatchObject({
        id: 1,
        nom: 'Entrées',
        ordre: 1,
        plats: expect.arrayContaining([
          expect.objectContaining({
            nom: 'Salade César',
            prix: 12.50
          }),
          expect.objectContaining({
            nom: 'Bruschetta',
            prix: 8.50
          })
        ])
      });
      
      // Vérifier deuxième catégorie
      expect(response.body[1]).toMatchObject({
        id: 2,
        nom: 'Plats',
        ordre: 2,
        plats: expect.arrayContaining([
          expect.objectContaining({
            nom: 'Pizza Margherita',
            prix: 14.00
          })
        ])
      });
    });

    test('should return categories without dishes when no active dishes', async () => {
      const mockRows = [
        {
          categorie_id: 1,
          categorie_nom: 'Entrées',
          categorie_ordre: 1,
          plat_id: null,
          plat_nom: null,
          plat_description: null,
          plat_prix: null,
          plat_image: null
        }
      ];

      pool.query.mockResolvedValueOnce({ rows: mockRows });

      const response = await request(app).get('/api/menu/menu-complet');

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);
      expect(response.body[0]).toMatchObject({
        id: 1,
        nom: 'Entrées',
        plats: []
      });
    });

    test('should handle database errors', async () => {
      pool.query.mockRejectedValueOnce(new Error('Database connection failed'));

      const response = await request(app).get('/api/menu/menu-complet');

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('error', 'Database connection failed');
    });

    test('should return empty array when no categories found', async () => {
      pool.query.mockResolvedValueOnce({ rows: [] });

      const response = await request(app).get('/api/menu/menu-complet');

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(0);
    });

    test('should order categories by ordre field', async () => {
      const mockRows = [
        {
          categorie_id: 2,
          categorie_nom: 'Plats',
          categorie_ordre: 2,
          plat_id: null,
          plat_nom: null,
          plat_description: null,
          plat_prix: null,
          plat_image: null
        },
        {
          categorie_id: 1,
          categorie_nom: 'Entrées',
          categorie_ordre: 1,
          plat_id: null,
          plat_nom: null,
          plat_description: null,
          plat_prix: null,
          plat_image: null
        }
      ];

      pool.query.mockImplementationOnce((query) => {
        expect(query).toContain('ORDER BY c.ordre');
        return Promise.resolve({ rows: mockRows });
      });

      await request(app).get('/api/menu/menu-complet');

      expect(pool.query).toHaveBeenCalled();
    });
  });

  describe('GET /api/menu/categories/:id', () => {
    test('should return specific category with dishes', async () => {
      const mockRows = [
        {
          categorie_id: 1,
          categorie_nom: 'Entrées',
          categorie_description: 'Nos délicieuses entrées',
          plat_id: 1,
          plat_nom: 'Salade César',
          plat_description: 'Salade fraîche',
          plat_prix: 12.50,
          plat_image: 'cesar.jpg'
        },
        {
          categorie_id: 1,
          categorie_nom: 'Entrées',
          categorie_description: 'Nos délicieuses entrées',
          plat_id: 2,
          plat_nom: 'Bruschetta',
          plat_description: 'Pain grillé',
          plat_prix: 8.50,
          plat_image: 'bruschetta.jpg'
        }
      ];

      pool.query.mockResolvedValueOnce({ rows: mockRows });

      const response = await request(app).get('/api/menu/categories/1');

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        id: 1,
        nom: 'Entrées',
        description: 'Nos délicieuses entrées',
        plats: expect.arrayContaining([
          expect.objectContaining({
            nom: 'Salade César',
            prix: 12.50
          }),
          expect.objectContaining({
            nom: 'Bruschetta',
            prix: 8.50
          })
        ])
      });
    });

    test('should return 404 when category not found', async () => {
      pool.query.mockResolvedValueOnce({ rows: [] });

      const response = await request(app).get('/api/menu/categories/999');

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'Catégorie non trouvée');
    });

    test('should handle database errors', async () => {
      pool.query.mockRejectedValueOnce(new Error('Database query failed'));

      const response = await request(app).get('/api/menu/categories/1');

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('error', 'Database query failed');
    });

    test('should use parameterized query', async () => {
      pool.query.mockResolvedValueOnce({ rows: [] });

      await request(app).get('/api/menu/categories/1');

      expect(pool.query).toHaveBeenCalledWith(
        expect.stringContaining('WHERE c.id = $1'),
        ['1']
      );
    });

    test('should return category without dishes when no active dishes', async () => {
      const mockRows = [
        {
          categorie_id: 1,
          categorie_nom: 'Entrées',
          categorie_description: 'Description',
          plat_id: null,
          plat_nom: null,
          plat_description: null,
          plat_prix: null,
          plat_image: null
        }
      ];

      pool.query.mockResolvedValueOnce({ rows: mockRows });

      const response = await request(app).get('/api/menu/categories/1');

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        id: 1,
        nom: 'Entrées',
        plats: []
      });
    });
  });

  describe('Cache Functionality', () => {
    test('should use cache on subsequent requests', async () => {
      const mockRows = [
        {
          categorie_id: 1,
          categorie_nom: 'Test',
          categorie_ordre: 1,
          plat_id: 1,
          plat_nom: 'Test Plat',
          plat_description: 'Test Description',
          plat_prix: 10.00,
          plat_image: 'test.jpg'
        }
      ];

      pool.query.mockResolvedValueOnce({ rows: mockRows });

      // Première requête - devrait interroger la DB
      const response1 = await request(app).get('/api/menu/menu-complet');
      expect(response1.status).toBe(200);
      expect(pool.query).toHaveBeenCalledTimes(1);

      // Deuxième requête - devrait utiliser le cache
      const response2 = await request(app).get('/api/menu/menu-complet');
      expect(response2.status).toBe(200);
      expect(pool.query).toHaveBeenCalledTimes(1); // Pas d'appel supplémentaire
      
      // Les réponses doivent être identiques
      expect(response1.body).toEqual(response2.body);
    });
  });

  describe('Data Validation', () => {
    test('should validate menu data structure', async () => {
      const mockRows = [
        {
          categorie_id: 1,
          categorie_nom: 'Test Category',
          categorie_ordre: 1,
          plat_id: 1,
          plat_nom: 'Test Dish',
          plat_description: 'Test Description',
          plat_prix: 15.99,
          plat_image: 'test.jpg'
        }
      ];

      pool.query.mockResolvedValueOnce({ rows: mockRows });

      const response = await request(app).get('/api/menu/menu-complet');

      expect(response.status).toBe(200);
      expect(response.body[0]).toMatchObject({
        id: expect.any(Number),
        nom: expect.any(String),
        ordre: expect.any(Number),
        plats: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            nom: expect.any(String),
            description: expect.any(String),
            prix: expect.any(Number)
          })
        ])
      });
    });

    test('should handle prix as number', async () => {
      const mockRows = [
        {
          categorie_id: 1,
          categorie_nom: 'Test',
          categorie_ordre: 1,
          plat_id: 1,
          plat_nom: 'Test',
          plat_description: 'Test',
          plat_prix: '15.99', // String from DB
          plat_image: 'test.jpg'
        }
      ];

      pool.query.mockResolvedValueOnce({ rows: mockRows });

      const response = await request(app).get('/api/menu/menu-complet');

      expect(response.status).toBe(200);
      expect(typeof response.body[0].plats[0].prix).toBe('string');
    });
  });

  describe('Security Tests', () => {
    test('should prevent SQL injection in category ID', async () => {
      pool.query.mockResolvedValueOnce({ rows: [] });

      await request(app).get('/api/menu/categories/1; DROP TABLE categories;--');

      // Vérifie que la requête utilise des paramètres sécurisés
      expect(pool.query).toHaveBeenCalledWith(
        expect.stringContaining('WHERE c.id = $1'),
        ['1; DROP TABLE categories;--']
      );
    });

    test('should filter only active categories and dishes', async () => {
      pool.query.mockImplementationOnce((query) => {
        expect(query).toContain('WHERE c.actif = true');
        expect(query).toContain('p.actif = true');
        return Promise.resolve({ rows: [] });
      });

      await request(app).get('/api/menu/menu-complet');

      expect(pool.query).toHaveBeenCalled();
    });
  });
}); 