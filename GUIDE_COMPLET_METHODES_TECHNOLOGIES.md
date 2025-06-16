# 🚀 GUIDE COMPLET - MÉTHODES & TECHNOLOGIES - NEW YORK CAFÉ

## 📅 Créé le: 16 juin 2025
## 🎯 Objectif: Reproduire un site restaurant complet et professionnel

---

## 🏗️ **ARCHITECTURE GÉNÉRALE**

### 📋 **Stack Technique**
```
Frontend: React + TypeScript + Vite
Backend: Node.js + Express
Base de données: PostgreSQL
Tests: Jest + React Testing Library
Déploiement: Git + GitHub
```

### 🗂️ **Structure de Projet**
```
siteNy/
├── src/
│   ├── components/          # Composants React
│   ├── pages/              # Pages principales
│   ├── server/             # Backend Node.js
│   ├── utils/              # Utilitaires
│   └── styles/             # CSS/SCSS
├── database-backups/       # Sauvegardes BDD
├── public/                 # Assets statiques
└── tests/                  # Tests unitaires
```

---

## 🎨 **FRONTEND - REACT + TYPESCRIPT**

### 🔧 **Technologies Frontend**
- **React 18** - Framework principal
- **TypeScript** - Typage statique
- **Vite** - Build tool moderne et rapide
- **React Router** - Navigation SPA
- **CSS Modules** - Styles scopés

### 📦 **Packages Frontend Essentiels**
```json
{
  "react": "^18.0.0",
  "react-dom": "^18.0.0",
  "react-router-dom": "^6.0.0",
  "typescript": "^5.0.0",
  "vite": "^4.0.0",
  "@types/react": "^18.0.0",
  "@types/react-dom": "^18.0.0"
}
```

### 🏗️ **Structure des Composants**
```typescript
// Exemple: Composant avec TypeScript
interface ComponentProps {
  title: string;
  isVisible?: boolean;
  onAction: () => void;
}

const Component: React.FC<ComponentProps> = ({ 
  title, 
  isVisible = true, 
  onAction 
}) => {
  return (
    <div className="component">
      <h2>{title}</h2>
      {isVisible && <button onClick={onAction}>Action</button>}
    </div>
  );
};
```

### 🎯 **Patterns React Utilisés**
1. **Hooks personnalisés**
   ```typescript
   const useModal = () => {
     const [isOpen, setIsOpen] = useState(false);
     const openModal = () => setIsOpen(true);
     const closeModal = () => setIsOpen(false);
     return { isOpen, openModal, closeModal };
   };
   ```

2. **Context API**
   ```typescript
   const ModalContext = createContext<ModalContextType | undefined>(undefined);
   
   export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
     const modalState = useModal();
     return (
       <ModalContext.Provider value={modalState}>
         {children}
       </ModalContext.Provider>
     );
   };
   ```

3. **Composants contrôlés**
   ```typescript
   const [formData, setFormData] = useState({
     nom: '',
     email: '',
     telephone: ''
   });
   
   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     setFormData(prev => ({
       ...prev,
       [e.target.name]: e.target.value
     }));
   };
   ```

---

## 🖥️ **BACKEND - NODE.JS + EXPRESS**

### 🔧 **Technologies Backend**
- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **PostgreSQL** - Base de données
- **Nodemailer** - Envoi d'emails
- **bcrypt** - Hashage mots de passe
- **dotenv** - Variables d'environnement

### 📦 **Packages Backend Essentiels**
```json
{
  "express": "^4.18.0",
  "pg": "^8.8.0",
  "nodemailer": "^6.8.0",
  "bcrypt": "^5.1.0",
  "dotenv": "^16.0.0",
  "cors": "^2.8.5",
  "helmet": "^6.0.0",
  "express-rate-limit": "^6.6.0"
}
```

### 🏗️ **Structure Serveur**
```javascript
// server.js - Configuration principale
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();

// Middlewares de sécurité
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limite par IP
});
app.use(limiter);

// Routes
app.use('/api/menu', require('./routes/menuRoutes'));
app.use('/api/reservations', require('./routes/reservationRoutes'));
app.use('/api/vins', require('./routes/vinRoutes'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
```

