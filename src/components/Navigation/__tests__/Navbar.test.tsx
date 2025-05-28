import { render, screen, fireEvent } from '../../../utils/test-utils';
import Navbar from '../Navbar';

describe('Navbar Component', () => {
  beforeEach(() => {
    render(<Navbar />);
  });

  test('renders logo/brand name', () => {
    const brandElement = screen.getByText(/new york café/i);
    expect(brandElement).toBeInTheDocument();
    expect(brandElement).toHaveClass('navbar-logo');
  });

  test('renders navigation links', () => {
    expect(screen.getByText(/accueil/i)).toBeInTheDocument();
    expect(screen.getByText(/à propos/i)).toBeInTheDocument();
    expect(screen.getByText(/carte/i)).toBeInTheDocument();
    expect(screen.getByText(/contact/i)).toBeInTheDocument();
  });

  test('mobile menu toggle works', () => {
    const menuButton = screen.getByRole('button', { name: /menu/i });
    expect(menuButton).toBeInTheDocument();
    
    fireEvent.click(menuButton);
    const mobileMenu = screen.getByTestId('navbar-menu');
    expect(mobileMenu).toHaveClass('open');

    fireEvent.click(menuButton);
    expect(mobileMenu).not.toHaveClass('open');
  });

  test('navigation links have correct hrefs', () => {
    const links = screen.getAllByRole('link');
    const expectedPaths = ['/', '/a-propos', '/carte', '/contact'];
    
    expectedPaths.forEach(path => {
      expect(links.some(link => link.getAttribute('href') === path)).toBeTruthy();
    });
  });

  test('hamburger button has correct styling', () => {
    const hamburger = screen.getByRole('button', { name: /menu/i });
    expect(hamburger).toHaveClass('hamburger');
  });

  test('navbar has correct styling', () => {
    const navbar = screen.getByRole('navigation');
    expect(navbar).toHaveClass('navbar');
  });

  test('navbar menu has correct styling', () => {
    const menu = screen.getByTestId('navbar-menu');
    expect(menu).toHaveClass('navbar-menu');
  });

  test('navbar brand has correct styling', () => {
    const brand = screen.getByTestId('navbar-brand');
    expect(brand).toHaveClass('navbar-brand');
  });

  test('active link has correct styling', () => {
    const links = screen.getAllByRole('link');
    const homeLink = links.find(link => link.getAttribute('href') === '/');
    expect(homeLink).toHaveClass('active');
  });
}); 