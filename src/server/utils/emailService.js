const nodemailer = require('nodemailer');

// Configuration du transporteur d'email
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Template d'email de confirmation
const getEmailTemplate = (reservation) => {
  const date = new Date(reservation.date).toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #D4AF37; text-align: center;">Confirmation de votre réservation</h2>
      
      <p>Bonjour ${reservation.prenom} ${reservation.nom},</p>
      
      <p>Nous avons le plaisir de confirmer votre réservation au New York Café :</p>
      
      <div style="background-color: #f8f8f8; padding: 20px; margin: 20px 0; border-radius: 5px;">
        <p><strong>Date :</strong> ${date}</p>
        <p><strong>Heure :</strong> ${reservation.heure}</p>
        <p><strong>Nombre de personnes :</strong> ${reservation.nombre_personnes}</p>
      </div>
      
      <div style="background-color: #e8f4fd; padding: 20px; margin: 20px 0; border-radius: 5px; border-left: 4px solid #D4AF37;">
        <h3 style="color: #D4AF37; margin-top: 0;">📍 Adresse du restaurant</h3>
        <p><strong>New York Café</strong><br>
        68 Rue Mouffetard<br>
        75005 Paris</p>
        
        <p><strong>🚇 Accès Métro :</strong><br>
        • Censier-Daubenton (ligne 7) - 4 min à pied<br>
        • Place Monge (ligne 7) - 7 min à pied<br>
        • Cardinal Lemoine (ligne 10) - 10 min à pied</p>
        
        <p><strong>🚌 Accès Bus :</strong><br>
        Lignes 21, 24, 27, 38, 47, 67, 84, 89<br>
        Arrêts : Monge, Censier-Daubenton, Monge-Claude Bernard</p>
      </div>
      
      <p>Informations importantes :</p>
      <ul>
        <li>Merci d'arriver 5-10 minutes avant l'heure de votre réservation</li>
        <li>En cas de retard de plus de 15 minutes, nous ne pourrons pas garantir votre table</li>
        <li>Pour toute annulation, merci de nous prévenir au moins 24h à l'avance</li>
      </ul>
      
      <p>Pour toute question ou modification de votre réservation, n'hésitez pas à nous contacter :</p>
      <ul>
        <li>📞 Téléphone : 06.03.60.02.29 ou 01.45.35.48.43</li>
        <li>📧 Email : contact@newyorkcafe.fr</li>
      </ul>
      
      <p style="text-align: center; margin-top: 30px;">
        Au plaisir de vous accueillir !<br>
        <em>L'équipe du New York Café</em>
      </p>
    </div>
  `;
};

// Fonction d'envoi d'email de confirmation
exports.sendConfirmationEmail = async (reservation) => {
  try {
    const mailOptions = {
      from: '"New York Café" <reservations@newyorkcafe.fr>',
      to: reservation.email,
      subject: 'Confirmation de votre réservation - New York Café',
      html: getEmailTemplate(reservation)
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email envoyé:', info.messageId);
    return info;
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    throw error;
  }
}; 