### 🗃️ **Gestion Base de Données**
```javascript
// database.js - Configuration PostgreSQL
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

// Exemple de requête sécurisée
const getMenuItems = async () => {
  try {
    const result = await pool.query(`
      SELECT c.nom as categorie, p.nom, p.description, p.prix 
      FROM categories c 
      JOIN plats p ON c.id = p.categorie_id 
      WHERE p.disponible = true 
      ORDER BY c.ordre, p.ordre
    `);
    return result.rows;
  } catch (error) {
    console.error('Erreur base de données:', error);
    throw error;
  }
};
```

### 📧 **Système d'Emails**
```javascript
// emailService.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

const sendReservationEmail = async (reservationData) => {
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: reservationData.email,
    subject: 'Confirmation de réservation - New York Café',
    html: `
      <h2>Réservation confirmée</h2>
      <p>Bonjour ${reservationData.prenom},</p>
      <p>Votre réservation est confirmée pour le ${reservationData.date}</p>
      <p>Nombre de personnes: ${reservationData.nombrePersonnes}</p>
    `
  };
  
  await transporter.sendMail(mailOptions);
};
```

---

## 🗄️ **BASE DE DONNÉES - POSTGRESQL**

### 🏗️ **Structure des Tables**
```sql
-- Table categories
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  description TEXT,
  ordre INTEGER DEFAULT 0,
  date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table plats
CREATE TABLE plats (
  id SERIAL PRIMARY KEY,
  nom VARCHAR(200) NOT NULL,
  description TEXT,
  prix DECIMAL(10,2) NOT NULL,
  categorie_id INTEGER REFERENCES categories(id),
  image VARCHAR(255),
  disponible BOOLEAN DEFAULT true,
  ordre INTEGER DEFAULT 0,
  date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table réservations
CREATE TABLE reservations (
  id SERIAL PRIMARY KEY,
  prenom VARCHAR(100) NOT NULL,
  nom VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  telephone VARCHAR(20),
  date_reservation DATE NOT NULL,
  heure_reservation TIME NOT NULL,
  nombre_personnes INTEGER NOT NULL,
  message TEXT,
  statut VARCHAR(20) DEFAULT 'confirmee',
  date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table vins
CREATE TABLE vins (
  id SERIAL PRIMARY KEY,
  nom VARCHAR(200) NOT NULL,
  type VARCHAR(50) NOT NULL, -- rouge, blanc, rosé, champagne
  region VARCHAR(100),
  annee INTEGER,
  description TEXT,
  disponible BOOLEAN DEFAULT true,
  date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table variants de vins (bouteille/verre)
CREATE TABLE vin_variants (
  id SERIAL PRIMARY KEY,
  vin_id INTEGER REFERENCES vins(id) ON DELETE CASCADE,
  type_service VARCHAR(20) NOT NULL, -- 'bouteille' ou 'verre'
  prix DECIMAL(10,2) NOT NULL,
  volume VARCHAR(10), -- '75cl', '12cl', etc.
  date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  date_modification TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 🔧 **Triggers et Fonctions**
```sql
-- Fonction pour mise à jour automatique
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.date_modification = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger sur vin_variants
CREATE TRIGGER update_vin_variants_modtime 
BEFORE UPDATE ON vin_variants 
FOR EACH ROW EXECUTE FUNCTION update_modified_column();
```

### 📊 **Requêtes Optimisées**
```sql
-- Menu complet avec cache
SELECT 
  c.id as categorie_id,
  c.nom as categorie_nom,
  c.ordre as categorie_ordre,
  p.id as plat_id,
  p.nom as plat_nom,
  p.description as plat_description,
  p.prix as plat_prix,
  p.image as plat_image
FROM categories c
LEFT JOIN plats p ON c.id = p.categorie_id AND p.disponible = true
ORDER BY c.ordre, p.ordre;

-- Carte des vins avec variants
SELECT 
  v.id, v.nom, v.type, v.region, v.annee, v.description,
  vv.type_service, vv.prix, vv.volume
