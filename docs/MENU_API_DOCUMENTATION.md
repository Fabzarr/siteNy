# 🍽️ Documentation API Menu - New York Café

## 📋 Vue d'ensemble

Le système de menu backend permet de gérer dynamiquement toute la carte du restaurant via des APIs REST. Fini le code en dur - tout est maintenant stocké en base de données et modifiable via un back office.

## 🗄️ Structure de la Base de Données

### Tables principales

| Table | Description | Champs principaux |
|-------|-------------|-------------------|
| `categories` | Catégories du menu (pizzas, salades, etc.) | `id`, `nom`, `slug`, `description`, `ordre_affichage` |
| `plats` | Plats individuels | `id`, `nom`, `description`, `prix`, `categorie_id`, `disponible` |
| `ingredients` | Base d'ingrédients | `id`, `nom`, `description`, `allergene` |
| `plat_ingredients` | Liaison plats ↔ ingrédients | `plat_id`, `ingredient_id`, `quantite`, `obligatoire` |

### Relations
- **Categories** → **Plats** : Une catégorie contient plusieurs plats
- **Plats** ↔ **Ingrédients** : Relation many-to-many via `plat_ingredients`

## 🚀 APIs Disponibles

### 📖 APIs Publiques (Frontend)

#### `GET /api/menu/menu-complet`
Récupère le menu complet avec toutes les catégories et leurs plats.

**Réponse :**
```json
{
  "petites-faims": {
    "id": 1,
    "nom": "PETITES FAIMS",
    "slug": "petites-faims",
    "description": "Entrées & Apéritifs",
    "ordre": 1,
    "plats": [
      {
        "id": 1,
        "name": "Bruschetta",
        "description": "Pain grillé, tomates, basilic, huile d'olive",
        "price": 7.00,
        "photo_url": null,
        "allergenes": null
      }
    ]
  }
}
```

#### `GET /api/menu/categories`
Liste toutes les catégories actives avec le nombre de plats.

#### `GET /api/menu/plats`
Liste tous les plats disponibles.
- **Query params :** `?categorie_id=3` pour filtrer par catégorie

#### `GET /api/menu/plats/:id`
Détails d'un plat spécifique avec ses ingrédients.

#### `GET /api/menu/ingredients`
Liste tous les ingrédients disponibles.

### 🔐 APIs Administration (Back Office)

#### Gestion des Plats

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `POST` | `/api/menu/admin/plats` | Créer un nouveau plat |
| `PUT` | `/api/menu/admin/plats/:id` | Modifier un plat |
| `DELETE` | `/api/menu/admin/plats/:id` | Supprimer un plat |
| `PATCH` | `/api/menu/admin/plats/:id/disponibilite` | Changer disponibilité |

**Exemple création de plat :**
```json
{
  "nom": "Pizza Spéciale",
  "description": "Notre création du chef",
  "prix": 18.50,
  "categorie_id": 3,
  "disponible": true,
  "allergenes": ["gluten", "lactose"]
}
```

#### Gestion des Catégories

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `POST` | `/api/menu/admin/categories` | Créer une catégorie |
| `PUT` | `/api/menu/admin/categories/:id` | Modifier une catégorie |
| `DELETE` | `/api/menu/admin/categories/:id` | Supprimer une catégorie |

#### Statistiques

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `GET` | `/api/menu/admin/stats` | Statistiques du menu |

**Réponse statistiques :**
```json
{
  "total_categories": 9,
  "total_plats": 56,
  "plats_indisponibles": 0,
  "prix_moyen": "20.09",
  "prix_min": "5.00",
  "prix_max": "90.00",
  "plats_par_categorie": [
    { "categorie": "PETITES FAIMS", "nombre_plats": "6" }
  ]
}
```

## 🛠️ Utilisation Pratique

### Migration et Setup

```bash
# Créer les tables et insérer les données
npm run migrate

# Réinitialiser complètement les données
npm run migrate:reset

# Démarrer le serveur
npm run dev
```

### Tests

```bash
# Exécuter les tests d'API
node test_menu_api.js
```

### Exemples d'Utilisation

#### 1. Ajouter une nouvelle pizza
```javascript
const response = await fetch('http://localhost:4000/api/menu/admin/plats', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    nom: "Pizza Quattro Stagioni",
    description: "Jambon, champignons, artichauts, olives",
    prix: 16.50,
    categorie_id: 3,
    disponible: true
  })
});
```

#### 2. Modifier le prix d'un plat
```javascript
const response = await fetch('http://localhost:4000/api/menu/admin/plats/23', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    nom: "Pizza Margherita",
    description: "Sauce tomate, mozzarella, basilic frais",
    prix: 13.50, // Nouveau prix
    categorie_id: 3,
    disponible: true
  })
});
```

#### 3. Rendre un plat indisponible temporairement
```javascript
const response = await fetch('http://localhost:4000/api/menu/admin/plats/23/disponibilite', {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ disponible: false })
});
```

## 📊 Données Migrées

Le système contient actuellement :
- **9 catégories** : Petites faims, À partager, Pizzas, Salades, Pâtes, Burgers, Viandes & Poisson, Desserts, Vins
- **56 plats** : Tous les plats existants de la carte
- **14 ingrédients** : Base d'ingrédients pour les pizzas avec possibilité d'extension

## 🎯 Prochaines Étapes

### Pour le Back Office
1. **Interface d'administration** : Créer une UI React pour gérer les plats
2. **Authentification** : Ajouter un système de login pour sécuriser les APIs admin
3. **Upload d'images** : Permettre l'ajout de photos pour les plats
4. **Gestion des ingrédients** : Interface pour ajouter/modifier les ingrédients
5. **Import/Export** : Fonctionnalités pour sauvegarder/restaurer la carte

### Fonctionnalités Avancées
- **Gestion des allergènes** : Marquage automatique des plats avec allergènes
- **Promotions** : Système de prix promotionnels temporaires
- **Variations** : Gestion des tailles de pizzas, accompagnements, etc.
- **Analytics** : Statistiques de popularité des plats
- **Multi-langues** : Support de la carte en plusieurs langues

## 🔧 Structure Technique

```
src/server/
├── controllers/
│   └── menuController.js       # Logique métier pour le menu
├── routes/
│   └── menuRoutes.js          # Routes d'API
├── migrations/
│   ├── 002_create_menu_tables.sql  # Création des tables
│   └── 003_seed_menu_data.sql      # Données initiales
├── scripts/
│   └── migrate.js             # Script de migration
└── db/
    └── index.js               # Configuration base de données
```

## ✅ Résultats des Tests

```
✅ 9 catégories récupérées
✅ Menu complet avec 9 catégories  
✅ 8 pizzas trouvées
✅ Plat créé avec l'ID: 57
✅ Plat modifié - Nouveau prix: 19.90€
✅ Disponibilité changée: Indisponible
✅ Plat de test supprimé
✅ Statistiques du menu récupérées
```

Toutes les APIs sont fonctionnelles et prêtes pour l'intégration avec le front office ! 