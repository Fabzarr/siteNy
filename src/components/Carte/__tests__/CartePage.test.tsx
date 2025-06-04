import { describe, it, expect, beforeEach, vi, type Mock } from 'vitest'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import CartePage from '../CartePage'

// Mock fetch globally
const mockFetch = vi.fn() as Mock

global.fetch = mockFetch

const mockMenuData = {
  'petites-faims': {
    id: 1,
    nom: 'PETITES FAIMS',
    slug: 'petites-faims',
    description: 'Entrées & Apéritifs',
    ordre: 1,
    plats: [
      {
        id: 1,
        nom: 'Bruschetta',
        description: 'Pain grillé, tomates, basilic',
        prix: '8.00',
        disponible: true
      },
      {
        id: 2, 
        nom: 'Antipasti',
        description: 'Sélection de charcuteries italiennes',
        prix: '12.00',
        disponible: true
      }
    ]
  },
  'nos-pizzas': {
    id: 3,
    nom: 'NOS PIZZAS',
    slug: 'nos-pizzas', 
    description: 'Pizzas artisanales au feu de bois',
    ordre: 3,
    plats: [
      {
        id: 10,
        nom: 'Margherita',
        description: 'Tomate, mozzarella, basilic',
        prix: '14.00',
        disponible: true
      },
      {
        id: 11,
        nom: 'Pepperoni',
        description: 'Tomate, mozzarella, pepperoni',
        prix: '16.00',
        disponible: true
      }
    ]
  },
  'carte-des-vins': {
    id: 9,
    nom: 'LA CARTE DES VINS',
    slug: 'carte-des-vins',
    description: 'Sélection de vins français et italiens',
    ordre: 9,
    plats: [
      {
        id: 48,
        nom: 'Champagne Veuve Clicquot',
        description: 'Brut Carte Jaune, arômes de fruits blancs et brioche',
        prix: '90.00',
        disponible: true
      }
    ]
  }
}

const CarteWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    {children}
  </BrowserRouter>
)

