// Tests de validation très robustes pour le site New York Café

describe('Email Validation', () => {
  const validateEmail = (email) => {
    if (!email || typeof email !== 'string') return false;
    // Regex équilibrée - permissive mais robuste
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email.trim());
  };

  test('should validate correct email formats', () => {
    const validEmails = [
      'test@example.com',
      'user.name@domain.co.uk',
      'first+last@subdomain.example.org',
      'user123@test-domain.com',
      'a@b.co'
    ];

    validEmails.forEach(email => {
      expect(validateEmail(email)).toBe(true);
    });
  });

  test('should reject invalid email formats', () => {
    const invalidEmails = [
      '',
      'plainaddress',
      '@missingdomain.com',
      'missing@.com',
      'missing@domain',
      'missing.domain.com',
      'two@@domain.com',
      'spaces @domain.com'
    ];

    invalidEmails.forEach(email => {
      expect(validateEmail(email)).toBe(false);
    });
  });

  test('should handle edge cases', () => {
    expect(validateEmail(null)).toBe(false);
    expect(validateEmail(undefined)).toBe(false);
    expect(validateEmail(' ')).toBe(false);
  });
});

describe('Phone Number Validation', () => {
  const validatePhone = (phone) => {
    if (!phone || typeof phone !== 'string') return false;
    const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  test('should validate French phone numbers', () => {
    const validPhones = [
      '0123456789',
      '01 23 45 67 89',
      '01.23.45.67.89',
      '01-23-45-67-89',
      '+33123456789',
      '+33 1 23 45 67 89',
      '0033123456789'
    ];

    validPhones.forEach(phone => {
      expect(validatePhone(phone)).toBe(true);
    });
  });

  test('should reject invalid phone numbers', () => {
    const invalidPhones = [
      '',
      '123',
      '0000000000',
      '1234567890',
      '+33 0 12 34 56 78',
      'abcdefghij',
      '01 23 45 67',
      '01 23 45 67 89 01'
    ];

    invalidPhones.forEach(phone => {
      expect(validatePhone(phone)).toBe(false);
    });
  });
});

describe('Reservation Data Validation', () => {
  const validateReservation = (data) => {
    const errors = [];

    // Validation du nom
    if (!data.nom || data.nom.trim().length < 2) {
      errors.push('Le nom doit contenir au moins 2 caractères');
    }
    if (data.nom && data.nom.length > 50) {
      errors.push('Le nom ne peut pas dépasser 50 caractères');
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
      errors.push('Email invalide');
    }

    // Validation du téléphone
    const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
    if (!data.telephone || !phoneRegex.test(data.telephone.replace(/\s/g, ''))) {
      errors.push('Numéro de téléphone invalide');
    }

    // Validation de la date
    const reservationDate = new Date(data.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (!data.date || reservationDate < today) {
      errors.push('La date ne peut pas être dans le passé');
    }

    // Validation du nombre de personnes
    const nombrePersonnes = parseInt(data.nombrePersonnes);
    if (!nombrePersonnes || nombrePersonnes < 1 || nombrePersonnes > 20) {
      errors.push('Le nombre de personnes doit être entre 1 et 20');
    }

    // Validation de l'heure
    const validHours = ['18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'];
    if (!data.heure || !validHours.includes(data.heure)) {
      errors.push('Heure de réservation invalide');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  };

  test('should validate correct reservation data', () => {
    const validData = {
      nom: 'Jean Dupont',
      email: 'jean@example.com',
      telephone: '0123456789',
      date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Tomorrow
      heure: '19:00',
      nombrePersonnes: '4',
      message: 'Table près de la fenêtre svp'
    };

    const result = validateReservation(validData);
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test('should reject reservation with missing required fields', () => {
    const invalidData = {
      nom: '',
      email: '',
      telephone: '',
      date: '',
      heure: '',
      nombrePersonnes: '',
      message: ''
    };

    const result = validateReservation(invalidData);
    expect(result.isValid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });

  test('should reject reservation with past date', () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    const invalidData = {
      nom: 'Jean Dupont',
      email: 'jean@example.com',
      telephone: '0123456789',
      date: yesterday.toISOString().split('T')[0],
      heure: '19:00',
      nombrePersonnes: '4'
    };

    const result = validateReservation(invalidData);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('La date ne peut pas être dans le passé');
  });

  test('should reject invalid number of guests', () => {
    const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);
    
    const testCases = [
      { nombrePersonnes: '0', expectedError: 'Le nombre de personnes doit être entre 1 et 20' },
      { nombrePersonnes: '21', expectedError: 'Le nombre de personnes doit être entre 1 et 20' },
      { nombrePersonnes: 'abc', expectedError: 'Le nombre de personnes doit être entre 1 et 20' }
    ];

    testCases.forEach(testCase => {
      const invalidData = {
        nom: 'Jean Dupont',
        email: 'jean@example.com',
        telephone: '0123456789',
        date: tomorrow.toISOString().split('T')[0],
        heure: '19:00',
        nombrePersonnes: testCase.nombrePersonnes
      };

      const result = validateReservation(invalidData);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain(testCase.expectedError);
    });
  });

  test('should reject invalid hours', () => {
    const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);
    
    const invalidHours = ['17:00', '22:00', '12:30', 'abc', ''];
    
    invalidHours.forEach(heure => {
      const invalidData = {
        nom: 'Jean Dupont',
        email: 'jean@example.com',
        telephone: '0123456789',
        date: tomorrow.toISOString().split('T')[0],
        heure: heure,
        nombrePersonnes: '4'
      };

      const result = validateReservation(invalidData);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Heure de réservation invalide');
    });
  });

  test('should validate name length constraints', () => {
    const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);
    
    // Nom trop court
    const shortNameData = {
      nom: 'A',
      email: 'jean@example.com',
      telephone: '0123456789',
      date: tomorrow.toISOString().split('T')[0],
      heure: '19:00',
      nombrePersonnes: '4'
    };

    let result = validateReservation(shortNameData);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Le nom doit contenir au moins 2 caractères');

    // Nom trop long
    const longNameData = {
      ...shortNameData,
      nom: 'A'.repeat(51)
    };

    result = validateReservation(longNameData);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Le nom ne peut pas dépasser 50 caractères');
  });
});

describe('Menu Item Validation', () => {
  const validateMenuItem = (item) => {
    const errors = [];

    if (!item.nom || item.nom.trim().length < 2) {
      errors.push('Le nom du plat est requis (min 2 caractères)');
    }

    if (!item.description || item.description.trim().length < 10) {
      errors.push('La description doit contenir au moins 10 caractères');
    }

    if (!item.prix || isNaN(parseFloat(item.prix)) || parseFloat(item.prix) <= 0) {
      errors.push('Le prix doit être un nombre positif');
    }

    if (item.prix && parseFloat(item.prix) > 1000) {
      errors.push('Le prix ne peut pas dépasser 1000€');
    }

    if (!item.categorie_id || isNaN(parseInt(item.categorie_id))) {
      errors.push('La catégorie est requise');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  };

  test('should validate correct menu item', () => {
    const validItem = {
      nom: 'Pizza Margherita',
      description: 'Pizza classique avec tomates fraîches et mozzarella',
      prix: '14.50',
      categorie_id: '1'
    };

    const result = validateMenuItem(validItem);
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test('should reject invalid menu item data', () => {
    const invalidItem = {
      nom: '',
      description: 'Court',
      prix: 'abc',
      categorie_id: 'invalid'
    };

    const result = validateMenuItem(invalidItem);
    expect(result.isValid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });

  test('should validate price constraints', () => {
    const testCases = [
      { prix: '0', shouldBeValid: false },
      { prix: '-5', shouldBeValid: false },
      { prix: '1001', shouldBeValid: false },
      { prix: '15.99', shouldBeValid: true },
      { prix: '999.99', shouldBeValid: true }
    ];

    testCases.forEach(testCase => {
      const item = {
        nom: 'Test Item',
        description: 'Description test avec plus de 10 caractères',
        prix: testCase.prix,
        categorie_id: '1'
      };

      const result = validateMenuItem(item);
      expect(result.isValid).toBe(testCase.shouldBeValid);
    });
  });
});

describe('Wine Data Validation', () => {
  const validateWine = (wine) => {
    const errors = [];

    if (!wine.nom || wine.nom.trim().length < 2) {
      errors.push('Le nom du vin est requis (min 2 caractères)');
    }

    if (!wine.origine || wine.origine.trim().length < 2) {
      errors.push('L\'origine du vin est requise');
    }

    const validTypes = ['Rouge', 'Blanc', 'Rosé', 'Pétillant', 'Dessert'];
    if (!wine.type || !validTypes.includes(wine.type)) {
      errors.push('Type de vin invalide');
    }

    if (wine.variants && Array.isArray(wine.variants)) {
      wine.variants.forEach((variant, index) => {
        if (!variant.volume || isNaN(parseInt(variant.volume)) || parseInt(variant.volume) <= 0) {
          errors.push(`Variant ${index + 1}: Volume invalide`);
        }

        if (!variant.prix_unitaire || isNaN(parseFloat(variant.prix_unitaire)) || parseFloat(variant.prix_unitaire) <= 0) {
          errors.push(`Variant ${index + 1}: Prix invalide`);
        }

        const validContenants = ['Bouteille', 'Demi-bouteille', 'Magnum', 'Verre'];
        if (!variant.contenant || !validContenants.includes(variant.contenant)) {
          errors.push(`Variant ${index + 1}: Contenant invalide`);
        }
      });
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  };

  test('should validate correct wine data', () => {
    const validWine = {
      nom: 'Bordeaux Rouge 2020',
      description: 'Excellent vin de Bordeaux',
      origine: 'France',
      type: 'Rouge',
      variants: [
        {
          volume: 750,
          contenant: 'Bouteille',
          prix_unitaire: 25.50
        }
      ]
    };

    const result = validateWine(validWine);
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test('should reject invalid wine type', () => {
    const invalidWine = {
      nom: 'Test Wine',
      origine: 'France',
      type: 'Invalid Type',
      variants: []
    };

    const result = validateWine(invalidWine);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Type de vin invalide');
  });

  test('should validate wine variants', () => {
    const wineWithInvalidVariants = {
      nom: 'Test Wine',
      origine: 'France',
      type: 'Rouge',
      variants: [
        {
          volume: 0, // Invalid
          contenant: 'Invalid Container', // Invalid
          prix_unitaire: -5 // Invalid
        }
      ]
    };

    const result = validateWine(wineWithInvalidVariants);
    expect(result.isValid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });
});

describe('Security Validation', () => {
  const sanitizeHtml = (input) => {
    if (typeof input !== 'string') return '';
    return input
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+=/gi, '');
  };

  const validateSqlInjection = (input) => {
    if (typeof input !== 'string') return false;
    const sqlPatterns = [
      /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION)\b)/i,
      /(\b(OR|AND)\s+\d+\s*=\s*\d+)/i,
      /(['"];?\s*(OR|AND|UNION))/i,
      /(--|\|\||\/\*|\*\/)/
    ];
    
    return sqlPatterns.some(pattern => pattern.test(input));
  };

  test('should sanitize HTML and script tags', () => {
    const dangerousInputs = [
      '<script>alert("XSS")</script>',
      '<iframe src="malicious.com"></iframe>',
      'javascript:alert("XSS")',
      '<img onerror="alert(1)" src="x">',
      '<div onclick="alert(1)">Click me</div>'
    ];

    dangerousInputs.forEach(input => {
      const sanitized = sanitizeHtml(input);
      expect(sanitized).not.toContain('<script');
      expect(sanitized).not.toContain('javascript:');
      expect(sanitized).not.toContain('onerror=');
      expect(sanitized).not.toContain('onclick=');
    });
  });

  test('should detect SQL injection attempts', () => {
    const sqlInjectionAttempts = [
      "'; DROP TABLE users; --",
      "1 OR 1=1",
      "admin'--",
      "UNION SELECT * FROM passwords",
      "1'; INSERT INTO"
    ];

    sqlInjectionAttempts.forEach(attempt => {
      expect(validateSqlInjection(attempt)).toBe(true);
    });
  });

  test('should allow safe inputs', () => {
    const safeInputs = [
      'Jean Dupont',
      'jean@example.com',
      'Table pour 4 personnes',
      'Pizza Margherita',
      'Excellent restaurant'
    ];

    safeInputs.forEach(input => {
      expect(validateSqlInjection(input)).toBe(false);
    });
  });
});

describe('Input Length Validation', () => {
  const validateLength = (input, min, max) => {
    if (typeof input !== 'string') return false;
    const length = input.trim().length;
    return length >= min && length <= max;
  };

  test('should validate string lengths correctly', () => {
    expect(validateLength('John', 2, 50)).toBe(true);
    expect(validateLength('J', 2, 50)).toBe(false);
    expect(validateLength('A'.repeat(51), 2, 50)).toBe(false);
    expect(validateLength('   Valid   ', 2, 50)).toBe(true);
  });

  test('should handle edge cases', () => {
    expect(validateLength(null, 2, 50)).toBe(false);
    expect(validateLength(undefined, 2, 50)).toBe(false);
    expect(validateLength(123, 2, 50)).toBe(false);
    expect(validateLength('', 0, 10)).toBe(true);
  });
}); 