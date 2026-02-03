import React from 'react';

const CardView = ({
    image,
    title,
    subtitle,
    description,
    footer,
    variant = 'branch', // 'branch', 'doctor', 'service'
    icon
}) => {
    const isDoctor = variant === 'doctor';
    const isService = variant === 'service';
    const isBranch = variant === 'branch';

    return (
        <div style={{
            backgroundColor: 'white',
            borderRadius: '32px',
            overflow: 'hidden',
            boxShadow: '0 20px 50px rgba(0,0,0,0.06)',
            border: '1px solid #E2E8F0',
            transition: 'all 0.3s ease',
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center', // Always center as requested
            height: '100%'
        }}>
            {/* Header Section (Image or Icon) */}
            {!isService ? (
                <div style={{
                    height: isDoctor ? 'auto' : '230px',
                    padding: isDoctor ? '3rem 2rem 1.5rem' : '0',
                    display: 'flex',
                    justifyContent: 'center',
                    backgroundColor: isBranch ? '#F8FAFC' : 'transparent'
                }}>
                    <img
                        src={image || 'https://via.placeholder.com/400'}
                        alt={title}
                        style={{
                            width: isDoctor ? '180px' : '100%',
                            height: isDoctor ? '180px' : '100%',
                            borderRadius: isDoctor ? '50%' : '0',
                            objectFit: 'cover',
                            border: isDoctor ? '6px solid white' : 'none',
                            boxShadow: isDoctor ? '0 15px 30px rgba(0,0,0,0.1)' : 'none'
                        }}
                    />
                </div>
            ) : (
                <div style={{
                    fontSize: '4.5rem',
                    padding: '3.5rem 0 1.5rem',
                    backgroundColor: '#F0F9FF'
                }}>{icon}</div>
            )}

            {/* Content Section */}
            <div style={{ padding: '2.5rem', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ marginBottom: '1.5rem', width: '100%' }}>
                    <h3 style={{
                        fontSize: '1.7rem',
                        color: '#005AE2', // Primary Blue for Title
                        fontWeight: '900',
                        margin: '0 0 10px 0',
                        lineHeight: '1.2'
                    }}>
                        {title}
                    </h3>
                    {subtitle && (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                            <span style={{
                                color: '#FF9500', // Premium Orange for Subtitles/Accents
                                fontWeight: '800',
                                textTransform: 'uppercase',
                                fontSize: '13px',
                                letterSpacing: '1px'
                            }}>
                                {subtitle}
                            </span>
                        </div>
                    )}
                </div>

                {description && (
                    <p style={{
                        color: '#64748B',
                        lineHeight: '1.6',
                        fontSize: '1.05rem',
                        marginBottom: '2rem',
                        maxWidth: '90%'
                    }}>
                        {description}
                    </p>
                )}

                {footer && (
                    <div style={{
                        marginTop: 'auto',
                        width: 'auto',
                        minWidth: '200px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '12px',
                        color: '#005AE2',
                        fontWeight: '800',
                        fontSize: '1.15rem',
                        padding: '14px 25px',
                        backgroundColor: '#F0F9FF', // Light Blue background
                        borderRadius: '18px',
                        border: '1px solid #E0F2FE'
                    }}>
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CardView;
