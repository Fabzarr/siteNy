const express = require('express');
const bcrypt = require('bcryptjs');
const path = require('path');
const { generateToken, authenticateAdmin } = require('../middleware/auth');

const router = express.Router();

// Identifiants admin (en production, stocker en base de données avec hash)
const ADMIN_CREDENTIALS = {
  username: 'admin-nyc',
  password: '$2a$10$rGZqWQkB7QXzgFOAz8K5EeSw9HzDv3hG9.XJ8QRjE2K5gF7vP.Kze', // password: "NYC2024Admin!"
  email: 'admin@newyorkcafe.fr'
};

// Route de connexion
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Vérifier les identifiants
    if (username !== ADMIN_CREDENTIALS.username) {
      return res.status(401).json({ error: 'Identifiants incorrects' });
    }
    
    // Pour le développement, accepter aussi le mot de passe en clair
    let isValidPassword = false;
    if (password === 'NYC2024Admin!') {
      isValidPassword = true;
    } else {
      isValidPassword = await bcrypt.compare(password, ADMIN_CREDENTIALS.password);
    }
    
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Identifiants incorrects' });
    }
    
    // Générer le token
    const token = generateToken({
      username: ADMIN_CREDENTIALS.username,
      email: ADMIN_CREDENTIALS.email,
      role: 'admin'
    });
    
    // Définir le cookie
    res.cookie('adminToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000 // 24h
    });
    
    res.json({
      success: true,
      message: 'Connexion réussie',
      token,
      admin: {
        username: ADMIN_CREDENTIALS.username,
        email: ADMIN_CREDENTIALS.email
      }
    });
    
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Route de déconnexion
router.post('/logout', (req, res) => {
  res.clearCookie('adminToken');
  res.json({ success: true, message: 'Déconnexion réussie' });
});

// Route pour vérifier si l'admin est connecté
router.get('/verify', authenticateAdmin, (req, res) => {
  res.json({
    success: true,
    admin: req.admin
  });
});

// Servir les fichiers statiques du dashboard (HTML, CSS, JS)
router.use('/dashboard', authenticateAdmin, express.static(path.join(__dirname, '../admin-dashboard')));

// Route pour servir le dashboard principal
router.get('/dashboard', authenticateAdmin, (req, res) => {
  res.sendFile(path.join(__dirname, '../admin-dashboard/index.html'));
});

