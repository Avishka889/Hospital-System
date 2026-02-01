import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '../components/Button';

const PatientHome = ({ user, onLogout }) => {
    const [stats, setStats] = useState({ services: 0, doctors: 0, branches: 0 });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [sRes, dRes, bRes] = await Promise.all([
                    axios.get('http://localhost:5001/api/data/services'),
                    axios.get('http://localhost:5001/api/data/doctors'),
                    axios.get('http://localhost:5001/api/data/branches')
                ]);
                setStats({
                    services: sRes.data.length,
                    doctors: dRes.data.length,
                    branches: bRes.data.length
                });
            } catch (err) { console.error(err); }
        };
        fetchStats();
    }, []);

    if (!user) return null;

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#F8FAFC', padding: '4rem 10%' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                {/* Welcome Header */}
                <header style={{
                    backgroundColor: 'white',
                    padding: '3rem',
                    borderRadius: '32px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '3rem'
                }}>
                    <div>
                        <span style={{ color: '#005AE2', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>Patient Dashboard</span>
                        <h1 style={{ fontSize: '2.5rem', color: '#1E293B', marginTop: '0.5rem', fontWeight: '900' }}>
                            Hello, <span style={{ color: '#005AE2' }}>{user.firstName}!</span>
                        </h1>
                        <p style={{ color: '#64748B', fontSize: '1.1rem', marginTop: '0.5rem' }}>How can we help you today?</p>
                    </div>
                </header>

                {/* Quick Stats / Info */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
                    <div style={{ backgroundColor: '#E0F2FE', padding: '2rem', borderRadius: '24px', textAlign: 'center' }}>
                        <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>👨‍⚕️</div>
                        <h3 style={{ color: '#005AE2', fontSize: '1.2rem' }}>Available Doctors</h3>
                        <div style={{ fontSize: '2rem', fontWeight: '900', color: '#0369A1' }}>{stats.doctors}</div>
                    </div>
                    <div style={{ backgroundColor: '#F0F9FF', padding: '2rem', borderRadius: '24px', textAlign: 'center' }}>
                        <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🩺</div>
                        <h3 style={{ color: '#005AE2', fontSize: '1.2rem' }}>Healthcare Services</h3>
                        <div style={{ fontSize: '2rem', fontWeight: '900', color: '#0369A1' }}>{stats.services}</div>
                    </div>
                    <div style={{ backgroundColor: '#ECFDF5', padding: '2rem', borderRadius: '24px', textAlign: 'center' }}>
                        <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📍</div>
                        <h3 style={{ color: '#059669', fontSize: '1.2rem' }}>Our Branches</h3>
                        <div style={{ fontSize: '2rem', fontWeight: '900', color: '#065F46' }}>{stats.branches}</div>
                    </div>
                </div>

                {/* Main Actions */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '3rem' }}>
                    <div style={{ backgroundColor: 'white', padding: '3rem', borderRadius: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                        <h2 style={{ fontSize: '1.8rem', color: '#005AE2', marginBottom: '1.5rem', fontWeight: '800' }}>Quick Actions</h2>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            <li style={{ padding: '15px 0', borderBottom: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <span style={{ color: '#005AE2' }}>📅</span> Book a New Appointment
                            </li>
                            <li style={{ padding: '15px 0', borderBottom: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <span style={{ color: '#005AE2' }}>📜</span> View Medical History
                            </li>
                            <li style={{ padding: '15px 0', borderBottom: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <span style={{ color: '#005AE2' }}>💊</span> Prescription Request
                            </li>
                        </ul>
                    </div>

                    <div style={{ backgroundColor: 'white', padding: '3rem', borderRadius: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <h2 style={{ fontSize: '1.8rem', color: '#1E293B', marginBottom: '0.5rem', fontWeight: '800' }}>Manage Account</h2>
                        <Button text="Update My Profile" width="100%" onClick={() => window.location.href = '/profile'} />
                        <Button text="Upload Documents" variant="outline" width="100%" />
                    </div>
                </div>

                <div style={{ marginTop: '5rem', textAlign: 'center' }}>
                    <Button text="Logout Securely" variant="outline" colorScheme="orange" onClick={onLogout} />
                </div>
            </div>
        </div>
    );
};

export default PatientHome;
