import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BoissonsPage from '../BoissonsPage';

describe('BoissonsPage Component', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <BoissonsPage />
      </BrowserRouter>
    );
  });

  test('renders page title', () => {
    expect(screen.getByText('New York Café')).toBeInTheDocument();
    expect(screen.getByText('CARTE DES BOISSONS')).toBeInTheDocument();
  });

  test('renders all drink sections', () => {
    expect(screen.getByText('SOFTS & JUS DE FRUITS')).toBeInTheDocument();
    expect(screen.getByText('EAUX')).toBeInTheDocument();
    expect(screen.getByText('BIÈRES')).toBeInTheDocument();
    expect(screen.getByText('APÉRITIFS')).toBeInTheDocument();
    expect(screen.getByText('COCKTAILS')).toBeInTheDocument();
  });

  test('renders drink items with prices', () => {
    const drinkItems = screen.getAllByTestId('drink-item');
    expect(drinkItems.length).toBeGreaterThan(0);

    drinkItems.forEach(item => {
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
    expect(screen.getByTestId('boissons-container')).toHaveClass('boissons-page-container');
  });

  test('menu card has correct styling', () => {
    expect(screen.getByTestId('boissons-card')).toHaveClass('boissons-menu-card');
  });

  test('sections have correct headers', () => {
    const headers = screen.getAllByRole('heading', { level: 3 });
    expect(headers.length).toBeGreaterThan(0);
    headers.forEach(header => {
      expect(header).toHaveClass('section-title');
    });
  });

  test('drink items have descriptions', () => {
    const descriptions = screen.getAllByTestId('drink-description');
    expect(descriptions.length).toBeGreaterThan(0);
    descriptions.forEach(description => {
      expect(description).not.toBeEmpty();
    });
  });
}); 