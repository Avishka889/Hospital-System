import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '../components/Button';
import Form from '../components/Form';
import heroImg from '../assets/hero-bg.png';

const Home = () => {
    const [services, setServices] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [branches, setBranches] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [sRes, dRes, bRes] = await Promise.all([
                    axios.get('http://localhost:5001/api/data/services'),
                    axios.get('http://localhost:5001/api/data/doctors'),
                    axios.get('http://localhost:5001/api/data/branches')
                ]);
                setServices(sRes.data);
                setDoctors(dRes.data);
                setBranches(bRes.data);
            } catch (err) {
                console.error('Error fetching dynamic data', err);
            }
        };
        fetchData();
    }, []);

    const handleFormSubmit = (data) => {
        console.log('Form Submitted:', data);
        alert('Appointment Request Received!');
    };

    return (
        <div style={{ backgroundColor: '#F8FAFC' }}>
            {/* Hero Section */}
            <section style={{
                height: '90vh',
                background: `linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.85)), url(${heroImg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '0 10%',
                textAlign: 'left'
            }}>
                <h1 style={{
                    fontSize: '4.5rem',
                    fontWeight: '900',
                    color: '#005AE2',
                    maxWidth: '800px',
                    lineHeight: '1.1',
                    marginBottom: '2rem'
                }}>
                    Excellence in Diabetic <br /> & Specialist Care
                </h1>
                <p style={{
                    fontSize: '1.25rem',
                    color: '#64748B',
                    maxWidth: '600px',
                    lineHeight: '1.6',
                    marginBottom: '3rem'
                }}>
                    Wellmaid Specialist Care & Diabetics Centre provides world class healthcare services. Your health, our priority. Experience trusted care with our team of expert specialists.
                </p>
                <div style={{ display: 'flex', gap: '20px' }}>
                    <Button
                        text="Explore Services"
                        icon="›"
                        onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}
                    />
                    <Button
                        text="Our Branches"
                        variant="outline"
                        onClick={() => document.getElementById('branches').scrollIntoView({ behavior: 'smooth' })}
                    />
                </div>
            </section>

            {/* Services Section */}
            <section id="services" style={{ padding: '8rem 10%', textAlign: 'center' }}>
                <span style={{ color: '#005AE2', fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase' }}>What We Offer</span>
                <h2 style={{ fontSize: '3rem', color: '#005AE2', marginTop: '1rem', marginBottom: '4rem', fontWeight: '900' }}>Our Premium Services</h2>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2.5rem'
                }}>
                    {services.length > 0 ? services.map((s, i) => (
                        <div key={i} style={{
                            backgroundColor: 'white',
                            padding: '3.5rem 2.5rem',
                            borderRadius: '32px',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.03)',
                            textAlign: 'center',
                            transition: 'transform 0.3s ease',
                            border: '1px solid #F1F5F9'
                        }}>
                            <div style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>{s.icon}</div>
                            <h3 style={{ color: '#005AE2', marginBottom: '1rem', fontSize: '1.6rem', fontWeight: '800' }}>{s.title}</h3>
                            <p style={{ color: '#64748B', lineHeight: '1.7', fontSize: '1.1rem' }}>{s.description}</p>
                        </div>
                    )) : (
                        <p style={{ gridColumn: '1/-1', color: '#94A3B8' }}>Loading services from our specialists...</p>
                    )}
                </div>
            </section>

            {/* Doctors Section */}
            <section id="doctors" style={{ padding: '8rem 10%', backgroundColor: 'white' }}>
                <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                    <span style={{ color: '#FF9500', fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase' }}>Expert Team</span>
                    <h2 style={{ fontSize: '3rem', color: '#005AE2', marginTop: '1rem', fontWeight: '900' }}>Meet Our Specialists</h2>
                </div>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '3rem'
                }}>
                    {doctors.length > 0 ? doctors.map((d, i) => (
                        <div key={i} style={{
                            textAlign: 'center',
                            backgroundColor: '#F8FAFC',
                            padding: '3rem 2rem',
                            borderRadius: '32px',
                            transition: 'all 0.3s ease',
                            border: '1px solid #E2E8F0'
                        }}>
                            <div style={{ position: 'relative', display: 'inline-block', marginBottom: '2rem' }}>
                                <img src={d.image || 'https://via.placeholder.com/200'} alt={d.name} style={{
                                    width: '180px',
                                    height: '180px',
                                    borderRadius: '50%',
                                    objectFit: 'cover',
                                    border: '6px solid white',
                                    boxShadow: '0 15px 30px rgba(0,0,0,0.1)'
                                }} />
                                <div style={{ position: 'absolute', bottom: '10px', right: '10px', backgroundColor: '#005AE2', color: 'white', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900' }}>✓</div>
                            </div>
                            <h3 style={{ color: '#1E293B', fontSize: '1.6rem', marginBottom: '0.5rem', fontWeight: '800' }}>{d.name}</h3>
                            <p style={{ color: '#005AE2', fontWeight: '700', marginBottom: '2rem', fontSize: '1.1rem' }}>{d.specialty}</p>
                            <div style={{ color: '#64748B', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Contact: {d.contact}</div>
                            <Button text="Book Appointment" width="100%" padding="12px" fontSize="16px" variant="outline" />
                        </div>
                    )) : (
                        <p style={{ gridColumn: '1/-1', color: '#94A3B8', textAlign: 'center' }}>Connecting to our medical staff...</p>
                    )}
                </div>
            </section>

            {/* Branches Section */}
            <section id="branches" style={{ padding: '8rem 10%', backgroundColor: '#F1F5F9' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '3rem', color: '#005AE2', fontWeight: '900' }}>Our Locations</h2>
                    <p style={{ color: '#64748B', fontSize: '1.2rem', marginTop: '1rem' }}>Visit us at your nearest branch for specialized care</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
                    {branches.length > 0 ? branches.map((b, i) => (
                        <div key={i} style={{ backgroundColor: 'white', padding: '2.5rem', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                            <div style={{ fontSize: '2rem', color: '#005AE2' }}>📍</div>
                            <div>
                                <h3 style={{ fontSize: '1.4rem', color: '#1E293B', marginBottom: '0.5rem', fontWeight: '800' }}>{b.name}</h3>
                                <p style={{ color: '#64748B', lineHeight: '1.6', marginBottom: '1rem' }}>{b.address}</p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#005AE2', fontWeight: '700' }}>
                                    <span>📞</span> {b.contact}
                                </div>
                            </div>
                        </div>
                    )) : (
                        <p style={{ gridColumn: '1/-1', textAlign: 'center', color: '#94A3B8' }}>Branch information coming soon.</p>
                    )}
                </div>
            </section>

            {/* Appointment Section */}
            <section id="contact" style={{ padding: '8rem 10%', backgroundColor: '#005AE2', color: 'white' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '5rem', alignItems: 'center' }}>
                    <div>
                        <h2 style={{ fontSize: '3.5rem', fontWeight: '900', marginBottom: '2rem', letterSpacing: '-1px' }}>Quick Appointment</h2>
                        <p style={{ fontSize: '1.25rem', opacity: 0.9, lineHeight: '1.8', marginBottom: '3rem' }}>
                            Take the first step towards better health. Our specialists are here to provide you with the best medical care and support.
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <div style={{ width: '60px', height: '60px', backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>📞</div>
                                <div>
                                    <p style={{ fontSize: '0.9rem', opacity: 0.8, margin: 0 }}>Call Us Now</p>
                                    <span style={{ fontSize: '1.4rem', fontWeight: '700' }}>+94 11 234 5678</span>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <div style={{ width: '60px', height: '60px', backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>📧</div>
                                <div>
                                    <p style={{ fontSize: '0.9rem', opacity: 0.8, margin: 0 }}>Email Us</p>
                                    <span style={{ fontSize: '1.4rem', fontWeight: '700' }}>info@wellmaid.lk</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ backgroundColor: 'white', padding: '3rem', borderRadius: '32px', boxShadow: '0 30px 60px rgba(0,0,0,0.2)' }}>
                        <Form
                            fields={[
                                { name: 'name', label: 'Full Name', type: 'text', placeholder: 'Enter your name' },
                                { name: 'email', label: 'Email', type: 'email', placeholder: 'email@example.com' },
                                { name: 'message', label: 'Your Request', type: 'textarea', placeholder: 'How can we help you?' }
                            ]}
                            onSubmit={handleFormSubmit}
                            submitButtonText="Send Request"
                        />
                    </div>
                </div>
            </section>

            <footer style={{ padding: '4rem', textAlign: 'center', backgroundColor: '#F8FAFC', borderTop: '1px solid #E2E8F0' }}>
                <p style={{ color: '#1E293B', fontWeight: '700', marginBottom: '0.5rem' }}>Wellmaid Specialist Care & Diabetics Centre</p>
                <p style={{ color: '#64748B' }}>© 2026 All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Home;
