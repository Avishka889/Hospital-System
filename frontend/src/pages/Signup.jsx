import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FormInput from '../components/FormInput';
import Button from '../components/Button';

const Signup = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        telephone: '',
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
            const response = await axios.post('http://localhost:5001/api/users/register', formData);
            if (response.status === 201) {
                alert('Signup successful! Redirecting to login...');
                navigate('/login');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong. Please try again.');
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
                maxWidth: '500px',
                backgroundColor: 'white',
                padding: '3rem',
                borderRadius: '24px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
                textAlign: 'center'
            }}>
                <h1 style={{ color: '#005AE2', fontSize: '2.5rem', marginBottom: '0.5rem', fontWeight: '800' }}>Create Account</h1>
                <p style={{ color: '#64748B', marginBottom: '2.5rem' }}>Join Wellmaid Specialist Care today</p>

                {error && <div style={{
                    backgroundColor: '#FEE2E2',
                    color: '#EF4444',
                    padding: '1rem',
                    borderRadius: '12px',
                    marginBottom: '1.5rem',
                    fontSize: '14px'
                }}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <FormInput
                            label="First Name"
                            name="firstName"
                            type="text"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="John"
                        />
                        <FormInput
                            label="Last Name"
                            name="lastName"
                            type="text"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Doe"
                        />
                    </div>

                    <FormInput
                        label="Date of Birth"
                        name="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                    />

                    <FormInput
                        label="Telephone"
                        name="telephone"
                        type="tel"
                        value={formData.telephone}
                        onChange={handleChange}
                        placeholder="+94 77 123 4567"
                    />

                    <FormInput
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
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
                            text={loading ? 'Creating Account...' : 'Sign Up'}
                            width="100%"
                            padding="14px"
                            fontSize="18px"
                            colorScheme="blue"
                        />
                    </div>
                </form>

                <p style={{ marginTop: '2rem', color: '#64748B' }}>
                    Already have an account? <span
                        onClick={() => navigate('/login')}
                        style={{ color: '#FF9500', fontWeight: '600', cursor: 'pointer' }}
                    >Login</span>
                </p>
            </div>
        </div>
    );
};

export default Signup;
