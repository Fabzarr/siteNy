# 🍽️ Guide d'utilisation du Back Office - New York Café

## 🔐 Accès au Back Office

### Connexion
1. **URL secrète** : `http://localhost:4000/admin-nyc-2024-secret`
2. **Nom d'utilisateur** : `admin-nyc`
3. **Mot de passe** : `NYC2024Admin!`

⚠️ **Important** : Cette URL et ces identifiants sont confidentiels !

## 📊 Dashboard Principal

Une fois connecté, vous arrivez sur le dashboard qui affiche :
- **Nombre de plats disponibles**
- **Nombre de catégories actives**
- **Réservations futures**
- **Prix moyen des plats**
- **Réservations récentes**

## 🍕 Gestion du Menu

Cliquez sur **"Gestion du Menu"** pour accéder à 3 onglets :

### 1. **Tous les Plats**
- Vue d'ensemble de tous vos plats
- **Bouton "➕ Ajouter un Nouveau Plat"** pour créer un plat
- Actions disponibles pour chaque plat :
  - **✏️ Modifier** : Changer nom, description, prix, catégorie
  - **❌ Indispo / ✅ Dispo** : Rendre disponible/indisponible
  - **🗑️ Supprimer** : Supprimer définitivement

### 2. **Par Catégorie**
- Plats organisés par catégorie (NOS PIZZAS, PETITES FAIMS, etc.)
- **Bouton "➕ Ajouter"** dans chaque catégorie pour ajouter directement
- Mêmes actions que l'onglet précédent

### 3. **Disponibilités**
- Liste des plats actuellement **indisponibles**
- **Bouton "✅ Rendre Disponible"** pour les remettre en vente

## ✏️ Modifier un Plat

Quand vous cliquez sur **"✏️ Modifier"** :
1. **Nom du plat** : Changez le nom (ex: "Margherita" → "Margherita Premium")
2. **Description/Ingrédients** : Modifiez la description complète *(OPTIONNEL)*
3. **Prix** : Changez le prix (ex: 12.50 → 13.00)
4. **Catégorie** : Déplacez vers une autre catégorie si besoin
5. **Disponibilité** : Cochez/décochez pour rendre disponible/indisponible

Cliquez **"Enregistrer"** pour valider les modifications.

## ➕ Ajouter un Nouveau Plat

1. Cliquez sur **"➕ Ajouter un Nouveau Plat"**
2. Remplissez les champs :
   - **Nom** : "Bordeaux Rouge" ou "Nouvelle Pizza"
   - **Description** : *(OPTIONNEL)* "Tomate, mozzarella, basilic, jambon"
   - **Prix** : "14.50"
   - **Catégorie** : Sélectionnez dans la liste
   - **Disponible** : Coché par défaut
3. Cliquez **"Enregistrer"**

### 🍷 **IMPORTANT - Plats sans ingrédients (Vins, Boissons)**

- **Nom** : "Bordeaux Rouge 2020"
- **Description** : **LAISSER VIDE** (parfait pour les vins !)
- **Prix** : "25.00"
- **Catégorie** : "VINS" ou "BOISSONS"

💡 **Le champ description est maintenant OPTIONNEL !**

## 🔄 Gestion des Disponibilités

### Rendre un plat indisponible (rupture de stock)
- Cliquez sur **"❌ Indispo"** à côté du plat
- Le plat disparaît immédiatement du site client

### Rendre un plat disponible
- Allez dans l'onglet **"Disponibilités"**
- Cliquez sur **"✅ Rendre Disponible"**
- Le plat redevient visible sur le site

## 📱 Réservations

Cliquez sur **"Réservations"** pour voir :
- Toutes les réservations reçues
- Détails : nom, téléphone, date, heure, nombre de personnes
- Statut des réservations

## 🔒 Sécurité

- **Déconnexion** : Cliquez sur le bouton rouge "Déconnexion" en haut à droite
- **Session** : Vous restez connecté 24h automatiquement
- **URL secrète** : Ne partagez jamais l'URL avec personne

## 💡 Conseils Pratiques

### Gestion quotidienne
1. **Matin** : Vérifiez les réservations du jour
2. **Manque d'ingrédients** : Rendez les plats concernés indisponibles
3. **Nouveaux plats** : Ajoutez-les facilement via le back office
4. **Changement de prix** : Modifiez en temps réel

### Bonnes pratiques
- **Descriptions claires** : Listez tous les ingrédients principaux
- **Vins et boissons** : Pas besoin de description, juste le nom et le prix
- **Prix justes** : Vérifiez que les prix correspondent à vos coûts
- **Disponibilité** : Tenez à jour pour éviter les déceptions clients

### 🍷 **Exemples concrets :**

**Pour une pizza :**
- Nom : "4 Fromages"
- Description : "Mozzarella, gorgonzola, chèvre, parmesan"
- Prix : "16.50"

**Pour un vin :**
- Nom : "Chablis 2022"
- Description : *(laisser vide)*
- Prix : "28.00"

**Pour une boisson :**
- Nom : "Coca Cola 33cl"
- Description : *(laisser vide)*
- Prix : "3.50"

## 🆘 Problèmes Courants

### "Erreur de connexion"
- Vérifiez que le serveur est démarré
- Rechargez la page
- Videz le cache du navigateur

### "Token invalide"
- Déconnectez-vous et reconnectez-vous
- Le token expire après 24h

### Plat qui ne s'affiche pas sur le site
- Vérifiez qu'il est marqué "Disponible"
- Actualisez le site client

---

## 📞 Support

En cas de problème technique, contactez votre développeur avec :
- **Capture d'écran** de l'erreur
- **Heure précise** du problème
- **Actions effectuées** avant l'erreur

**Bon travail avec votre back office ! 🚀** 