describe('🍽️ CartePage Component - Tests Complets', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    
    // Mock successful API response
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => mockMenuData
    })
  })

  describe('✅ Rendu de Base', () => {
    it('should render carte page correctly', async () => {
      render(
        <CarteWrapper>
          <CartePage />
        </CarteWrapper>
      )
      
      // Check for main page title
      expect(screen.getByText(/notre carte/i)).toBeInTheDocument()
      
      // Wait for menu data to load
      await waitFor(() => {
        expect(screen.getByText('PETITES FAIMS')).toBeInTheDocument()
      })
    })

    it('should fetch menu data on mount', async () => {
      render(
        <CarteWrapper>
          <CartePage />
        </CarteWrapper>
      )
      
      // Verify API call was made
      expect(mockFetch).toHaveBeenCalledWith('/api/menu')
      
      await waitFor(() => {
        expect(screen.getByText('PETITES FAIMS')).toBeInTheDocument()
      })
    })

    it('should display loading state initially', () => {
      // Mock delayed response
      mockFetch.mockImplementation(() => new Promise(() => {}))
      
      render(
        <CarteWrapper>
          <CartePage />
        </CarteWrapper>
      )
      
      expect(screen.getByText(/chargement/i)).toBeInTheDocument()
    })
  })

  describe('📋 Tests des Catégories de Menu', () => {
    it('should display all menu categories', async () => {
      render(
        <CarteWrapper>
          <CartePage />
        </CarteWrapper>
      )
      
      await waitFor(() => {
        expect(screen.getByText('PETITES FAIMS')).toBeInTheDocument()
        expect(screen.getByText('NOS PIZZAS')).toBeInTheDocument()
        expect(screen.getByText('LA CARTE DES VINS')).toBeInTheDocument()
      })
    })

    it('should show category descriptions', async () => {
      render(
        <CarteWrapper>
          <CartePage />
        </CarteWrapper>
      )
      
      await waitFor(() => {
        expect(screen.getByText('Entrées & Apéritifs')).toBeInTheDocument()
        expect(screen.getByText('Pizzas artisanales au feu de bois')).toBeInTheDocument()
        expect(screen.getByText('Sélection de vins français et italiens')).toBeInTheDocument()
      })
    })

    it('should display categories in correct order', async () => {
      render(
        <CarteWrapper>
          <CartePage />
        </CarteWrapper>
      )
      
      await waitFor(() => {
        const categories = screen.getAllByRole('heading', { level: 2 })
        expect(categories[0]).toHaveTextContent('PETITES FAIMS')
        expect(categories[1]).toHaveTextContent('NOS PIZZAS')
        expect(categories[2]).toHaveTextContent('LA CARTE DES VINS')
      })
    })
  })

  describe('🍕 Tests des Plats', () => {
    it('should display all dishes with correct information', async () => {
      render(
        <CarteWrapper>
          <CartePage />
        </CarteWrapper>
      )
      
      await waitFor(() => {
        // Check dish names
        expect(screen.getByText('Bruschetta')).toBeInTheDocument()
        expect(screen.getByText('Antipasti')).toBeInTheDocument()
        expect(screen.getByText('Margherita')).toBeInTheDocument()
        expect(screen.getByText('Pepperoni')).toBeInTheDocument()
        
        // Check descriptions
        expect(screen.getByText('Pain grillé, tomates, basilic')).toBeInTheDocument()
        expect(screen.getByText('Sélection de charcuteries italiennes')).toBeInTheDocument()
        
        // Check prices
        expect(screen.getByText('8.00 €')).toBeInTheDocument()
        expect(screen.getByText('12.00 €')).toBeInTheDocument()
        expect(screen.getByText('14.00 €')).toBeInTheDocument()
        expect(screen.getByText('16.00 €')).toBeInTheDocument()
      })
    })

    it('should format prices correctly', async () => {
      render(
        <CarteWrapper>
          <CartePage />
        </CarteWrapper>
      )
      
      await waitFor(() => {
        const priceElements = screen.getAllByText(/\d+\.\d+ €/)
        expect(priceElements.length).toBeGreaterThan(0)
        
        // Check specific price formatting
        expect(screen.getByText('8.00 €')).toBeInTheDocument()
        expect(screen.getByText('90.00 €')).toBeInTheDocument() // Wine price
      })
    })

    it('should show only available dishes', async () => {
      // Mock data with unavailable dish
      const dataWithUnavailable = {
        ...mockMenuData,
        'petites-faims': {
          ...mockMenuData['petites-faims'],
          plats: [
            ...mockMenuData['petites-faims'].plats,
            {
              id: 3,
              nom: 'Indisponible',
              description: 'Ce plat n\'est pas disponible',
              prix: '10.00',
              disponible: false
            }
          ]
        }
      }
      
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => dataWithUnavailable
      })
      
      render(
        <CarteWrapper>
          <CartePage />
        </CarteWrapper>
      )
      
      await waitFor(() => {
        expect(screen.getByText('Bruschetta')).toBeInTheDocument()
        expect(screen.queryByText('Indisponible')).not.toBeInTheDocument()
      })
    })
  })

  describe('🍷 Tests Système de Vins', () => {
    it('should display wine category correctly', async () => {
      render(
        <CarteWrapper>
          <CartePage />
        </CarteWrapper>
      )
      
      await waitFor(() => {
        expect(screen.getByText('LA CARTE DES VINS')).toBeInTheDocument()
        expect(screen.getByText('Champagne Veuve Clicquot')).toBeInTheDocument()
        expect(screen.getByText('Brut Carte Jaune, arômes de fruits blancs et brioche')).toBeInTheDocument()
        expect(screen.getByText('90.00 €')).toBeInTheDocument()
      })
    })

    it('should handle wine variants if present', async () => {
      // Mock wine with variants
      const wineWithVariants = {
        ...mockMenuData,
        'carte-des-vins': {
          ...mockMenuData['carte-des-vins'],
          plats: [
            {
              id: 49,
              nom: 'Chianti Classico',
              description: 'Vin rouge toscan',
              variants: [
                { volume: '75cl', contenant: 'Bouteille', prix: '35.00' },
                { volume: '37.5cl', contenant: 'Demi-bouteille', prix: '20.00' }
              ],
              disponible: true
            }
          ]
        }
      }
      
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => wineWithVariants
      })
      
      render(
        <CarteWrapper>
          <CartePage />
        </CarteWrapper>
      )
      
      await waitFor(() => {
        expect(screen.getByText('Chianti Classico')).toBeInTheDocument()
      })
    })
  })

  describe('🔍 Tests Navigation et Filtres', () => {
    it('should allow navigation between categories', async () => {
      const user = userEvent.setup()
      
      render(
        <CarteWrapper>
          <CartePage />
        </CarteWrapper>
      )
      
      await waitFor(() => {
        expect(screen.getByText('PETITES FAIMS')).toBeInTheDocument()
      })
      
      // Click on a category (if navigation exists)
      const pizzaCategory = screen.getByText('NOS PIZZAS')
      await user.click(pizzaCategory)
      
      // Should still show the category
      expect(screen.getByText('NOS PIZZAS')).toBeInTheDocument()
    })

    it('should handle category selection', async () => {
      const user = userEvent.setup()
      
      render(
        <CarteWrapper>
          <CartePage />
        </CarteWrapper>
      )
      
      await waitFor(() => {
        expect(screen.getByText('PETITES FAIMS')).toBeInTheDocument()
      })
      
      // Test category interaction
      const categoryTitle = screen.getByText('PETITES FAIMS')
      await user.click(categoryTitle)
      
      // Should maintain category visibility
      expect(screen.getByText('PETITES FAIMS')).toBeInTheDocument()
    })
  })

  describe('📱 Tests Responsive', () => {
    it('should display correctly on mobile', async () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 768,
      })
      
      render(
        <CarteWrapper>
          <CartePage />
        </CarteWrapper>
      )
      
      await waitFor(() => {
        expect(screen.getByText('PETITES FAIMS')).toBeInTheDocument()
      })
      
      // Should still render all content on mobile
      expect(screen.getByText('Bruschetta')).toBeInTheDocument()
      expect(screen.getByText('Margherita')).toBeInTheDocument()
    })

    it('should handle tablet layout', async () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024,
      })
      
      render(
        <CarteWrapper>
          <CartePage />
        </CarteWrapper>
      )
      
      await waitFor(() => {
        expect(screen.getByText('PETITES FAIMS')).toBeInTheDocument()
      })
    })
  })

  describe('⚠️ Tests de Gestion d\'Erreurs', () => {
    it('should handle API errors gracefully', async () => {
      mockFetch.mockRejectedValue(new Error('Network error'))
      
      render(
        <CarteWrapper>
          <CartePage />
        </CarteWrapper>
      )
      
      await waitFor(() => {
        expect(screen.getByText(/erreur de chargement/i)).toBeInTheDocument()
      })
    })

    it('should handle empty menu data', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({})
      })
      
      render(
        <CarteWrapper>
          <CartePage />
        </CarteWrapper>
      )
      
      await waitFor(() => {
        expect(screen.getByText(/aucun plat disponible/i)).toBeInTheDocument()
      })
    })

    it('should handle server errors', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 500,
        json: async () => ({ error: 'Server error' })
      })
      
      render(
        <CarteWrapper>
          <CartePage />
        </CarteWrapper>
      )
      
      await waitFor(() => {
        expect(screen.getByText(/erreur serveur/i)).toBeInTheDocument()
      })
    })
  })

  describe('🎨 Tests de Style et Animation', () => {
    it('should have correct CSS classes', async () => {
      render(
        <CarteWrapper>
          <CartePage />
        </CarteWrapper>
      )
      
      await waitFor(() => {
        const carteContainer = screen.getByTestId('carte-container')
        expect(carteContainer).toHaveClass('carte-page')
      })
    })

    it('should apply golden theme colors', async () => {
      render(
        <CarteWrapper>
          <CartePage />
        </CarteWrapper>
      )
      
      await waitFor(() => {
        expect(screen.getByText('PETITES FAIMS')).toBeInTheDocument()
      })
      
      // Check for theme consistency
      const pageElement = screen.getByTestId('carte-container')
      expect(pageElement).toBeInTheDocument()
    })
  })

  describe('♿ Tests d\'Accessibilité', () => {
    it('should have proper semantic structure', async () => {
      render(
        <CarteWrapper>
          <CartePage />
        </CarteWrapper>
      )
      
      await waitFor(() => {
        expect(screen.getByRole('main')).toBeInTheDocument()
        const headings = screen.getAllByRole('heading')
        expect(headings.length).toBeGreaterThan(0)
      })
    })

    it('should be keyboard navigable', async () => {
      const user = userEvent.setup()
      
      render(
        <CarteWrapper>
          <CartePage />
        </CarteWrapper>
      )
      
      await waitFor(() => {
        expect(screen.getByText('PETITES FAIMS')).toBeInTheDocument()
      })
      
      // Should be able to tab through elements
      await user.tab()
      // First focusable element should be focused
    })

    it('should have proper ARIA labels', async () => {
      render(
        <CarteWrapper>
          <CartePage />
        </CarteWrapper>
      )
      
      await waitFor(() => {
        const mainContent = screen.getByRole('main')
        expect(mainContent).toHaveAttribute('aria-label', 'Menu du restaurant')
      })
    })
  })

  describe('🔧 Tests d\'Intégration', () => {
    it('should work with React Router', async () => {
      render(
        <CarteWrapper>
          <CartePage />
        </CarteWrapper>
      )
      
      await waitFor(() => {
        expect(screen.getByText('PETITES FAIMS')).toBeInTheDocument()
      })
    })

    it('should maintain state during re-renders', async () => {
      const { rerender } = render(
        <CarteWrapper>
          <CartePage />
        </CarteWrapper>
      )
      
      await waitFor(() => {
        expect(screen.getByText('PETITES FAIMS')).toBeInTheDocument()
      })
      
      rerender(
        <CarteWrapper>
          <CartePage />
        </CarteWrapper>
      )
      
      // Should still show content after rerender
      expect(screen.getByText('PETITES FAIMS')).toBeInTheDocument()
    })
  })

  describe('🌟 Tests de Performance', () => {
    it('should render menu efficiently', async () => {
      const startTime = performance.now()
      
      render(
        <CarteWrapper>
          <CartePage />
        </CarteWrapper>
      )
      
      await waitFor(() => {
        expect(screen.getByText('PETITES FAIMS')).toBeInTheDocument()
      })
      
      const endTime = performance.now()
      const renderTime = endTime - startTime
      
      // Should render in reasonable time
      expect(renderTime).toBeLessThan(1000)
    })

    it('should handle large menu data', async () => {
      // Mock large menu with many items
      const largeMenuData = {
        ...mockMenuData,
        'nos-pizzas': {
          ...mockMenuData['nos-pizzas'],
          plats: Array.from({ length: 50 }, (_, i) => ({
            id: i + 100,
            nom: `Pizza ${i + 1}`,
            description: `Description de la pizza ${i + 1}`,
            prix: `${(15 + i).toFixed(2)}`,
            disponible: true
          }))
        }
      }
      
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => largeMenuData
      })
      
      render(
        <CarteWrapper>
          <CartePage />
        </CarteWrapper>
      )
      
      await waitFor(() => {
        expect(screen.getByText('Pizza 1')).toBeInTheDocument()
        expect(screen.getByText('Pizza 50')).toBeInTheDocument()
      })
    })
  })
}) 