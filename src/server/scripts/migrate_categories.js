require('dotenv').config();
const db = require('../db');

async function migrateTables() {
  try {
    // Créer la table des catégories
    await db.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        nom VARCHAR(100) NOT NULL,
        slug VARCHAR(100) UNIQUE NOT NULL,
        description TEXT,
        ordre_affichage INTEGER DEFAULT 0,
        actif BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Insérer la catégorie "LA CARTE DES VINS"
    await db.query(`
      INSERT INTO categories (nom, slug, description, ordre_affichage)
      VALUES (
        'LA CARTE DES VINS',
        'carte-des-vins',
        'Notre sélection de vins fins',
        1000
      )
      ON CONFLICT (slug) DO NOTHING
    `);

    console.log('✅ Migration des catégories réussie !');
  } catch (error) {
    console.error('❌ Erreur lors de la migration:', error);
    throw error;
  }
}

migrateTables().catch(console.error); 