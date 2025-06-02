const express = require('express');
const router = express.Router();
const db = require('../db');
const { authenticateAdmin } = require('../middleware/auth');
const {
  // Catégories
  getCategories,
  getCategorieById,
  creerCategorie,
  modifierCategorie,
  supprimerCategorie,
  
  // Plats
  getPlats,
  getPlatById,
  creerPlat,
  modifierPlat,
  supprimerPlat,
  
  // Menu complet
  getMenuComplet,
  
  // Ingrédients
  getIngredients,
  creerIngredient
} = require('../controllers/menuController');

// ==================== ROUTES PUBLIQUES ====================

// Menu complet (pour le frontend public)
router.get('/menu-complet', getMenuComplet);

// Catégories publiques
router.get('/categories', getCategories);
router.get('/categories/:id', getCategorieById);

// Plats publiques
router.get('/plats', getPlats);
router.get('/plats/:id', getPlatById);

// Ingrédients publiques
router.get('/ingredients', authenticateAdmin, getIngredients);

// ==================== ROUTES ADMIN ====================

// Menu complet pour admin (avec tous les plats, disponibles et indisponibles)
router.get('/admin/menu-complet', authenticateAdmin, async (req, res) => {
  try {
    const query = `
      SELECT 
        c.id as categorie_id,
        c.nom as categorie_nom,
        c.slug as categorie_slug,
        c.description as categorie_description,
        c.ordre_affichage as categorie_ordre,
        p.id as plat_id,
        p.nom as plat_nom,
        p.description as plat_description,
        p.prix as plat_prix,
        p.photo_url as plat_photo,
        p.allergenes as plat_allergenes,
        p.ordre_affichage as plat_ordre,
        p.disponible as plat_disponible
      FROM categories c
      LEFT JOIN plats p ON c.id = p.categorie_id
      WHERE c.actif = true
      ORDER BY c.ordre_affichage ASC, p.ordre_affichage ASC, p.nom ASC
    `;
    
    const result = await db.query(query);
    
    // Restructurer les données par catégorie
    const menuStructure = {};
    
    result.rows.forEach(row => {
      const categoryKey = row.categorie_slug || row.categorie_id;
      
      if (!menuStructure[categoryKey]) {
        menuStructure[categoryKey] = {
          id: row.categorie_id,
          nom: row.categorie_nom,
          slug: row.categorie_slug,
          description: row.categorie_description,
          ordre: row.categorie_ordre,
          plats: []
        };
      }
      
      if (row.plat_id) {
        menuStructure[categoryKey].plats.push({
          id: row.plat_id,
          name: row.plat_nom,
          description: row.plat_description,
          price: parseFloat(row.plat_prix),
          photo_url: row.plat_photo,
          allergenes: row.plat_allergenes,
          ordre: row.plat_ordre,
          disponible: row.plat_disponible,
          categorie_id: row.categorie_id
        });
      }
    });
    
    res.json(menuStructure);
  } catch (error) {
    console.error('Erreur lors de la récupération du menu admin:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Gestion des catégories (ADMIN)
router.post('/categories', authenticateAdmin, creerCategorie);
router.put('/categories/:id', authenticateAdmin, modifierCategorie);
router.delete('/categories/:id', authenticateAdmin, supprimerCategorie);

// Gestion des plats (ADMIN)
router.post('/plats', authenticateAdmin, creerPlat);
router.put('/plats/:id', authenticateAdmin, modifierPlat);
router.delete('/plats/:id', authenticateAdmin, supprimerPlat);

// Gestion des ingrédients (ADMIN)
router.post('/ingredients', authenticateAdmin, creerIngredient);

// ==================== ROUTES SPÉCIFIQUES ====================

// Récupérer les plats d'une catégorie spécifique
router.get('/categories/:id/plats', authenticateAdmin, async (req, res) => {
  req.query.categorie_id = req.params.id;
  getPlats(req, res);
});

// Récupérer les statistiques du menu (pour le dashboard admin)
router.get('/stats', authenticateAdmin, async (req, res) => {
  try {
    const statsQuery = `
      SELECT 
        (SELECT COUNT(*) FROM categories WHERE actif = true) as total_categories,
        (SELECT COUNT(*) FROM plats WHERE disponible = true) as total_plats,
        (SELECT COUNT(*) FROM plats WHERE disponible = false) as plats_indisponibles,
        (SELECT COUNT(*) FROM ingredients) as total_ingredients,
        (SELECT AVG(prix) FROM plats WHERE disponible = true) as prix_moyen,
        (SELECT MIN(prix) FROM plats WHERE disponible = true) as prix_min,
        (SELECT MAX(prix) FROM plats WHERE disponible = true) as prix_max
    `;
    
    const result = await db.query(statsQuery);
    const stats = result.rows[0];
    
    // Ajouter les plats par catégorie
    const platsCategoriesQuery = `
      SELECT c.nom as categorie, COUNT(p.id) as nombre_plats
      FROM categories c
      LEFT JOIN plats p ON c.id = p.categorie_id AND p.disponible = true
      WHERE c.actif = true
      GROUP BY c.id, c.nom, c.ordre_affichage
      ORDER BY c.ordre_affichage ASC
    `;
    
    const categoriesResult = await db.query(platsCategoriesQuery);
    stats.plats_par_categorie = categoriesResult.rows;
    
    res.json(stats);
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Route pour changer la disponibilité d'un plat
router.patch('/plats/:id/disponibilite', authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { disponible } = req.body;
    
    const query = 'UPDATE plats SET disponible = $1 WHERE id = $2 RETURNING *';
    const result = await db.query(query, [disponible, id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Plat non trouvé' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erreur lors de la modification de la disponibilité:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Route pour réorganiser l'ordre des plats dans une catégorie
router.patch('/categories/:id/reorder-plats', authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { plats_order } = req.body; // Array d'objets {id: platId, ordre: newOrder}
    
    if (!Array.isArray(plats_order)) {
      return res.status(400).json({ error: 'plats_order doit être un tableau' });
    }
    
    // Mise à jour en transaction
    await db.query('BEGIN');
    
    try {
      for (const plat of plats_order) {
        await db.query(
          'UPDATE plats SET ordre_affichage = $1 WHERE id = $2 AND categorie_id = $3',
          [plat.ordre, plat.id, id]
        );
      }
      
      await db.query('COMMIT');
      res.json({ message: 'Ordre des plats mis à jour avec succès' });
    } catch (error) {
      await db.query('ROLLBACK');
      throw error;
    }
  } catch (error) {
    console.error('Erreur lors de la réorganisation des plats:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Route temporaire pour ajouter les colonnes vins
router.post('/admin/add-wine-columns', authenticateAdmin, async (req, res) => {
  try {
    // Vérifier si les colonnes existent déjà
    const checkColumnsQuery = `
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'plats' 
      AND column_name IN ('origine_vin', 'type_vin', 'volume_vin', 'contenant_vin')
    `;
    
    const existingColumns = await db.query(checkColumnsQuery);
    const existingColumnNames = existingColumns.rows.map(row => row.column_name);
    
    const columnsToAdd = [];
    if (!existingColumnNames.includes('origine_vin')) {
      columnsToAdd.push('ALTER TABLE plats ADD COLUMN origine_vin VARCHAR(100)');
    }
    if (!existingColumnNames.includes('type_vin')) {
      columnsToAdd.push('ALTER TABLE plats ADD COLUMN type_vin VARCHAR(50)');
    }
    if (!existingColumnNames.includes('volume_vin')) {
      columnsToAdd.push('ALTER TABLE plats ADD COLUMN volume_vin VARCHAR(20)');
    }
    if (!existingColumnNames.includes('contenant_vin')) {
      columnsToAdd.push('ALTER TABLE plats ADD COLUMN contenant_vin VARCHAR(50)');
    }
    
    // Exécuter les ALTER TABLE nécessaires
    for (const alterQuery of columnsToAdd) {
      await db.query(alterQuery);
    }
    
    res.json({ 
      message: 'Colonnes vins ajoutées avec succès',
      added: columnsToAdd.length,
      existing: existingColumnNames.length
    });
    
  } catch (error) {
    console.error('Erreur lors de l\'ajout des colonnes vins:', error);
    res.status(500).json({ error: 'Erreur serveur: ' + error.message });
  }
});

module.exports = router; 