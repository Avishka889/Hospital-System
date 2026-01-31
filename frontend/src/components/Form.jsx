import React, { useState } from 'react';
import Button from './Button';

const Form = ({ fields, onSubmit, submitButtonText = 'Submit' }) => {
    const [formData, setFormData] = useState(
        fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const formStyle = {
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
        maxWidth: '500px',
        margin: '0 auto',
        width: '100%'
    };

    const fieldContainerStyle = {
        marginBottom: '1.5rem',
        textAlign: 'left'
    };

    const labelStyle = {
        display: 'block',
        marginBottom: '0.5rem',
        fontWeight: '600',
        color: '#1e293b'
    };

    const inputStyle = {
        width: '100%',
        padding: '12px',
        borderRadius: '8px',
        border: '1px solid #e2e8f0',
        fontSize: '16px',
        outline: 'none',
        transition: 'border-color 0.3s'
    };

    return (
        <form style={formStyle} onSubmit={handleSubmit}>
            {fields.map((field) => (
                <div key={field.name} style={fieldContainerStyle}>
                    <label style={labelStyle}>{field.label}</label>
                    {field.type === 'textarea' ? (
                        <textarea
                            name={field.name}
                            placeholder={field.placeholder}
                            style={{ ...inputStyle, minHeight: '100px' }}
                            value={formData[field.name]}
                            onChange={handleChange}
                            required
                        />
                    ) : (
                        <input
                            type={field.type}
                            name={field.name}
                            placeholder={field.placeholder}
                            style={inputStyle}
                            value={formData[field.name]}
                            onChange={handleChange}
                            required
                        />
                    )}
                </div>
            ))}
            <Button
                text={submitButtonText}
                width="100%"
                bgColor="#FF8C00"
                onClick={() => { }} // Form handles submit
            />
        </form>
    );
};

export default Form;
