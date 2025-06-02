const fs = require('fs').promises;
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const db = require('../db');

async function cleanDatabase() {
  try {
    console.log('🧹 Nettoyage de la base de données...');
    await db.query('DROP TABLE IF EXISTS service_vins CASCADE');
    await db.query('DROP TABLE IF EXISTS vins CASCADE');
    await db.query('DROP TABLE IF EXISTS plat_ingredients CASCADE');
    await db.query('DROP TABLE IF EXISTS ingredients CASCADE');
    await db.query('DROP TABLE IF EXISTS plats CASCADE');
    await db.query('DROP TABLE IF EXISTS reservations CASCADE');
    await db.query('DROP TABLE IF EXISTS categories CASCADE');
    await db.query('DROP TYPE IF EXISTS statut_reservation CASCADE');
    console.log('✅ Base de données nettoyée');
  } catch (error) {
    console.error('❌ Erreur lors du nettoyage:', error);
    throw error;
  }
}

async function runMigration() {
  try {
    console.log('🚀 Démarrage des migrations...');

    // Lire et exécuter le fichier de migration principal
    console.log('📦 Création des tables...');
    const migrationSQL = await fs.readFile(
      path.join(__dirname, 'migration.sql'),
      'utf8'
    );
    await db.query(migrationSQL);
    console.log('✅ Tables créées avec succès');

    // Insérer les données initiales
    console.log('🌱 Insertion des données initiales...');
    const seedSQL = await fs.readFile(
      path.join(__dirname, 'seed.sql'),
      'utf8'
    );
    await db.query(seedSQL);
    console.log('✅ Données initiales insérées');

    console.log('✨ Migrations terminées avec succès');
  } catch (error) {
    console.error('❌ Erreur lors des migrations:', error);
    throw error;
  }
}

async function main() {
  try {
    await cleanDatabase();
    await runMigration();
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur fatale:', error);
    process.exit(1);
  }
}

main(); 