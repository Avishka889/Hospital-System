import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoImg from '../assets/logo.png';

const PatientNavBar = ({ user, onLogout }) => {
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();

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

    const profileContainerStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        position: 'relative',
        cursor: 'pointer',
        padding: '8px 15px',
        borderRadius: '12px',
        transition: 'all 0.2s ease',
        backgroundColor: showMenu ? '#F8FAFC' : 'transparent'
    };

    const avatarStyle = {
        width: '45px',
        height: '45px',
        borderRadius: '50%',
        backgroundColor: '#005AE2',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '20px',
        fontWeight: '700',
        objectFit: 'cover',
        border: '2px solid #E2E8F0'
    };

    const dropdownStyle = {
        position: 'absolute',
        top: '60px',
        right: '0',
        width: '220px',
        backgroundColor: 'white',
        borderRadius: '16px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        padding: '10px',
        display: showMenu ? 'block' : 'none',
        border: '1px solid #F1F5F9'
    };

    const menuItemStyle = {
        padding: '12px 15px',
        borderRadius: '10px',
        color: '#475569',
        fontSize: '16px',
        fontWeight: '500',
        transition: 'all 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        cursor: 'pointer'
    };

    const getInitials = (name) => {
        return name ? name.charAt(0).toUpperCase() : 'U';
    };

    return (
        <nav style={navStyle}>
            <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate('/patient-home')}>
                <img src={logoImg} alt="Wellmaid Logo" style={{ height: '70px', objectFit: 'contain' }} />
            </div>

            <div
                style={profileContainerStyle}
                onClick={() => setShowMenu(!showMenu)}
                onMouseEnter={() => setShowMenu(true)}
                onMouseLeave={() => setShowMenu(false)}
            >
                <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '16px', fontWeight: '700', color: '#1E293B' }}>{user.firstName}</span>
                    <span style={{ fontSize: '13px', color: '#64748B' }}>Patient Account</span>
                </div>

                {user.profilePic ? (
                    <img src={user.profilePic} alt="Profile" style={avatarStyle} />
                ) : (
                    <div style={avatarStyle}>{getInitials(user.firstName)}</div>
                )}

                <div style={dropdownStyle}>
                    <div
                        style={menuItemStyle}
                        onClick={() => navigate('/profile')}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#F8FAFC'}
                        onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                    >
                        <span>👤</span> Update Profile
                    </div>
                    <div
                        style={menuItemStyle}
                        onClick={() => navigate('/upload-photo')}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#F8FAFC'}
                        onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                    >
                        <span>📷</span> Change Photo
                    </div>
                    <hr style={{ margin: '8px 0', border: 'none', borderTop: '1px solid #F1F5F9' }} />
                    <div
                        style={{ ...menuItemStyle, color: '#EF4444' }}
                        onClick={onLogout}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#FEF2F2'}
                        onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                    >
                        <span>🚪</span> Logout
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default PatientNavBar;
