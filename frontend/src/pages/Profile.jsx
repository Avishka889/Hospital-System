import React, { useState } from 'react';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import PhotoUpload from '../components/PhotoUpload';

const Profile = ({ user, onUpdate }) => {
    const [formData, setFormData] = useState({
        firstName: user.firstName,
        lastName: user.lastName,
        telephone: user.telephone,
        email: user.email,
        profilePic: user.profilePic || null
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (base64) => {
        setFormData({ ...formData, profilePic: base64 });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would normally call backend API to update
        console.log('Updating profile with:', formData);
        alert('Profile details and photo update logic will be implemented here!');
    };

    return (
        <div style={{ padding: '4rem 10%', display: 'flex', justifyContent: 'center' }}>
            <div style={{
                maxWidth: '600px',
                width: '100%',
                backgroundColor: 'white',
                padding: '3rem',
                borderRadius: '32px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.05)',
                border: '1px solid #F1F5F9'
            }}>
                <h2 style={{
                    color: '#005AE2',
                    marginBottom: '2rem',
                    fontSize: '2rem',
                    fontWeight: '900',
                    textAlign: 'center'
                }}>My Profile</h2>

                <PhotoUpload
                    currentImage={formData.profilePic}
                    onImageChange={handleImageChange}
                />

                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <FormInput label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} />
                        <FormInput label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} />
                    </div>

                    <FormInput label="Telephone Number" name="telephone" value={formData.telephone} onChange={handleChange} />
                    <FormInput label="Email Address" name="email" value={formData.email} onChange={handleChange} />

                    <div style={{ marginTop: '2.5rem' }}>
                        <Button text="Save Changes" width="100%" colorScheme="blue" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profile;
