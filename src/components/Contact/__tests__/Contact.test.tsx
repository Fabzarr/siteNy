import React from 'react';
import { render, screen } from '@testing-library/react';
import Contact from '../Contact';

describe('Contact Component', () => {
  beforeEach(() => {
    render(<Contact />);
  });

  test('renders contact section with title', () => {
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  test('displays address information', () => {
    expect(screen.getByText('68 rue Mouffetard')).toBeInTheDocument();
    expect(screen.getByText('75005 Paris')).toBeInTheDocument();
    expect(screen.getByText('Métro ligne 7 - Place Monge')).toBeInTheDocument();
  });

  test('displays phone numbers', () => {
    expect(screen.getByText(/Fixe : 01 45 35 48 43/)).toBeInTheDocument();
    expect(screen.getByText(/Mobile : 06 03 60 02 29/)).toBeInTheDocument();
  });

  test('displays opening hours', () => {
    expect(screen.getByText('Dimanche au jeudi : 16h00 - 2h00')).toBeInTheDocument();
    expect(screen.getByText('Vendredi & samedi : 16h00 - 5h00')).toBeInTheDocument();
    expect(screen.getByText('Happy Hour : 16h00 - 21h00')).toBeInTheDocument();
    expect(screen.getByText('Karaoké : tous les jours dès 21h00')).toBeInTheDocument();
  });

  test('renders all contact cards', () => {
    const cards = screen.getAllByTestId('contact-card');
    expect(cards).toHaveLength(3);
  });

  test('renders all contact icons', () => {
    expect(screen.getByTestId('map-icon')).toBeInTheDocument();
    expect(screen.getByTestId('phone-icon')).toBeInTheDocument();
    expect(screen.getByTestId('clock-icon')).toBeInTheDocument();
  });
}); 