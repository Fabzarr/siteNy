import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ViandesPage from '../ViandesPage';

describe('ViandesPage Component', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <ViandesPage />
      </BrowserRouter>
    );
  });

  test('renders page title', () => {
    expect(screen.getByText('New York Café')).toBeInTheDocument();
    expect(screen.getByText('VIANDES & POISSONS')).toBeInTheDocument();
    expect(screen.getByText('Terre & Mer')).toBeInTheDocument();
  });

  test('renders all menu sections', () => {
    expect(screen.getByText('NOS VIANDES')).toBeInTheDocument();
    expect(screen.getByText('NOS POISSONS')).toBeInTheDocument();
  });

  test('renders menu items with prices', () => {
    const menuItems = screen.getAllByTestId('menu-item');
    expect(menuItems.length).toBeGreaterThan(0);

    menuItems.forEach(item => {
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
    expect(screen.getByTestId('viandes-container')).toHaveClass('viandes-page-container');
  });

  test('menu card has correct styling', () => {
    expect(screen.getByTestId('viandes-card')).toHaveClass('viandes-menu-card');
  });

  test('sections have correct headers', () => {
    const headers = screen.getAllByRole('heading', { level: 3 });
    expect(headers.length).toBeGreaterThan(0);
    headers.forEach(header => {
      expect(header).toHaveClass('section-title');
    });
  });

  test('menu items have descriptions', () => {
    const descriptions = screen.getAllByTestId('menu-description');
    expect(descriptions.length).toBeGreaterThan(0);
    descriptions.forEach(description => {
      expect(description).not.toBeEmpty();
    });
  });

  test('menu items have correct structure', () => {
    const menuItems = screen.getAllByTestId('menu-item');
    menuItems.forEach(item => {
      expect(item.querySelector('.menu-name')).toBeInTheDocument();
      expect(item.querySelector('.menu-price')).toBeInTheDocument();
      expect(item.querySelector('.menu-description')).toBeInTheDocument();
    });
  });

  test('viandes section contains correct number of items', () => {
    const viandesItems = screen.getAllByTestId('viande-item');
    expect(viandesItems).toHaveLength(6); // Basé sur les données du composant
  });

  test('poissons section contains correct number of items', () => {
    const poissonsItems = screen.getAllByTestId('poisson-item');
    expect(poissonsItems).toHaveLength(6); // Basé sur les données du composant
  });
}); 