import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

describe('Footer Component', () => {
  beforeEach(() => {
    render(<Footer />);
  });

  test('renders footer title', () => {
    expect(screen.getByText('New York Café')).toBeInTheDocument();
  });

  test('renders social media links', () => {
    const socialLinks = screen.getAllByRole('link');
    expect(socialLinks).toHaveLength(3);

    const [facebook, instagram, twitter] = socialLinks;
    expect(facebook).toHaveAttribute('href', 'https://facebook.com');
    expect(instagram).toHaveAttribute('href', 'https://instagram.com');
    expect(twitter).toHaveAttribute('href', 'https://twitter.com');
  });

  test('renders copyright notice with current year', () => {
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(`© ${currentYear} - Tous droits réservés`)).toBeInTheDocument();
  });

  test('renders contact information', () => {
    expect(screen.getByText('01 23 45 67 89 - contact@newyorkcafe.fr')).toBeInTheDocument();
  });

  test('social links open in new tab', () => {
    const socialLinks = screen.getAllByRole('link');
    socialLinks.forEach(link => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  test('renders all footer sections', () => {
    const footerSections = screen.getAllByTestId('footer-section');
    expect(footerSections).toHaveLength(3);
  });
}); 