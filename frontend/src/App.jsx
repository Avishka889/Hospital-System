import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import PatientNavBar from './components/PatientNavBar';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import PatientHome from './pages/PatientHome';
import Profile from './pages/Profile';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for patient session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    // Check for admin session
    const storedAdmin = localStorage.getItem('admin');
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
    }
  }, []);

  // Patient Handlers
  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    navigate('/patient-home');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/');
  };

  // Admin Handlers
  const handleAdminLogin = (adminData) => {
    setAdmin(adminData);
    localStorage.setItem('admin', JSON.stringify(adminData));
    navigate('/admin-dashboard');
  };

  const handleAdminLogout = () => {
    setAdmin(null);
    localStorage.removeItem('admin');
    navigate('/admin-login');
  };

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/#services' },
    { label: 'Doctors', href: '/#doctors' },
    { label: 'Branches', href: '/#branches' },
    { label: 'Contact', href: '/#contact' }
  ];

  // Don't show public nav if on admin pages or logged in as admin
  const isAdminPath = window.location.pathname.startsWith('/admin');

  return (
    <div className="App">
      {!admin && !isAdminPath && (
        user ? (
          <PatientNavBar user={user} onLogout={handleLogout} />
        ) : (
          <NavBar links={navLinks} />
        )
      )}

      <main>
        <Routes>
          {/* Public Patient Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/login"
            element={user ? <Navigate to="/patient-home" /> : <Login onLogin={handleLogin} />}
          />

          {/* Protected Patient Routes */}
          <Route
            path="/patient-home"
            element={user ? <PatientHome user={user} onLogout={handleLogout} /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={user ? <Profile user={user} /> : <Navigate to="/login" />}
          />

          {/* Admin Routes */}
          <Route
            path="/admin-login"
            element={admin ? <Navigate to="/admin-dashboard" /> : <AdminLogin onAdminLogin={handleAdminLogin} />}
          />
          <Route
            path="/admin-dashboard"
            element={admin ? <AdminDashboard admin={admin} onLogout={handleAdminLogout} /> : <Navigate to="/admin-login" />}
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
