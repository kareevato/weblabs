import React from 'react';
import './primaryButton.css';

export default function PrimaryButton({ children, onClick, variant = 'primary', className = '', ...props }) {
  return (
    <button 
      className={`primary-btn ${variant} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}


