import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import ReservationModal from '../ReservationModal';

// Mock fetch
global.fetch = vi.fn();

describe('ReservationModal Component', () => {
  const mockOnClose = vi.fn();
  
  beforeEach(() => {
    mockOnClose.mockClear();
    vi.clearAllMocks();
  });

  test('renders modal when isOpen is true', () => {
    render(<ReservationModal isOpen={true} onClose={mockOnClose} />);
    
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(/réservation/i)).toBeInTheDocument();
  });

  test('does not render when isOpen is false', () => {
    render(<ReservationModal isOpen={false} onClose={mockOnClose} />);
    
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  test('renders all form fields', () => {
    render(<ReservationModal isOpen={true} onClose={mockOnClose} />);
    
    expect(screen.getByLabelText(/nom/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/téléphone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/heure/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/nombre de personnes/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
  });

  test('validates required fields', async () => {
    const user = userEvent.setup();
    render(<ReservationModal isOpen={true} onClose={mockOnClose} />);
    
    const submitBtn = screen.getByRole('button', { name: /réserver/i });
    
    await user.click(submitBtn);
    
    expect(screen.getByText(/nom est requis/i)).toBeInTheDocument();
    expect(screen.getByText(/email est requis/i)).toBeInTheDocument();
    expect(screen.getByText(/téléphone est requis/i)).toBeInTheDocument();
  });

  test('validates email format', async () => {
    const user = userEvent.setup();
    render(<ReservationModal isOpen={true} onClose={mockOnClose} />);
    
    const emailInput = screen.getByLabelText(/email/i);
    
    await user.type(emailInput, 'invalid-email');
    await user.tab(); // Trigger blur
    
    expect(screen.getByText(/email invalide/i)).toBeInTheDocument();
  });

  test('validates phone number format', async () => {
    const user = userEvent.setup();
    render(<ReservationModal isOpen={true} onClose={mockOnClose} />);
    
    const phoneInput = screen.getByLabelText(/téléphone/i);
    
    await user.type(phoneInput, '123');
    await user.tab();
    
    expect(screen.getByText(/numéro de téléphone invalide/i)).toBeInTheDocument();
  });

  test('validates date is not in the past', async () => {
    const user = userEvent.setup();
    render(<ReservationModal isOpen={true} onClose={mockOnClose} />);
    
    const dateInput = screen.getByLabelText(/date/i);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    await user.type(dateInput, yesterday.toISOString().split('T')[0]);
    await user.tab();
    
    expect(screen.getByText(/date ne peut pas être dans le passé/i)).toBeInTheDocument();
  });

  test('validates number of guests', async () => {
    const user = userEvent.setup();
    render(<ReservationModal isOpen={true} onClose={mockOnClose} />);
    
    const guestsInput = screen.getByLabelText(/nombre de personnes/i);
    
    await user.clear(guestsInput);
    await user.type(guestsInput, '0');
    await user.tab();
    
    expect(screen.getByText(/minimum 1 personne/i)).toBeInTheDocument();
    
    await user.clear(guestsInput);
    await user.type(guestsInput, '21');
    await user.tab();
    
    expect(screen.getByText(/maximum 20 personnes/i)).toBeInTheDocument();
  });

  test('submits form with valid data', async () => {
    const user = userEvent.setup();
    const mockResponse = { ok: true, json: () => Promise.resolve({ success: true }) };
    (global.fetch as any).mockResolvedValueOnce(mockResponse);
    
    render(<ReservationModal isOpen={true} onClose={mockOnClose} />);
    
    // Remplir le formulaire
    await user.type(screen.getByLabelText(/nom/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/téléphone/i), '0123456789');
    
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    await user.type(screen.getByLabelText(/date/i), tomorrow.toISOString().split('T')[0]);
    
    await user.selectOptions(screen.getByLabelText(/heure/i), '19:00');
    await user.clear(screen.getByLabelText(/nombre de personnes/i));
    await user.type(screen.getByLabelText(/nombre de personnes/i), '4');
    
    await user.click(screen.getByRole('button', { name: /réserver/i }));
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/reservations', expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: expect.stringContaining('John Doe')
      }));
    });
  });

  test('handles submission error', async () => {
    const user = userEvent.setup();
    const mockResponse = { ok: false, json: () => Promise.resolve({ error: 'Erreur serveur' }) };
    (global.fetch as any).mockResolvedValueOnce(mockResponse);
    
    render(<ReservationModal isOpen={true} onClose={mockOnClose} />);
    
    // Remplir avec données valides
    await user.type(screen.getByLabelText(/nom/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/téléphone/i), '0123456789');
    
    await user.click(screen.getByRole('button', { name: /réserver/i }));
    
    await waitFor(() => {
      expect(screen.getByText(/erreur serveur/i)).toBeInTheDocument();
    });
  });

  test('closes modal on close button click', async () => {
    const user = userEvent.setup();
    render(<ReservationModal isOpen={true} onClose={mockOnClose} />);
    
    const closeBtn = screen.getByLabelText(/fermer/i);
    await user.click(closeBtn);
    
    expect(mockOnClose).toHaveBeenCalled();
  });

  test('closes modal on overlay click', async () => {
    const user = userEvent.setup();
    render(<ReservationModal isOpen={true} onClose={mockOnClose} />);
    
    const overlay = screen.getByTestId('modal-overlay');
    await user.click(overlay);
    
    expect(mockOnClose).toHaveBeenCalled();
  });

  test('does not close modal on content click', async () => {
    const user = userEvent.setup();
    render(<ReservationModal isOpen={true} onClose={mockOnClose} />);
    
    const content = screen.getByTestId('modal-content');
    await user.click(content);
    
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  test('handles escape key', () => {
    render(<ReservationModal isOpen={true} onClose={mockOnClose} />);
    
    fireEvent.keyDown(document, { key: 'Escape' });
    
    expect(mockOnClose).toHaveBeenCalled();
  });

  test('shows loading state during submission', async () => {
    const user = userEvent.setup();
    const mockResponse = { ok: true, json: () => new Promise(resolve => setTimeout(resolve, 100)) };
    (global.fetch as any).mockResolvedValueOnce(mockResponse);
    
    render(<ReservationModal isOpen={true} onClose={mockOnClose} />);
    
    // Remplir avec données valides
    await user.type(screen.getByLabelText(/nom/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/téléphone/i), '0123456789');
    
    await user.click(screen.getByRole('button', { name: /réserver/i }));
    
    expect(screen.getByText(/envoi en cours/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /réserver/i })).toBeDisabled();
  });

  test('is accessible', () => {
    render(<ReservationModal isOpen={true} onClose={mockOnClose} />);
    
    const modal = screen.getByRole('dialog');
    expect(modal).toHaveAttribute('aria-labelledby');
    expect(modal).toHaveAttribute('aria-describedby');
    
    const closeBtn = screen.getByLabelText(/fermer/i);
    expect(closeBtn).toHaveAttribute('aria-label');
  });
}); 