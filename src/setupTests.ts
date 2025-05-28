import '@testing-library/jest-dom';

// Mock des variables d'environnement
process.env = {
  ...process.env,
  VITE_API_URL: 'http://localhost:3000'
}; 