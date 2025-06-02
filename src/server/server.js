const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const reservationRoutes = require('./routes/reservationRoutes');
const adminRoutes = require('./routes/adminRoutes');
const menuRoutes = require('./routes/menuRoutes');
const vinRoutes = require('./routes/vinRoutes');
const db = require('./db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/reservations', reservationRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api', vinRoutes);
app.use('/admin-nyc-2024-secret', adminRoutes);
app.use('/admin-nyc-2024-secret/api/menu', menuRoutes);
app.use('/admin-nyc-2024-secret/api', vinRoutes);

// Servir les fichiers statiques du back-office
app.use('/admin-nyc-2024-secret', express.static(path.join(__dirname, 'admin-dashboard')));

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Une erreur est survenue sur le serveur'
  });
});

// Démarrage du serveur
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
  console.log(`🔐 Back office disponible sur: http://localhost:${PORT}/admin-nyc-2024-secret`);
  console.log(`Variables d'environnement chargées:`);
  console.log(`- DB_HOST: ${process.env.DB_HOST}`);
  console.log(`- DB_USERNAME: ${process.env.DB_USERNAME}`);
  console.log(`- DB_NAME: ${process.env.DB_NAME}`);
  console.log(`- DB_PASSWORD: ${process.env.DB_PASSWORD ? '[DÉFINI]' : '[NON DÉFINI]'}`);
  console.log(`- SMTP_HOST: ${process.env.SMTP_HOST || '[NON DÉFINI]'}`);
  console.log(`- SMTP_PORT: ${process.env.SMTP_PORT || '[NON DÉFINI]'}`);
  console.log(`- SMTP_USER: ${process.env.SMTP_USER || '[NON DÉFINI]'}`);
  console.log(`- SMTP_PASS: ${process.env.SMTP_PASS ? '[DÉFINI]' : '[NON DÉFINI]'}`);
}); 