import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Header/Header';
import LoadingSpinner from './components/shared/LoadingSpinner';
import SEOHead from './components/shared/SEOHead';
import './styles/main.scss';
import './i18n/config';

// Lazy load components for code splitting
const Hero = React.lazy(() => import('./components/Hero/Hero'));
const Pillars = React.lazy(() => import('./components/Pillars/Pillars'));
const LoginPage = React.lazy(() => import('./components/Auth/LoginPage'));

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="App">
          <SEOHead />
          <Header />
          <main>
            <Routes>
              <Route path="/" element={
                <Suspense fallback={<LoadingSpinner />}>
                  <>
                    <Hero />
                    <Pillars />
                  </>
                </Suspense>
              } />
              <Route path="/login/:userType" element={
                <Suspense fallback={<LoadingSpinner />}>
                  <LoginPage />
                </Suspense>
              } />
              <Route path="/list-practice" element={<div className="page-placeholder">List Practice Page</div>} />
              <Route path="/employers" element={<div className="page-placeholder">Employers Page</div>} />
              <Route path="/courses" element={<div className="page-placeholder">Courses Page</div>} />
              <Route path="/books" element={<div className="page-placeholder">Books Page</div>} />
              <Route path="/speakers" element={<div className="page-placeholder">Speakers Page</div>} />
              <Route path="/doctors" element={<div className="page-placeholder">Doctors Page</div>} />
            </Routes>
          </main>
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;