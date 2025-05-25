import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './SideMenu.css';

const SideMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: '/nos-pizzas', label: 'NOS PIZZAS' },
    { path: '/petites-faims', label: 'PETITES FAIMS' },
    { path: '/a-partager', label: 'A PARTAGER' },
    { path: '/nos-salades', label: 'NOS BELLES SALADES' },
    { path: '/nos-pates', label: 'NOS PATES' },
    { path: '/nos-burgers', label: 'NOS HAMBURGERS & TARTARE' },
    { path: '/nos-viandes', label: 'NOS VIANDES & POISSON' },
    { path: '/nos-desserts', label: 'NOS DESSERTS' },
    { path: '/carte-des-vins', label: 'LA CARTE DES VINS' }
  ];

  const handleCategoryClick = (path: string) => {
    if (path === '/nos-pizzas' || path === '/nos-pates' || path === '/petites-faims' || 
        path === '/nos-salades' || path === '/nos-burgers' || path === '/nos-viandes' || 
        path === '/nos-desserts' || path === '/carte-des-vins' || path === '/a-partager') {
      navigate(path);
    } else {
      // Pour les autres catégories, on peut ajouter la logique plus tard
      alert('Cette section sera bientôt disponible !');
    }
  };

  return (
    <div className="side-menu">
      <div className="menu-title">Notre Carte</div>
      <div className="menu-items">
        {menuItems.map((item) => (
          <button
            key={item.path}
            onClick={() => handleCategoryClick(item.path)}
            className={location.pathname === item.path ? 'active' : ''}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SideMenu; 