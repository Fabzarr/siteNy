const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

// Obtenir tous les vins avec leurs variants
const getVinsAvecVariants = async (req, res) => {
  try {
    const query = `
      SELECT 
        v.id as vin_id,
        v.nom,
        v.origine_vin,
        v.type_vin,
        v.description,
        v.categorie_id,
        v.disponible as vin_disponible,
        v.photo_url,
        v.ordre_affichage as vin_ordre,
        vv.id as variant_id,
        vv.volume_vin,
        vv.contenant_vin,
        vv.prix,
        vv.disponible as variant_disponible,
        vv.ordre_affichage as variant_ordre,
        c.nom as categorie_nom,
        c.slug as categorie_slug
      FROM vins v
      LEFT JOIN vin_variants vv ON v.id = vv.vin_id
      LEFT JOIN categories c ON v.categorie_id = c.id
      WHERE v.disponible = true AND (vv.disponible = true OR vv.id IS NULL)
      ORDER BY v.ordre_affichage, v.nom, vv.ordre_affichage
    `;
    
    const result = await pool.query(query);
    
    // Regrouper les variants par vin
    const vinsMap = new Map();
    
    result.rows.forEach(row => {
      const vinId = row.vin_id;
      
      if (!vinsMap.has(vinId)) {
        vinsMap.set(vinId, {
          id: row.vin_id,
          nom: row.nom,
          origine_vin: row.origine_vin,
          type_vin: row.type_vin,
          description: row.description,
          categorie_id: row.categorie_id,
          categorie_nom: row.categorie_nom,
          categorie_slug: row.categorie_slug,
          disponible: row.vin_disponible,
          photo_url: row.photo_url,
          ordre_affichage: row.vin_ordre,
          variants: []
        });
      }
      
      // Ajouter le variant s'il existe
      if (row.variant_id) {
        vinsMap.get(vinId).variants.push({
          id: row.variant_id,
          volume_vin: row.volume_vin,
          contenant_vin: row.contenant_vin,
          prix: parseFloat(row.prix),
          disponible: row.variant_disponible,
          ordre_affichage: row.variant_ordre
        });
      }
    });
    
    const vins = Array.from(vinsMap.values());
    res.json(vins);
  } catch (error) {
    console.error('Erreur lors de la récupération des vins:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Obtenir tous les vins (admin - avec indisponibles)
const getVinsAdmin = async (req, res) => {
  try {
    const query = `
      SELECT 
        v.id as vin_id,
        v.nom,
        v.origine_vin,
        v.type_vin,
        v.description,
        v.categorie_id,
        v.disponible as vin_disponible,
        v.photo_url,
        v.ordre_affichage as vin_ordre,
        vv.id as variant_id,
        vv.volume_vin,
        vv.contenant_vin,
        vv.prix,
        vv.disponible as variant_disponible,
        vv.ordre_affichage as variant_ordre,
        c.nom as categorie_nom,
        c.slug as categorie_slug
      FROM vins v
      LEFT JOIN vin_variants vv ON v.id = vv.vin_id
      LEFT JOIN categories c ON v.categorie_id = c.id
      ORDER BY v.ordre_affichage, v.nom, vv.ordre_affichage
    `;
    
    const result = await pool.query(query);
    
    // Regrouper les variants par vin
    const vinsMap = new Map();
    
    result.rows.forEach(row => {
      const vinId = row.vin_id;
      
      if (!vinsMap.has(vinId)) {
        vinsMap.set(vinId, {
          id: row.vin_id,
          nom: row.nom,
          origine_vin: row.origine_vin,
          type_vin: row.type_vin,
          description: row.description,
          categorie_id: row.categorie_id,
          categorie_nom: row.categorie_nom,
          categorie_slug: row.categorie_slug,
          disponible: row.vin_disponible,
          photo_url: row.photo_url,
          ordre_affichage: row.vin_ordre,
          variants: []
        });
      }
      
      // Ajouter le variant s'il existe
      if (row.variant_id) {
        vinsMap.get(vinId).variants.push({
          id: row.variant_id,
          volume_vin: row.volume_vin,
          contenant_vin: row.contenant_vin,
          prix: parseFloat(row.prix),
          disponible: row.variant_disponible,
          ordre_affichage: row.variant_ordre
        });
      }
    });
    
    const vins = Array.from(vinsMap.values());
    res.json(vins);
  } catch (error) {
    console.error('Erreur lors de la récupération des vins admin:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Créer un nouveau vin
const creerVin = async (req, res) => {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    const { nom, origine_vin, type_vin, description, categorie_id, photo_url, variants } = req.body;
    
    // Validation
    if (!nom || !categorie_id) {
      return res.status(400).json({ error: 'Nom et catégorie requis' });
    }
    
    if (!variants || !Array.isArray(variants) || variants.length === 0) {
      return res.status(400).json({ error: 'Au moins un variant (volume/contenant/prix) requis' });
    }
    
    // Créer le vin de base
    const vinQuery = `
      INSERT INTO vins (nom, origine_vin, type_vin, description, categorie_id, photo_url, ordre_affichage)
      VALUES ($1, $2, $3, $4, $5, $6, (SELECT COALESCE(MAX(ordre_affichage), 0) + 1 FROM vins WHERE categorie_id = $5))
      RETURNING id
    `;
    
    const vinResult = await client.query(vinQuery, [
      nom, origine_vin, type_vin, description, categorie_id, photo_url
    ]);
    
    const vinId = vinResult.rows[0].id;
    
    // Créer les variants
    for (let i = 0; i < variants.length; i++) {
      const variant = variants[i];
      
      if (!variant.volume_vin || !variant.contenant_vin || !variant.prix) {
        throw new Error('Volume, contenant et prix requis pour chaque variant');
      }
      
      const variantQuery = `
        INSERT INTO vin_variants (vin_id, volume_vin, contenant_vin, prix, ordre_affichage)
        VALUES ($1, $2, $3, $4, $5)
      `;
      
      await client.query(variantQuery, [
        vinId, variant.volume_vin, variant.contenant_vin, variant.prix, i + 1
      ]);
    }
    
    await client.query('COMMIT');
    
    res.json({ 
      message: 'Vin créé avec succès', 
      id: vinId,
      variants_count: variants.length
    });
    
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Erreur lors de la création du vin:', error);
    res.status(500).json({ error: error.message || 'Erreur serveur' });
  } finally {
    client.release();
  }
};

// Modifier un vin
const modifierVin = async (req, res) => {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    const { id } = req.params;
    const { nom, origine_vin, type_vin, description, photo_url, variants } = req.body;
    
    // Validation
    if (!nom) {
      return res.status(400).json({ error: 'Nom requis' });
    }
    
    if (!variants || !Array.isArray(variants) || variants.length === 0) {
      return res.status(400).json({ error: 'Au moins un variant requis' });
    }
    
    // Mettre à jour le vin de base
    const vinQuery = `
      UPDATE vins 
      SET nom = $1, origine_vin = $2, type_vin = $3, description = $4, photo_url = $5
      WHERE id = $6
    `;
    
    await client.query(vinQuery, [nom, origine_vin, type_vin, description, photo_url, id]);
    
    // Supprimer les anciens variants
    await client.query('DELETE FROM vin_variants WHERE vin_id = $1', [id]);
    
    // Créer les nouveaux variants
    for (let i = 0; i < variants.length; i++) {
      const variant = variants[i];
      
      if (!variant.volume_vin || !variant.contenant_vin || !variant.prix) {
        throw new Error('Volume, contenant et prix requis pour chaque variant');
      }
      
      const variantQuery = `
        INSERT INTO vin_variants (vin_id, volume_vin, contenant_vin, prix, ordre_affichage)
        VALUES ($1, $2, $3, $4, $5)
      `;
      
      await client.query(variantQuery, [
        id, variant.volume_vin, variant.contenant_vin, variant.prix, i + 1
      ]);
    }
    
    await client.query('COMMIT');
    
    res.json({ 
      message: 'Vin modifié avec succès',
      variants_count: variants.length
    });
    
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Erreur lors de la modification du vin:', error);
    res.status(500).json({ error: error.message || 'Erreur serveur' });
  } finally {
    client.release();
  }
};

// Supprimer un vin (et ses variants)
const supprimerVin = async (req, res) => {
  try {
    const { id } = req.params;
    
    const query = 'DELETE FROM vins WHERE id = $1';
    const result = await pool.query(query, [id]);
    
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Vin non trouvé' });
    }
    
    res.json({ message: 'Vin supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression du vin:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Basculer la disponibilité d'un vin
const toggleDisponibiliteVin = async (req, res) => {
  try {
    const { id } = req.params;
    
    const query = `
      UPDATE vins 
      SET disponible = NOT disponible 
      WHERE id = $1 
      RETURNING disponible
    `;
    
    const result = await pool.query(query, [id]);
    
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Vin non trouvé' });
    }
    
    res.json({ 
      message: 'Disponibilité mise à jour',
      disponible: result.rows[0].disponible
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de disponibilité:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Basculer la disponibilité d'un variant
const toggleDisponibiliteVariant = async (req, res) => {
  try {
    const { id } = req.params;
    
    const query = `
      UPDATE vin_variants 
      SET disponible = NOT disponible 
      WHERE id = $1 
      RETURNING disponible
    `;
    
    const result = await pool.query(query, [id]);
    
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Variant non trouvé' });
    }
    
    res.json({ 
      message: 'Disponibilité du variant mise à jour',
      disponible: result.rows[0].disponible
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de disponibilité du variant:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Exécuter la migration des vins
const executerMigrationVins = async (req, res) => {
  const client = await pool.connect();
  
  try {
    const fs = require('fs');
    const path = require('path');
    
    const migrationPath = path.join(__dirname, '..', 'scripts', 'wine_variants_migration.sql');
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8');
    
    await client.query(migrationSQL);
    
    res.json({ message: 'Migration des vins exécutée avec succès' });
  } catch (error) {
    console.error('Erreur lors de la migration des vins:', error);
    res.status(500).json({ error: error.message || 'Erreur lors de la migration' });
  } finally {
    client.release();
  }
};

// Déplacer un vin vers le haut (diminuer ordre_affichage)
const moveVinUp = async (req, res) => {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    const { id } = req.params;
    
    // Obtenir le vin actuel
    const currentVinQuery = 'SELECT ordre_affichage, categorie_id FROM vins WHERE id = $1';
    const currentVinResult = await client.query(currentVinQuery, [id]);
    
    if (currentVinResult.rowCount === 0) {
      return res.status(404).json({ error: 'Vin non trouvé' });
    }
    
    const currentVin = currentVinResult.rows[0];
    const currentOrdre = currentVin.ordre_affichage || 0;
    const categorieId = currentVin.categorie_id;
    
    // Trouver le vin précédent dans la même catégorie
    const previousVinQuery = `
      SELECT id, ordre_affichage 
      FROM vins 
      WHERE categorie_id = $1 AND ordre_affichage < $2 
      ORDER BY ordre_affichage DESC 
      LIMIT 1
    `;
    
    const previousVinResult = await client.query(previousVinQuery, [categorieId, currentOrdre]);
    
    if (previousVinResult.rowCount === 0) {
      // Déjà en première position
      await client.query('ROLLBACK');
      return res.json({ message: 'Le vin est déjà en première position' });
    }
    
    const previousVin = previousVinResult.rows[0];
    const previousOrdre = previousVin.ordre_affichage;
    
    // Échanger les ordres
    await client.query('UPDATE vins SET ordre_affichage = $1 WHERE id = $2', [previousOrdre, id]);
    await client.query('UPDATE vins SET ordre_affichage = $1 WHERE id = $2', [currentOrdre, previousVin.id]);
    
    await client.query('COMMIT');
    
    res.json({ message: 'Vin déplacé vers le haut avec succès' });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Erreur lors du déplacement du vin vers le haut:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  } finally {
    client.release();
  }
};

// Déplacer un vin vers le bas (augmenter ordre_affichage)
const moveVinDown = async (req, res) => {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    const { id } = req.params;
    
    // Obtenir le vin actuel
    const currentVinQuery = 'SELECT ordre_affichage, categorie_id FROM vins WHERE id = $1';
    const currentVinResult = await client.query(currentVinQuery, [id]);
    
    if (currentVinResult.rowCount === 0) {
      return res.status(404).json({ error: 'Vin non trouvé' });
    }
    
    const currentVin = currentVinResult.rows[0];
    const currentOrdre = currentVin.ordre_affichage || 0;
    const categorieId = currentVin.categorie_id;
    
    // Trouver le vin suivant dans la même catégorie
    const nextVinQuery = `
      SELECT id, ordre_affichage 
      FROM vins 
      WHERE categorie_id = $1 AND ordre_affichage > $2 
      ORDER BY ordre_affichage ASC 
      LIMIT 1
    `;
    
    const nextVinResult = await client.query(nextVinQuery, [categorieId, currentOrdre]);
    
    if (nextVinResult.rowCount === 0) {
      // Déjà en dernière position
      await client.query('ROLLBACK');
      return res.json({ message: 'Le vin est déjà en dernière position' });
    }
    
    const nextVin = nextVinResult.rows[0];
    const nextOrdre = nextVin.ordre_affichage;
    
    // Échanger les ordres
    await client.query('UPDATE vins SET ordre_affichage = $1 WHERE id = $2', [nextOrdre, id]);
    await client.query('UPDATE vins SET ordre_affichage = $1 WHERE id = $2', [currentOrdre, nextVin.id]);
    
    await client.query('COMMIT');
    
    res.json({ message: 'Vin déplacé vers le bas avec succès' });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Erreur lors du déplacement du vin vers le bas:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  } finally {
    client.release();
  }
};

module.exports = {
  getVinsAvecVariants,
  getVinsAdmin,
  creerVin,
  modifierVin,
  supprimerVin,
  toggleDisponibiliteVin,
  toggleDisponibiliteVariant,
  executerMigrationVins,
  moveVinUp,
  moveVinDown
}; 