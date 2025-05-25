import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './SideMenu.css';

const SideMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const menuStructure = {
    entrées: [
      { path: '/petites-faims', label: 'PETITES FAIMS' },
      { path: '/a-partager', label: 'A PARTAGER' },
    ],
    plats: [
      { path: '/nos-pizzas', label: 'NOS PIZZAS' },
      { path: '/nos-salades', label: 'NOS BELLES SALADES' },
      { path: '/nos-pates', label: 'NOS PÂTES' },
      { path: '/nos-burgers', label: 'NOS HAMBURGERS & TARTARE' },
      { path: '/nos-viandes', label: 'NOS VIANDES & POISSON' },
    ],
    desserts_vins: [
      { path: '/nos-desserts', label: 'NOS DESSERTS' },
      { path: '/carte-des-vins', label: 'LA CARTE DES VINS' },
    ],
  };

  const handleCategoryClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="side-menu">
      <div className="menu-title">Notre Carte</div>
      <div className="menu-sections">
        <div className="menu-section">
          <h3 className="section-title">Entrées</h3>
          {menuStructure.entrées.map((item) => (
            <button
              key={item.path}
              onClick={() => handleCategoryClick(item.path)}
              className={location.pathname === item.path ? 'active' : ''}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="menu-section">
          <h3 className="section-title">Plats</h3>
          {menuStructure.plats.map((item) => (
            <button
              key={item.path}
              onClick={() => handleCategoryClick(item.path)}
              className={location.pathname === item.path ? 'active' : ''}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="menu-section">
          <h3 className="section-title">Desserts & Vins</h3>
          {menuStructure.desserts_vins.map((item) => (
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
    </div>
  );
};

export default SideMenu; 