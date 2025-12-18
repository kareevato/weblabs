import React from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { clearCart } from '../../redux/actions';
import PrimaryButton from '../../components/PrimaryButton/primaryButton';
import FormErrors from '../../components/FormErrors/formErrors';
import './checkout.css';

const validationSchema = Yup.object({
  firstName: Yup.string()
    .required('Ім\'я є обов\'язковим полем')
    .min(2, 'Ім\'я повинно містити мінімум 2 символи')
    .max(50, 'Ім\'я повинно містити максимум 50 символів')
    .matches(/^[а-яА-ЯіІїЇєЄґҐa-zA-Z\s'-]+$/, 'Ім\'я може містити тільки літери, пробіли, дефіси та апострофи'),
  lastName: Yup.string()
    .required('Прізвище є обов\'язковим полем')
    .min(2, 'Прізвище повинно містити мінімум 2 символи')
    .max(50, 'Прізвище повинно містити максимум 50 символів')
    .matches(/^[а-яА-ЯіІїЇєЄґҐa-zA-Z\s'-]+$/, 'Прізвище може містити тільки літери, пробіли, дефіси та апострофи'),
  email: Yup.string()
    .required('Email є обов\'язковим полем')
    .email('Email має некоректний формат')
    .matches(/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/, 'Email має некоректний формат (домен має містити мінімум 2 літери після крапки, наприклад: .com, .ua)'),
  phone: Yup.string()
    .required('Телефон є обов\'язковим полем')
    .matches(/^\+?[1-9]\d{1,14}$/, 'Телефон має некоректний формат (наприклад: +380501234567 або 0501234567)')
    .min(10, 'Телефон повинен містити мінімум 10 цифр')
    .max(15, 'Телефон повинен містити максимум 15 символів'),
  address: Yup.string()
    .required('Адреса є обов\'язковим полем')
    .min(10, 'Адреса повинна містити мінімум 10 символів')
    .max(200, 'Адреса повинна містити максимум 200 символів'),
  city: Yup.string()
    .required('Місто є обов\'язковим полем')
    .min(2, 'Місто повинно містити мінімум 2 символи')
    .max(100, 'Місто повинно містити максимум 100 символів')
    .matches(/^[а-яА-ЯіІїЇєЄґҐa-zA-Z\s'-]+$/, 'Місто може містити тільки літери, пробіли, дефіси та апострофи'),
  postalCode: Yup.string()
    .required('Поштовий індекс є обов\'язковим полем')
    .matches(/^\d{5}$/, 'Поштовий індекс повинен містити рівно 5 цифр'),
  cardNumber: Yup.string()
    .required('Номер картки є обов\'язковим полем')
    .matches(/^\d{16}$/, 'Номер картки повинен містити рівно 16 цифр'),
  cardName: Yup.string()
    .required('Ім\'я на картці є обов\'язковим полем')
    .min(2, 'Ім\'я на картці повинно містити мінімум 2 символи')
    .max(50, 'Ім\'я на картці повинно містити максимум 50 символів')
    .matches(/^[а-яА-ЯіІїЇєЄґҐa-zA-Z\s]+$/, 'Ім\'я на картці може містити тільки літери та пробіли'),
  expiryDate: Yup.string()
    .required('Термін дії є обов\'язковим полем')
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Термін дії має формат MM/YY (наприклад: 12/25)'),
  cvv: Yup.string()
    .required('CVV є обов\'язковим полем')
    .matches(/^\d{3}$/, 'CVV повинен містити рівно 3 цифри')
});

export default function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.items);
  
  // Отримуємо дані користувача з localStorage
  const userEmail = localStorage.getItem('userEmail') || '';
  const userFirstName = localStorage.getItem('userFirstName') || '';
  const userLastName = localStorage.getItem('userLastName') || '';

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const formik = useFormik({
    initialValues: {
      firstName: userFirstName, // Автоматично заповнюємо ім'я користувача
      lastName: userLastName, // Автоматично заповнюємо прізвище користувача
      email: userEmail, // Автоматично заповнюємо email користувача
      phone: '',
      address: '',
      city: '',
      postalCode: '',
      cardNumber: '',
      cardName: '',
      expiryDate: '',
      cvv: ''
    },
    validationSchema,
    onSubmit: (values) => {
      console.log('Form submitted:', values);
      dispatch(clearCart());
      navigate('/success');
    }
  });

  if (cartItems.length === 0) {
    return (
      <div className="checkout-page">
        <div className="checkout-header">
          <h1>Оформлення замовлення</h1>
        </div>
        <div className="empty-cart">
          <p>Ваш кошик порожній</p>
          <PrimaryButton onClick={() => navigate('/catalog')}>
            Перейти до каталогу
          </PrimaryButton>
        </div>
      </div>
    );
  }

  const allErrors = {
    ...(formik.errors.firstName && formik.touched.firstName ? { firstName: formik.errors.firstName } : {}),
    ...(formik.errors.lastName && formik.touched.lastName ? { lastName: formik.errors.lastName } : {}),
    ...(formik.errors.email && formik.touched.email ? { email: formik.errors.email } : {}),
    ...(formik.errors.phone && formik.touched.phone ? { phone: formik.errors.phone } : {}),
    ...(formik.errors.address && formik.touched.address ? { address: formik.errors.address } : {}),
    ...(formik.errors.city && formik.touched.city ? { city: formik.errors.city } : {}),
    ...(formik.errors.postalCode && formik.touched.postalCode ? { postalCode: formik.errors.postalCode } : {}),
    ...(formik.errors.cardNumber && formik.touched.cardNumber ? { cardNumber: formik.errors.cardNumber } : {}),
    ...(formik.errors.cardName && formik.touched.cardName ? { cardName: formik.errors.cardName } : {}),
    ...(formik.errors.expiryDate && formik.touched.expiryDate ? { expiryDate: formik.errors.expiryDate } : {}),
    ...(formik.errors.cvv && formik.touched.cvv ? { cvv: formik.errors.cvv } : {})
  };

  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <h1>Оформлення замовлення</h1>
      </div>

      <div className="checkout-content">
        <div className="checkout-form-section">
          <h2>Контактна інформація</h2>
          <form onSubmit={formik.handleSubmit} className="checkout-form">
            <FormErrors errors={allErrors} />

            <div className="form-group">
              <label htmlFor="firstName">Ім'я *</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
                className={formik.touched.firstName && formik.errors.firstName ? 'error' : ''}
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Прізвище *</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
                className={formik.touched.lastName && formik.errors.lastName ? 'error' : ''}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className={formik.touched.email && formik.errors.email ? 'error' : ''}
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Телефон *</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+380501234567"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
                className={formik.touched.phone && formik.errors.phone ? 'error' : ''}
              />
            </div>

            <h2>Адреса доставки</h2>

            <div className="form-group">
              <label htmlFor="address">Адреса *</label>
              <input
                id="address"
                name="address"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address}
                className={formik.touched.address && formik.errors.address ? 'error' : ''}
              />
            </div>

            <div className="form-group">
              <label htmlFor="city">Місто *</label>
              <input
                id="city"
                name="city"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.city}
                className={formik.touched.city && formik.errors.city ? 'error' : ''}
              />
            </div>

            <div className="form-group">
              <label htmlFor="postalCode">Поштовий індекс *</label>
              <input
                id="postalCode"
                name="postalCode"
                type="text"
                placeholder="01001"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.postalCode}
                className={formik.touched.postalCode && formik.errors.postalCode ? 'error' : ''}
              />
            </div>

            <h2>Платіжна інформація</h2>

            <div className="form-group">
              <label htmlFor="cardNumber">Номер картки *</label>
              <input
                id="cardNumber"
                name="cardNumber"
                type="text"
                placeholder="1234567812345678"
                maxLength="16"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.cardNumber}
                className={formik.touched.cardNumber && formik.errors.cardNumber ? 'error' : ''}
              />
            </div>

            <div className="form-group">
              <label htmlFor="cardName">Ім'я на картці *</label>
              <input
                id="cardName"
                name="cardName"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.cardName}
                className={formik.touched.cardName && formik.errors.cardName ? 'error' : ''}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="expiryDate">Термін дії *</label>
                <input
                  id="expiryDate"
                  name="expiryDate"
                  type="text"
                  placeholder="MM/YY"
                  maxLength="5"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.expiryDate}
                  className={formik.touched.expiryDate && formik.errors.expiryDate ? 'error' : ''}
                />
              </div>

              <div className="form-group">
                <label htmlFor="cvv">CVV *</label>
                <input
                  id="cvv"
                  name="cvv"
                  type="text"
                  placeholder="123"
                  maxLength="3"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.cvv}
                  className={formik.touched.cvv && formik.errors.cvv ? 'error' : ''}
                />
              </div>
            </div>

            <PrimaryButton type="submit" variant="dark" className="submit-btn">
              Підтвердити замовлення
            </PrimaryButton>
          </form>
        </div>

        <div className="checkout-summary">
          <h2>Підсумок замовлення</h2>
          <div className="summary-items">
            {cartItems.map((item) => (
              <div key={`${item.id}-${item.quality || 720}`} className="summary-item">
                <span>{item.name} x{item.quantity}</span>
                <span>{(item.price * item.quantity).toFixed(2)} грн</span>
              </div>
            ))}
          </div>
          <div className="summary-total">
            <span>Загалом:</span>
            <span>{totalPrice.toFixed(2)} грн</span>
          </div>
        </div>
      </div>
    </div>
  );
}

