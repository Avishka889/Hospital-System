import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FormInput from '../components/FormInput';
import Button from '../components/Button';

const Login = ({ onLogin }) => {
    const [formData, setFormData] = useState({
        email: '',
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
            const response = await axios.post('http://localhost:5001/api/users/login', formData);
            if (response.data) {
                onLogin(response.data.user);
                alert('Login successful!');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid email or password');
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
            backgroundColor: '#F8FAFC',
            padding: '2rem'
        }}>
            <div style={{
                width: '100%',
                maxWidth: '450px',
                backgroundColor: 'white',
                padding: '3rem',
                borderRadius: '24px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
                textAlign: 'center'
            }}>
                <h1 style={{ color: '#005AE2', fontSize: '2.5rem', marginBottom: '0.5rem', fontWeight: '800' }}>Welcome Back</h1>
                <p style={{ color: '#64748B', marginBottom: '2.5rem' }}>Login to your patient portal</p>

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
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="email@example.com"
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
                            text={loading ? 'Logging in...' : 'Login'}
                            width="100%"
                            padding="14px"
                            fontSize="18px"
                            colorScheme="blue"
                        />
                    </div>
                </form>

                <p style={{ marginTop: '2rem', color: '#64748B' }}>
                    Don't have an account? <span
                        onClick={() => navigate('/signup')}
                        style={{ color: '#FF9500', fontWeight: '600', cursor: 'pointer' }}
                    >Sign Up</span>
                </p>
            </div>
        </div>
    );
};

export default Login;
