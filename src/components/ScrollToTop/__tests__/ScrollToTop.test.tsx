import { render, screen, fireEvent } from '../../../utils/test-utils';
import ScrollToTop from '../ScrollToTop';

describe('ScrollToTop Component', () => {
  const mockScrollTo = jest.fn();

  beforeEach(() => {
    // Mock window.scrollTo
    global.scrollTo = mockScrollTo;
    // Mock window.pageYOffset
    Object.defineProperty(window, 'pageYOffset', {
      value: 1000,
      writable: true
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('button is visible when scrolled down', () => {
    render(<ScrollToTop />);
    const button = screen.getByRole('button');
    expect(button).toBeVisible();
  });

  test('clicking button scrolls to top', () => {
    render(<ScrollToTop />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(mockScrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth'
    });
  });

  test('button is hidden when at top of page', () => {
    // Simuler le haut de la page
    Object.defineProperty(window, 'pageYOffset', {
      value: 0,
      writable: true
    });
    
    render(<ScrollToTop />);
    const button = screen.getByRole('button');
    expect(button).not.toBeVisible();
  });

  test('button has correct accessibility attributes', () => {
    render(<ScrollToTop />);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Retour en haut');
  });

  test('button has correct styling when visible', () => {
    render(<ScrollToTop />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('scroll-to-top');
  });

  test('button visibility changes on scroll', () => {
    render(<ScrollToTop />);
    const button = screen.getByRole('button');
    
    // Simuler un défilement vers le bas
    Object.defineProperty(window, 'pageYOffset', {
      value: 500,
      writable: true
    });
    fireEvent.scroll(window);
    expect(button).toBeVisible();

    // Simuler un retour en haut
    Object.defineProperty(window, 'pageYOffset', {
      value: 0,
      writable: true
    });
    fireEvent.scroll(window);
    expect(button).not.toBeVisible();
  });
}); 