// API pour obtenir les statistiques du dashboard
router.get('/api/stats', authenticateAdmin, async (req, res) => {
  try {
    const db = require('../db');
    
    // Statistiques du menu
    const menuStats = await db.query(`
      SELECT 
        (SELECT COUNT(*) FROM categories WHERE actif = true) as total_categories,
        (SELECT COUNT(*) FROM plats WHERE disponible = true) as total_plats_disponibles,
        (SELECT COUNT(*) FROM plats WHERE disponible = false) as total_plats_indisponibles,
        (SELECT COUNT(*) FROM reservations) as reservations_futures,
        (SELECT AVG(prix) FROM plats WHERE disponible = true) as prix_moyen
    `);
    
    // Plats par catégorie
    const platsByCategory = await db.query(`
      SELECT c.nom as categorie, COUNT(p.id) as nombre_plats
      FROM categories c
      LEFT JOIN plats p ON c.id = p.categorie_id AND p.disponible = true
      WHERE c.actif = true
      GROUP BY c.id, c.nom, c.ordre_affichage
      ORDER BY c.ordre_affichage ASC
    `);
    
    // Réservations récentes (simplifiées)
    let recentReservations = [];
    try {
      const reservationsResult = await db.query(`
        SELECT nom, prenom, email, heure, nombre_personnes
        FROM reservations 
        ORDER BY id DESC
        LIMIT 10
      `);
      recentReservations = reservationsResult.rows;
    } catch (error) {
      console.log('Pas de réservations trouvées ou table vide');
    }
    
    res.json({
      success: true,
      stats: menuStats.rows[0],
      platsByCategory: platsByCategory.rows,
      recentReservations: recentReservations
    });
    
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;

// ================================
// ROUTES POUR LA GESTION DES PLATS
// ================================

// Obtenir tous les plats avec leurs catégories
router.get('/api/admin/plats', authenticateAdmin, async (req, res) => {
  try {
    const db = require('../db');
    const result = await db.query(`
      SELECT 
        p.id, p.nom, p.description, p.prix, p.disponible, p.photo_url, p.allergenes, p.ordre_affichage,
        c.id as categorie_id, c.nom as categorie_nom, c.slug as categorie_slug
      FROM plats p
      JOIN categories c ON p.categorie_id = c.id
      ORDER BY c.ordre_affichage ASC, p.ordre_affichage ASC
    `);
    
    res.json({
      success: true,
      plats: result.rows
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des plats:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Obtenir toutes les catégories
router.get('/api/admin/categories', authenticateAdmin, async (req, res) => {
  try {
    const db = require('../db');
    const result = await db.query(`
      SELECT id, nom, slug, description, ordre_affichage, actif
      FROM categories
      WHERE actif = true
      ORDER BY ordre_affichage ASC
    `);
    
    res.json({
      success: true,
      categories: result.rows
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Créer un nouveau plat
router.post('/api/admin/plats', authenticateAdmin, async (req, res) => {
  try {
    const db = require('../db');
    const { nom, description, prix, categorie_id, photo_url, allergenes } = req.body;
    
    // Obtenir le prochain ordre d'affichage pour cette catégorie
    const maxOrderResult = await db.query(
      'SELECT COALESCE(MAX(ordre_affichage), 0) + 1 as next_order FROM plats WHERE categorie_id = $1',
      [categorie_id]
    );
    const nextOrder = maxOrderResult.rows[0].next_order;
    
    const result = await db.query(`
      INSERT INTO plats (nom, description, prix, categorie_id, photo_url, allergenes, ordre_affichage)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `, [nom, description, prix, categorie_id, photo_url, allergenes, nextOrder]);
    
    res.json({
      success: true,
      plat: result.rows[0],
      message: 'Plat créé avec succès'
    });
  } catch (error) {
    console.error('Erreur lors de la création du plat:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Modifier un plat
router.put('/api/admin/plats/:id', authenticateAdmin, async (req, res) => {
  try {
    const db = require('../db');
    const { id } = req.params;
    const { nom, description, prix, categorie_id, photo_url, allergenes } = req.body;
    
    const result = await db.query(`
      UPDATE plats 
      SET nom = $1, description = $2, prix = $3, categorie_id = $4, 
          photo_url = $5, allergenes = $6, date_modification = CURRENT_TIMESTAMP
      WHERE id = $7
      RETURNING *
    `, [nom, description, prix, categorie_id, photo_url, allergenes, id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Plat non trouvé' });
    }
    
    res.json({
      success: true,
      plat: result.rows[0],
      message: 'Plat modifié avec succès'
    });
  } catch (error) {
    console.error('Erreur lors de la modification du plat:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Supprimer un plat
router.delete('/api/admin/plats/:id', authenticateAdmin, async (req, res) => {
  try {
    const db = require('../db');
    const { id } = req.params;
    
    const result = await db.query('DELETE FROM plats WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Plat non trouvé' });
    }
    
    res.json({
      success: true,
      message: 'Plat supprimé avec succès'
    });
  } catch (error) {
    console.error('Erreur lors de la suppression du plat:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Basculer la disponibilité d'un plat
router.patch('/api/admin/plats/:id/toggle-disponibilite', authenticateAdmin, async (req, res) => {
  try {
    const db = require('../db');
    const { id } = req.params;
    
    const result = await db.query(`
      UPDATE plats 
      SET disponible = NOT disponible, date_modification = CURRENT_TIMESTAMP
      WHERE id = $1
      RETURNING *
    `, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Plat non trouvé' });
    }
    
    res.json({
      success: true,
      plat: result.rows[0],
      message: `Plat ${result.rows[0].disponible ? 'activé' : 'désactivé'} avec succès`
    });
  } catch (error) {
    console.error('Erreur lors du changement de disponibilité:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Déplacer un plat vers le haut
router.patch('/api/admin/plats/:id/move-up', authenticateAdmin, async (req, res) => {
  try {
    const db = require('../db');
    const { id } = req.params;
    
    await db.query('BEGIN');
    
    // Obtenir le plat courant
    const currentPlat = await db.query(
      'SELECT * FROM plats WHERE id = $1',
      [id]
    );
    
    if (currentPlat.rows.length === 0) {
      await db.query('ROLLBACK');
      return res.status(404).json({ error: 'Plat non trouvé' });
    }
    
    const current = currentPlat.rows[0];
    
    // Trouver le plat précédent dans la même catégorie
    const previousPlat = await db.query(`
      SELECT * FROM plats 
      WHERE categorie_id = $1 AND ordre_affichage < $2
      ORDER BY ordre_affichage DESC
      LIMIT 1
    `, [current.categorie_id, current.ordre_affichage]);
    
    if (previousPlat.rows.length === 0) {
      await db.query('ROLLBACK');
      return res.status(400).json({ error: 'Le plat est déjà en première position' });
    }
    
    const previous = previousPlat.rows[0];
    
    // Échanger les ordres
    await db.query(
      'UPDATE plats SET ordre_affichage = $1 WHERE id = $2',
      [previous.ordre_affichage, current.id]
    );
    
    await db.query(
      'UPDATE plats SET ordre_affichage = $1 WHERE id = $2',
      [current.ordre_affichage, previous.id]
    );
    
    await db.query('COMMIT');
    
    res.json({
      success: true,
      message: 'Plat déplacé vers le haut avec succès'
    });
  } catch (error) {
    await db.query('ROLLBACK');
    console.error('Erreur lors du déplacement du plat:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Déplacer un plat vers le bas
router.patch('/api/admin/plats/:id/move-down', authenticateAdmin, async (req, res) => {
  try {
    const db = require('../db');
    const { id } = req.params;
    
    await db.query('BEGIN');
    
    // Obtenir le plat courant
    const currentPlat = await db.query(
      'SELECT * FROM plats WHERE id = $1',
      [id]
    );
    
    if (currentPlat.rows.length === 0) {
      await db.query('ROLLBACK');
      return res.status(404).json({ error: 'Plat non trouvé' });
    }
    
    const current = currentPlat.rows[0];
    
    // Trouver le plat suivant dans la même catégorie
    const nextPlat = await db.query(`
      SELECT * FROM plats 
      WHERE categorie_id = $1 AND ordre_affichage > $2
      ORDER BY ordre_affichage ASC
      LIMIT 1
    `, [current.categorie_id, current.ordre_affichage]);
    
    if (nextPlat.rows.length === 0) {
      await db.query('ROLLBACK');
      return res.status(400).json({ error: 'Le plat est déjà en dernière position' });
    }
    
    const next = nextPlat.rows[0];
    
    // Échanger les ordres
    await db.query(
      'UPDATE plats SET ordre_affichage = $1 WHERE id = $2',
      [next.ordre_affichage, current.id]
    );
    
    await db.query(
      'UPDATE plats SET ordre_affichage = $1 WHERE id = $2',
      [current.ordre_affichage, next.id]
    );
    
    await db.query('COMMIT');
    
    res.json({
      success: true,
      message: 'Plat déplacé vers le bas avec succès'
    });
  } catch (error) {
    await db.query('ROLLBACK');
    console.error('Erreur lors du déplacement du plat:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}); 