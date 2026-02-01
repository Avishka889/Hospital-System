import React from 'react';
import Button from '../components/Button';

const AdminDashboard = ({ admin, onLogout }) => {
    return (
        <div style={{ padding: '4rem 10%', minHeight: '80vh', backgroundColor: '#F1F5F9' }}>
            <div style={{ backgroundColor: 'white', padding: '3rem', borderRadius: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
                    <div>
                        <h1 style={{ fontSize: '2.5rem', color: '#1E293B' }}>Admin Dashboard</h1>
                        <p style={{ color: '#64748B' }}>Welcome back, <span style={{ fontWeight: '700', color: '#005AE2' }}>{admin.username}</span></p>
                    </div>
                    <Button text="Logout Admin" variant="outline" onClick={onLogout} />
                </header>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    {[
                        { title: 'Manage Doctors', count: '12', icon: '👨‍⚕️', color: '#005AE2' },
                        { title: 'Total Patients', count: '1,240', icon: '👥', color: '#10B981' },
                        { title: 'Appointments', count: '45', icon: '📅', color: '#FF9500' },
                        { title: 'System Logs', count: 'Active', icon: '📜', color: '#64748B' }
                    ].map((card, i) => (
                        <div key={i} style={{
                            padding: '2rem',
                            borderRadius: '24px',
                            backgroundColor: '#F8FAFC',
                            border: '1px solid #E2E8F0',
                            transition: 'transform 0.2s ease',
                            cursor: 'pointer'
                        }}>
                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{card.icon}</div>
                            <h3 style={{ fontSize: '1.2rem', color: '#64748B', marginBottom: '0.5rem' }}>{card.title}</h3>
                            <div style={{ fontSize: '2rem', fontWeight: '800', color: card.color }}>{card.count}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
