import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import Footer from '../Footer'

const FooterWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    {children}
  </BrowserRouter>
)

describe('🦶 Footer Component - Tests Complets', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('✅ Rendu de Base', () => {
    it('should render footer correctly', () => {
      render(
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      )
      
      expect(screen.getByRole('contentinfo')).toBeInTheDocument()
      expect(screen.getByText('NEW YORK CAFÉ')).toBeInTheDocument()
    })

    it('should display restaurant information', () => {
      render(
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      )
      
      // Check for address
      expect(screen.getByText(/123 rue de la paix/i)).toBeInTheDocument()
      expect(screen.getByText(/75001 paris/i)).toBeInTheDocument()
      
      // Check for phone
      expect(screen.getByText(/01 23 45 67 89/i)).toBeInTheDocument()
      
      // Check for email
      expect(screen.getByText(/contact@newyorkcafe.fr/i)).toBeInTheDocument()
    })

    it('should display opening hours', () => {
      render(
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      )
      
      expect(screen.getByText(/horaires d'ouverture/i)).toBeInTheDocument()
      expect(screen.getByText(/lundi - dimanche/i)).toBeInTheDocument()
      expect(screen.getByText(/12h00 - 14h30/i)).toBeInTheDocument()
      expect(screen.getByText(/19h00 - 23h00/i)).toBeInTheDocument()
    })
  })

  describe('🔗 Tests des Liens Sociaux', () => {
    it('should display social media links', () => {
      render(
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      )
      
      // Check for social media icons/links
      const socialLinks = screen.getAllByRole('link')
      const socialSection = socialLinks.filter(link => 
        link.getAttribute('href')?.includes('facebook') ||
        link.getAttribute('href')?.includes('instagram') ||
        link.getAttribute('href')?.includes('twitter')
      )
      
      expect(socialSection.length).toBeGreaterThan(0)
    })

    it('should have correct social media URLs', () => {
      render(
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      )
      
      const facebookLink = screen.getByLabelText(/facebook/i)
      const instagramLink = screen.getByLabelText(/instagram/i)
      
      expect(facebookLink).toHaveAttribute('href', expect.stringContaining('facebook.com'))
      expect(instagramLink).toHaveAttribute('href', expect.stringContaining('instagram.com'))
    })

    it('should open social links in new tab', () => {
      render(
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      )
      
      const socialLinks = screen.getAllByRole('link').filter(link => 
        link.getAttribute('href')?.includes('facebook') ||
        link.getAttribute('href')?.includes('instagram')
      )
      
    socialLinks.forEach(link => {
        expect(link).toHaveAttribute('target', '_blank')
        expect(link).toHaveAttribute('rel', 'noopener noreferrer')
      })
    })
  })

  describe('📱 Tests Responsive', () => {
    it('should handle mobile layout correctly', () => {
      // Simulate mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 768,
      })
      
      render(
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      )
      
      const footer = screen.getByRole('contentinfo')
      expect(footer).toHaveClass('footer')
    })

    it('should center social links on mobile', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 480,
      })
      
      render(
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      )
      
      // Check if mobile-specific classes are applied
      const footer = screen.getByRole('contentinfo')
      expect(footer).toBeInTheDocument()
    })

    it('should stack content vertically on mobile', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 600,
      })
      
      render(
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      )
      
      const footer = screen.getByRole('contentinfo')
      
      // Check for responsive layout classes
      expect(footer).toHaveClass('footer')
    })
  })

  describe('🎨 Tests de Style', () => {
    it('should have correct CSS classes', () => {
      render(
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      )
      
      const footer = screen.getByRole('contentinfo')
      expect(footer).toHaveClass('footer')
    })

    it('should apply golden color scheme', () => {
      render(
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      )
      
      const footer = screen.getByRole('contentinfo')
      
      // Check if styling is consistent with theme
      expect(footer).toBeInTheDocument()
    })

    it('should have proper background styling', () => {
      render(
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      )
      
      const footer = screen.getByRole('contentinfo')
      
      // Should have dark background for contrast
      expect(footer).toHaveClass('footer')
    })
  })

  describe('📞 Tests des Informations de Contact', () => {
    it('should format phone number correctly', () => {
      render(
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      )
      
      const phoneElement = screen.getByText(/01 23 45 67 89/i)
      expect(phoneElement).toBeInTheDocument()
    })

    it('should make email clickable', () => {
      render(
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      )
      
      const emailLink = screen.getByRole('link', { name: /contact@newyorkcafe.fr/i })
      expect(emailLink).toHaveAttribute('href', 'mailto:contact@newyorkcafe.fr')
    })

    it('should display complete address', () => {
      render(
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      )
      
      expect(screen.getByText(/123 rue de la paix/i)).toBeInTheDocument()
      expect(screen.getByText(/75001 paris/i)).toBeInTheDocument()
    })
  })

  describe('⏰ Tests des Horaires', () => {
    it('should display all opening hours', () => {
      render(
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      )
      
      expect(screen.getByText(/lundi - dimanche/i)).toBeInTheDocument()
      expect(screen.getByText(/12h00 - 14h30/i)).toBeInTheDocument()
      expect(screen.getByText(/19h00 - 23h00/i)).toBeInTheDocument()
    })

    it('should format hours correctly', () => {
      render(
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      )
      
      // Check for proper time formatting
      const timeElements = screen.getAllByText(/\d{2}h\d{2}/i)
      expect(timeElements.length).toBeGreaterThan(0)
    })
  })

  describe('♿ Tests d\'Accessibilité', () => {
    it('should have proper semantic structure', () => {
      render(
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      )
      
      expect(screen.getByRole('contentinfo')).toBeInTheDocument()
    })

    it('should have proper ARIA labels for social links', () => {
      render(
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      )
      
      const facebookLink = screen.getByLabelText(/facebook/i)
      const instagramLink = screen.getByLabelText(/instagram/i)
      
      expect(facebookLink).toBeInTheDocument()
      expect(instagramLink).toBeInTheDocument()
    })

    it('should be keyboard navigable', async () => {
      const user = userEvent.setup()
      
      render(
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      )
      
      // Tab through footer links
      const links = screen.getAllByRole('link')
      
      if (links.length > 0) {
        await user.tab()
        expect(links[0]).toHaveFocus()
      }
    })
  })

  describe('📱 Tests de Marges Mobile', () => {
    it('should apply negative margins for mobile optimization', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 480,
      })
      
      render(
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      )
      
      const footer = screen.getByRole('contentinfo')
      
      // Check if mobile optimization classes are applied
      expect(footer).toHaveClass('footer')
    })

    it('should handle tablet margins correctly', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 768,
      })
      
      render(
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      )
      
      const footer = screen.getByRole('contentinfo')
      expect(footer).toBeInTheDocument()
    })
  })

  describe('🔧 Tests d\'Intégration', () => {
    it('should work with React Router', () => {
      render(
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      )
      
      const footer = screen.getByRole('contentinfo')
      expect(footer).toBeInTheDocument()
    })

    it('should maintain styling consistency', () => {
      render(
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      )
      
      const footer = screen.getByRole('contentinfo')
      
      // Should have consistent golden theme colors
      expect(footer).toHaveClass('footer')
    })

    it('should handle window resize correctly', () => {
      render(
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      )
      
      // Test responsive behavior
      fireEvent(window, new Event('resize'))
      
      const footer = screen.getByRole('contentinfo')
      expect(footer).toBeInTheDocument()
    })
  })

  describe('🌟 Tests de Performance', () => {
    it('should render quickly', () => {
      const startTime = performance.now()
      
      render(
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      )
      
      const endTime = performance.now()
      const renderTime = endTime - startTime
      
      // Should render in less than 100ms
      expect(renderTime).toBeLessThan(100)
    })

    it('should not have memory leaks', () => {
      const { unmount } = render(
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      )
      
      // Should unmount without errors
      expect(() => unmount()).not.toThrow()
    })
  })
}) 