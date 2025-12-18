import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { login } from '../../services/api';
import { loadUserCart } from '../../redux/actions';
import PrimaryButton from '../../components/PrimaryButton/primaryButton';
import FormErrors from '../../components/FormErrors/formErrors';
import './login.css';

const validationSchema = Yup.object({
  email: Yup.string()
    .required('Email є обов\'язковим полем')
    .email('Email має некоректний формат')
    .matches(/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/, 'Email має некоректний формат (домен має містити мінімум 2 літери після крапки, наприклад: .com, .ua)'),
  password: Yup.string()
    .required('Пароль є обов\'язковим полем')
    .min(6, 'Пароль повинен містити мінімум 6 символів')
    .max(50, 'Пароль повинен містити максимум 50 символів')
});

export default function Login() {
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
      email: '',
      password: ''
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        const response = await login(values.email, values.password);
        if (response.success) {
          localStorage.setItem('userEmail', values.email);
          // Зберігаємо ім'я та прізвище, якщо вони є в відповіді
          if (response.firstName) {
            localStorage.setItem('userFirstName', response.firstName);
          }
          if (response.lastName) {
            localStorage.setItem('userLastName', response.lastName);
          }
          // Завантажуємо кошик користувача після входу
          dispatch(loadUserCart());
          navigate('/', { replace: true });
        } else {
          setFieldError('email', 'Невірний email або пароль');
          setFieldError('password', 'Невірний email або пароль');
        }
      } catch (error) {
        setFieldError('email', 'Помилка входу. Спробуйте ще раз.');
      } finally {
        setSubmitting(false);
      }
    }
  });

  const allErrors = {
    ...(formik.errors.email && formik.touched.email ? { email: formik.errors.email } : {}),
    ...(formik.errors.password && formik.touched.password ? { password: formik.errors.password } : {})
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1>Вхід до облікового запису</h1>
        <form onSubmit={formik.handleSubmit} className="auth-form">
          <FormErrors errors={allErrors} />

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

          <PrimaryButton 
            type="submit" 
            variant="dark" 
            className="submit-btn"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? 'Вхід...' : 'Вхід'}
          </PrimaryButton>

          <div className="auth-links">
            <Link to="/forgot-password">Забули пароль?</Link>
            <p>
              Немає облікового запису? <Link to="/register">Зареєструватися</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}



