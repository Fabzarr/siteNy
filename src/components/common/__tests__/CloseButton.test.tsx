import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import CloseButton from '../CloseButton';

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

describe('CloseButton Component', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <CloseButton />
      </BrowserRouter>
    );
    mockNavigate.mockClear();
  });

  test('renders close button with correct accessibility label', () => {
    const button = screen.getByRole('button', { name: "Retourner à l'accueil" });
    expect(button).toBeInTheDocument();
  });

  test('has correct CSS class', () => {
    const button = screen.getByRole('button');
    expect(button).toHaveClass('close-button');
  });

  test('navigates to home when clicked', async () => {
    const user = userEvent.setup();
    const button = screen.getByRole('button');
    
    await user.click(button);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  test('is visible and clickable', () => {
    const button = screen.getByRole('button');
    expect(button).toBeVisible();
    expect(button).toBeEnabled();
  });
}); 