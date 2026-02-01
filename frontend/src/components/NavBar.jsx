import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import Button from './Button';
import logoImg from '../assets/logo.png';

const NavBar = ({ links }) => {
    const navigate = useNavigate();
    const location = useLocation();

    // Set active link based on current path
    const getActiveLabel = () => {
        if (location.pathname === '/') return 'Home';
        const link = links.find(l => l.href === location.pathname);
        return link ? link.label : '';
    };

    const activeLink = getActiveLabel();

    const navStyle = {
        backgroundColor: '#FFFFFF',
        padding: '0.5rem 5%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        boxShadow: '0 2px 20px rgba(0,0,0,0.05)'
    };

    const linkContainerStyle = {
        display: 'flex',
        gap: '4rem',
        listStyle: 'none'
    };

    const getLinkStyle = (label) => ({
        color: activeLink === label ? '#005AE2' : '#64748B',
        textDecoration: 'none',
        fontWeight: '600',
        fontSize: '20px',
        fontFamily: 'inherit', // Fixed typo 'fontfamily' to 'fontFamily' and used inherit
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        padding: '10px 20px',
        borderRadius: '12px',
        backgroundColor: activeLink === label ? 'rgba(0, 90, 226, 0.08)' : 'transparent',
        display: 'inline-block'
    });

    return (
        <nav style={navStyle}>
            <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate('/')}>
                <img src={logoImg} alt="Wellmaid Logo" style={{ height: '80px', objectFit: 'contain' }} />
            </div>

            <ul style={linkContainerStyle}>
                {links.map((link) => (
                    <li key={link.label}>
                        {link.href.startsWith('/#') ? (
                            <a
                                href={link.href}
                                style={getLinkStyle(link.label)}
                                onMouseEnter={(e) => {
                                    if (activeLink !== link.label) {
                                        e.target.style.backgroundColor = 'rgba(0, 90, 226, 0.04)';
                                        e.target.style.color = '#005AE2';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (activeLink !== link.label) {
                                        e.target.style.backgroundColor = 'transparent';
                                        e.target.style.color = '#64748B';
                                    }
                                }}
                            >
                                {link.label}
                            </a>
                        ) : (
                            <Link
                                to={link.href}
                                style={getLinkStyle(link.label)}
                                onMouseEnter={(e) => {
                                    if (activeLink !== link.label) {
                                        e.target.style.backgroundColor = 'rgba(0, 90, 226, 0.04)';
                                        e.target.style.color = '#005AE2';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (activeLink !== link.label) {
                                        e.target.style.backgroundColor = 'transparent';
                                        e.target.style.color = '#64748B';
                                    }
                                }}
                            >
                                {link.label}
                            </Link>
                        )}
                    </li>
                ))}
            </ul>

            <div style={{ display: 'flex', gap: '20px' }}>
                <Button
                    text="Login"
                    variant="solid"
                    colorScheme="blue"
                    padding="12px 28px"
                    fontSize="24px"
                    onClick={() => navigate('/login')}
                />
                <Button
                    text="Sign Up"
                    variant="solid"
                    colorScheme="orange"
                    padding="12px 24px"
                    fontSize="24px"
                    onClick={() => navigate('/signup')}
                />
            </div>
        </nav>
    );
};

export default NavBar;

