import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BurgersPage from '../BurgersPage';

describe('BurgersPage Component', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <BurgersPage />
      </BrowserRouter>
    );
  });

  test('renders page title', () => {
    expect(screen.getByText('New York Café')).toBeInTheDocument();
    expect(screen.getByText('HAMBURGERS & TARTARES')).toBeInTheDocument();
    expect(screen.getByText('Saveurs & Raffinement')).toBeInTheDocument();
  });

  test('renders section titles', () => {
    expect(screen.getByText('NOS HAMBURGERS')).toBeInTheDocument();
    expect(screen.getByText('NOS TARTARES')).toBeInTheDocument();
  });

  test('renders all burger items', () => {
    const burgerItems = screen.getAllByTestId('burger-item');
    expect(burgerItems.length).toBe(6); // Basé sur les données du composant
  });

  test('renders all tartare items', () => {
    const tartareItems = screen.getAllByTestId('tartare-item');
    expect(tartareItems.length).toBe(6); // Basé sur les données du composant
  });

  test('renders items with prices', () => {
    const items = [...screen.getAllByTestId('burger-item'), ...screen.getAllByTestId('tartare-item')];
    items.forEach(item => {
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
    expect(screen.getByTestId('burgers-container')).toHaveClass('burgers-page-container');
  });

  test('menu card has correct styling', () => {
    expect(screen.getByTestId('burgers-card')).toHaveClass('burgers-menu-card');
  });

  test('items have descriptions', () => {
    const descriptions = [...screen.getAllByTestId('burger-description'), ...screen.getAllByTestId('tartare-description')];
    expect(descriptions.length).toBeGreaterThan(0);
    descriptions.forEach(description => {
      expect(description).not.toBeEmpty();
    });
  });

  test('burger items have correct structure', () => {
    const burgerItems = screen.getAllByTestId('burger-item');
    burgerItems.forEach(item => {
      expect(item.querySelector('.burger-name')).toBeInTheDocument();
      expect(item.querySelector('.burger-price')).toBeInTheDocument();
      expect(item.querySelector('.burger-description')).toBeInTheDocument();
    });
  });

  test('tartare items have correct structure', () => {
    const tartareItems = screen.getAllByTestId('tartare-item');
    tartareItems.forEach(item => {
      expect(item.querySelector('.tartare-name')).toBeInTheDocument();
      expect(item.querySelector('.tartare-price')).toBeInTheDocument();
      expect(item.querySelector('.tartare-description')).toBeInTheDocument();
    });
  });

  test('specific burgers are present', () => {
    expect(screen.getByText('Classic NY Burger')).toBeInTheDocument();
    expect(screen.getByText('Cheese Lover')).toBeInTheDocument();
    expect(screen.getByText('Veggie Dream')).toBeInTheDocument();
  });

  test('specific tartares are present', () => {
    expect(screen.getByText('Tartare Classic')).toBeInTheDocument();
    expect(screen.getByText('Tartare Italien')).toBeInTheDocument();
    expect(screen.getByText('Tartare de Saumon')).toBeInTheDocument();
  });

  test('burger prices are within expected range', () => {
    const prices = screen.getAllByTestId('burger-price');
    prices.forEach(price => {
      const priceValue = parseInt(price.textContent!.replace('€', ''));
      expect(priceValue).toBeGreaterThanOrEqual(15);
      expect(priceValue).toBeLessThanOrEqual(17);
    });
  });

  test('tartare prices are within expected range', () => {
    const prices = screen.getAllByTestId('tartare-price');
    prices.forEach(price => {
      const priceValue = parseInt(price.textContent!.replace('€', ''));
      expect(priceValue).toBeGreaterThanOrEqual(18);
      expect(priceValue).toBeLessThanOrEqual(21);
    });
  });
}); 