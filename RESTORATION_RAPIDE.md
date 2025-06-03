# 🚀 RESTAURATION RAPIDE - New York Café

## 📥 RÉCUPÉRATION DU PROJET COMPLET

### 1. Clone du Repository
```bash
git clone https://github.com/Fabzarr/siteNy.git
cd siteNy
git checkout feature/reservation-system
```

### 2. Installation Rapide
```bash
npm install
```

### 3. Base de Données
```bash
# Créer la DB
createdb newyorkcafe_db

# Importer la structure
psql -d newyorkcafe_db -f create_wine_tables.sql
```

### 4. Démarrage
```bash
# Terminal 1
npm run dev

# Terminal 2  
npm run client
```

### 5. Accès
- 🌐 **Site** : http://localhost:5173/
- 👨‍💼 **Admin** : http://localhost:4000/admin-nyc-2024-secret/

---

## 🎯 MODULES À RÉCUPÉRER INDIVIDUELLEMENT

### 🧭 Navbar Responsive Parfaite
```bash
# Copier ces fichiers :
src/components/Navigation/Navbar.tsx
src/components/Navigation/Navbar.css
```

**Fonctionnalités :**
- ✅ Menu hamburger animé mobile/tablette
- ✅ Trait doré desktop uniquement
- ✅ Bordures animées dorées
- ✅ Responsive parfait

### 🦶 Footer Optimisé
```bash
# Copier ces fichiers :
src/components/Footer/Footer.tsx  
src/components/Footer/Footer.css
```

**Fonctionnalités :**
- ✅ Layout responsive optimisé
- ✅ Marges négatives pour ajustement parfait

### 🍽️ Système Menu Complet
```bash
# Copier ces fichiers :
src/components/Carte/
create_wine_tables.sql
src/server/routes/menu.js
src/server/controllers/menuController.js
```

---

## 📋 COMMIT PRINCIPAL

**Branch :** `feature/reservation-system`
**Commit :** `85d9002` 
**Message :** "🚀 COMMIT COMPLET - New York Café v1.0 Production Ready"

**Ce qui est inclus :**
- ✅ Navbar responsive parfaite
- ✅ Footer optimisé 
- ✅ Documentation complète
- ✅ Structure base de données
- ✅ Back office fonctionnel
- ✅ Design mobile/tablette finalisé

---

## ⚠️ POINTS IMPORTANTS

1. **Ne pas modifier** les media queries navbar
2. **Respecter** la structure DB des vins
3. **Utiliser** l'URL secrète admin : `admin-nyc-2024-secret`
4. **Tester** sur mobile/tablette/desktop

---

## 🔄 MISE À JOUR

Pour récupérer les dernières modifications :
```bash
git pull origin feature/reservation-system
npm install
```

---

*🍕 New York Café - Prêt pour la production !* 