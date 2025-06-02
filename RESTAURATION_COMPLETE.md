# 🍷 RESTAURATION COMPLÈTE DU PROJET NEWYORKCAFE

## 📋 État sauvegardé le 02/06/2025 à 16h30

Ce guide permet de restaurer le projet **à 100%** dans son état parfait où tout fonctionne.

## 🔧 Prérequis système
- Node.js v22.16.0
- PostgreSQL 17
- Git
- Windows PowerShell

## 📦 1. Cloner le projet

```bash
git clone https://github.com/Fabzarr/siteNy.git
cd siteNy
git checkout feature/reservation-system
```

## 🗄️ 2. Restaurer la base de données

### Créer la base de données
```sql
CREATE DATABASE newyorkcafe;
CREATE USER postgres WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE newyorkcafe TO postgres;
```

### Restaurer depuis le backup (si disponible)
```bash
psql -h localhost -U postgres -d newyorkcafe < backup_complete_2025-06-02_16-XX.sql
```

### OU créer depuis zéro
```bash
# 1. Installer les dépendances
npm install

# 2. Lancer les migrations
cd src/server && node scripts/migrate.js

# 3. Peupler avec les données de base
psql -h localhost -U postgres -d newyorkcafe < scripts/seed.sql
```

## ⚙️ 3. Configuration

### Variables d'environnement (.env)
```
DB_HOST=localhost
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=newyorkcafe
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=fabiengrasgarcia@gmail.com
SMTP_PASS=your_smtp_password
```

## 🚀 4. Démarrage

### Terminal 1: Backend
```bash
npm run dev
```

### Terminal 2: Frontend
```bash
npm run client
```

## 🌐 5. URLs d'accès

- **Site principal**: http://localhost:5173/
- **API**: http://localhost:4000/api/
- **Admin vins**: http://localhost:4000/admin-nyc-2024-secret

## ✨ Fonctionnalités vérifiées

### ✅ Interface utilisateur
- [x] Affichage des vins par catégories (Rouges, Blancs, Rosés, Pétillants, Champagnes)
- [x] Drapeaux des pays (🇫🇷 France, 🇮🇹 Italie)
- [x] Classification automatique par origine
- [x] Affichage conditionnel des sections
- [x] Design moderne et responsive

### ✅ Interface d'administration
- [x] Connexion sécurisée
- [x] Ajout de nouveaux vins
- [x] Modification des vins existants
- [x] Gestion des variants (prix, volumes, contenants)
- [x] Validation stricte des données
- [x] Champs obligatoires avec dropdowns

### ✅ API Backend
- [x] Endpoints CRUD complets
- [x] Authentification admin
- [x] Validation des données
- [x] Gestion des erreurs
- [x] Structure de base optimisée

### ✅ Base de données
- [x] Tables vins et vin_variants
- [x] Relations correctes
- [x] Index optimisés
- [x] Contraintes d'intégrité
- [x] Données cohérentes

## 🔍 Tests de vérification

### Test rapide du système
```bash
node test_wine_display.js
```

### Vérification admin
1. Aller sur http://localhost:4000/admin-nyc-2024-secret
2. Tester l'ajout d'un vin
3. Vérifier l'affichage sur le site

## 📊 Structure des données

### Vins en place
- **Français**: 11 vins (8 rouges, 2 blancs, 1 champagne)
- **Italiens**: 3 vins (1 rouge, 1 blanc, 1 pétillant)
- **Classification parfaite**: Chaque vin dans la bonne catégorie

### Problèmes résolus
- ✅ Classification automatique par type
- ✅ Gestion des vins pétillants 
- ✅ Noms de pays en français
- ✅ Validation des données
- ✅ Interface responsive

## 🆘 En cas de problème

### Logs à vérifier
```bash
# Logs serveur
npm run dev

# Logs client  
npm run client

# Test API
curl http://localhost:4000/api/menu/menu-complet
```

### Réinitialisation complète
```bash
# Supprimer la DB
DROP DATABASE newyorkcafe;

# Recommencer depuis l'étape 2
```

## 🎯 État du commit

**Commit hash**: `6c0f727`
**Branch**: `feature/reservation-system` 
**Fichiers**: 67 modifiés
**Insertions**: 10,945 lignes

---

> ⚠️ **IMPORTANT**: Cet état représente le système 100% fonctionnel. 
> Tout fonctionne parfaitement à ce stade ! 