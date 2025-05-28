import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import VinsPage from '../VinsPage';

describe('VinsPage Component', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <VinsPage />
      </BrowserRouter>
    );
  });

  test('renders page title', () => {
    expect(screen.getByText('New York Café')).toBeInTheDocument();
    expect(screen.getByText('CARTE DES VINS')).toBeInTheDocument();
  });

  test('renders all wine sections', () => {
    expect(screen.getByText('CHAMPAGNES')).toBeInTheDocument();
    expect(screen.getByText('VINS ROUGES')).toBeInTheDocument();
    expect(screen.getByText('VINS BLANCS')).toBeInTheDocument();
    expect(screen.getByText('VINS ROSÉS')).toBeInTheDocument();
  });

  test('renders wine items with prices', () => {
    const wineItems = screen.getAllByTestId('wine-item');
    expect(wineItems.length).toBeGreaterThan(0);

    wineItems.forEach(item => {
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
    expect(screen.getByTestId('vins-container')).toHaveClass('vins-page-container');
  });

  test('menu card has correct styling', () => {
    expect(screen.getByTestId('vins-card')).toHaveClass('vins-menu-card');
  });

  test('sections have correct headers', () => {
    const headers = screen.getAllByRole('heading', { level: 3 });
    expect(headers.length).toBeGreaterThan(0);
    headers.forEach(header => {
      expect(header).toHaveClass('section-title');
    });
  });

  test('wine items have descriptions', () => {
    const descriptions = screen.getAllByTestId('wine-description');
    expect(descriptions.length).toBeGreaterThan(0);
    descriptions.forEach(description => {
      expect(description).not.toBeEmpty();
    });
  });

  test('wine items have correct structure', () => {
    const wineItems = screen.getAllByTestId('wine-item');
    wineItems.forEach(item => {
      expect(item.querySelector('.wine-name')).toBeInTheDocument();
      expect(item.querySelector('.wine-price')).toBeInTheDocument();
      expect(item.querySelector('.wine-description')).toBeInTheDocument();
    });
  });
}); 