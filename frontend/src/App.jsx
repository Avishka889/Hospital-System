import React from 'react';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import './App.css';

function App() {
  const navLinks = [
    { label: 'Home', href: '#' },
    { label: 'Services', href: '#services' },
    { label: 'Doctors', href: '#doctors' },
    { label: 'Branches', href: '#branches' },
    { label: 'Contact', href: '#contact' }
  ];

  return (
    <div className="App">
      <NavBar
        links={navLinks}
        activeColor="#FF8C00"
        defaultColor="#FFFFFF"
        bgColor="#0047AB"
      />
      <main>
        <Home />
      </main>
    </div>
  );
}

export default App;
