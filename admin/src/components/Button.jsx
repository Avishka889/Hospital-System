import React from 'react';

const Button = ({
    text,
    onClick,
    variant = 'solid', // solid | outline
    colorScheme = 'blue', // blue | orange
    width = 'auto',
    icon = null,
    padding = '14px 28px',
    fontSize = '22px'
}) => {
    const colors = {
        blue: '#005AE2',
        orange: '#FF9500'
    };

    const selectedColor = colors[colorScheme] || colors.blue;

    const baseStyle = {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        padding: padding,
        fontSize: fontSize,
        fontWeight: '600',
        borderRadius: '10px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        width: width,
        border: variant === 'outline' ? `2px solid ${selectedColor}` : 'none',
        backgroundColor: variant === 'solid' ? selectedColor : 'transparent',
        color: variant === 'solid' ? '#FFFFFF' : selectedColor,
        boxShadow: variant === 'solid' ? '0 4px 10px rgba(0,0,0,0.1)' : 'none',
        outline: 'none'
    };

    return (
        <button
            style={baseStyle}
            onClick={onClick}
            onMouseOver={(e) => {
                e.target.style.opacity = '0.9';
                if (variant === 'solid') e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
                e.target.style.opacity = '1';
                if (variant === 'solid') e.target.style.transform = 'translateY(0)';
            }}
        >
            {icon && <span>{icon}</span>}
            {text}
        </button>
    );
};

export default Button;
