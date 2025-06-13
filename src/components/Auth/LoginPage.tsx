import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const LoginPage: React.FC = () => {
  const { userType } = useParams<{ userType: string }>();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  if (!userType || !['doctor', 'patient'].includes(userType)) {
    return <Navigate to="/" replace />;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login submitted:', { userType, ...formData });
  };

  return (
    <section className="login-page">
      <div className="container">
        <div className="login-page__content">
          <h1 className="login-page__title">
            {userType === 'doctor' 
              ? t('login.doctor.title', 'Doctor Login') 
              : t('login.patient.title', 'Patient Login')
            }
          </h1>
          <p className="login-page__subtitle">
            {userType === 'doctor'
              ? t('login.doctor.subtitle', 'Access your professional dashboard')
              : t('login.patient.subtitle', 'Manage your appointments and health records')
            }
          </p>
          
          <form className="login-page__form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                {t('login.email', 'Email Address')}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-input"
                placeholder={t('login.emailPlaceholder', 'Enter your email')}
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                {t('login.password', 'Password')}
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-input"
                placeholder={t('login.passwordPlaceholder', 'Enter your password')}
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <button type="submit" className="btn btn--primary login-page__submit">
              {t('login.submit', 'Sign In')}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;