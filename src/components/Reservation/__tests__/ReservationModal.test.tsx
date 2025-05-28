import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ReservationModal from '../ReservationModal';

describe('ReservationModal Component', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    render(<ReservationModal isOpen={true} onClose={mockOnClose} />);
  });

  test('renders reservation form initially', () => {
    expect(screen.getByText('Réservation')).toBeInTheDocument();
    expect(screen.getByLabelText('Prénom')).toBeInTheDocument();
    expect(screen.getByLabelText('Nom')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Numéro de téléphone')).toBeInTheDocument();
    expect(screen.getByLabelText('Nombre de personnes')).toBeInTheDocument();
    expect(screen.getByLabelText('Date')).toBeInTheDocument();
    expect(screen.getByLabelText('Heure')).toBeInTheDocument();
  });

  test('displays welcome message', () => {
    expect(screen.getByText("C'est votre anniversaire ?")).toBeInTheDocument();
    expect(screen.getByText('06.03.60.02.29 ou 01.45.35.48.43')).toBeInTheDocument();
  });

  test('allows form submission with valid data', async () => {
    const user = userEvent.setup();

    await user.type(screen.getByLabelText('Prénom'), 'John');
    await user.type(screen.getByLabelText('Nom'), 'Doe');
    await user.type(screen.getByLabelText('Email'), 'john@example.com');
    await user.type(screen.getByLabelText('Numéro de téléphone'), '0123456789');
    
    const submitButton = screen.getByText('Continuer');
    await user.click(submitButton);

    expect(screen.getByText('Confirmation de réservation')).toBeInTheDocument();
  });

  test('displays confirmation modal with correct data', async () => {
    const user = userEvent.setup();

    await user.type(screen.getByLabelText('Prénom'), 'John');
    await user.type(screen.getByLabelText('Nom'), 'Doe');
    await user.type(screen.getByLabelText('Email'), 'john@example.com');
    await user.type(screen.getByLabelText('Numéro de téléphone'), '0123456789');
    
    await user.click(screen.getByText('Continuer'));

    expect(screen.getByText('John Doe', { exact: false })).toBeInTheDocument();
    expect(screen.getByText('john@example.com', { exact: false })).toBeInTheDocument();
    expect(screen.getByText('0123456789', { exact: false })).toBeInTheDocument();
  });

  test('closes modal when cancel button is clicked', async () => {
    const user = userEvent.setup();
    await user.click(screen.getByText('Annuler'));
    expect(mockOnClose).toHaveBeenCalled();
  });

  test('returns to form when modify button is clicked in confirmation', async () => {
    const user = userEvent.setup();

    await user.type(screen.getByLabelText('Prénom'), 'John');
    await user.type(screen.getByLabelText('Nom'), 'Doe');
    await user.type(screen.getByLabelText('Email'), 'john@example.com');
    await user.type(screen.getByLabelText('Numéro de téléphone'), '0123456789');
    
    await user.click(screen.getByText('Continuer'));
    await user.click(screen.getByText('Modifier'));

    expect(screen.getByLabelText('Prénom')).toBeInTheDocument();
  });

  test('validates required fields', async () => {
    const user = userEvent.setup();
    const submitButton = screen.getByText('Continuer');
    await user.click(submitButton);

    // HTML5 validation will prevent form submission and show validation messages
    expect(screen.getByLabelText('Prénom')).toBeInvalid();
    expect(screen.getByLabelText('Nom')).toBeInvalid();
    expect(screen.getByLabelText('Email')).toBeInvalid();
    expect(screen.getByLabelText('Numéro de téléphone')).toBeInvalid();
  });
}); 