FROM vins v
JOIN vin_variants vv ON v.id = vv.vin_id
WHERE v.disponible = true
ORDER BY v.type, v.nom, vv.type_service;
```

---

## 🔒 **SÉCURITÉ**

### 🛡️ **Mesures de Sécurité Implémentées**
1. **Validation des entrées**
   ```javascript
   const validateEmail = (email) => {
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     return emailRegex.test(email);
   };
   
   const validatePhone = (phone) => {
     const phoneRegex = /^(?:\+33|0)[1-9](?:[0-9]{8})$/;
     return phoneRegex.test(phone.replace(/\s/g, ''));
   };
   ```

2. **Protection XSS**
   ```javascript
   const sanitizeInput = (input) => {
     return input
       .replace(/</g, '&lt;')
       .replace(/>/g, '&gt;')
       .replace(/"/g, '&quot;')
       .replace(/'/g, '&#x27;');
   };
   ```

3. **Protection SQL Injection**
   ```javascript
   // Toujours utiliser des requêtes paramétrées
   const result = await pool.query(
     'SELECT * FROM reservations WHERE email = $1 AND date_reservation = $2',
     [email, date]
   );
   ```

4. **Hashage des mots de passe**
   ```javascript
   const bcrypt = require('bcrypt');
   
   const hashPassword = async (password) => {
     const saltRounds = 12;
     return await bcrypt.hash(password, saltRounds);
   };
   
   const verifyPassword = async (password, hash) => {
     return await bcrypt.compare(password, hash);
   };
   ```

5. **Rate Limiting**
   ```javascript
   const rateLimit = require('express-rate-limit');
   
   const reservationLimiter = rateLimit({
     windowMs: 15 * 60 * 1000, // 15 minutes
     max: 5, // 5 réservations max par IP
     message: 'Trop de tentatives de réservation'
   });
   ```

---

## 🧪 **TESTS**

### 🔧 **Configuration des Tests**
```json
// package.json - Scripts de test
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:utils": "jest src/utils",
    "test:server": "jest src/server",
    "test:frontend": "jest src/components"
  }
}
```

### 🏗️ **Structure des Tests**
```javascript
// Tests utilitaires
describe('Validation Utils', () => {
  test('should validate email correctly', () => {
    expect(validateEmail('test@example.com')).toBe(true);
    expect(validateEmail('invalid-email')).toBe(false);
  });
  
  test('should sanitize XSS input', () => {
    const maliciousInput = '<script>alert("xss")</script>';
    const sanitized = sanitizeInput(maliciousInput);
    expect(sanitized).not.toContain('<script>');
  });
});

// Tests API
describe('Reservation API', () => {
  test('should create reservation with valid data', async () => {
    const reservationData = {
      prenom: 'Jean',
      nom: 'Dupont',
      email: 'jean@example.com',
      telephone: '0123456789',
      date_reservation: '2025-07-01',
      heure_reservation: '19:00',
      nombre_personnes: 4
    };
    
    const response = await request(app)
      .post('/api/reservations')
      .send(reservationData);
      
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });
});

// Tests React
describe('ReservationModal', () => {
  test('should render form fields', () => {
    render(
      <ModalProvider>
        <ReservationModal isOpen={true} />
      </ModalProvider>
    );
    
    expect(screen.getByLabelText('Prénom *')).toBeInTheDocument();
    expect(screen.getByLabelText('Nom *')).toBeInTheDocument();
    expect(screen.getByLabelText('Email *')).toBeInTheDocument();
  });
});
```

---

## 🚀 **DÉPLOIEMENT & PRODUCTION**

### 📦 **Scripts de Build**
```json
{
  "scripts": {
    "build": "vite build",
    "preview": "vite preview",
    "dev": "vite",
    "dev:server": "nodemon src/server/server.js"
  }
}
```

### 🌐 **Configuration Production**
```javascript
// Production environment
if (process.env.NODE_ENV === 'production') {
  // Servir les fichiers statiques
  app.use(express.static(path.join(__dirname, '../dist')));
  
  // Toutes les routes non-API vers index.html
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}
```

### 🔧 **Variables d'Environnement**
```bash
# .env
NODE_ENV=production
PORT=4000

