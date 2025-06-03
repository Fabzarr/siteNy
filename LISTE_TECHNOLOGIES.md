# 🛠️ NEW YORK CAFÉ - TECHNOLOGIES & FICHIERS

## 📚 STACK TECHNIQUE

### 🎯 Frontend
- **React 18** - Framework UI
- **TypeScript** - Typage statique
- **Vite** - Build tool moderne
- **CSS3** - Animations et responsive
- **React Router** - Navigation SPA

### 🔧 Backend  
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **PostgreSQL** - Base de données
- **HTML5** - Back office admin

### 🛠️ Outils
- **Git** - Contrôle de version
- **npm** - Gestionnaire de paquets
- **PowerShell** - Scripts Windows
- **Batch files** - Automatisation

---

## 📁 FICHIERS PRINCIPAUX

### 🌐 Configuration
```
package.json          # Dépendances et scripts
vite.config.ts        # Configuration Vite
tsconfig.json         # Configuration TypeScript
.gitignore           # Fichiers ignorés Git
```

### 🎨 Frontend Core
```
src/
├── App.tsx          # Composant racine
├── main.tsx         # Point d'entrée
├── App.css          # Styles globaux
└── index.css        # Reset CSS
```

### 🧭 Navigation (IMPORTANTE)
```
src/components/Navigation/
├── Navbar.tsx       # Composant navbar
└── Navbar.css       # Styles responsive parfaits
```

**Breakpoints :**
- Desktop: `@media (min-width: 1025px)`
- Tablette: `@media (769px-1024px)` 
- Mobile: `@media (max-width: 768px)`

### 🦶 Footer (OPTIMISÉ)
```
src/components/Footer/
├── Footer.tsx       # Composant footer
└── Footer.css       # Layout responsive
```

### 🍽️ Système Menu
```
src/components/Carte/
├── CartePage.tsx    # Page principale
├── SideMenu.tsx     # Menu latéral
├── CartePage.css    # Styles menu
└── SideMenu.css     # Styles navigation
```

### 🔧 Backend
```
src/server/
├── server.js        # Serveur Express
├── routes/          # Routes API
├── controllers/     # Logique métier
├── models/          # Modèles données
└── admin-dashboard/ # Back office HTML
```

### 🗄️ Base de Données
```
create_wine_tables.sql  # Structure complète DB
```

**Tables principales :**
- `categories` - 9 catégories menu
- `plats` - 45+ plats restaurant
- `vins` - Carte des vins
- `vin_variants` - Variantes vins

---

## 📱 RESPONSIVE DESIGN

### 🖥️ Desktop (≥1025px)
```css
.navbar-menu a::after {
  /* Trait doré animé en hover */
  content: '';
  background: linear-gradient(90deg, #D4AF37, #F4D03F);
  /* ... */
}
```

### 📱 Mobile/Tablette (≤1024px)
```css
.navbar-menu a {
  /* Boutons avec bordures animées */
  border: 2px solid rgba(212, 175, 55, 0.4);
  background: linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(212, 175, 55, 0.05));
  /* ... */
}

.navbar-menu a::before {
  /* Bordure dorée qui bouge */
  background: linear-gradient(45deg, transparent, rgba(212, 175, 55, 0.8), transparent);
  animation: borderMove 4s ease infinite;
  /* ... */
}
```

---

## 🚀 SCRIPTS UTILES

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

### Batch Windows
```batch
# start_back_office.bat
start /B npm run dev
timeout /t 3
start /B npm run client
```

---

## 🎨 COULEURS & THÈME

### 🎨 Palette Principale
```css
:root {
  --primary-gold: #D4AF37;      /* Or principal */
  --light-gold: #F4D03F;        /* Or clair */
  --dark-bg: rgba(0, 0, 0, 0.9); /* Fond sombre */
  --glass: rgba(212, 175, 55, 0.1); /* Effet verre */
}
```

### ✨ Animations
```css
@keyframes buttonGlow {
  0% { box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2), 0 0 5px rgba(212, 175, 55, 0.1); }
  100% { box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2), 0 0 15px rgba(212, 175, 55, 0.3); }
}

@keyframes borderMove {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
```

---

## 🔗 URLs IMPORTANTES

- **Site web :** http://localhost:5173/
- **Back office :** http://localhost:4000/admin-nyc-2024-secret/
- **Repository :** https://github.com/Fabzarr/siteNy.git
- **Branch :** feature/reservation-system

---

## 📋 CHECKLIST PRODUCTION

### ✅ Frontend
- [x] Navbar responsive parfaite
- [x] Footer optimisé
- [x] Menu hamburger animé
- [x] Design mobile/tablette/desktop
- [x] Animations CSS fluides

### ✅ Backend  
- [x] API RESTful fonctionnelle
- [x] Base de données structurée
- [x] Back office sécurisé
- [x] Gestion des vins avancée

### ✅ Documentation
- [x] DOCUMENTATION_COMPLETE.md
- [x] RESTORATION_RAPIDE.md 
- [x] LISTE_TECHNOLOGIES.md
- [x] Guides d'installation

---

*🍕 New York Café - Technologies modernes pour restaurant italien* 