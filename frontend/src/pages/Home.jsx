import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import Button from '../components/Button';
import Form from '../components/Form';
import CardView from '../components/CardView';
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

    const sliderSettings = {
        modules: [Pagination, Autoplay, Navigation],
        spaceBetween: 30,
        slidesPerView: 1,
        pagination: { clickable: true },
        autoplay: { delay: 3500, disableOnInteraction: false },
        breakpoints: {
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
        },
        style: { padding: '2rem 1rem 4rem' }
    };

    return (
        <div style={{ backgroundColor: '#F8FAFC' }}>
            {/* Custom style for swiper pagination dots */}
            <style>{`
                .swiper-pagination-bullet-active {
                    background: #005AE2 !important;
                }
                .swiper-button-next, .swiper-button-prev {
                    color: #005AE2 !important;
                }
                .section-header {
                    text-align: center;
                    margin-bottom: 3rem;
                }
            `}</style>

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
                <h1 style={{ fontSize: '4.5rem', fontWeight: '900', color: '#005AE2', maxWidth: '800px', lineHeight: '1.1', marginBottom: '2rem' }}>
                    Excellence in Diabetic <br /> & Specialist Care
                </h1>
                <p style={{ fontSize: '1.25rem', color: '#64748B', maxWidth: '600px', lineHeight: '1.6', marginBottom: '3rem' }}>
                    Wellmaid Specialist Care & Diabetics Centre provides world class healthcare services. Your health, our priority. Experience trusted care with our team of expert specialists.
                </p>
                <div style={{ display: 'flex', gap: '20px' }}>
                    <Button text="Explore Services" icon="›" onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })} />
                    <Button text="Our Branches" variant="outline" onClick={() => document.getElementById('branches').scrollIntoView({ behavior: 'smooth' })} />
                </div>
            </section>

            {/* Services Slider Section */}
            <section id="services" style={{ padding: '8rem 10%', backgroundColor: 'white' }}>
                <div className="section-header">
                    <span style={{ color: '#005AE2', fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase' }}>What We Offer</span>
                    <h2 style={{ fontSize: '3rem', color: '#005AE2', marginTop: '1rem', fontWeight: '900' }}>Our Premium Services</h2>
                </div>
                <Swiper {...sliderSettings}>
                    {services.map((s, i) => (
                        <SwiperSlide key={i}>
                            <CardView
                                variant="service"
                                icon={s.icon}
                                title={s.title}
                                description={s.description}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </section>

            {/* Doctors Slider Section */}
            <section id="doctors" style={{ padding: '8rem 10%', backgroundColor: '#F8FAFC' }}>
                <div className="section-header">
                    <span style={{ color: '#FF9500', fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase' }}>Expert Team</span>
                    <h2 style={{ fontSize: '3rem', color: '#005AE2', marginTop: '1rem', fontWeight: '900' }}>Meet Our Specialists</h2>
                </div>
                <Swiper {...sliderSettings} slidesPerView={1} breakpoints={{ 768: { slidesPerView: 2 }, 1200: { slidesPerView: 3 } }}>
                    {doctors.map((d, i) => (
                        <SwiperSlide key={i}>
                            <CardView
                                variant="doctor"
                                image={d.image}
                                title={d.name}
                                subtitle={d.specialty}
                                footer={<Button text="Book Appointment" width="100%" variant="outline" />}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </section>

            {/* Branches Slider Section */}
            <section id="branches" style={{ padding: '8rem 10%', backgroundColor: '#F1F5F9' }}>
                <div className="section-header">
                    <span style={{ color: '#005AE2', fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase' }}>Our Network</span>
                    <h2 style={{ fontSize: '3rem', color: '#FF9500', marginTop: '1rem', fontWeight: '900' }}>Wellmaid Branches</h2>
                </div>
                <Swiper {...sliderSettings}>
                    {branches.map((b, i) => (
                        <SwiperSlide key={i}>
                            <CardView
                                variant="branch"
                                image={b.image}
                                title={b.name}
                                subtitle={`📍 ${b.city}`}
                                description={b.address}
                                footer={<span>📞 {b.contact}</span>}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </section>

            {/* Appointment Section */}
            <section id="contact" style={{ padding: '8rem 10%', backgroundColor: '#005AE2', color: 'white' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '5rem', alignItems: 'center' }}>
                    <div>
                        <h2 style={{ fontSize: '3.5rem', fontWeight: '900', marginBottom: '2rem' }}>Quick Appointment</h2>
                        <p style={{ fontSize: '1.25rem', opacity: 0.9, lineHeight: '1.8' }}>Take the first step towards better health. Our specialists are here to provide you with the best medical care and support.</p>
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
        </div>
    );
};

export default Home;
