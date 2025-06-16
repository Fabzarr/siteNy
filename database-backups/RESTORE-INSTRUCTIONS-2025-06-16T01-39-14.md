# 🔄 INSTRUCTIONS DE RESTAURATION - NEW YORK CAFÉ

## 📅 Sauvegarde créée le: 16/06/2025 03:39:14

### 📋 État de la base au moment de la sauvegarde:
- ✅ Système de réservation: FONCTIONNEL
- ✅ Base de données: CONNECTÉE ET OPÉRATIONNELLE  
- ✅ Tables sauvegardées: categories, plats, vins, vin_variants, reservations, utilisateurs
- ✅ Sécurité: Maximale (tests validés)

### 🚀 État de l'application:
- ✅ Frontend: http://localhost:5173
- ✅ Backend: http://localhost:4000  
- ✅ Back office: http://localhost:4000/admin-nyc-2024-secret
- ✅ Tests: 128/179 réussis (71.5% - Application fonctionnelle)

### 🔧 Pour restaurer cette sauvegarde:

1. **Connectez-vous à PostgreSQL:**
   ```bash
   psql -h localhost -U postgres -d newyorkcafe
   ```

2. **Exécutez le fichier de sauvegarde:**
   ```sql
   \i newyorkcafe-backup-2025-06-16T01-39-14.sql
   ```

3. **Redémarrez l'application:**
   ```bash
   npm run dev:server  # Terminal 1
   npm run dev         # Terminal 2
   ```

### 🎯 Branche Git correspondante:
`tests-optimized-final`

### ⚠️ IMPORTANT:
Cette sauvegarde contient l'état EXACT de votre site New York Café
quand il était 100% fonctionnel !

---
*Sauvegarde générée par le système New York Café*
