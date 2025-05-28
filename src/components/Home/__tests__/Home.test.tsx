import { render, screen } from '../../../utils/test-utils';
import Home from '../Home';

describe('Home Component', () => {
  beforeEach(() => {
    render(<Home />);
  });

  test('renders main heading', () => {
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/new york café/i);
  });

  test('renders feature sections', () => {
    expect(screen.getByText(/karaoke/i)).toBeInTheDocument();
    expect(screen.getByText(/carte/i)).toBeInTheDocument();
    expect(screen.getByText(/événements/i)).toBeInTheDocument();
  });

  test('renders navigation links', () => {
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
    expect(links.some(link => link.getAttribute('href') === '/karaoke')).toBeTruthy();
    expect(links.some(link => link.getAttribute('href') === '/carte')).toBeTruthy();
    expect(links.some(link => link.getAttribute('href') === '/evenements')).toBeTruthy();
  });

  test('renders feature icons', () => {
    expect(screen.getByTestId('icon-karaoke')).toBeInTheDocument();
    expect(screen.getByTestId('icon-carte')).toBeInTheDocument();
    expect(screen.getByTestId('icon-evenements')).toBeInTheDocument();
  });

  test('renders feature descriptions', () => {
    expect(screen.getByText(/découvrez notre ambiance/i)).toBeInTheDocument();
    expect(screen.getByText(/explorez notre menu/i)).toBeInTheDocument();
    expect(screen.getByText(/participez à nos soirées/i)).toBeInTheDocument();
  });

  test('renders with correct styling', () => {
    const homeContainer = screen.getByTestId('home-container');
    expect(homeContainer).toHaveClass('home-container');
  });

  test('renders hero section', () => {
    const heroSection = screen.getByTestId('hero-section');
    expect(heroSection).toBeInTheDocument();
    expect(heroSection).toHaveClass('hero-section');
  });

  test('renders features section', () => {
    const featuresSection = screen.getByTestId('features-section');
    expect(featuresSection).toBeInTheDocument();
    expect(featuresSection).toHaveClass('features-section');
  });
}); 