import { render, screen } from '../../../utils/test-utils';
import Karaoke from '../Karaoke';

describe('Karaoke Component', () => {
  beforeEach(() => {
    render(<Karaoke />);
  });

  test('renders main heading', () => {
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/notre karaoké/i);
  });

  test('renders subtitle', () => {
    const subtitle = screen.getByText(/une expérience musicale unique à paris/i);
    expect(subtitle).toBeInTheDocument();
    expect(subtitle).toHaveClass('subtitle');
  });

  test('renders horaires section', () => {
    expect(screen.getByText(/horaires/i)).toBeInTheDocument();
    expect(screen.getByText(/du dimanche au jeudi/i)).toBeInTheDocument();
    expect(screen.getByText(/vendredi & samedi/i)).toBeInTheDocument();
    expect(screen.getByText(/ouvert 7j\/7j/i)).toBeInTheDocument();
  });

  test('renders horaires with correct times', () => {
    expect(screen.getByText(/16h00 - 02h00/i)).toBeInTheDocument();
    expect(screen.getByText(/16h00 - 05h00/i)).toBeInTheDocument();
    expect(screen.getByText(/toute l'année/i)).toBeInTheDocument();
  });

  test('renders icons', () => {
    const icons = screen.getAllByTestId(/icon-/);
    expect(icons.length).toBeGreaterThan(0);
    expect(icons.some(icon => icon.getAttribute('data-testid') === 'icon-clock')).toBeTruthy();
    expect(icons.some(icon => icon.getAttribute('data-testid') === 'icon-users')).toBeTruthy();
    expect(icons.some(icon => icon.getAttribute('data-testid') === 'icon-glass')).toBeTruthy();
  });

  test('renders with correct styling', () => {
    const karaoke = screen.getByTestId('karaoke-container');
    expect(karaoke).toHaveClass('karaoke');
  });

  test('renders header with correct styling', () => {
    const header = screen.getByTestId('karaoke-header');
    expect(header).toHaveClass('karaoke-header');
  });

  test('renders horaires grid with correct styling', () => {
    const horairesGrid = screen.getByTestId('horaires-grid');
    expect(horairesGrid).toHaveClass('horaires-grid');
  });

  test('renders horaires items with correct styling', () => {
    const horairesItems = screen.getAllByTestId('horaire-item');
    horairesItems.forEach(item => {
      expect(item).toHaveClass('horaire-item');
    });
  });
}); 