import { render, screen } from '../../../utils/test-utils';
import About from '../About';

describe('About Component', () => {
  beforeEach(() => {
    render(<About />);
  });

  test('renders main heading', () => {
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/notre histoire/i);
  });

  test('renders story section', () => {
    const storyHeading = screen.getByText(/l'histoire du new york café/i);
    expect(storyHeading).toBeInTheDocument();
    expect(screen.getByText(/fondé en 2020/i)).toBeInTheDocument();
  });

  test('renders concept section', () => {
    const conceptHeading = screen.getByText(/notre concept/i);
    expect(conceptHeading).toBeInTheDocument();
    expect(screen.getByText(/réinvente l'expérience/i)).toBeInTheDocument();
  });

  test('renders values section', () => {
    const valuesHeading = screen.getByText(/nos valeurs/i);
    expect(valuesHeading).toBeInTheDocument();
  });

  test('renders value items', () => {
    const valueItems = screen.getAllByTestId('value-item');
    expect(valueItems).toHaveLength(3);
    expect(screen.getByText(/excellence/i)).toBeInTheDocument();
    expect(screen.getByText(/convivialité/i)).toBeInTheDocument();
    expect(screen.getByText(/passion/i)).toBeInTheDocument();
  });

  test('renders value descriptions', () => {
    expect(screen.getByText(/qualité irréprochable/i)).toBeInTheDocument();
    expect(screen.getByText(/ambiance chaleureuse/i)).toBeInTheDocument();
    expect(screen.getByText(/l'amour de la musique/i)).toBeInTheDocument();
  });

  test('renders with correct styling', () => {
    const about = screen.getByTestId('about-container');
    expect(about).toHaveClass('about');
  });

  test('renders header with correct styling', () => {
    const header = screen.getByTestId('about-header');
    expect(header).toHaveClass('about-header');
  });

  test('renders content with correct styling', () => {
    const content = screen.getByTestId('about-content');
    expect(content).toHaveClass('about-content');
  });

  test('renders values grid with correct styling', () => {
    const valuesGrid = screen.getByTestId('values-grid');
    expect(valuesGrid).toHaveClass('values-grid');
  });
}); 