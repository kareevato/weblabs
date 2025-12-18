import React from 'react';
import './spinner.css';

export default function Spinner() {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
      <p className="spinner-text">Завантаження...</p>
    </div>
  );
}

