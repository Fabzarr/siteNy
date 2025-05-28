import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import DessertsPage from '../DessertsPage';

describe('DessertsPage Component', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <DessertsPage />
      </BrowserRouter>
    );
  });

  test('renders page title', () => {
    expect(screen.getByText('New York Café')).toBeInTheDocument();
    expect(screen.getByText('NOS DESSERTS')).toBeInTheDocument();
    expect(screen.getByText('Douceurs & Gourmandises')).toBeInTheDocument();
  });

  test('renders all dessert items', () => {
    const dessertItems = screen.getAllByTestId('dessert-item');
    expect(dessertItems.length).toBe(12); // Basé sur les données du composant
  });

  test('renders dessert items with prices', () => {
    const dessertItems = screen.getAllByTestId('dessert-item');
    dessertItems.forEach(item => {
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
    expect(screen.getByTestId('desserts-container')).toHaveClass('desserts-page-container');
  });

  test('menu card has correct styling', () => {
    expect(screen.getByTestId('desserts-card')).toHaveClass('desserts-menu-card');
  });

  test('dessert items have descriptions', () => {
    const descriptions = screen.getAllByTestId('dessert-description');
    expect(descriptions.length).toBeGreaterThan(0);
    descriptions.forEach(description => {
      expect(description).not.toBeEmpty();
    });
  });

  test('dessert items have correct structure', () => {
    const dessertItems = screen.getAllByTestId('dessert-item');
    dessertItems.forEach(item => {
      expect(item.querySelector('.dessert-name')).toBeInTheDocument();
      expect(item.querySelector('.dessert-price')).toBeInTheDocument();
      expect(item.querySelector('.dessert-description')).toBeInTheDocument();
    });
  });

  test('specific desserts are present', () => {
    expect(screen.getByText('Tiramisu Maison')).toBeInTheDocument();
    expect(screen.getByText('New York Cheesecake')).toBeInTheDocument();
    expect(screen.getByText('Fondant au Chocolat')).toBeInTheDocument();
    expect(screen.getByText('Crème Brûlée')).toBeInTheDocument();
  });

  test('dessert prices are within expected range', () => {
    const prices = screen.getAllByTestId('dessert-price');
    prices.forEach(price => {
      const priceValue = parseInt(price.textContent!.replace('€', ''));
      expect(priceValue).toBeGreaterThanOrEqual(8);
      expect(priceValue).toBeLessThanOrEqual(12);
    });
  });
}); 