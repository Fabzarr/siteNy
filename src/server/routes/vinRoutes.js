const express = require('express');
const router = express.Router();
const vinController = require('../controllers/vinController');

// Routes publiques (client)
router.get('/vins', vinController.getVinsAvecVariants);

// Routes admin
router.get('/admin/vins', vinController.getVinsAdmin);
router.post('/admin/vins', vinController.creerVin);
router.put('/admin/vins/:id', vinController.modifierVin);
router.delete('/admin/vins/:id', vinController.supprimerVin);
router.patch('/admin/vins/:id/toggle-disponibilite', vinController.toggleDisponibiliteVin);
router.patch('/admin/variants/:id/toggle-disponibilite', vinController.toggleDisponibiliteVariant);
router.patch('/admin/vins/:id/move-up', vinController.moveVinUp);
router.patch('/admin/vins/:id/move-down', vinController.moveVinDown);

// Route de migration
router.post('/admin/migrate-vins', vinController.executerMigrationVins);

module.exports = router; 