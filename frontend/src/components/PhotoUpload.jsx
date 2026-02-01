import React, { useState } from 'react';
import Button from './Button';

const PhotoUpload = ({ currentImage, onImageChange }) => {
    const [preview, setPreview] = useState(currentImage);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
                if (onImageChange) onImageChange(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{
                width: '130px',
                height: '130px',
                borderRadius: '50%',
                backgroundColor: '#F1F5F9',
                margin: '0 auto 1.5rem',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '3px solid #005AE2',
                boxShadow: '0 10px 20px rgba(0, 90, 226, 0.1)'
            }}>
                {preview ? (
                    <img src={preview} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Profile" />
                ) : (
                    <span style={{ fontSize: '50px' }}>👤</span>
                )}
            </div>

            <label style={{
                display: 'inline-block',
                padding: '8px 16px',
                backgroundColor: '#F1F5F9',
                color: '#005AE2',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                border: '1px solid #E2E8F0'
            }}>
                Click to Change Photo
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />
            </label>
        </div>
    );
};

export default PhotoUpload;
