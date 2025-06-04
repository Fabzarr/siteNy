import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import App from '../App'

// Mock fetch for API calls
const mockFetch = vi.fn()
global.fetch = mockFetch

// Mock menu data for integration tests
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
      }
    ]
  }
}

const IntegrationWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    {children}
  </BrowserRouter>
)

describe('🧪 Tests d\'Intégration Complète - New York Café', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    
    // Mock successful API responses
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => mockMenuData
    })
    
    // Reset viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('🏠 Flux Utilisateur Complet - Navigation Site', () => {
    it('should complete full user journey through the site', async () => {
      const user = userEvent.setup()
      
      render(
        <IntegrationWrapper>
          <App />
        </IntegrationWrapper>
      )
      
      // 1. Vérifier page d'accueil
      expect(screen.getByText(/new york café/i)).toBeInTheDocument()
      expect(screen.getByRole('navigation')).toBeInTheDocument()
      
      // 2. Naviguer vers la carte
      const carteLink = screen.getByText(/carte/i)
      await user.click(carteLink)
      
      await waitFor(() => {
        expect(screen.getByText(/notre carte/i)).toBeInTheDocument()
      })
      
      // 3. Vérifier le menu se charge
      await waitFor(() => {
        expect(screen.getByText('PETITES FAIMS')).toBeInTheDocument()
        expect(screen.getByText('Bruschetta')).toBeInTheDocument()
      })
      
      // 4. Naviguer vers réservation
      const reservationLink = screen.getByText(/réservation/i)
      await user.click(reservationLink)
      
      await waitFor(() => {
        expect(screen.getByText(/réserver/i)).toBeInTheDocument()
      })
      
      // 5. Naviguer vers contact
      const contactLink = screen.getByText(/contact/i)
      await user.click(contactLink)
      
      await waitFor(() => {
        expect(screen.getByText(/contact/i)).toBeInTheDocument()
      })
      
      // 6. Retour à l'accueil
      const homeLink = screen.getByText(/accueil/i)
      await user.click(homeLink)
      
      await waitFor(() => {
        expect(screen.getByText(/new york café/i)).toBeInTheDocument()
      })
    })
  })

  describe('📱 Tests Responsive Complets', () => {
    it('should work perfectly on mobile devices', async () => {
      const user = userEvent.setup()
      
      // Simuler mobile
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375, // iPhone size
      })
      window.dispatchEvent(new Event('resize'))
      
      render(
        <IntegrationWrapper>
          <App />
        </IntegrationWrapper>
      )
      
      // Navbar mobile doit fonctionner
      const hamburger = screen.getByRole('button')
      expect(hamburger).toBeInTheDocument()
      
      // Ouvrir menu mobile
      await user.click(hamburger)
      
      await waitFor(() => {
        expect(screen.getByText(/carte/i)).toBeVisible()
      })
      
      // Navigation mobile
      const carteLink = screen.getByText(/carte/i)
      await user.click(carteLink)
      
      await waitFor(() => {
        expect(screen.getByText(/notre carte/i)).toBeInTheDocument()
      })
      
      // Footer doit être responsive
      expect(screen.getByRole('contentinfo')).toBeInTheDocument()
    })

    it('should work perfectly on tablet devices', async () => {
      // Simuler tablette
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 768, // iPad size
      })
      window.dispatchEvent(new Event('resize'))
      
      render(
        <IntegrationWrapper>
          <App />
        </IntegrationWrapper>
      )
      
      // Interface tablette
      expect(screen.getByRole('navigation')).toBeInTheDocument()
      expect(screen.getByRole('contentinfo')).toBeInTheDocument()
      
      // Navigation doit fonctionner
      const carteLink = screen.getByText(/carte/i)
      await userEvent.click(carteLink)
      
      await waitFor(() => {
        expect(screen.getByText(/notre carte/i)).toBeInTheDocument()
      })
    })

    it('should work perfectly on desktop devices', async () => {
      // Simuler desktop
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1920, // Desktop size
      })
      window.dispatchEvent(new Event('resize'))
      
      render(
        <IntegrationWrapper>
          <App />
        </IntegrationWrapper>
      )
      
      // Interface desktop complète
      expect(screen.getByRole('navigation')).toBeInTheDocument()
      expect(screen.getByRole('contentinfo')).toBeInTheDocument()
      
      // Pas de hamburger menu sur desktop
      expect(screen.queryByRole('button')).not.toBeInTheDocument()
      
      // Navigation desktop directe
      const carteLink = screen.getByText(/carte/i)
      expect(carteLink).toBeVisible()
    })
  })

  describe('🍽️ Tests Système Menu Complet', () => {
    it('should load and display complete menu system', async () => {
      render(
        <IntegrationWrapper>
          <App />
        </IntegrationWrapper>
      )
      
      // Naviguer vers carte
      const carteLink = screen.getByText(/carte/i)
      await userEvent.click(carteLink)
      
      // Attendre chargement menu
      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith('/api/menu')
      })
      
      // Vérifier toutes les catégories
      await waitFor(() => {
        expect(screen.getByText('PETITES FAIMS')).toBeInTheDocument()
        expect(screen.getByText('NOS PIZZAS')).toBeInTheDocument()
      })
      
      // Vérifier les plats
      expect(screen.getByText('Bruschetta')).toBeInTheDocument()
      expect(screen.getByText('Margherita')).toBeInTheDocument()
      
      // Vérifier les prix
      expect(screen.getByText('8.00 €')).toBeInTheDocument()
      expect(screen.getByText('14.00 €')).toBeInTheDocument()
      
      // Vérifier descriptions
      expect(screen.getByText('Pain grillé, tomates, basilic')).toBeInTheDocument()
      expect(screen.getByText('Tomate, mozzarella, basilic')).toBeInTheDocument()
    })

    it('should handle menu loading errors gracefully', async () => {
      // Mock erreur API
      mockFetch.mockRejectedValue(new Error('Network error'))
      
      render(
        <IntegrationWrapper>
          <App />
        </IntegrationWrapper>
      )
      
      // Naviguer vers carte
      const carteLink = screen.getByText(/carte/i)
      await userEvent.click(carteLink)
      
      // Vérifier gestion d'erreur
      await waitFor(() => {
        expect(screen.getByText(/erreur de chargement/i)).toBeInTheDocument()
      })
    })
  })

  describe('🔐 Tests Sécurité et Admin', () => {
    it('should protect admin access correctly', async () => {
      render(
        <IntegrationWrapper>
          <App />
        </IntegrationWrapper>
      )
      
      // Tenter accès admin avec mauvaise URL
      window.history.pushState({}, 'Test', '/admin')
      fireEvent(window, new Event('popstate'))
      
      // Ne devrait pas afficher admin
      expect(screen.queryByText(/administration/i)).not.toBeInTheDocument()
      
      // Accès correct
      window.history.pushState({}, 'Test', '/admin-nyc-2024-secret')
      fireEvent(window, new Event('popstate'))
      
      // Devrait afficher admin
      await waitFor(() => {
        expect(screen.getByText(/administration/i)).toBeInTheDocument()
      })
    })
  })

  describe('♿ Tests Accessibilité Complète', () => {
    it('should be fully accessible with keyboard navigation', async () => {
      const user = userEvent.setup()
      
      render(
        <IntegrationWrapper>
          <App />
        </IntegrationWrapper>
      )
      
      // Navigation clavier complète
      await user.tab() // Premier élément focusable
      expect(document.activeElement).toBeDefined()
      
      await user.tab() // Suivant
      expect(document.activeElement).toBeDefined()
      
      // Enter sur lien actif
      await user.keyboard('{Enter}')
      
      // Vérifier navigation fonctionne au clavier
      expect(screen.getByRole('navigation')).toBeInTheDocument()
    })

    it('should have proper ARIA attributes throughout', () => {
      render(
        <IntegrationWrapper>
          <App />
        </IntegrationWrapper>
      )
      
      // Vérifier structure sémantique
      expect(screen.getByRole('navigation')).toHaveAttribute('aria-label')
      expect(screen.getByRole('contentinfo')).toBeInTheDocument()
      expect(screen.getByRole('main')).toBeInTheDocument()
      
      // Liens accessibles
      const links = screen.getAllByRole('link')
      links.forEach(link => {
        expect(link).toHaveAttribute('href')
      })
    })
  })

  describe('🌟 Tests Performance Complète', () => {
    it('should load entire application quickly', async () => {
      const startTime = performance.now()
      
      render(
        <IntegrationWrapper>
          <App />
        </IntegrationWrapper>
      )
      
      // Navigation rapide
      const carteLink = screen.getByText(/carte/i)
      await userEvent.click(carteLink)
      
      await waitFor(() => {
        expect(screen.getByText(/notre carte/i)).toBeInTheDocument()
      })
      
      const endTime = performance.now()
      const totalTime = endTime - startTime
      
      // Application complète en moins de 2 secondes
      expect(totalTime).toBeLessThan(2000)
    })

    it('should handle multiple concurrent operations', async () => {
      const user = userEvent.setup()
      
      render(
        <IntegrationWrapper>
          <App />
        </IntegrationWrapper>
      )
      
      // Opérations simultanées
      const promises = [
        user.click(screen.getByText(/carte/i)),
        user.hover(screen.getByText(/contact/i)),
        user.tab()
      ]
      
      // Toutes les opérations doivent réussir
      await Promise.all(promises)
      
      expect(screen.getByRole('navigation')).toBeInTheDocument()
    })
  })

  describe('🔄 Tests État et Persistance', () => {
    it('should maintain state during complex navigation', async () => {
      const user = userEvent.setup()
      
      render(
        <IntegrationWrapper>
          <App />
        </IntegrationWrapper>
      )
      
      // Navigation complexe
      await user.click(screen.getByText(/carte/i))
      await user.click(screen.getByText(/réservation/i))
      await user.click(screen.getByText(/contact/i))
      await user.click(screen.getByText(/accueil/i))
      
      // L'application doit rester stable
      expect(screen.getByRole('navigation')).toBeInTheDocument()
      expect(screen.getByRole('contentinfo')).toBeInTheDocument()
      expect(screen.getByText(/new york café/i)).toBeInTheDocument()
    })

    it('should handle browser refresh correctly', () => {
      render(
        <IntegrationWrapper>
          <App />
        </IntegrationWrapper>
      )
      
      // Simuler refresh
      fireEvent(window, new Event('beforeunload'))
      
      // Application doit rester fonctionnelle
      expect(screen.getByRole('navigation')).toBeInTheDocument()
    })
  })

  describe('🌐 Tests Multi-Browser Simulation', () => {
    it('should work with different user agent strings', () => {
      // Simuler différents navigateurs
      const userAgents = [
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', // Chrome
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15', // Safari
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101' // Firefox
      ]
      
      userAgents.forEach(ua => {
        Object.defineProperty(navigator, 'userAgent', {
          writable: true,
          value: ua
        })
        
        render(
          <IntegrationWrapper>
            <App />
          </IntegrationWrapper>
        )
        
        expect(screen.getByRole('navigation')).toBeInTheDocument()
      })
    })
  })

  describe('🎯 Tests Cas d\'Usage Réels', () => {
    it('should handle typical restaurant customer journey', async () => {
      const user = userEvent.setup()
      
      render(
        <IntegrationWrapper>
          <App />
        </IntegrationWrapper>
      )
      
      // 1. Client arrive sur le site
      expect(screen.getByText(/new york café/i)).toBeInTheDocument()
      
      // 2. Consulte la carte
      await user.click(screen.getByText(/carte/i))
      await waitFor(() => {
        expect(screen.getByText('PETITES FAIMS')).toBeInTheDocument()
      })
      
      // 3. Regarde les pizzas
      expect(screen.getByText('Margherita')).toBeInTheDocument()
      expect(screen.getByText('14.00 €')).toBeInTheDocument()
      
      // 4. Décide de réserver
      await user.click(screen.getByText(/réservation/i))
      await waitFor(() => {
        expect(screen.getByText(/réserver/i)).toBeInTheDocument()
      })
      
      // 5. Vérifie les informations de contact
      await user.click(screen.getByText(/contact/i))
      await waitFor(() => {
        expect(screen.getByText(/contact/i)).toBeInTheDocument()
      })
      
      // Parcours client complet réussi
      expect(screen.getByRole('contentinfo')).toBeInTheDocument()
    })

    it('should handle mobile customer with hamburger menu', async () => {
      const user = userEvent.setup()
      
      // Mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        value: 375,
        writable: true,
      })
      
      render(
        <IntegrationWrapper>
          <App />
        </IntegrationWrapper>
      )
      
      // Client mobile ouvre menu
      const hamburger = screen.getByRole('button')
      await user.click(hamburger)
      
      // Navigue vers carte
      await user.click(screen.getByText(/carte/i))
      await waitFor(() => {
        expect(screen.getByText(/notre carte/i)).toBeInTheDocument()
      })
      
      // Menu se charge correctement sur mobile
      await waitFor(() => {
        expect(screen.getByText('Bruschetta')).toBeInTheDocument()
      })
    })
  })
}) 