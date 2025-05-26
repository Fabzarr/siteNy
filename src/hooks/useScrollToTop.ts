import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useScrollToTop = () => {
  const { pathname } = useLocation();

  // Pour le clic sur un lien actif (même page)
  const smoothScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Pour la navigation entre pages
  const instantScrollToTop = () => {
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