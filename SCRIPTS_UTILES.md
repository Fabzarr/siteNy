# 🛠️ SCRIPTS UTILES - NEW YORK CAFÉ

## 🚀 DÉMARRAGE RAPIDE

### Lancer le site complet
```bash
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend  
cd src/server
node server.js
```

### URLs importantes
- **Site** : http://localhost:5173
- **API** : http://localhost:4000
- **Admin** : http://localhost:4000/admin-nyc-2024-secret

## 🧪 TESTS AUTOMATISÉS

### Script de tests complets
```bash
# Lancer tous les tests
node run-all-tests.js
```

### Tests individuels
```bash
# Tests utilitaires (sécurité, validation)
npm run test:utils

# Tests serveur (API, routes)
npm run test:server
```

## 🔧 MAINTENANCE BASE DE DONNÉES

### Correction fonction PostgreSQL
```bash
# Si problème avec update_modified_column
node fix_function_final.js
```

### Connexion directe PostgreSQL
```bash
psql -h localhost -U postgres -d newyorkcafe
```

## 📦 GESTION DÉPENDANCES

### Installation complète
```bash
npm install
```

### Mise à jour sécurisée
```bash
npm audit fix
```

## 🔄 GIT WORKFLOW

### Récupérer l'état final
```bash
git checkout feature/reservation-system
git pull origin feature/reservation-system
```

### Sauvegarder modifications
```bash
git add -A
git commit -m "Description des changements"
git push origin feature/reservation-system
```

## 🐛 DÉPANNAGE RAPIDE

### Problème port occupé
```bash
# Tuer processus sur port 4000
netstat -ano | findstr :4000
taskkill /PID [PID_NUMBER] /F

# Tuer processus sur port 5173
netstat -ano | findstr :5173
taskkill /PID [PID_NUMBER] /F
```

### Cache npm corrompu
```bash
npm cache clean --force
rm -rf node_modules
npm install
```

### Redémarrage complet
```bash
# Arrêter tous les processus
Ctrl+C (dans chaque terminal)

# Nettoyer et relancer
npm run dev
cd src/server && node server.js
```

## 📊 MONITORING

### Logs serveur
- Les logs s'affichent directement dans le terminal backend
- Format : `🚀 Début getMenuComplet optimisé`

### Performance
- Menu mis en cache automatiquement
- Rechargement uniquement si nécessaire

## 🔐 SÉCURITÉ

### Variables d'environnement
Fichier : `src/server/.env`
```env
DB_HOST=localhost
DB_USERNAME=postgres
DB_NAME=newyorkcafe
DB_PASSWORD=[VOTRE_MOT_DE_PASSE]
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=[VOTRE_EMAIL]
SMTP_PASS=[VOTRE_MOT_DE_PASSE_APP]
```

### Backup base de données
```bash
pg_dump -h localhost -U postgres newyorkcafe > backup_$(date +%Y%m%d).sql
```

## 🎨 DÉVELOPPEMENT CSS

### Hot reload activé
- Modifications CSS appliquées instantanément
- Pas besoin de redémarrer le serveur

### Structure CSS principale
- `src/components/Carte/CartePage.css` : Page principale
- Media queries unifiées pour responsive

## 📱 TESTS RESPONSIVE

### Breakpoints importants
- Mobile : < 480px
- Tablet : 480px - 1024px  
- Desktop : > 1024px

### Vérifications essentielles
1. Bouton mobile doré visible
2. Espacement 80px uniforme mobile/tablet
3. Navigation desktop cohérente

---
*Scripts maintenus et testés - New York Café 2024* 