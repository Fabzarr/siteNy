const db = require('../db');
const { sendConfirmationEmail } = require('../utils/emailService');

// Fonction pour nettoyer et normaliser le numéro de téléphone
const cleanPhoneNumber = (phone) => {
  if (!phone) return '';
  
  // Supprimer tous les espaces, points, tirets, parenthèses
  let cleaned = phone.replace(/[\s\.\-\(\)]/g, '');
  
  // Supprimer le préfixe +33 et le remplacer par 0
  if (cleaned.startsWith('+33')) {
    cleaned = '0' + cleaned.substring(3);
  }
  // Supprimer le préfixe 33 et le remplacer par 0 si ça commence par 33
  else if (cleaned.startsWith('33') && cleaned.length === 11) {
    cleaned = '0' + cleaned.substring(2);
  }
  
  return cleaned;
};

exports.creerReservation = async (req, res) => {
  const client = await db.pool.connect();
  
  try {
    await client.query('BEGIN');
    const { prenom, nom, email, telephone, date, heure, nombrePersonnes } = req.body;

    // Nettoyer le numéro de téléphone
    const cleanedPhone = cleanPhoneNumber(telephone);
    
    console.log(`Numéro original: ${telephone}, Numéro nettoyé: ${cleanedPhone}`);

    // Vérifier la disponibilité
    const disponibiliteResult = await client.query(
      'SELECT verifier_disponibilite($1, $2, $3) as disponible',
      [date, heure, nombrePersonnes]
    );
    
    if (!disponibiliteResult.rows[0].disponible) {
      return res.status(400).json({
        success: false,
        message: "Désolé, ce créneau n'est plus disponible pour ce nombre de personnes."
      });
    }

    // Créer la réservation
    const result = await client.query(
      `INSERT INTO reservations 
       (prenom, nom, email, telephone, date, heure, nombre_personnes, statut)
       VALUES ($1, $2, $3, $4, $5, $6, $7, 'confirmee')
       RETURNING *`,
      [prenom, nom, email, cleanedPhone, date, heure, nombrePersonnes]
    );

    const reservation = result.rows[0];
    await client.query('COMMIT');

    // Envoyer un email de confirmation
    try {
      await sendConfirmationEmail(reservation);
    } catch (emailError) {
      console.error('Erreur lors de l\'envoi de l\'email:', emailError);
      // On continue même si l'email échoue
    }

    res.status(201).json({
      success: true,
      data: reservation,
      message: 'Réservation créée avec succès'
    });

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Erreur lors de la création de la réservation:', error);
    res.status(500).json({
      success: false,
      message: 'Une erreur est survenue lors de la création de la réservation'
    });
  } finally {
    client.release();
  }
};

exports.verifierDisponibilite = async (req, res) => {
  try {
    const { date, heure, nombrePersonnes } = req.query;
    
    const result = await db.query(
      'SELECT verifier_disponibilite($1, $2, $3) as disponible',
      [date, heure, parseInt(nombrePersonnes)]
    );
    
    res.json({
      success: true,
      disponible: result.rows[0].disponible
    });

  } catch (error) {
    console.error('Erreur lors de la vérification de disponibilité:', error);
    res.status(500).json({
      success: false,
      message: 'Une erreur est survenue lors de la vérification de disponibilité'
    });
  }
};

exports.getReservationsJour = async (req, res) => {
  try {
    const { date } = req.query;
    
    const result = await db.query(
      `SELECT * FROM reservations 
       WHERE date = $1 
       AND statut = 'confirmee'
       ORDER BY heure`,
      [date]
    );

    res.json({
      success: true,
      data: result.rows
    });

  } catch (error) {
    console.error('Erreur lors de la récupération des réservations:', error);
    res.status(500).json({
      success: false,
      message: 'Une erreur est survenue lors de la récupération des réservations'
    });
  }
};

exports.annulerReservation = async (req, res) => {
  const client = await db.pool.connect();
  
  try {
    await client.query('BEGIN');
    const { id } = req.params;
    
    const result = await client.query(
      `UPDATE reservations 
       SET statut = 'annulee' 
       WHERE id = $1 
       RETURNING *`,
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Réservation non trouvée'
      });
    }

    await client.query('COMMIT');
    res.json({
      success: true,
      message: 'Réservation annulée avec succès'
    });

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Erreur lors de l\'annulation de la réservation:', error);
    res.status(500).json({
      success: false,
      message: 'Une erreur est survenue lors de l\'annulation de la réservation'
    });
  } finally {
    client.release();
  }
}; 