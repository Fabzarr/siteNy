# 🔄 Guide de Réorganisation du Menu

## Nouvelle Fonctionnalité : Réorganiser l'Ordre des Plats

Vous pouvez maintenant **contrôler l'ordre d'affichage** de vos plats dans chaque catégorie sur la carte du restaurant !

## 📍 Comment Accéder à cette Fonctionnalité

1. **Connectez-vous** au back office : `http://localhost:4000/admin-nyc-2024-secret`
2. **Allez** dans "🍕 Gestion du Menu"
3. **Cliquez** sur l'onglet "Par Catégorie"

## 🎯 Comment Utiliser la Réorganisation

### Étape 1 : Activer le Mode Réorganisation
- Dans une catégorie (ex: "NOS PIZZAS"), cliquez sur le bouton **"🔄 Réorganiser"**
- Une zone orange apparaît avec les instructions

### Étape 2 : Glisser-Déposer
- Les **poignées de déplacement** (⋮⋮) apparaissent à gauche de chaque plat
- **Cliquez et maintenez** sur un plat pour le saisir
- **Glissez-le** vers la position souhaitée
- **Relâchez** pour déposer

### Étape 3 : Sauvegarder
- Une fois l'ordre souhaité obtenu, cliquez sur **"✅ Sauvegarder l'ordre"**
- Ou cliquez sur **"❌ Annuler"** pour abandonner les changements

## 🎨 Effets Visuels

- **Mode actif** : Les plats ont une bordure orange et des poignées de déplacement
- **Pendant le glissement** : Le plat devient transparent et légèrement incliné
- **Zone de dépôt** : Bordure verte en pointillés quand on survole

## 📋 Exemples d'Usage

### Exemple 1 : Mettre les Pizzas Populaires en Premier
```
Ordre AVANT :
1. Pizza Margherita
2. Pizza 4 Fromages  
3. Pizza du Chef
4. Pizza Végétarienne

Ordre APRÈS réorganisation :
1. Pizza du Chef         ← Mise en avant
2. Pizza 4 Fromages      ← Populaire
3. Pizza Margherita      
4. Pizza Végétarienne
```

### Exemple 2 : Organiser les Vins par Prix
```
Ordre AVANT (alphabétique) :
1. Bordeaux Rouge 2020
2. Champagne Brut
3. Côtes du Rhône 2021
4. Chablis 2022

Ordre APRÈS (par gamme de prix) :
1. Côtes du Rhône 2021   ← Entrée de gamme
2. Chablis 2022          ← Milieu de gamme  
3. Bordeaux Rouge 2020   ← Haut de gamme
4. Champagne Brut        ← Premium
```

## ⚡ Impact Immédiat

L'ordre que vous définissez se reflète **immédiatement** sur :
- La carte du site web public
- Toutes les pages où les plats sont affichés
- L'API menu pour toute intégration future

## 🔧 Détails Techniques

- **Colonne base de données** : `ordre_affichage` dans la table `plats`
- **API utilisée** : `PATCH /api/menu/admin/categories/:id/reorder-plats`
- **Tri automatique** : Les plats sont triés par `ordre_affichage ASC` puis par `nom ASC`

## 🚨 Conseils d'Utilisation

### ✅ Bonnes Pratiques
- **Testez** différents ordres selon les saisons
- **Mettez** vos spécialités en premier
- **Organisez** par popularité ou par prix
- **Sauvegardez** toujours après modification

### ⚠️ Précautions
- **Un seul** mode réorganisation actif à la fois
- **Annulez** si vous n'êtes pas satisfait du résultat
- **Actualisez** la page si quelque chose semble bloqué

## 🎯 Stratégies Recommandées

### Pour les Pizzas
1. **Spécialités maison** en premier
2. **Classiques populaires** ensuite  
3. **Options végétariennes** regroupées
4. **Créations originales** en fin

### Pour les Vins
1. **Vins de la maison** en premier
2. **Rapport qualité-prix** mise en avant
3. **Progression** par gamme de prix
4. **Millésimes spéciaux** mis en valeur

### Pour les Desserts
1. **Desserts chauds** en premier (spécialité café)
2. **Créations maison** ensuite
3. **Classiques** en fin

## 📱 Accessibilité

- **Compatible** avec tous les navigateurs modernes
- **Responsive** : fonctionne sur mobile et tablette
- **Indicateurs visuels** clairs pour le drag & drop

## 🆘 Résolution de Problèmes

### La réorganisation ne fonctionne pas ?
1. **Vérifiez** que vous êtes en mode réorganisation (zone orange visible)
2. **Actualisez** la page et réessayez
3. **Assurez-vous** d'avoir les droits administrateur

### L'ordre ne se sauvegarde pas ?
1. **Vérifiez** votre connexion internet
2. **Reconnectez-vous** au back office si nécessaire
3. **Contactez** le support technique si le problème persiste

---

**🎉 Cette fonctionnalité vous donne un contrôle total sur la présentation de votre menu !**

*Dernière mise à jour : 28 mai 2025* 