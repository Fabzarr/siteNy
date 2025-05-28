const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

// Route pour créer une nouvelle réservation
router.post('/', reservationController.creerReservation);

// Route pour vérifier la disponibilité
router.get('/disponibilite', reservationController.verifierDisponibilite);

// Route pour obtenir les réservations d'un jour
router.get('/jour', reservationController.getReservationsJour);

// Route pour annuler une réservation
router.put('/:id/annuler', reservationController.annulerReservation);

module.exports = router; 