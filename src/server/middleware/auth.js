const jwt = require('jsonwebtoken');

// Secret pour JWT (en production, mettre dans .env)
const JWT_SECRET = process.env.JWT_SECRET || 'nyc-admin-secret-2024-ultra-secure';

// Middleware d'authentification
const authenticateAdmin = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '') || req.cookies?.adminToken;
  
  if (!token) {
    return res.status(401).json({ error: 'Accès refusé. Token manquant.' });
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token invalide.' });
  }
};

// Fonction pour générer un token
const generateToken = (adminData) => {
  return jwt.sign(adminData, JWT_SECRET, { expiresIn: '24h' });
};

module.exports = {
  authenticateAdmin,
  generateToken,
  JWT_SECRET
}; 