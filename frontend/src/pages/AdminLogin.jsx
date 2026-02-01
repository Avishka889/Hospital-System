import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FormInput from '../components/FormInput';
import Button from '../components/Button';

const AdminLogin = ({ onAdminLogin }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:5001/api/admin/login', formData);
            if (response.data) {
                onAdminLogin(response.data.admin);
                alert('Admin Login successful!');
                navigate('/admin-dashboard');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid admin credentials');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0F172A', // Darker theme for admin
            padding: '2rem'
        }}>
            <div style={{
                width: '100%',
                maxWidth: '400px',
                backgroundColor: 'white',
                padding: '3rem',
                borderRadius: '24px',
                boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
                textAlign: 'center'
            }}>
                <div style={{ marginBottom: '2rem' }}>
                    <span style={{ fontSize: '50px' }}>🔐</span>
                </div>
                <h1 style={{ color: '#1E293B', fontSize: '2rem', marginBottom: '0.5rem', fontWeight: '800' }}>Admin Portal</h1>
                <p style={{ color: '#64748B', marginBottom: '2.5rem' }}>Secure access only</p>

                {error && <div style={{
                    backgroundColor: '#FEE2E2',
                    color: '#EF4444',
                    padding: '1rem',
                    borderRadius: '12px',
                    marginBottom: '1.5rem',
                    fontSize: '14px'
                }}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <FormInput
                        label="Username"
                        name="username"
                        type="text"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="admin"
                    />

                    <FormInput
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                    />

                    <div style={{ marginTop: '2rem' }}>
                        <Button
                            text={loading ? 'Verifying...' : 'Login as Admin'}
                            width="100%"
                            padding="14px"
                            fontSize="18px"
                            colorScheme="blue"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
