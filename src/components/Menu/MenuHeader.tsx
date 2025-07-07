import React from 'react';
import './MenuHeader.css';

const MenuHeader: React.FC = () => {
  return (
    <div className="menu-standalone-header">
      <div className="menu-standalone-header-content">
        <h1 className="menu-standalone-title">Menu</h1>
        <p className="menu-standalone-description">
          Découvrez nos spécialités
        </p>
      </div>
    </div>
  );
};

export default MenuHeader; 