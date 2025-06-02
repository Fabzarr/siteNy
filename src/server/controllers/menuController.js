const db = require('../db');

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
    const { nom, slug, description, ordre_affichage } = req.body;
    
    if (!nom || !slug) {
      return res.status(400).json({ error: 'Le nom et le slug sont requis' });
    }
    
    const query = `
      INSERT INTO categories (nom, slug, description, ordre_affichage)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    
    const result = await db.query(query, [nom, slug, description, ordre_affichage || 0]);
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
    
    // Vérifier s'il y a des plats associés
    const platsQuery = await db.query('SELECT COUNT(*) FROM plats WHERE categorie_id = $1', [id]);
    if (parseInt(platsQuery.rows[0].count) > 0) {
      return res.status(400).json({ error: 'Impossible de supprimer une catégorie contenant des plats' });
    }
    
    const result = await db.query('DELETE FROM categories WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Catégorie non trouvée' });
    }
    
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
    const { 
      nom, description, prix, categorie_id, disponible, photo_url, allergenes,
      origine_vin, type_vin, volume_vin, contenant_vin 
    } = req.body;
    
    if (!nom || !prix || !categorie_id) {
      return res.status(400).json({ error: 'Le nom, le prix et la catégorie sont requis' });
    }

    // Récupérer le plus grand ordre_affichage pour la catégorie
    const maxOrderQuery = `
      SELECT COALESCE(MAX(ordre_affichage), 0) as max_ordre
      FROM plats
      WHERE categorie_id = $1
    `;
    const maxOrderResult = await db.query(maxOrderQuery, [categorie_id]);
    const newOrder = maxOrderResult.rows[0].max_ordre + 1;
    
    // Vérifier si les colonnes vins existent
    const checkColumnsQuery = `
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'plats' 
      AND column_name IN ('origine_vin', 'type_vin', 'volume_vin', 'contenant_vin')
    `;
    const existingColumns = await db.query(checkColumnsQuery);
    const hasWineColumns = existingColumns.rows.length > 0;
    
    let query, params;
    
    if (hasWineColumns) {
      // Inclure les champs vins
      query = `
        INSERT INTO plats (nom, description, prix, categorie_id, disponible, photo_url, ordre_affichage, allergenes, origine_vin, type_vin, volume_vin, contenant_vin)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        RETURNING *
      `;
      params = [
        nom, description, prix, categorie_id, 
        disponible !== false, photo_url, newOrder, allergenes,
        origine_vin, type_vin, volume_vin, contenant_vin
      ];
    } else {
      // Utiliser l'ancienne structure sans les champs vins
      query = `
        INSERT INTO plats (nom, description, prix, categorie_id, disponible, photo_url, ordre_affichage, allergenes)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *
      `;
      params = [
        nom, description, prix, categorie_id, 
        disponible !== false, photo_url, newOrder, allergenes
      ];
    }
    
    const result = await db.query(query, params);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erreur lors de la création du plat:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Mettre à jour un plat
const modifierPlat = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      nom, description, prix, categorie_id, disponible, photo_url, ordre_affichage, allergenes,
      origine_vin, type_vin, volume_vin, contenant_vin 
    } = req.body;
    
    // Vérifier si les colonnes vins existent
    const checkColumnsQuery = `
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'plats' 
      AND column_name IN ('origine_vin', 'type_vin', 'volume_vin', 'contenant_vin')
    `;
    const existingColumns = await db.query(checkColumnsQuery);
    const hasWineColumns = existingColumns.rows.length > 0;
    
    let query, params;
    
    if (hasWineColumns) {
      // Inclure les champs vins
      query = `
        UPDATE plats 
        SET nom = $1, description = $2, prix = $3, categorie_id = $4, 
            disponible = $5, photo_url = $6, ordre_affichage = $7, allergenes = $8,
            origine_vin = $9, type_vin = $10, volume_vin = $11, contenant_vin = $12
        WHERE id = $13
        RETURNING *
      `;
      params = [
        nom, description, prix, categorie_id, disponible, 
        photo_url, ordre_affichage, allergenes,
        origine_vin, type_vin, volume_vin, contenant_vin, id
      ];
    } else {
      // Utiliser l'ancienne structure sans les champs vins
      query = `
        UPDATE plats 
        SET nom = $1, description = $2, prix = $3, categorie_id = $4, 
            disponible = $5, photo_url = $6, ordre_affichage = $7, allergenes = $8
        WHERE id = $9
        RETURNING *
      `;
      params = [
        nom, description, prix, categorie_id, disponible, 
        photo_url, ordre_affichage, allergenes, id
      ];
    }
    
    const result = await db.query(query, params);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Plat non trouvé' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erreur lors de la modification du plat:', error);
    res.status(500).json({ error: 'Erreur serveur' });
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
    
    res.json({ message: 'Plat supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression du plat:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// ==================== MENU COMPLET ====================

// Récupérer le menu complet (toutes catégories avec leurs plats)
const getMenuComplet = async (req, res) => {
  try {
    console.log('Début de getMenuComplet');
    
    // Vérifier si les colonnes vins existent
    const checkColumnsQuery = `
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'plats' 
      AND column_name IN ('origine_vin', 'type_vin', 'volume_vin', 'contenant_vin')
    `;
    const existingColumns = await db.query(checkColumnsQuery);
    const hasWineColumns = existingColumns.rows.length > 0;
    
    let query;
    if (hasWineColumns) {
      query = `
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
          p.disponible as plat_disponible,
          p.origine_vin as plat_origine_vin,
          p.type_vin as plat_type_vin,
          p.volume_vin as plat_volume_vin,
          p.contenant_vin as plat_contenant_vin
        FROM categories c
        LEFT JOIN plats p ON c.id = p.categorie_id
        WHERE c.actif = true
        ORDER BY c.ordre_affichage ASC, p.ordre_affichage ASC, p.nom ASC
      `;
    } else {
      query = `
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
        LEFT JOIN plats p ON c.id = p.categorie_id AND p.disponible = true
        WHERE c.actif = true
        ORDER BY c.ordre_affichage ASC, p.ordre_affichage ASC, p.nom ASC
      `;
    }
    
    console.log('Exécution de la requête SQL:', query);
    const result = await db.query(query);
    console.log('Résultats bruts de la requête:', result.rows);
    console.log(`Nombre de résultats: ${result.rows.length}`);
    
    // Restructurer les données par catégorie
    const menuStructure = {};
    
    result.rows.forEach(row => {
      console.log('Traitement de la ligne:', row);
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
        const plat = {
          id: row.plat_id,
          name: row.plat_nom,
          description: row.plat_description,
          price: parseFloat(row.plat_prix),
          photo_url: row.plat_photo,
          allergenes: row.plat_allergenes,
          ordre: row.plat_ordre,
          disponible: row.plat_disponible
        };
        
        // Ajouter les champs vins s'ils existent
        if (hasWineColumns) {
          plat.origine_vin = row.plat_origine_vin;
          plat.type_vin = row.plat_type_vin;
          plat.volume_vin = row.plat_volume_vin;
          plat.contenant_vin = row.plat_contenant_vin;
        }
        
        menuStructure[categoryKey].plats.push(plat);
      }
    });

    console.log('Structure finale du menu:', menuStructure);
    console.log('Nombre de catégories:', Object.keys(menuStructure).length);
    
    res.json(menuStructure);
  } catch (error) {
    console.error('Erreur détaillée lors de la récupération du menu:', error);
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