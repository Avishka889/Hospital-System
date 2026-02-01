import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import logoImg from '../assets/logo.png';
import bgImg from '../assets/admin_login_bg.png';

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
                navigate('/');
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
            // Light blue shade over background photo
            backgroundImage: `linear-gradient(rgba(240, 249, 255, 0.4), rgba(224, 242, 254, 0.6)), url(${bgImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            padding: '2rem'
        }}>
            <div style={{
                width: '100%',
                maxWidth: '480px',
                // Solid white background for the form
                backgroundColor: '#FFFFFF',
                padding: '4rem 3.5rem',
                borderRadius: '40px',
                boxShadow: '0 40px 100px rgba(0, 0, 0, 0.15)',
                textAlign: 'center',
                border: '1px solid #F1F5F9'
            }}>
                <div style={{ marginBottom: '2.5rem' }}>
                    <img src={logoImg} alt="Wellmaid Logo" style={{ height: '90px', objectFit: 'contain' }} />
                    <h2 style={{
                        color: '#005AE2',
                        fontSize: '1.8rem',
                        fontWeight: '900',
                        marginTop: '1.5rem',
                        letterSpacing: '-0.5px'
                    }}>
                        Wellmaid Diabetic & Specialist Care
                    </h2>
                    <div style={{
                        width: '50px',
                        height: '4px',
                        backgroundColor: '#FF9500',
                        margin: '15px auto',
                        borderRadius: '2px'
                    }}></div>
                </div>

                <h1 style={{
                    color: '#1E293B',
                    fontSize: '2.2rem',
                    marginBottom: '0.8rem',
                    fontWeight: '900'
                }}>Admin Login</h1>
                <p style={{ color: '#64748B', marginBottom: '2.5rem', fontWeight: '500' }}>
                    Enter your credentials to access the management portal.
                </p>

                {error && <div style={{
                    backgroundColor: '#FEF2F2',
                    color: '#EF4444',
                    padding: '1.2rem',
                    borderRadius: '16px',
                    marginBottom: '2rem',
                    fontSize: '14px',
                    fontWeight: '700',
                    border: '1px solid #FEE2E2'
                }}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
                        <FormInput
                            label="Admin Username"
                            name="username"
                            type="text"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter username"
                        />
                    </div>

                    <div style={{ textAlign: 'left', marginBottom: '2.5rem' }}>
                        <FormInput
                            label="Secure Password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                        />
                    </div>

                    <Button
                        text={loading ? 'Verifying Credentials...' : 'Login'}
                        width="50%"
                        padding="18px"
                        fontSize="18px"
                        colorScheme="blue"
                    />
                </form>

                <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #F1F5F9' }}>
                    <p style={{ color: '#94A3B8', fontSize: '13px', fontWeight: '700' }}>
                        Authorized Access Only
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
