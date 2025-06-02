const express = require('express');
const router = express.Router();
const Vin = require('../models/Vin');
const { authenticateAdmin } = require('../middleware/auth');

// Obtenir toutes les catégories
router.get('/categories', async (req, res) => {
  try {
    const categories = await Vin.getCategories();
    res.json(categories);
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Routes publiques
router.get('/', async (req, res) => {
  try {
    const vins = await Vin.getTousLesVins();
    res.json(vins);
  } catch (error) {
    console.error('Erreur lors de la récupération des vins:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Obtenir les vins par catégorie
router.get('/categorie/:id', async (req, res) => {
  try {
    const vins = await Vin.getVinsParCategorie(req.params.id);
    res.json(vins);
  } catch (error) {
    console.error('Erreur lors de la récupération des vins par catégorie:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Obtenir un vin par ID
router.get('/:id', async (req, res) => {
  try {
    const vin = await Vin.getVinParId(req.params.id);
    if (!vin) {
      return res.status(404).json({ error: 'Vin non trouvé' });
    }
    res.json(vin);
  } catch (error) {
    console.error('Erreur lors de la récupération du vin:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Routes protégées (admin)
router.post('/', authenticateAdmin, async (req, res) => {
  try {
    const vin = await Vin.ajouterVin(req.body);
    res.status(201).json(vin);
  } catch (error) {
    console.error('Erreur lors de l\'ajout du vin:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

router.put('/:id', authenticateAdmin, async (req, res) => {
  try {
    const vin = await Vin.modifierVin(req.params.id, req.body);
    if (!vin) {
      return res.status(404).json({ error: 'Vin non trouvé' });
    }
    res.json(vin);
  } catch (error) {
    console.error('Erreur lors de la modification du vin:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

router.delete('/:id', authenticateAdmin, async (req, res) => {
  try {
    const vin = await Vin.supprimerVin(req.params.id);
    if (!vin) {
      return res.status(404).json({ error: 'Vin non trouvé' });
    }
    res.json({ message: 'Vin supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression du vin:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router; 