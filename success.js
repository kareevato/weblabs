import React from 'react';
import { useNavigate } from 'react-router-dom';
import PrimaryButton from '../../components/PrimaryButton/primaryButton';
import './success.css';

export default function Success() {
  const navigate = useNavigate();

  return (
    <div className="success-page">
      <div className="success-content">
        <div className="success-icon">
          <svg
            width="80"
            height="80"
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="40" cy="40" r="40" fill="#28a745" />
            <path
              d="M25 40L35 50L55 30"
              stroke="white"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h1>Успіх!</h1>
        <p className="success-message">
          Ваше замовлення успішно оформлено. Дякуємо за покупку!
        </p>
        <PrimaryButton onClick={() => navigate('/')}>
          Продовжити покупки
        </PrimaryButton>
      </div>
    </div>
  );
}

