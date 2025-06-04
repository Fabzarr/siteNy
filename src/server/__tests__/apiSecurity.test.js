// Tests de sécurité API très robustes

describe('API Security Tests', () => {
  
  describe('SQL Injection Protection', () => {
    const validateInput = (input) => {
      if (typeof input !== 'string') return false;
      
      // Patterns SQL dangereux
      const sqlPatterns = [
        /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION)\b)/i,
        /(\b(OR|AND)\s+\d+\s*=\s*\d+)/i,
        /(['"];?\s*(OR|AND|UNION))/i,
        /(--|\|\||\/\*|\*\/)/,
        /(\bDROP\s+TABLE\b)/i,
        /(\bEXEC\()/i
      ];
      
      return !sqlPatterns.some(pattern => pattern.test(input));
    };

    test('should reject SQL injection attempts', () => {
      const maliciousInputs = [
        "'; DROP TABLE users; --",
        "1' OR '1'='1",
        "admin'/*",
        "1 UNION SELECT * FROM passwords",
        "'; DELETE FROM reservations; --",
        "1; EXEC sp_configure 'show advanced options'",
        "' OR 1=1--",
        "1' AND 1=1 UNION SELECT @@version--"
      ];

      maliciousInputs.forEach(input => {
        expect(validateInput(input)).toBe(false);
      });
    });

    test('should allow safe inputs', () => {
      const safeInputs = [
        'Jean Dupont',
        'jean@example.com',
        'Pizza Margherita',
        'Table pour 4 personnes',
        "Château d'Yquem 2010",
        'Réservation anniversaire'
      ];

      safeInputs.forEach(input => {
        expect(validateInput(input)).toBe(true);
      });
    });
  });

  describe('XSS Protection', () => {
    const sanitizeHtml = (input) => {
      if (typeof input !== 'string') return '';
      
      return input
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
        .replace(/javascript:/gi, '')
        .replace(/on\w+\s*=/gi, '')
        .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
        .replace(/<embed\b[^>]*>/gi, '')
        .replace(/vbscript:/gi, '');
    };

    test('should sanitize dangerous HTML', () => {
      const dangerousInputs = [
        '<script>alert("XSS")</script>',
        '<iframe src="http://malicious.com"></iframe>',
        'javascript:alert(document.cookie)',
        '<img onerror="alert(1)" src="x">',
        '<div onclick="steal_data()">Click me</div>',
        '<object data="malicious.swf"></object>',
        '<embed src="malicious.swf">',
        'vbscript:msgbox("XSS")'
      ];

      dangerousInputs.forEach(input => {
        const sanitized = sanitizeHtml(input);
        expect(sanitized).not.toContain('<script');
        expect(sanitized).not.toContain('<iframe');
        expect(sanitized).not.toContain('javascript:');
        expect(sanitized).not.toContain('onerror=');
        expect(sanitized).not.toContain('onclick=');
        expect(sanitized).not.toContain('<object');
        expect(sanitized).not.toContain('<embed');
        expect(sanitized).not.toContain('vbscript:');
      });
    });

    test('should preserve safe content', () => {
      const safeInputs = [
        'Normal text content',
        '<p>Safe paragraph</p>',
        '<strong>Bold text</strong>',
        '<em>Italic text</em>',
        'Email: contact@restaurant.com'
      ];

      safeInputs.forEach(input => {
        const sanitized = sanitizeHtml(input);
        // Le contenu texte doit être préservé
        expect(sanitized.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Input Validation', () => {
    const validateReservationData = (data) => {
      const errors = [];

      // Nom requis et longueur
      if (!data.nom || typeof data.nom !== 'string' || data.nom.trim().length < 2) {
        errors.push('Nom invalide');
      }
      if (data.nom && data.nom.length > 100) {
        errors.push('Nom trop long');
      }

      // Email
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!data.email || !emailRegex.test(data.email)) {
        errors.push('Email invalide');
      }

      // Téléphone français
      const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
      if (!data.telephone || !phoneRegex.test(data.telephone.replace(/\s/g, ''))) {
        errors.push('Téléphone invalide');
      }

      // Date future
      if (!data.date || new Date(data.date) <= new Date()) {
        errors.push('Date invalide');
      }

      // Nombre de personnes
      const guests = parseInt(data.nombrePersonnes);
      if (!guests || guests < 1 || guests > 25) {
        errors.push('Nombre de personnes invalide');
      }

      return {
        isValid: errors.length === 0,
        errors
      };
    };

    test('should validate complete reservation data', () => {
      const validData = {
        nom: 'Jean Dupont',
        email: 'jean.dupont@example.com',
        telephone: '01 23 45 67 89',
        date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        nombrePersonnes: '4',
        message: 'Table près de la fenêtre'
      };

      const result = validateReservationData(validData);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should reject invalid reservation data', () => {
      const invalidData = {
        nom: '',
        email: 'invalid-email',
        telephone: '123',
        date: '2020-01-01',
        nombrePersonnes: '0'
      };

      const result = validateReservationData(invalidData);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    test('should handle extreme values', () => {
      const extremeData = {
        nom: 'A'.repeat(200), // Nom trop long
        email: 'test@example.com',
        telephone: '0123456789',
        date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        nombrePersonnes: '50' // Trop de personnes
      };

      const result = validateReservationData(extremeData);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Nom trop long');
      expect(result.errors).toContain('Nombre de personnes invalide');
    });
  });

  describe('Rate Limiting Simulation', () => {
    class RateLimiter {
      constructor(maxRequests = 100, windowMs = 60000) {
        this.maxRequests = maxRequests;
        this.windowMs = windowMs;
        this.requests = new Map();
      }

      isAllowed(clientId) {
        const now = Date.now();
        const clientRequests = this.requests.get(clientId) || [];
        
        // Nettoyer les anciennes requêtes
        const validRequests = clientRequests.filter(
          timestamp => now - timestamp < this.windowMs
        );
        
        if (validRequests.length >= this.maxRequests) {
          return false;
        }
        
        validRequests.push(now);
        this.requests.set(clientId, validRequests);
        return true;
      }

      reset() {
        this.requests.clear();
      }
    }

    test('should allow requests under limit', () => {
      const limiter = new RateLimiter(5, 60000); // 5 requêtes par minute
      const clientId = 'test-client';

      // 5 requêtes devraient passer
      for (let i = 0; i < 5; i++) {
        expect(limiter.isAllowed(clientId)).toBe(true);
      }
    });

    test('should block requests over limit', () => {
      const limiter = new RateLimiter(3, 60000); // 3 requêtes par minute
      const clientId = 'test-client';

      // 3 requêtes OK
      for (let i = 0; i < 3; i++) {
        expect(limiter.isAllowed(clientId)).toBe(true);
      }

      // 4ème requête bloquée
      expect(limiter.isAllowed(clientId)).toBe(false);
    });

    test('should allow requests from different clients', () => {
      const limiter = new RateLimiter(2, 60000);

      expect(limiter.isAllowed('client1')).toBe(true);
      expect(limiter.isAllowed('client2')).toBe(true);
      expect(limiter.isAllowed('client1')).toBe(true);
      expect(limiter.isAllowed('client2')).toBe(true);
      
      // Maintenant les limites sont atteintes pour chaque client
      expect(limiter.isAllowed('client1')).toBe(false);
      expect(limiter.isAllowed('client2')).toBe(false);
    });
  });

  describe('Password Security', () => {
    const validatePassword = (password) => {
      if (!password || typeof password !== 'string') {
        return { isValid: false, errors: ['Mot de passe requis'] };
      }

      const errors = [];

      if (password.length < 8) {
        errors.push('Minimum 8 caractères');
      }

      if (!/[A-Z]/.test(password)) {
        errors.push('Au moins une majuscule');
      }

      if (!/[a-z]/.test(password)) {
        errors.push('Au moins une minuscule');
      }

      if (!/\d/.test(password)) {
        errors.push('Au moins un chiffre');
      }

      if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        errors.push('Au moins un caractère spécial');
      }

      // Mots de passe communs à éviter
      const commonPasswords = [
        'password', '123456', 'admin', 'qwerty', 'azerty',
        'password123', 'admin123', '123456789', 'password1'
      ];
      
      if (commonPasswords.includes(password.toLowerCase())) {
        errors.push('Mot de passe trop commun');
      }

      return {
        isValid: errors.length === 0,
        errors
      };
    };

    test('should validate strong passwords', () => {
      const strongPasswords = [
        'MyStr0ng!Pass',
        'Secure#2024!',
        'Admin@Pass123',
        'Rest4ur4nt!NYC'
      ];

      strongPasswords.forEach(password => {
        const result = validatePassword(password);
        expect(result.isValid).toBe(true);
        expect(result.errors).toHaveLength(0);
      });
    });

    test('should reject weak passwords', () => {
      const weakPasswords = [
        'password', // Trop commun
        '123456', // Trop simple
        'abc', // Trop court
        'ALLUPPERCASE', // Pas de minuscules ni chiffres
        'alllowercase', // Pas de majuscules ni chiffres
        '12345678', // Que des chiffres
        'Password' // Pas de caractères spéciaux
      ];

      weakPasswords.forEach(password => {
        const result = validatePassword(password);
        expect(result.isValid).toBe(false);
        expect(result.errors.length).toBeGreaterThan(0);
      });
    });
  });

  describe('File Upload Security', () => {
    const validateFileUpload = (file) => {
      const errors = [];

      // Extensions autorisées
      const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
      const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

      if (!file || !file.name || !file.type) {
        errors.push('Fichier invalide');
        return { isValid: false, errors };
      }

      // Vérifier l'extension
      const extension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
      if (!allowedExtensions.includes(extension)) {
        errors.push('Extension de fichier non autorisée');
      }

      // Vérifier le type MIME
      if (!allowedMimeTypes.includes(file.type)) {
        errors.push('Type de fichier non autorisé');
      }

      // Taille maximum (5MB)
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        errors.push('Fichier trop volumineux (max 5MB)');
      }

      // Vérifier les noms dangereux
      if (file.name.includes('..') || file.name.includes('/') || file.name.includes('\\')) {
        errors.push('Nom de fichier dangereux');
      }

      return {
        isValid: errors.length === 0,
        errors
      };
    };

    test('should accept valid image files', () => {
      const validFiles = [
        { name: 'photo.jpg', type: 'image/jpeg', size: 1024 * 1024 },
        { name: 'image.png', type: 'image/png', size: 2 * 1024 * 1024 },
        { name: 'pic.gif', type: 'image/gif', size: 500 * 1024 },
        { name: 'modern.webp', type: 'image/webp', size: 1.5 * 1024 * 1024 }
      ];

      validFiles.forEach(file => {
        const result = validateFileUpload(file);
        expect(result.isValid).toBe(true);
        expect(result.errors).toHaveLength(0);
      });
    });

    test('should reject invalid files', () => {
      const invalidFiles = [
        { name: 'script.exe', type: 'application/octet-stream', size: 1024 },
        { name: 'virus.bat', type: 'application/bat', size: 500 },
        { name: '../../../evil.php', type: 'text/php', size: 200 },
        { name: 'huge.jpg', type: 'image/jpeg', size: 10 * 1024 * 1024 }, // Trop gros
        { name: 'no-extension', type: 'image/jpeg', size: 1024 }
      ];

      invalidFiles.forEach(file => {
        const result = validateFileUpload(file);
        expect(result.isValid).toBe(false);
        expect(result.errors.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Session Security', () => {
    class SessionManager {
      constructor() {
        this.sessions = new Map();
        this.maxAge = 30 * 60 * 1000; // 30 minutes
      }

      createSession(userId) {
        const sessionId = this.generateSecureId();
        const session = {
          userId,
          createdAt: Date.now(),
          lastActivity: Date.now(),
          isValid: true
        };
        
        this.sessions.set(sessionId, session);
        return sessionId;
      }

      validateSession(sessionId) {
        const session = this.sessions.get(sessionId);
        
        if (!session || !session.isValid) {
          return false;
        }

        const now = Date.now();
        
        // Vérifier l'expiration
        if (now - session.lastActivity > this.maxAge) {
          this.invalidateSession(sessionId);
          return false;
        }

        // Mettre à jour l'activité
        session.lastActivity = now;
        return true;
      }

      invalidateSession(sessionId) {
        const session = this.sessions.get(sessionId);
        if (session) {
          session.isValid = false;
        }
      }

      generateSecureId() {
        // Simulation d'un ID sécurisé
        return Math.random().toString(36).substring(2) + 
               Date.now().toString(36) + 
               Math.random().toString(36).substring(2);
      }

      cleanup() {
        const now = Date.now();
        for (const [sessionId, session] of this.sessions) {
          if (now - session.lastActivity > this.maxAge) {
            this.sessions.delete(sessionId);
          }
        }
      }
    }

    test('should create and validate sessions', () => {
      const manager = new SessionManager();
      const userId = 'user123';
      
      const sessionId = manager.createSession(userId);
      expect(sessionId).toBeDefined();
      expect(typeof sessionId).toBe('string');
      expect(sessionId.length).toBeGreaterThan(10);
      
      expect(manager.validateSession(sessionId)).toBe(true);
    });

    test('should expire old sessions', () => {
      const manager = new SessionManager();
      manager.maxAge = 1000; // 1 seconde pour le test
      
      const sessionId = manager.createSession('user123');
      expect(manager.validateSession(sessionId)).toBe(true);
      
      // Attendre l'expiration (simulation)
      const session = manager.sessions.get(sessionId);
      session.lastActivity = Date.now() - 2000; // 2 secondes dans le passé
      
      expect(manager.validateSession(sessionId)).toBe(false);
    });

    test('should invalidate sessions manually', () => {
      const manager = new SessionManager();
      const sessionId = manager.createSession('user123');
      
      expect(manager.validateSession(sessionId)).toBe(true);
      
      manager.invalidateSession(sessionId);
      
      expect(manager.validateSession(sessionId)).toBe(false);
    });
  });
}); 