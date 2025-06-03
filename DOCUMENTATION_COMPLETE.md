# 🍕 NEW YORK CAFÉ - DOCUMENTATION COMPLÈTE

## 📋 DESCRIPTION DU PROJET

**New York Café** est un site web complet pour un restaurant italien moderne avec :
- 🎯 **Frontend React/TypeScript** avec Vite
- 🔧 **Backend Node.js/Express** 
- 🗄️ **Base de données PostgreSQL**
- 👨‍💼 **Interface d'administration**
- 📱 **Design responsive** (mobile/tablette/desktop)

---

## 🏗️ ARCHITECTURE DU PROJET

```
siteNy/
├── 📁 src/
│   ├── 📁 components/          # Composants React
│   │   ├── Navigation/         # Navbar avec menu hamburger animé
│   │   ├── Footer/            # Pied de page responsive
│   │   ├── Home/              # Page d'accueil
│   │   ├── Carte/             # Affichage menu restaurant
│   │   ├── Admin/             # Interface administration
│   │   └── [autres pages]/    # Autres composants
│   ├── 📁 server/             # Backend Node.js
│   │   ├── server.js          # Serveur principal
│   │   ├── routes/            # Routes API
│   │   ├── controllers/       # Logique métier
│   │   ├── models/            # Modèles de données
│   │   ├── db/                # Configuration DB
│   │   └── admin-dashboard/   # Back office HTML
│   ├── 📁 context/            # Contextes React
│   ├── 📁 hooks/              # Hooks personnalisés
│   └── 📁 utils/              # Utilitaires
├── 📁 public/                 # Assets statiques
├── 📁 docs/                   # Documentation
├── 🗄️ create_wine_tables.sql  # Structure DB
└── 📦 package.json            # Dépendances
```

---

## 🚀 INSTALLATION & DÉMARRAGE

### 1. Prérequis
```bash
- Node.js 18+
- PostgreSQL 13+
- Git
```

### 2. Installation
```bash
# Cloner le projet
git clone [URL_DU_REPO]
cd siteNy

# Installer les dépendances
npm install
```

### 3. Configuration Base de Données
```bash
# 1. Créer la base de données PostgreSQL
createdb newyorkcafe_db

# 2. Importer la structure
psql -d newyorkcafe_db -f create_wine_tables.sql

# 3. Configurer les variables d'environnement (optionnel)
# Créer un fichier .env avec :
DATABASE_URL=postgresql://user:password@localhost:5432/newyorkcafe_db
```

### 4. Démarrage
```bash
# Terminal 1 : Backend
npm run dev

# Terminal 2 : Frontend  
npm run client

# Ou utiliser les scripts batch :
start_back_office.bat  # Windows
```

### 5. Accès
- 🌐 **Site web** : http://localhost:5173/
- 👨‍💼 **Back office** : http://localhost:4000/admin-nyc-2024-secret/

---

## 🎨 COMPOSANTS PRINCIPAUX

### 🧭 Navigation (src/components/Navigation/)
**Fichiers :**
- `Navbar.jsx` - Composant principal
- `Navbar.css` - Styles avec animations

**Fonctionnalités :**
- ✅ Menu desktop avec trait doré en hover
- ✅ Menu hamburger mobile/tablette avec effets
- ✅ Bordures animées dorées
- ✅ Responsive design parfait
- ✅ Animations fluides

**CSS Spécial :**
```css
/* Desktop : Trait doré uniquement */
@media (min-width: 1025px) {
  .navbar-menu a::after { /* trait doré */ }
}

/* Mobile/Tablette : Boutons stylés */
@media (max-width: 1024px) {
  .navbar-menu a { /* bordures animées + effets */ }
}
```

### 🦶 Footer (src/components/Footer/)
**Fonctionnalités :**
- ✅ Layout responsive optimisé
- ✅ Liens sociaux centrés mobile
- ✅ Marges négatives pour ajustement parfait

### 🍽️ Système de Menu (src/components/Carte/)
**Structure DB :**
```sql
-- Catégories de menu
categories (id, nom, slug, description, ordre)

-- Plats classiques  
plats (id, nom, description, prix, categorie_id, disponible)

-- Système vins avancé
vins (id, nom, origine_vin, type_vin, description, categorie_id)
vin_variants (id, vin_id, volume_vin, contenant_vin, prix)
```

### 👨‍💼 Back Office (src/server/admin-dashboard/)
**Accès :** http://localhost:4000/admin-nyc-2024-secret/
**Fonctionnalités :**
- ✅ Gestion complète des menus
- ✅ Gestion des vins avec variantes
- ✅ Interface HTML moderne
- ✅ Sécurisé par URL secrète

---

