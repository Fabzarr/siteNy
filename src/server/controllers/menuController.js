const db = require('../db');

// Cache simple en mémoire pour le menu
let menuCache = null;
let menuCacheTimestamp = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes en millisecondes

// Fonction pour invalider le cache quand on modifie des données
const invalidateMenuCache = () => {
  menuCache = null;
  menuCacheTimestamp = 0;
  console.log('🗑️ Cache menu invalidé');
};

// ==================== CATÉGORIES ====================

// Récupérer toutes les catégories
const getCategories = async (req, res) => {
  try {
    const query = `
      SELECT c.*, COUNT(p.id) as nombre_plats
      FROM categories c
      LEFT JOIN plats p ON c.id = p.categorie_id AND p.disponible = true
      WHERE c.actif = true
      GROUP BY c.id
      ORDER BY c.ordre_affichage ASC
    `;
    
    const result = await db.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Récupérer une catégorie par ID
const getCategorieById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query('SELECT * FROM categories WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Catégorie non trouvée' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erreur lors de la récupération de la catégorie:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Créer une nouvelle catégorie
const creerCategorie = async (req, res) => {
  try {
    const { nom, slug, description, ordre_affichage, actif } = req.body;
    
    if (!nom || !slug) {
      return res.status(400).json({ error: 'Le nom et le slug sont requis' });
    }
    
    const query = `
      INSERT INTO categories (nom, slug, description, ordre_affichage, actif)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    
    const result = await db.query(query, [nom, slug, description, ordre_affichage || 1, actif !== false]);
    
    // Invalider le cache
    invalidateMenuCache();
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erreur lors de la création de la catégorie:', error);
    if (error.code === '23505') {
      res.status(400).json({ error: 'Cette catégorie existe déjà' });
    } else {
      res.status(500).json({ error: 'Erreur serveur' });
    }
  }
};

// Mettre à jour une catégorie
const modifierCategorie = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, slug, description, ordre_affichage, actif } = req.body;
    
    if (!nom || !slug) {
      return res.status(400).json({ error: 'Le nom et le slug sont requis' });
    }
    
    const query = `
      UPDATE categories 
      SET nom = $1, slug = $2, description = $3, ordre_affichage = $4, actif = $5
      WHERE id = $6
      RETURNING *
    `;
    
    const result = await db.query(query, [nom, slug, description, ordre_affichage, actif, id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Catégorie non trouvée' });
    }
    
    // Invalider le cache
    invalidateMenuCache();
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erreur lors de la modification de la catégorie:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Supprimer une catégorie
const supprimerCategorie = async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await db.query('DELETE FROM categories WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Catégorie non trouvée' });
    }
    
    // Invalider le cache
    invalidateMenuCache();
    
    res.json({ message: 'Catégorie supprimée avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de la catégorie:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// ==================== PLATS ====================

// Récupérer tous les plats ou par catégorie
const getPlats = async (req, res) => {
  try {
    const { categorie_id } = req.query;
    
    let query = `
      SELECT p.*, c.nom as categorie_nom, c.slug as categorie_slug
      FROM plats p
      LEFT JOIN categories c ON p.categorie_id = c.id
    `;
    
    const params = [];
    let paramIndex = 1;
    
    if (categorie_id) {
      query += ` WHERE p.categorie_id = $${paramIndex}`;
      params.push(categorie_id);
    }
    
    query += ' ORDER BY p.ordre_affichage ASC, p.nom ASC';
    
    const result = await db.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Erreur lors de la récupération des plats:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Récupérer un plat par ID avec ses ingrédients
const getPlatById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Récupérer le plat
    const platQuery = `
      SELECT p.*, c.nom as categorie_nom, c.slug as categorie_slug
      FROM plats p
      LEFT JOIN categories c ON p.categorie_id = c.id
      WHERE p.id = $1
    `;
    
    const platResult = await db.query(platQuery, [id]);
    
    if (platResult.rows.length === 0) {
      return res.status(404).json({ error: 'Plat non trouvé' });
    }
    
    const plat = platResult.rows[0];
    
    // Récupérer les ingrédients du plat
    const ingredientsQuery = `
      SELECT i.*, pi.quantite, pi.obligatoire
      FROM ingredients i
      JOIN plat_ingredients pi ON i.id = pi.ingredient_id
      WHERE pi.plat_id = $1
      ORDER BY pi.obligatoire DESC, i.nom ASC
    `;
    
    const ingredientsResult = await db.query(ingredientsQuery, [id]);
    plat.ingredients = ingredientsResult.rows;
    
    res.json(plat);
  } catch (error) {
    console.error('Erreur lors de la récupération du plat:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Créer un nouveau plat
const creerPlat = async (req, res) => {
  try {
    const { nom, description, prix, categorie_id, photo_url, allergenes, ordre_affichage, disponible } = req.body;
    
    if (!nom || !description || !prix || !categorie_id) {
      return res.status(400).json({ error: 'Le nom, la description, le prix et la catégorie sont requis' });
    }
    
    const query = `
      INSERT INTO plats (nom, description, prix, categorie_id, photo_url, allergenes, ordre_affichage, disponible)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *
      `;
    
    const result = await db.query(query, [
      nom, 
      description, 
      prix, 
      categorie_id, 
      photo_url, 
      allergenes, 
      ordre_affichage || 1,
      disponible !== false
    ]);
    
    // Invalider le cache
    invalidateMenuCache();
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erreur lors de la création du plat:', error);
    if (error.code === '23503') {
      res.status(400).json({ error: 'Catégorie non trouvée' });
    } else {
    res.status(500).json({ error: 'Erreur serveur' });
    }
  }
};

// Mettre à jour un plat
const modifierPlat = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, description, prix, categorie_id, photo_url, allergenes, ordre_affichage, disponible } = req.body;
    
    if (!nom || !description || !prix || !categorie_id) {
      return res.status(400).json({ error: 'Le nom, la description, le prix et la catégorie sont requis' });
    }
    
    const query = `
        UPDATE plats 
      SET nom = $1, description = $2, prix = $3, categorie_id = $4, photo_url = $5, 
          allergenes = $6, ordre_affichage = $7, disponible = $8
        WHERE id = $9
        RETURNING *
      `;
    
    const result = await db.query(query, [
      nom, description, prix, categorie_id, photo_url, allergenes, ordre_affichage, disponible, id
    ]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Plat non trouvé' });
    }
    
    // Invalider le cache
    invalidateMenuCache();
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erreur lors de la modification du plat:', error);
    if (error.code === '23503') {
      res.status(400).json({ error: 'Catégorie non trouvée' });
    } else {
    res.status(500).json({ error: 'Erreur serveur' });
    }
  }
};

// Supprimer un plat
const supprimerPlat = async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await db.query('DELETE FROM plats WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Plat non trouvé' });
    }
    
    // Invalider le cache
    invalidateMenuCache();
    
    res.json({ message: 'Plat supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression du plat:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// ==================== MENU COMPLET ====================

// Récupérer le menu complet (toutes catégories avec leurs plats) - VERSION OPTIMISÉE
const getMenuComplet = async (req, res) => {
  try {
    console.log('🚀 Début getMenuComplet optimisé');
    const startTime = Date.now();
    
    // Vérifier le cache d'abord
    const now = Date.now();
    if (menuCache && (now - menuCacheTimestamp) < CACHE_DURATION) {
      console.log(`⚡ Menu servi depuis le cache (${now - menuCacheTimestamp}ms depuis mise en cache)`);
      return res.json(menuCache);
    }
    
    // Requête optimisée unique avec agrégation JSON
    const query = `
        SELECT 
          c.id as categorie_id,
          c.nom as categorie_nom,
          c.slug as categorie_slug,
          c.description as categorie_description,
          c.ordre_affichage as categorie_ordre,
        COALESCE(
          json_agg(
            CASE 
              WHEN p.id IS NOT NULL AND p.disponible = true THEN
                json_build_object(
                  'id', p.id,
                  'name', p.nom,
                  'description', p.description,
                  'price', p.prix::numeric,
                  'photo_url', p.photo_url,
                  'allergenes', p.allergenes,
                  'ordre', p.ordre_affichage,
                  'disponible', p.disponible
                )
              ELSE NULL
            END
            ORDER BY p.ordre_affichage ASC, p.nom ASC
          ) FILTER (WHERE p.id IS NOT NULL AND p.disponible = true),
          '[]'::json
        ) as plats
        FROM categories c
        LEFT JOIN plats p ON c.id = p.categorie_id
        WHERE c.actif = true
      GROUP BY c.id, c.nom, c.slug, c.description, c.ordre_affichage
      ORDER BY c.ordre_affichage ASC
      `;
    
    const result = await db.query(query);
    
    // Structure finale optimisée
    const menuStructure = {};
    result.rows.forEach(row => {
      const categoryKey = row.categorie_slug || row.categorie_id;
        menuStructure[categoryKey] = {
          id: row.categorie_id,
          nom: row.categorie_nom,
          slug: row.categorie_slug,
          description: row.categorie_description,
          ordre: row.categorie_ordre,
        plats: row.plats || []
      };
    });

    // Mettre en cache
    menuCache = menuStructure;
    menuCacheTimestamp = now;

    const endTime = Date.now();
    console.log(`✅ Menu chargé et mis en cache en ${endTime - startTime}ms`);
    console.log(`📊 ${Object.keys(menuStructure).length} catégories chargées`);
    
    res.json(menuStructure);
  } catch (error) {
    console.error('❌ Erreur lors de la récupération du menu:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// ==================== INGRÉDIENTS ====================

// Récupérer tous les ingrédients
const getIngredients = async (req, res) => {
  try {
    const query = 'SELECT * FROM ingredients ORDER BY nom ASC';
    const result = await db.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error('Erreur lors de la récupération des ingrédients:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Créer un nouvel ingrédient
const creerIngredient = async (req, res) => {
  try {
    const { nom, description, allergene } = req.body;
    
    if (!nom) {
      return res.status(400).json({ error: 'Le nom est requis' });
    }
    
    const query = `
      INSERT INTO ingredients (nom, description, allergene)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    
    const result = await db.query(query, [nom, description, allergene || false]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erreur lors de la création de l\'ingrédient:', error);
    if (error.code === '23505') {
      res.status(400).json({ error: 'Cet ingrédient existe déjà' });
    } else {
      res.status(500).json({ error: 'Erreur serveur' });
    }
  }
};

module.exports = {
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
}; 