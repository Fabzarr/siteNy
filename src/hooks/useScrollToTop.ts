import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useScrollToTop = () => {
  const { pathname } = useLocation();

  // Pour le clic sur un lien actif (même page)
  const smoothScrollToTop = () => {
    // Si on est sur la page carte
    if (pathname === '/carte') {
      // Desktop : utiliser l'élément invisible
      if (window.innerWidth > 1024) {
        const topAnchor = document.getElementById('page-top-anchor');
        if (topAnchor) {
          topAnchor.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      }
      
      // Mobile/Tablette : scroll normal vers le haut
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    // Pour les autres pages, scroll normal vers le haut
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Pour la navigation entre pages
  const instantScrollToTop = () => {
    // Si on navigue vers la page carte
    if (pathname === '/carte') {
      // Petit délai pour laisser le DOM se charger
      setTimeout(() => {
        // Desktop : utiliser l'élément invisible
        if (window.innerWidth > 1024) {
          const topAnchor = document.getElementById('page-top-anchor');
          if (topAnchor) {
            topAnchor.scrollIntoView({ behavior: 'instant' });
            return;
          }
        }
        
        // Mobile/Tablette : scroll normal vers le haut
        window.scrollTo({ top: 0, behavior: 'instant' });
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      }, 100);
      return;
    }
    
    // Pour les autres pages, scroll normal vers le haut
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
    // Backup pour la compatibilité
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  // Scroll instantané à chaque changement de route
  useEffect(() => {
    instantScrollToTop();
  }, [pathname]);

  // Retourne la version smooth pour les clics sur les liens
  return smoothScrollToTop;
}; 