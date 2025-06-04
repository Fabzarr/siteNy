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

// Mock du pool
const mockPool = {
  query: jest.fn(),
  end: jest.fn()
};

describe('Vin Routes', () => {
  let app;
  let pool;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    pool = new Pool();
    
    // Mock des routes vins
    app.get('/api/vins', async (req, res) => {
      try {
        const result = await pool.query(`
          SELECT DISTINCT
            v.id, v.nom, v.description, v.origine, v.type, v.image_url,
            vv.id as variant_id, vv.volume, vv.contenant, vv.prix_unitaire,
            vv.stock_actuel, vv.seuil_alerte, vv.statut_dispo
          FROM vins v
          LEFT JOIN vin_variants vv ON v.id = vv.vin_id
          WHERE v.actif = true
          ORDER BY v.type, v.nom, vv.volume DESC
        `);
        
        const vinsMap = new Map();
        result.rows.forEach(row => {
          if (!vinsMap.has(row.id)) {
            vinsMap.set(row.id, {
              id: row.id,
              nom: row.nom,
              description: row.description,
              origine: row.origine,
              type: row.type,
              image_url: row.image_url,
              variants: []
            });
          }
          
          if (row.variant_id) {
            vinsMap.get(row.id).variants.push({
              id: row.variant_id,
              volume: row.volume,
              contenant: row.contenant,
              prix_unitaire: row.prix_unitaire,
              stock_actuel: row.stock_actuel,
              seuil_alerte: row.seuil_alerte,
              statut_dispo: row.statut_dispo
            });
          }
        });
        
        res.json(Array.from(vinsMap.values()));
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    app.get('/api/vins/:id', async (req, res) => {
      try {
        const { id } = req.params;
        const result = await pool.query(`
          SELECT v.*, vv.id as variant_id, vv.volume, vv.contenant, 
                 vv.prix_unitaire, vv.stock_actuel, vv.statut_dispo
          FROM vins v
          LEFT JOIN vin_variants vv ON v.id = vv.vin_id
          WHERE v.id = $1 AND v.actif = true
        `, [id]);
        
        if (result.rows.length === 0) {
          return res.status(404).json({ error: 'Vin non trouvé' });
        }
        
        const vin = {
          id: result.rows[0].id,
          nom: result.rows[0].nom,
          description: result.rows[0].description,
          origine: result.rows[0].origine,
          type: result.rows[0].type,
          image_url: result.rows[0].image_url,
          variants: result.rows.filter(row => row.variant_id).map(row => ({
            id: row.variant_id,
            volume: row.volume,
            contenant: row.contenant,
            prix_unitaire: row.prix_unitaire,
            stock_actuel: row.stock_actuel,
            statut_dispo: row.statut_dispo
          }))
        };
        
        res.json(vin);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
    pool.query = jest.fn();
  });

  describe('GET /api/vins', () => {
    test('should return all active vins with variants', async () => {
      const mockRows = [
        {
          id: 1,
          nom: 'Bordeaux Rouge',
          description: 'Excellent bordeaux',
          origine: 'France',
          type: 'Rouge',
          image_url: 'bordeaux.jpg',
          variant_id: 1,
          volume: 750,
          contenant: 'Bouteille',
          prix_unitaire: 25.50,
          stock_actuel: 50,
          seuil_alerte: 10,
          statut_dispo: 'disponible'
        },
        {
          id: 2,
          nom: 'Champagne Brut',
          description: 'Champagne festif',
          origine: 'France',
          type: 'Pétillant',
          image_url: 'champagne.jpg',
          variant_id: 2,
          volume: 750,
          contenant: 'Bouteille',
          prix_unitaire: 45.00,
          stock_actuel: 25,
          seuil_alerte: 5,
          statut_dispo: 'disponible'
        }
      ];

      pool.query.mockResolvedValueOnce({ rows: mockRows });

      const response = await request(app).get('/api/vins');

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
      expect(response.body[0]).toHaveProperty('nom', 'Bordeaux Rouge');
      expect(response.body[0]).toHaveProperty('variants');
      expect(response.body[0].variants).toHaveLength(1);
      expect(response.body[0].variants[0]).toHaveProperty('prix_unitaire', 25.50);
    });

    test('should handle database errors', async () => {
      pool.query.mockRejectedValueOnce(new Error('Database connection failed'));

      const response = await request(app).get('/api/vins');

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('error', 'Database connection failed');
    });

    test('should return empty array when no vins found', async () => {
      pool.query.mockResolvedValueOnce({ rows: [] });

      const response = await request(app).get('/api/vins');

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(0);
    });

    test('should filter only active vins', async () => {
      pool.query.mockImplementationOnce((query) => {
        expect(query).toContain('WHERE v.actif = true');
        return Promise.resolve({ rows: [] });
      });

      await request(app).get('/api/vins');

      expect(pool.query).toHaveBeenCalled();
    });
  });

  describe('GET /api/vins/:id', () => {
    test('should return specific vin with variants', async () => {
      const mockRows = [
        {
          id: 1,
          nom: 'Bordeaux Rouge',
          description: 'Excellent bordeaux',
          origine: 'France',
          type: 'Rouge',
          image_url: 'bordeaux.jpg',
          variant_id: 1,
          volume: 750,
          contenant: 'Bouteille',
          prix_unitaire: 25.50,
          stock_actuel: 50,
          statut_dispo: 'disponible'
        },
        {
          id: 1,
          nom: 'Bordeaux Rouge',
          description: 'Excellent bordeaux',
          origine: 'France',
          type: 'Rouge',
          image_url: 'bordeaux.jpg',
          variant_id: 2,
          volume: 375,
          contenant: 'Demi-bouteille',
          prix_unitaire: 15.50,
          stock_actuel: 30,
          statut_dispo: 'disponible'
        }
      ];

      pool.query.mockResolvedValueOnce({ rows: mockRows });

      const response = await request(app).get('/api/vins/1');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('nom', 'Bordeaux Rouge');
      expect(response.body).toHaveProperty('variants');
      expect(response.body.variants).toHaveLength(2);
      expect(response.body.variants[0]).toHaveProperty('volume', 750);
      expect(response.body.variants[1]).toHaveProperty('volume', 375);
    });

    test('should return 404 when vin not found', async () => {
      pool.query.mockResolvedValueOnce({ rows: [] });

      const response = await request(app).get('/api/vins/999');

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'Vin non trouvé');
    });

    test('should handle invalid vin ID', async () => {
      pool.query.mockResolvedValueOnce({ rows: [] });

      const response = await request(app).get('/api/vins/invalid');

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'Vin non trouvé');
    });

    test('should handle database errors', async () => {
      pool.query.mockRejectedValueOnce(new Error('Database query failed'));

      const response = await request(app).get('/api/vins/1');

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('error', 'Database query failed');
    });

    test('should use parameterized query to prevent SQL injection', async () => {
      pool.query.mockResolvedValueOnce({ rows: [] });

      await request(app).get('/api/vins/1');

      expect(pool.query).toHaveBeenCalledWith(
        expect.stringContaining('WHERE v.id = $1'),
        ['1']
      );
    });
  });

  describe('Data Validation', () => {
    test('should validate vin data structure', async () => {
      const mockRows = [
        {
          id: 1,
          nom: 'Test Vin',
          description: 'Test description',
          origine: 'Test origine',
          type: 'Rouge',
          image_url: 'test.jpg',
          variant_id: 1,
          volume: 750,
          contenant: 'Bouteille',
          prix_unitaire: 20.00,
          stock_actuel: 10,
          statut_dispo: 'disponible'
        }
      ];

      pool.query.mockResolvedValueOnce({ rows: mockRows });

      const response = await request(app).get('/api/vins');

      expect(response.status).toBe(200);
      expect(response.body[0]).toMatchObject({
        id: expect.any(Number),
        nom: expect.any(String),
        description: expect.any(String),
        origine: expect.any(String),
        type: expect.any(String),
        variants: expect.arrayContaining([
          expect.objectContaining({
            volume: expect.any(Number),
            contenant: expect.any(String),
            prix_unitaire: expect.any(Number),
            stock_actuel: expect.any(Number)
          })
        ])
      });
    });

    test('should handle vins without variants', async () => {
      const mockRows = [
        {
          id: 1,
          nom: 'Test Vin',
          description: 'Test description',
          origine: 'Test origine',
          type: 'Rouge',
          image_url: 'test.jpg',
          variant_id: null,
          volume: null,
          contenant: null,
          prix_unitaire: null,
          stock_actuel: null,
          statut_dispo: null
        }
      ];

      pool.query.mockResolvedValueOnce({ rows: mockRows });

      const response = await request(app).get('/api/vins');

      expect(response.status).toBe(200);
      expect(response.body[0]).toHaveProperty('variants', []);
    });
  });

  describe('Performance Tests', () => {
    test('should handle large dataset efficiently', async () => {
      const mockRows = Array.from({ length: 1000 }, (_, index) => ({
        id: index + 1,
        nom: `Vin ${index + 1}`,
        description: `Description ${index + 1}`,
        origine: 'France',
        type: 'Rouge',
        image_url: `vin${index + 1}.jpg`,
        variant_id: index + 1,
        volume: 750,
        contenant: 'Bouteille',
        prix_unitaire: 20.00 + index,
        stock_actuel: 50,
        statut_dispo: 'disponible'
      }));

      pool.query.mockResolvedValueOnce({ rows: mockRows });

      const startTime = Date.now();
      const response = await request(app).get('/api/vins');
      const endTime = Date.now();

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1000);
      expect(endTime - startTime).toBeLessThan(1000); // Should complete within 1 second
    });
  });
}); 