## 🗄️ BASE DE DONNÉES

### Structure Principale
```sql
-- CATÉGORIES
categories:
  1. PETITES FAIMS
  2. A PARTAGER  
  3. NOS PIZZAS
  4. NOS BELLES SALADES
  5. NOS PÂTES
  6. NOS HAMBURGERS & TARTARE
  7. NOS VIANDES & POISSON
  8. NOS DESSERTS
  9. LA CARTE DES VINS

-- TABLES IMPORTANTES
plats (45+ items) - Menu classique
vins (10+ items) - Carte des vins
vin_variants - Variantes (75cl, Bouteille, etc.)
```

### Sauvegarde/Restauration
```bash
# Sauvegarde complète
pg_dump newyorkcafe_db > backup_$(date +%Y%m%d).sql

# Restauration
psql -d newyorkcafe_db -f backup_20250102.sql
```

---

## 🎯 SCRIPTS & COMMANDES

### Package.json
```json
{
  "scripts": {
    "dev": "nodemon src/server/server.js",
    "client": "vite",
    "start": "node src/server/server.js",
    "build": "vite build"
  }
}
```

### Scripts Utiles
- `start_back_office.bat` - Démarrage Windows
- `export_database.ps1` - Export PowerShell
- `backup_database.bat` - Sauvegarde auto

---

## 🔧 MODULES RÉCUPÉRABLES

### 1. 🧭 Navbar Responsive
**Fichiers à copier :**
```
src/components/Navigation/
├── Navbar.jsx
└── Navbar.css
```

**Fonctionnalités :**
- Menu hamburger animé
- Effets dorés
- Responsive parfait

### 2. 🦶 Footer Optimisé  
**Fichiers à copier :**
```
src/components/Footer/
├── Footer.jsx
└── Footer.css
```

### 3. 🍽️ Système de Menu Complet
**Fichiers à copier :**
```
src/components/Carte/
src/server/routes/menu.js
src/server/controllers/menuController.js
create_wine_tables.sql
```

### 4. 👨‍💼 Back Office
**Fichiers à copier :**
```
src/server/admin-dashboard/
src/server/routes/admin.js
src/server/controllers/adminController.js
```

---

## 🚨 POINTS CRITIQUES

### ⚠️ À NE PAS TOUCHER
1. **Desktop navbar** - Effets parfaits
2. **Structure DB vins** - Système complexe testé
3. **URLs secrètes** - admin-nyc-2024-secret
4. **Media queries** - Breakpoints optimisés

### ✅ Sécurisé & Testé
1. **Responsive design** - Mobile/Tablette/Desktop
2. **Base de données** - Structure robuste
3. **API Routes** - Endpoints fonctionnels
4. **Back office** - Interface administrative

---

## 🔄 PROCÉDURE DE RESTAURATION COMPLÈTE

### Étape 1: Environnement
```bash
mkdir restoration_newyorkcafe
cd restoration_newyorkcafe
git clone [REPO_URL]
cd siteNy
```

### Étape 2: Dépendances
```bash
npm install
```

### Étape 3: Base de Données
```bash
createdb newyorkcafe_db
psql -d newyorkcafe_db -f create_wine_tables.sql
# Importer les données si backup disponible
```

### Étape 4: Test
```bash
npm run dev    # Backend
npm run client # Frontend
```

### Étape 5: Vérification
- ✅ Site : http://localhost:5173/
- ✅ Admin : http://localhost:4000/admin-nyc-2024-secret/
- ✅ Menu hamburger mobile fonctionne
- ✅ Footer responsive OK
- ✅ Base données connectée

---

## 📞 CONTACT & MAINTENANCE

**Développé le :** Janvier 2025
**Technologies :** React 18, Node.js, PostgreSQL, Vite
**Status :** Production Ready ✅

**Pour modifications futures :**
1. Tester sur mobile/tablette/desktop
2. Sauvegarder DB avant changements
3. Ne pas modifier les media queries navbar
4. Utiliser les scripts de backup fournis

---

## 🎉 FONCTIONNALITÉS PRINCIPALES

### 🎨 Interface
- ✅ Design moderne et responsive
- ✅ Animations CSS avancées  
- ✅ Menu hamburger avec effets
- ✅ Couleurs dorées élégantes

### 🍽️ Restaurant
- ✅ Affichage menu complet
- ✅ Système de vins sophistiqué
- ✅ Gestion des variantes (volumes/contenants)
- ✅ Interface d'administration

### 🔧 Technique  
- ✅ API RESTful complète
- ✅ Base de données optimisée
- ✅ Code TypeScript/JavaScript
- ✅ Déploiement facile

---

*🍕 New York Café - Restaurant italien moderne avec technologie de pointe* 