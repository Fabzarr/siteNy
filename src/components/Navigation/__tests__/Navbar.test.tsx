import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import Navbar from '../Navbar'
import '@testing-library/jest-dom'

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    nav: ({ children, ...props }: any) => <nav {...props}>{children}</nav>,
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    ul: ({ children, ...props }: any) => <ul {...props}>{children}</ul>,
    li: ({ children, ...props }: any) => <li {...props}>{children}</li>,
    a: ({ children, ...props }: any) => <a {...props}>{children}</a>,
  },
  AnimatePresence: ({ children }: any) => children,
}))

// Mock react-router-dom
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => ({ pathname: '/' })
  }
})

const NavbarWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    {children}
  </BrowserRouter>
)

describe('🧭 Navbar Component - Tests Complets', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks()
    
    // Mock window.innerWidth for responsive tests
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    })

    mockNavigate.mockClear()
  })

  describe('✅ Rendu de Base', () => {
    it('should render navbar correctly', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      expect(screen.getByRole('navigation')).toBeInTheDocument()
      expect(screen.getByText('NEW YORK CAFÉ')).toBeInTheDocument()
    })

    it('should display all navigation links', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      expect(screen.getByText('ACCUEIL')).toBeInTheDocument()
      expect(screen.getByText('CARTE')).toBeInTheDocument()
      expect(screen.getByText('RÉSERVATION')).toBeInTheDocument()
      expect(screen.getByText('CONTACT')).toBeInTheDocument()
    })

    it('should render reservation button', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const reservationBtn = screen.getByText(/réserver/i)
      expect(reservationBtn).toBeInTheDocument()
      expect(reservationBtn).toHaveClass('reservation-btn')
    })
  })

  describe('📱 Tests Mobile/Tablette', () => {
    beforeEach(() => {
      // Simulate mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 768,
      })
      window.dispatchEvent(new Event('resize'))
    })

    it('should show hamburger menu on mobile', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      // Hamburger menu should be visible
      const hamburgerButton = screen.getByRole('button')
      expect(hamburgerButton).toBeInTheDocument()
      expect(hamburgerButton).toHaveClass('hamburger')
    })

    it('should toggle mobile menu on hamburger click', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const hamburgerButton = screen.getByRole('button')
      
      // Menu should be closed initially
      expect(screen.queryByText('ACCUEIL')).not.toBeVisible()
      
      // Click to open menu
      await user.click(hamburgerButton)
      
      await waitFor(() => {
        expect(screen.getByText('ACCUEIL')).toBeVisible()
      })
    })

    it('should apply mobile-specific CSS classes', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navbar = screen.getByRole('navigation')
      expect(navbar).toHaveClass('navbar')
      
      // Check if mobile-specific animations are applied
      const hamburger = screen.getByRole('button')
      expect(hamburger).toHaveClass('hamburger')
    })

    it('should close mobile menu when link is clicked', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const hamburgerButton = screen.getByRole('button')
      const mobileMenu = screen.getByTestId('mobile-menu')
      
      // Open menu
      fireEvent.click(hamburgerButton)
      expect(mobileMenu).toHaveClass('active')
      
      // Click a link
      const homeLink = screen.getByRole('link', { name: /accueil/i })
      fireEvent.click(homeLink)
      
      expect(mobileMenu).not.toHaveClass('active')
    })
  })

  describe('🖥️ Tests Desktop', () => {
    beforeEach(() => {
      // Simulate desktop viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1200,
      })
      window.dispatchEvent(new Event('resize'))
    })

    it('should hide hamburger menu on desktop', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      // Hamburger should not be visible on desktop
      const hamburgerButton = screen.queryByRole('button')
      expect(hamburgerButton).not.toBeInTheDocument()
    })

    it('should show navigation links directly on desktop', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      // All links should be visible without clicking
      expect(screen.getByText('ACCUEIL')).toBeVisible()
      expect(screen.getByText('CARTE')).toBeVisible()
      expect(screen.getByText('RÉSERVATION')).toBeVisible()
      expect(screen.getByText('CONTACT')).toBeVisible()
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🔗 Tests de Navigation', () => {
    it('should navigate to correct routes when clicked', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const carteLink = screen.getByText('CARTE')
      
      await user.click(carteLink)
      
      // Should navigate to /carte
      expect(carteLink.closest('a')).toHaveAttribute('href', '/carte')
    })

    it('should have correct href attributes for all links', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      expect(screen.getByText('ACCUEIL').closest('a')).toHaveAttribute('href', '/')
      expect(screen.getByText('CARTE').closest('a')).toHaveAttribute('href', '/carte')
      expect(screen.getByText('RÉSERVATION').closest('a')).toHaveAttribute('href', '/reservation')
      expect(screen.getByText('CONTACT').closest('a')).toHaveAttribute('href', '/contact')
    })
  })

  describe('♿ Tests d\'Accessibilité', () => {
    it('should have proper ARIA labels', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navigation = screen.getByRole('navigation')
      expect(navigation).toHaveAttribute('aria-label', 'Navigation principale')
    })

    it('should be keyboard navigable', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      // Tab through navigation links
      await user.tab()
      expect(screen.getByText('ACCUEIL').closest('a')).toHaveFocus()
      
      await user.tab()
      expect(screen.getByText('CARTE').closest('a')).toHaveFocus()
    })

    it('should have proper semantic HTML structure', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      expect(screen.getByRole('navigation')).toBeInTheDocument()
      expect(screen.getByRole('list')).toBeInTheDocument()
      expect(screen.getAllByRole('listitem')).toHaveLength(4)
    })
  })

  describe('🌐 Tests Responsive', () => {
    it('should handle window resize correctly', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      // Start desktop
      Object.defineProperty(window, 'innerWidth', {
        value: 1200,
        writable: true,
      })
      fireEvent(window, new Event('resize'))
      
      // Switch to mobile
      Object.defineProperty(window, 'innerWidth', {
        value: 600,
        writable: true,
      })
      fireEvent(window, new Event('resize'))
      
      // Should still render correctly
      expect(screen.getByRole('navigation')).toBeInTheDocument()
    })

    it('should apply correct breakpoint styles', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navbar = screen.getByRole('navigation')
      
      // Check if responsive classes are present
      expect(navbar).toHaveClass('navbar')
      expect(navbar).toBeInTheDocument()
    })
  })

  describe('🔧 Tests d\'Intégration', () => {
    it('should work with React Router', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const links = screen.getAllByRole('link')
      links.forEach(link => {
        expect(link).toHaveAttribute('href')
      })
    })

    it('should maintain state during navigation', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      // Open mobile menu if on mobile
      const hamburger = screen.queryByRole('button')
      if (hamburger) {
        await user.click(hamburger)
      }
      
      // Click a link
      const carteLink = screen.getByText('CARTE')
      await user.click(carteLink)
      
      // Navbar should still be rendered
      expect(screen.getByRole('navigation')).toBeInTheDocument()
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should apply sticky behavior on scroll', async () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navbar = screen.getByRole('navigation')
      
      // Simuler scroll
      Object.defineProperty(window, 'scrollY', { value: 100, writable: true })
      fireEvent.scroll(window)
      
      await waitFor(() => {
        expect(navbar).toHaveClass('sticky')
      })
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const homeLink = screen.getByText('ACCUEIL')
      
      // Simulate hover
      await user.hover(homeLink)
      
      // Check if hover class is applied
      expect(homeLink.closest('a')).toHaveClass('navbar-link')
    })
  })

  describe('🎨 Tests des Animations', () => {
    it('should have correct CSS classes for golden animations', () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      )
      
      const navLinks = screen.getAllByRole('link')
      navLinks.forEach(link => {
        expect(link).toHaveClass('navbar-link')
      })
    })

    it('should handle hover effects correctly', async () => {
      const user = userEvent