# Base de données
DB_HOST=localhost
DB_USERNAME=postgres
DB_NAME=newyorkcafe
DB_PASSWORD=your_password

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# Sécurité
JWT_SECRET=your_jwt_secret
ADMIN_PASSWORD_HASH=your_hashed_password
```

---

## 📋 **CHECKLIST CRÉATION NOUVEAU SITE**

### 🏗️ **Phase 1: Setup Initial**
- [ ] Créer le repository Git
- [ ] Initialiser le projet avec Vite + React + TypeScript
- [ ] Configurer la structure de dossiers
- [ ] Installer les dépendances essentielles
- [ ] Configurer PostgreSQL
- [ ] Créer les variables d'environnement

### 🎨 **Phase 2: Frontend**
- [ ] Créer les composants de base (Header, Footer, Navigation)
- [ ] Implémenter le système de routing
- [ ] Créer les pages principales (Accueil, Menu, Contact)
- [ ] Développer les formulaires avec validation
- [ ] Implémenter le système de modales
- [ ] Ajouter la responsivité mobile

### 🖥️ **Phase 3: Backend**
- [ ] Configurer Express avec middlewares de sécurité
- [ ] Créer la structure de base de données
- [ ] Développer les routes API
- [ ] Implémenter l'authentification
- [ ] Configurer le système d'emails
- [ ] Ajouter la gestion d'erreurs

### 🔒 **Phase 4: Sécurité**
- [ ] Validation côté client et serveur
- [ ] Protection XSS et injection SQL
- [ ] Rate limiting
- [ ] Hashage des mots de passe
- [ ] Headers de sécurité (Helmet)
- [ ] CORS configuré

### 🧪 **Phase 5: Tests**
- [ ] Tests unitaires utilitaires
- [ ] Tests API avec supertest
- [ ] Tests composants React
- [ ] Tests d'intégration
- [ ] Tests de sécurité
- [ ] Coverage > 70%

### 🚀 **Phase 6: Production**
- [ ] Configuration build production
- [ ] Optimisation des performances
- [ ] Sauvegarde base de données
- [ ] Documentation complète
- [ ] Monitoring et logs
- [ ] Déploiement

---

## 🛠️ **OUTILS & COMMANDES UTILES**

### 📝 **Commandes Git**
```bash
# Workflow standard
git checkout -b feature/nouvelle-fonctionnalite
git add .
git commit -m "feat: description de la fonctionnalité"
git push origin feature/nouvelle-fonctionnalite

# Sauvegarde état stable
git checkout -b backup/etat-stable-YYYY-MM-DD
git push origin backup/etat-stable-YYYY-MM-DD
```

### 🗄️ **Commandes PostgreSQL**
```bash
# Sauvegarde
pg_dump -h localhost -U postgres -d nom_base > backup.sql

# Restauration
psql -h localhost -U postgres -d nom_base < backup.sql

# Connexion
psql -h localhost -U postgres -d nom_base
```

### 🧪 **Commandes Tests**
```bash
# Tous les tests
npm test

# Tests spécifiques
npm run test:utils
npm run test:server
npm run test:frontend

# Coverage
npm run test:coverage
```

---

## 📚 **RESSOURCES & DOCUMENTATION**

### 📖 **Documentation Officielle**
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/docs/)
- [Jest](https://jestjs.io/)

### 🔧 **Outils Recommandés**
- **IDE**: VS Code avec extensions React/TypeScript
- **Base de données**: pgAdmin pour PostgreSQL
- **API Testing**: Postman ou Insomnia
- **Git GUI**: GitKraken ou SourceTree

### 📋 **Bonnes Pratiques**
1. **Code**: Utiliser ESLint + Prettier
2. **Commits**: Convention Conventional Commits
3. **Branches**: GitFlow (main, develop, feature/*, hotfix/*)
4. **Tests**: TDD quand possible
5. **Sécurité**: Audit régulier avec `npm audit`
6. **Performance**: Lighthouse pour le frontend

---

## 🎯 **CONCLUSION**

Ce guide contient toutes les méthodes, technologies et bonnes pratiques utilisées pour créer le site New York Café. En suivant cette structure, vous pouvez recréer un site restaurant professionnel avec :

- ✅ **Frontend moderne** (React + TypeScript)
- ✅ **Backend robuste** (Node.js + Express)
- ✅ **Base de données optimisée** (PostgreSQL)
- ✅ **Sécurité maximale** (Validation, protection, hashage)
- ✅ **Tests complets** (Unitaires, intégration, sécurité)
- ✅ **Déploiement professionnel** (Production ready)

**Temps estimé pour recréer**: 2-3 semaines pour un développeur expérimenté

---
*Guide créé le 16/06/2025 - Basé sur le projet New York Café* 