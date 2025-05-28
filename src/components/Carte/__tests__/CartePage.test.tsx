import { render, screen } from '../../../utils/test-utils';
import CartePage from '../CartePage';

describe('CartePage Component', () => {
  beforeEach(() => {
    render(<CartePage />);
  });

  test('renders menu sections', () => {
    expect(screen.getByText(/petites faims/i)).toBeInTheDocument();
    expect(screen.getByText(/plats/i)).toBeInTheDocument();
    expect(screen.getByText(/desserts/i)).toBeInTheDocument();
  });

  test('renders menu items with prices', () => {
    const menuItems = screen.getAllByTestId('menu-item');
    expect(menuItems.length).toBeGreaterThan(0);

    // Vérifier que chaque article a un nom et un prix
    menuItems.forEach(item => {
      expect(item.querySelector('.item-price')).toHaveTextContent(/€/);
      expect(item.querySelector('.item-name')).toBeInTheDocument();
    });
  });

  test('renders SideMenu component', () => {
    const sideMenu = screen.getByTestId('side-menu');
    expect(sideMenu).toBeInTheDocument();
  });

  test('menu items have descriptions', () => {
    const descriptions = screen.getAllByTestId('menu-item')
      .map(item => item.querySelector('.item-description'));
    
    expect(descriptions.length).toBeGreaterThan(0);
    descriptions.forEach(description => {
      expect(description).toBeInTheDocument();
    });
  });

  test('renders menu categories in side menu', () => {
    const categories = screen.getAllByRole('button', { name: /petites faims|plats|desserts/i });
    expect(categories.length).toBeGreaterThan(0);
  });

  test('renders restaurant name', () => {
    const title = screen.getByRole('heading', { name: /new york café/i });
    expect(title).toBeInTheDocument();
  });
}); 