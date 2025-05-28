import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import SideMenu from '../SideMenu';

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useLocation: () => ({ pathname: '/carte' })
}));

describe('SideMenu Component', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <SideMenu />
      </BrowserRouter>
    );
    mockNavigate.mockClear();
  });

  test('renders menu title', () => {
    expect(screen.getByText('Notre Carte')).toBeInTheDocument();
  });

  test('renders all menu sections', () => {
    expect(screen.getByText('Entrées')).toBeInTheDocument();
    expect(screen.getByText('Plats')).toBeInTheDocument();
    expect(screen.getByText('Desserts & Vins')).toBeInTheDocument();
  });

  test('renders menu items in each section', () => {
    expect(screen.getByText('PETITES FAIMS')).toBeInTheDocument();
    expect(screen.getByText('A PARTAGER')).toBeInTheDocument();
    expect(screen.getByText('NOS PIZZAS')).toBeInTheDocument();
    expect(screen.getByText('NOS BELLES SALADES')).toBeInTheDocument();
    expect(screen.getByText('NOS PÂTES')).toBeInTheDocument();
    expect(screen.getByText('NOS HAMBURGERS & TARTARE')).toBeInTheDocument();
    expect(screen.getByText('NOS VIANDES & POISSON')).toBeInTheDocument();
    expect(screen.getByText('NOS DESSERTS')).toBeInTheDocument();
    expect(screen.getByText('LA CARTE DES VINS')).toBeInTheDocument();
  });

  test('mobile menu toggle works', () => {
    const menuButton = screen.getByText('Menu Navigation');
    const sideMenu = screen.getByTestId('side-menu');

    fireEvent.click(menuButton);
    expect(sideMenu).toHaveClass('open');

    fireEvent.click(menuButton);
    expect(sideMenu).not.toHaveClass('open');
  });

  test('menu items have correct data attributes', () => {
    const menuItems = screen.getAllByRole('link');
    menuItems.forEach(item => {
      expect(item).toHaveAttribute('data-section-id');
    });
  });

  test('clicking menu items triggers navigation', async () => {
    const user = userEvent.setup();
    const pizzaLink = screen.getByText('NOS PIZZAS');
    
    await user.click(pizzaLink);
    expect(mockNavigate).toHaveBeenCalled();
  });

  test('menu has correct styling', () => {
    const sideMenu = screen.getByTestId('side-menu');
    expect(sideMenu).toHaveClass('side-menu');
  });

  test('arrow icon changes direction when menu is toggled', () => {
    const menuButton = screen.getByText('Menu Navigation');
    const arrow = screen.getByText('').closest('span');

    fireEvent.click(menuButton);
    expect(arrow).toHaveClass('up');

    fireEvent.click(menuButton);
    expect(arrow).not.toHaveClass('up');
  });
}); 