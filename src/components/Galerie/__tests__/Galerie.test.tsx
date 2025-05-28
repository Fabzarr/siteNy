import React from 'react';
import { render, screen } from '@testing-library/react';
import Galerie from '../Galerie';

describe('Galerie Component', () => {
  beforeEach(() => {
    render(<Galerie />);
  });

  test('renders gallery title', () => {
    expect(screen.getByText('Notre Galerie')).toBeInTheDocument();
  });

  test('renders all gallery items', () => {
    const items = screen.getAllByTestId('galerie-item');
    expect(items).toHaveLength(6);
  });

  test('displays all image placeholders', () => {
    const placeholders = screen.getAllByTestId('image-placeholder');
    expect(placeholders).toHaveLength(6);
    expect(screen.getByText('Restaurant')).toBeInTheDocument();
    expect(screen.getByText('Bar')).toBeInTheDocument();
    expect(screen.getByText('Karaoké')).toBeInTheDocument();
    expect(screen.getByText('Soirée')).toBeInTheDocument();
    expect(screen.getByText('Cuisine')).toBeInTheDocument();
    expect(screen.getByText('Événements')).toBeInTheDocument();
  });

  test('displays all image descriptions', () => {
    expect(screen.getByText('Intérieur du restaurant')).toBeInTheDocument();
    expect(screen.getByText('Bar et cocktails')).toBeInTheDocument();
    expect(screen.getByText('Espace karaoké')).toBeInTheDocument();
    expect(screen.getByText('Ambiance soirée')).toBeInTheDocument();
    expect(screen.getByText('Plats signature')).toBeInTheDocument();
    expect(screen.getByText('Événements spéciaux')).toBeInTheDocument();
  });

  test('renders with animation wrapper', () => {
    expect(screen.getByTestId('galerie-container')).toBeInTheDocument();
  });
}); 