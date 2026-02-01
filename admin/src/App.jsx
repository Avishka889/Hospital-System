import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import './App.css';

function App() {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const storedAdmin = localStorage.getItem('admin');
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
    }
  }, []);

  const handleAdminLogin = (adminData) => {
    setAdmin(adminData);
    localStorage.setItem('admin', JSON.stringify(adminData));
  };

  const handleAdminLogout = () => {
    setAdmin(null);
    localStorage.removeItem('admin');
  };

  return (
    <div className="App">
      <main>
        <Routes>
          <Route
            path="/"
            element={admin ? <AdminDashboard admin={admin} onLogout={handleAdminLogout} /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={admin ? <Navigate to="/" /> : <AdminLogin onAdminLogin={handleAdminLogin} />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
