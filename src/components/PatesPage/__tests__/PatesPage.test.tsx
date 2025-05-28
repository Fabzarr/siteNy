import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PatesPage from '../PatesPage';

describe('PatesPage Component', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <PatesPage />
      </BrowserRouter>
    );
  });

  test('renders page title', () => {
    expect(screen.getByText('New York Café')).toBeInTheDocument();
    expect(screen.getByText('NOS PÂTES')).toBeInTheDocument();
  });

  test('renders all pasta items', () => {
    const pateItems = screen.getAllByTestId('pate-item');
    expect(pateItems.length).toBe(12); // Basé sur les données du composant
  });

  test('renders pasta items with prices', () => {
    const pateItems = screen.getAllByTestId('pate-item');
    pateItems.forEach(item => {
      expect(item).toHaveTextContent(/€/); // Vérifie que chaque item a un prix
    });
  });

  test('renders close button', () => {
    expect(screen.getByRole('button', { name: "Retourner à l'accueil" })).toBeInTheDocument();
  });

  test('renders side menu', () => {
    expect(screen.getByTestId('side-menu')).toBeInTheDocument();
  });

  test('page has correct layout classes', () => {
    expect(screen.getByTestId('pates-container')).toHaveClass('pates-page-container');
  });

  test('menu card has correct styling', () => {
    expect(screen.getByTestId('pates-card')).toHaveClass('pates-menu-card');
  });

  test('pasta items have descriptions', () => {
    const descriptions = screen.getAllByTestId('pate-description');
    expect(descriptions.length).toBeGreaterThan(0);
    descriptions.forEach(description => {
      expect(description).not.toBeEmpty();
    });
  });

  test('pasta items have correct structure', () => {
    const pateItems = screen.getAllByTestId('pate-item');
    pateItems.forEach(item => {
      expect(item.querySelector('.pate-name')).toBeInTheDocument();
      expect(item.querySelector('.pate-price')).toBeInTheDocument();
      expect(item.querySelector('.pate-description')).toBeInTheDocument();
    });
  });

  test('specific pasta dishes are present', () => {
    expect(screen.getByText('Spaghetti Carbonara')).toBeInTheDocument();
    expect(screen.getByText('Penne Arrabiata')).toBeInTheDocument();
    expect(screen.getByText('Tagliatelles aux Fruits de Mer')).toBeInTheDocument();
    expect(screen.getByText('Linguine au Saumon')).toBeInTheDocument();
  });

  test('pasta prices are within expected range', () => {
    const prices = screen.getAllByTestId('pate-price');
    prices.forEach(price => {
      const priceValue = parseInt(price.textContent!.replace('€', ''));
      expect(priceValue).toBeGreaterThanOrEqual(12);
      expect(priceValue).toBeLessThanOrEqual(18);
    });
  });

  test('menu columns are rendered correctly', () => {
    const columns = screen.getAllByTestId('menu-column');
    expect(columns).toHaveLength(3); // Le menu est divisé en 3 colonnes
  });
}); 