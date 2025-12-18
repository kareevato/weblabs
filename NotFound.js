import React from 'react';
import { useNavigate } from 'react-router-dom';
import PrimaryButton from '../../components/PrimaryButton/primaryButton';
import './NotFound.css';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">Сторінку не знайдено</h2>
        <p className="not-found-message">
          Вибачте, але сторінка, яку ви шукаєте, не існує або була переміщена.
        </p>
        <div className="not-found-actions">
          <PrimaryButton 
            onClick={() => navigate('/')} 
            variant="dark"
          >
            Повернутися на головну
          </PrimaryButton>
          <PrimaryButton 
            onClick={() => navigate('/catalog')} 
            variant="light"
          >
            Перейти до каталогу
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}


