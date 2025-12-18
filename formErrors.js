import React from 'react';
import './formErrors.css';

export default function FormErrors({ errors }) {
  if (!errors || Object.keys(errors).length === 0) {
    return null;
  }

  const errorMessages = Object.entries(errors).map(([field, message]) => {
    const fieldNames = {
      firstName: 'Ім\'я',
      lastName: 'Прізвище',
      email: 'Email',
      phone: 'Телефон',
      address: 'Адреса',
      city: 'Місто',
      postalCode: 'Поштовий індекс',
      cardNumber: 'Номер картки',
      cardName: 'Ім\'я на картці',
      expiryDate: 'Термін дії',
      cvv: 'CVV'
    };

    return `${fieldNames[field] || field}: ${message}`;
  });

  return (
    <div className="form-errors">
      <h3>Помилки валідації:</h3>
      <ul>
        {errorMessages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
}

