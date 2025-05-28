import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PizzaPage from '../PizzaPage';

describe('PizzaPage Component', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <PizzaPage />
      </BrowserRouter>
    );
  });

  test('renders page title', () => {
    expect(screen.getByText('New York Café')).toBeInTheDocument();
    expect(screen.getByText('NOS PIZZAS')).toBeInTheDocument();
  });

  test('renders all pizza items', () => {
    const pizzaItems = screen.getAllByTestId('pizza-item');
    expect(pizzaItems.length).toBe(19); // Basé sur les données du composant
  });

  test('renders pizza items with prices', () => {
    const pizzaItems = screen.getAllByTestId('pizza-item');
    pizzaItems.forEach(item => {
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
    expect(screen.getByTestId('pizza-container')).toHaveClass('pizza-page-container');
  });

  test('menu card has correct styling', () => {
    expect(screen.getByTestId('pizza-card')).toHaveClass('pizza-menu-card');
  });

  test('pizza items have descriptions', () => {
    const descriptions = screen.getAllByTestId('pizza-description');
    expect(descriptions.length).toBeGreaterThan(0);
    descriptions.forEach(description => {
      expect(description).not.toBeEmpty();
    });
  });

  test('pizza items have correct structure', () => {
    const pizzaItems = screen.getAllByTestId('pizza-item');
    pizzaItems.forEach(item => {
      expect(item.querySelector('.pizza-name')).toBeInTheDocument();
      expect(item.querySelector('.pizza-price')).toBeInTheDocument();
      expect(item.querySelector('.pizza-description')).toBeInTheDocument();
    });
  });

  test('specific pizzas are present', () => {
    expect(screen.getByText('Margherita')).toBeInTheDocument();
    expect(screen.getByText('Regina')).toBeInTheDocument();
    expect(screen.getByText('Quattro Formaggi')).toBeInTheDocument();
    expect(screen.getByText('Napolitaine')).toBeInTheDocument();
  });

  test('pizza prices are within expected range', () => {
    const prices = screen.getAllByTestId('pizza-price');
    prices.forEach(price => {
      const priceValue = parseInt(price.textContent!.replace('€', ''));
      expect(priceValue).toBeGreaterThanOrEqual(9);
      expect(priceValue).toBeLessThanOrEqual(13);
    });
  });
}); 