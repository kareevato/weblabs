import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { register } from '../../services/api';
import { loadUserCart } from '../../redux/actions';
import PrimaryButton from '../../components/PrimaryButton/primaryButton';
import FormErrors from '../../components/FormErrors/formErrors';
import './register.css';

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
  password: Yup.string()
    .required('Пароль є обов\'язковим полем')
    .min(6, 'Пароль повинен містити мінімум 6 символів')
    .max(50, 'Пароль повинен містити максимум 50 символів')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Пароль повинен містити принаймні одну велику літеру, одну малу літеру та одну цифру'),
  confirmPassword: Yup.string()
    .required('Підтвердження пароля є обов\'язковим полем')
    .oneOf([Yup.ref('password')], 'Паролі не співпадають')
});

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        const response = await register(values.email, values.password, values.firstName, values.lastName);
        if (response.success) {
          localStorage.setItem('userEmail', values.email);
          localStorage.setItem('userFirstName', values.firstName);
          localStorage.setItem('userLastName', values.lastName);
          // Завантажуємо кошик користувача після реєстрації
          dispatch(loadUserCart());
          navigate('/', { replace: true });
        } else {
          setFieldError('email', response.message || 'Помилка реєстрації');
        }
      } catch (error) {
        setFieldError('email', 'Помилка реєстрації. Спробуйте ще раз.');
      } finally {
        setSubmitting(false);
      }
    }
  });

  const allErrors = {
    ...(formik.errors.firstName && formik.touched.firstName ? { firstName: formik.errors.firstName } : {}),
    ...(formik.errors.lastName && formik.touched.lastName ? { lastName: formik.errors.lastName } : {}),
    ...(formik.errors.email && formik.touched.email ? { email: formik.errors.email } : {}),
    ...(formik.errors.password && formik.touched.password ? { password: formik.errors.password } : {}),
    ...(formik.errors.confirmPassword && formik.touched.confirmPassword ? { confirmPassword: formik.errors.confirmPassword } : {})
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1>Реєстрація облікового запису</h1>
        <form onSubmit={formik.handleSubmit} className="auth-form">
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
              placeholder="Введіть ім'я"
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
              placeholder="Введіть прізвище"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email адреса *</label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className={formik.touched.email && formik.errors.email ? 'error' : ''}
              placeholder="example@email.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Пароль *</label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className={formik.touched.password && formik.errors.password ? 'error' : ''}
              placeholder="Введіть пароль"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Підтвердження пароля *</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
              className={formik.touched.confirmPassword && formik.errors.confirmPassword ? 'error' : ''}
              placeholder="Підтвердіть пароль"
            />
          </div>

          <PrimaryButton 
            type="submit" 
            variant="dark" 
            className="submit-btn"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? 'Реєстрація...' : 'Зареєструватися'}
          </PrimaryButton>

          <div className="auth-links">
            <p>
              Вже є обліковий запис? <Link to="/login">Увійти</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}



