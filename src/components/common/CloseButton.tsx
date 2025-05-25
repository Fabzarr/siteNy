import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CloseButton.css';

const CloseButton: React.FC = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/');
  };

  return (
    <button 
      className="close-button"
      onClick={handleClose}
      aria-label="Retourner à l'accueil"
    />
  );
};

export default CloseButton; 