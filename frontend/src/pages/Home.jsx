import React from 'react';
import Button from '../components/Button';
import Form from '../components/Form';
import heroImg from '../assets/hero-bg.png';

const Home = () => {
    const services = [
        { title: 'General Checkup', desc: 'Comprehensive health assessment for all ages.', icon: '🩺' },
        { title: 'Dental Care', desc: 'Expert dental treatments and hygiene services.', icon: '🦷' },
        { title: 'Diabetic Care', desc: 'Specialized management and support for diabetes.', icon: '💉' },
        { title: 'Emergency', desc: '24/7 emergency medical support always ready.', icon: '🚑' }
    ];

    const doctors = [
        { name: 'Dr. Sarah Wilson', spec: 'Cardiologist', img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200' },
        { name: 'Dr. James Miller', spec: 'Physician', img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200' },
        { name: 'Dr. Emily Chen', spec: 'Diabetologist', img: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=200' }
    ];

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
                    Wellmaid Specialist Care & Diabetics Centre provides world class healthcare services across Colombo. Your health, our priority. Experience trusted care with our team of expert specialists.
                </p>
                <div style={{ display: 'flex', gap: '20px' }}>
                    <Button
                        text="Our Services"
                        icon="›"
                        onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}
                        padding="12px 30px"
                        fontSize="20px"
                    />
                    <Button
                        text="Visit Branches"
                        variant="outline"
                        onClick={() => document.getElementById('branches').scrollIntoView({ behavior: 'smooth' })}
                        padding="12px 30px"
                        fontSize="20px"
                    />
                </div>
            </section>

            {/* Services Section */}
            <section id="services" style={{ padding: '6rem 10%', textAlign: 'center' }}>
                <h2 style={{ fontSize: '2.5rem', color: '#1E293B', marginBottom: '4rem' }}>Our Premium Services</h2>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '2.5rem'
                }}>
                    {services.map((s, i) => (
                        <div key={i} style={{
                            backgroundColor: 'white',
                            padding: '3rem 2rem',
                            borderRadius: '24px',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                            textAlign: 'center'
                        }}>
                            <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>{s.icon}</div>
                            <h3 style={{ color: '#005AE2', marginBottom: '1rem', fontSize: '1.5rem' }}>{s.title}</h3>
                            <p style={{ color: '#64748B', lineHeight: '1.6' }}>{s.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Doctors Section */}
            <section id="doctors" style={{ padding: '6rem 10%', backgroundColor: 'white' }}>
                <h2 style={{ fontSize: '2.5rem', color: '#1E293B', marginBottom: '4rem', textAlign: 'center' }}>Our Expert Team</h2>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '3rem'
                }}>
                    {doctors.map((d, i) => (
                        <div key={i} style={{
                            textAlign: 'center',
                            backgroundColor: '#F8FAFC',
                            padding: '2rem',
                            borderRadius: '24px'
                        }}>
                            <img src={d.img} alt={d.name} style={{
                                width: '160px',
                                height: '160px',
                                borderRadius: '50%',
                                marginBottom: '1.5rem',
                                objectFit: 'cover',
                                border: '4px solid white',
                                boxShadow: '0 10px 20px rgba(0,0,0,0.05)'
                            }} />
                            <h3 style={{ color: '#1E293B', fontSize: '1.4rem', marginBottom: '0.5rem' }}>{d.name}</h3>
                            <p style={{ color: '#FF9500', fontWeight: '700', marginBottom: '1.5rem' }}>{d.spec}</p>
                            <Button
                                text="View Profile"
                                variant="outline"
                                width="100%"
                                padding="10px 20px"
                                fontSize="16px"
                            />
                        </div>
                    ))}
                </div>
            </section>

            {/* Appointment Section */}
            <section id="contact" style={{ padding: '8rem 10%', backgroundColor: '#005AE2', color: 'white' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '5rem', alignItems: 'center' }}>
                    <div>
                        <h2 style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '2rem' }}>Ready to Book your Appointment?</h2>
                        <p style={{ fontSize: '1.2rem', opacity: 0.9, lineHeight: '1.8', marginBottom: '3rem' }}>
                            Take the first step towards better health. Our specialists are here to provide you with the best medical care and support.
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <div style={{ width: '50px', height: '50px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>📞</div>
                                <span style={{ fontSize: '1.2rem' }}>+94 11 234 5678</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <div style={{ width: '50px', height: '50px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>📧</div>
                                <span style={{ fontSize: '1.2rem' }}>info@wellmaid.lk</span>
                            </div>
                        </div>
                    </div>
                    <Form
                        fields={[
                            { name: 'name', label: 'Your Name', type: 'text', placeholder: 'Full Name' },
                            { name: 'email', label: 'Email Address', type: 'email', placeholder: 'email@example.com' },
                            { name: 'message', label: 'How can we help?', type: 'textarea', placeholder: 'Tell us about your concern' }
                        ]}
                        onSubmit={handleFormSubmit}
                        submitButtonText="Request Appointment"
                    />
                </div>
            </section>

            <footer style={{ padding: '3rem', textAlign: 'center', color: '#64748B' }}>
                © 2026 Wellmaid Specialist Care & Diabetics Centre. All rights reserved.
            </footer>
        </div>
    );
};

export default Home;
