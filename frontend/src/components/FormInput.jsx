import React from 'react';

const FormInput = ({ label, type, name, value, onChange, placeholder, required = true }) => {
    const containerStyle = {
        marginBottom: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        width: '100%'
    };

    const labelStyle = {
        fontSize: '16px',
        fontWeight: '600',
        color: '#1E293B',
        textAlign: 'left'
    };

    const inputStyle = {
        padding: '12px 16px',
        fontSize: '16px',
        borderRadius: '10px',
        border: '1.5px solid #E2E8F0',
        outline: 'none',
        transition: 'all 0.2s ease',
        width: '100%',
        boxSizing: 'border-box'
    };

    return (
        <div style={containerStyle}>
            <label style={labelStyle}>{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                style={inputStyle}
                onFocus={(e) => {
                    e.target.style.borderColor = '#005AE2';
                    e.target.style.boxShadow = '0 0 0 4px rgba(0, 90, 226, 0.1)';
                }}
                onBlur={(e) => {
                    e.target.style.borderColor = '#E2E8F0';
                    e.target.style.boxShadow = 'none';
                }}
            />
        </div>
    );
};

export default FormInput;
