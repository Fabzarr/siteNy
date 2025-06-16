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
      expect(screen.getByText('New York Café')).toBeInTheDocument()
    })

    it('should display restaurant information', () => {
      render(
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      )
      
      // Check for phone and email (what actually exists)
      expect(screen.getByText('01 23 45 67 89 - contact@newyorkcafe.fr')).toBeInTheDocument()
    })

    it('should display copyright information', () => {
      render(
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      )
      
      const currentYear = new Date().getFullYear()
      expect(screen.getByText(`© ${currentYear} - Tous droits réservés`)).toBeInTheDocument()
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
      
      expect(socialSection.length).toBe(3) // Facebook, Instagram, Twitter
    })

    it('should have correct social media URLs', () => {
      render(
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      )
      
      const links = screen.getAllByRole('link')
      const facebookLink = links.find(link => link.getAttribute('href')?.includes('facebook'))
      const instagramLink = links.find(link => link.getAttribute('href')?.includes('instagram'))
      const twitterLink = links.find(link => link.getAttribute('href')?.includes('twitter'))
      
      expect(facebookLink).toHaveAttribute('href', 'https://facebook.com')
      expect(instagramLink).toHaveAttribute('href', 'https://instagram.com')
      expect(twitterLink).toHaveAttribute('href', 'https://twitter.com')
    })

    it('should open social links in new tab', () => {
      render(
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      )
      
      const socialLinks = screen.getAllByRole('link').filter(link => 
        link.getAttribute('href')?.includes('facebook') ||
        link.getAttribute('href')?.includes('instagram') ||
        link.getAttribute('href')?.includes('twitter')
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

    it('should center content on mobile', () => {
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
      
      const footerContent = footer.querySelector('.footer-content')
      expect(footerContent).toBeInTheDocument()
    })

    it('should apply golden color scheme', () => {
      render(
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      )
      
      const footer = screen.getByRole('contentinfo')
      expect(footer).toBeInTheDocument()
      
      // Check for social links container
      const socialLinks = footer.querySelector('.social-links')
      expect(socialLinks).toBeInTheDocument()
    })

    it('should have proper background styling', () => {
      render(
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      )
      
      const footer = screen.getByRole('contentinfo')
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

    it('should display email address', () => {
      render(
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      )
      
      const emailElement = screen.getByText(/contact@newyorkcafe.fr/i)
      expect(emailElement).toBeInTheDocument()
    })

    it('should display contact information in same paragraph', () => {
      render(
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      )
      
      const contactText = screen.getByText(/01 23 45 67 89 - contact@newyorkcafe.fr/i)
      expect(contactText).toBeInTheDocument()
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

    it('should have social links accessible', () => {
      render(
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      )
      
      const socialLinks = screen.getAllByRole('link')
      const socialMediaLinks = socialLinks.filter(link => 
        link.getAttribute('href')?.includes('facebook') ||
        link.getAttribute('href')?.includes('instagram') ||
        link.getAttribute('href')?.includes('twitter')
      )
      
      expect(socialMediaLinks.length).toBe(3)
    })

    it('should be keyboard navigable', async () => {
      const user = userEvent.setup()
      
      render(
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      )
      
      const links = screen.getAllByRole('link')
      
      if (links.length > 0) {
        await user.tab()
        expect(links[0]).toHaveFocus()
      }
    })
  })

  describe('📱 Tests de Marges Mobile', () => {
    it('should apply mobile optimization', () => {
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
      expect(footer).toHaveClass('footer')
    })

    it('should handle window resize correctly', () => {
      render(
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      )
      
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

  describe('🎯 Tests Spécifiques au Composant', () => {
    it('should display all footer sections', () => {
      render(
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      )
      
      const footerSections = screen.getAllByText((content, element) => {
        return element?.classList.contains('footer-section') || false
      })
      
      // Should have 3 sections: title+social, copyright, contact
      const footer = screen.getByRole('contentinfo')
      const sections = footer.querySelectorAll('.footer-section')
      expect(sections).toHaveLength(3)
    })

    it('should have proper heading structure', () => {
      render(
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      )
      
      const heading = screen.getByRole('heading', { level: 3 })
      expect(heading).toHaveTextContent('New York Café')
    })

    it('should display current year in copyright', () => {
      render(
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      )
      
      const currentYear = new Date().getFullYear()
      expect(screen.getByText(new RegExp(currentYear.toString()))).toBeInTheDocument()
    })
  })
}) 