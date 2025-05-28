const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');

// Créer une nouvelle réservation
router.post('/', async (req, res) => {
  try {
    const {
      nom,
      email,
      telephone,
      date,
      heure,
      nombrePersonnes,
      commentaires
    } = req.body;

    const reservation = new Reservation({
      nom,
      email,
      telephone,
      date,
      heure,
      nombrePersonnes: parseInt(nombrePersonnes),
      commentaires
    });

    await reservation.save();

    res.status(201).json({
      message: 'Réservation créée avec succès',
      reservation
    });
  } catch (error) {
    console.error('Erreur lors de la création de la réservation:', error);
    res.status(500).json({
      message: 'Erreur lors de la création de la réservation',
      error: error.message
    });
  }
});

// Obtenir toutes les réservations
router.get('/', async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({ date: 1, heure: 1 });
    res.json(reservations);
  } catch (error) {
    console.error('Erreur lors de la récupération des réservations:', error);
    res.status(500).json({
      message: 'Erreur lors de la récupération des réservations',
      error: error.message
    });
  }
});

// Obtenir une réservation spécifique
router.get('/:id', async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({ message: 'Réservation non trouvée' });
    }
    res.json(reservation);
  } catch (error) {
    console.error('Erreur lors de la récupération de la réservation:', error);
    res.status(500).json({
      message: 'Erreur lors de la récupération de la réservation',
      error: error.message
    });
  }
});

// Mettre à jour une réservation
router.put('/:id', async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!reservation) {
      return res.status(404).json({ message: 'Réservation non trouvée' });
    }
    res.json(reservation);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la réservation:', error);
    res.status(500).json({
      message: 'Erreur lors de la mise à jour de la réservation',
      error: error.message
    });
  }
});

// Supprimer une réservation
router.delete('/:id', async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndDelete(req.params.id);
    if (!reservation) {
      return res.status(404).json({ message: 'Réservation non trouvée' });
    }
    res.json({ message: 'Réservation supprimée avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de la réservation:', error);
    res.status(500).json({
      message: 'Erreur lors de la suppression de la réservation',
      error: error.message
    });
  }
});

module.exports = router; 