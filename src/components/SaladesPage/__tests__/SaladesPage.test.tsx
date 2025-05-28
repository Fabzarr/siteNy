import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SaladesPage from '../SaladesPage';

describe('SaladesPage Component', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <SaladesPage />
      </BrowserRouter>
    );
  });

  test('renders page title', () => {
    expect(screen.getByText('New York Café')).toBeInTheDocument();
    expect(screen.getByText('NOS BELLES SALADES')).toBeInTheDocument();
    expect(screen.getByText('Fraîcheur & Saveurs')).toBeInTheDocument();
  });

  test('renders all salad items', () => {
    const saladItems = screen.getAllByTestId('salade-item');
    expect(saladItems.length).toBe(12); // Basé sur les données du composant
  });

  test('renders salad items with prices', () => {
    const saladItems = screen.getAllByTestId('salade-item');
    saladItems.forEach(item => {
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
    expect(screen.getByTestId('salades-container')).toHaveClass('salades-page-container');
  });

  test('menu card has correct styling', () => {
    expect(screen.getByTestId('salades-card')).toHaveClass('salades-menu-card');
  });

  test('salad items have descriptions', () => {
    const descriptions = screen.getAllByTestId('salade-description');
    expect(descriptions.length).toBeGreaterThan(0);
    descriptions.forEach(description => {
      expect(description).not.toBeEmpty();
    });
  });

  test('salad items have correct structure', () => {
    const saladItems = screen.getAllByTestId('salade-item');
    saladItems.forEach(item => {
      expect(item.querySelector('.salade-name')).toBeInTheDocument();
      expect(item.querySelector('.salade-price')).toBeInTheDocument();
      expect(item.querySelector('.salade-description')).toBeInTheDocument();
    });
  });

  test('specific salads are present', () => {
    expect(screen.getByText('Salade César')).toBeInTheDocument();
    expect(screen.getByText('Salade Niçoise')).toBeInTheDocument();
    expect(screen.getByText('Salade de Chèvre Chaud')).toBeInTheDocument();
    expect(screen.getByText('Salade Grecque')).toBeInTheDocument();
  });

  test('salad prices are within expected range', () => {
    const prices = screen.getAllByTestId('salade-price');
    prices.forEach(price => {
      const priceValue = parseInt(price.textContent!.replace('€', ''));
      expect(priceValue).toBeGreaterThanOrEqual(13);
      expect(priceValue).toBeLessThanOrEqual(17);
    });
  });

  test('menu columns are rendered correctly', () => {
    const columns = screen.getAllByTestId('menu-column');
    expect(columns).toHaveLength(3); // Le menu est divisé en 3 colonnes
  });
}); 