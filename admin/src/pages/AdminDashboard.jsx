import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '../components/Button';
import FormInput from '../components/FormInput';
import logoImg from '../assets/logo.png';
import bgImg from '../assets/admin_login_bg.png';

const AdminDashboard = ({ admin, onLogout }) => {
    const [services, setServices] = useState([]);
    const [branches, setBranches] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(false);

    const [activeTab, setActiveTab] = useState('services');

    // Form states
    const [serviceForm, setServiceForm] = useState({ title: '', description: '', icon: '🩺' });
    const [branchForm, setBranchForm] = useState({ name: '', city: '', address: '', contact: '', image: '' });
    const [doctorForm, setDoctorForm] = useState({ name: '', specialty: '', image: '', contact: '' });

    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [sRes, bRes, dRes] = await Promise.all([
                axios.get('http://localhost:5001/api/data/services'),
                axios.get('http://localhost:5001/api/data/branches'),
                axios.get('http://localhost:5001/api/data/doctors')
            ]);
            setServices(sRes.data);
            setBranches(bRes.data);
            setDoctors(dRes.data);
        } catch (err) { console.error('Error fetching data', err); }
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const uploadToCloudinary = async () => {
        if (!selectedFile) return null;
        const formData = new FormData();
        formData.append('image', selectedFile);
        try {
            const res = await axios.post('http://localhost:5001/api/data/upload', formData);
            return res.data.url;
        } catch (err) {
            console.error('Upload failed', err);
            return null;
        }
    };

    const handleAddService = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5001/api/data/services', serviceForm);
            setServiceForm({ title: '', description: '', icon: '🩺' });
            fetchData();
        } catch (err) { alert('Error adding service'); }
    };

    const handleAddBranch = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            let imageUrl = '';
            if (selectedFile) {
                imageUrl = await uploadToCloudinary();
            }
            await axios.post('http://localhost:5001/api/data/branches', { ...branchForm, image: imageUrl });
            setBranchForm({ name: '', city: '', address: '', contact: '', image: '' });
            setSelectedFile(null);
            fetchData();
            alert('Branch added successfully!');
        } catch (err) { alert('Error adding branch'); }
        finally { setLoading(false); }
    };

    const handleAddDoctor = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            let imageUrl = '';
            if (selectedFile) {
                imageUrl = await uploadToCloudinary();
            }
            await axios.post('http://localhost:5001/api/data/doctors', { ...doctorForm, image: imageUrl });
            setDoctorForm({ name: '', specialty: '', image: '', contact: '' });
            setSelectedFile(null);
            fetchData();
            alert('Doctor added successfully!');
        } catch (err) { alert('Error adding doctor'); }
        finally { setLoading(false); }
    };

    const handleDelete = async (type, id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            await axios.delete(`http://localhost:5001/api/data/${type}/${id}`);
            fetchData();
        } catch (err) { alert('Error deleting item'); }
    };

    const tabStyle = (id) => ({
        padding: '14px 28px',
        cursor: 'pointer',
        fontWeight: '800',
        borderRadius: '16px',
        backgroundColor: activeTab === id ? '#FF9500' : 'rgba(255, 255, 255, 0.8)',
        color: activeTab === id ? 'white' : '#005AE2',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        border: 'none',
        fontSize: '16px',
        boxShadow: activeTab === id ? '0 10px 20px rgba(255, 149, 0, 0.3)' : '0 4px 10px rgba(0,0,0,0.05)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
    });

    const cardStyle = {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        padding: '2.5rem',
        borderRadius: '32px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        border: '1px solid rgba(255,255,255,0.3)'
    };

    return (
        <div style={{
            minHeight: '100vh',
            backgroundImage: `linear-gradient(rgba(0, 90, 226, 0.8), rgba(255, 255, 255, 0.9)), url(${bgImg})`,
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover',
            padding: '2rem'
        }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                <header style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    padding: '1.5rem 3rem',
                    borderRadius: '32px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                    marginBottom: '2.5rem'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <img src={logoImg} alt="Logo" style={{ height: '70px', objectFit: 'contain' }} />
                        <div style={{ height: '50px', width: '2px', backgroundColor: '#E2E8F0' }}></div>
                        <div>
                            <h1 style={{ fontSize: '1.8rem', color: '#005AE2', fontWeight: '900', margin: 0 }}>Wellmaid Specialist Care</h1>
                            <p style={{ color: '#64748B', fontWeight: '600', margin: 0 }}>Admin Management Portal</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
                        <Button text="Sign Out" variant="solid" colorScheme="orange" padding="12px 24px" onClick={onLogout} />
                    </div>
                </header>

                <div style={{ display: 'flex', gap: '15px', marginBottom: '3rem', backgroundColor: 'rgba(255,255,255,0.5)', padding: '12px', borderRadius: '24px', width: 'fit-content', backdropFilter: 'blur(5px)' }}>
                    <button style={tabStyle('services')} onClick={() => setActiveTab('services')}><span>🩺</span> Services</button>
                    <button style={tabStyle('branches')} onClick={() => setActiveTab('branches')}><span>📍</span> Branches</button>
                    <button style={tabStyle('doctors')} onClick={() => setActiveTab('doctors')}><span>👨‍⚕️</span> Doctors</button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(400px, 1fr) 2fr', gap: '3rem' }}>
                    <div style={cardStyle}>
                        <h2 style={{ fontSize: '1.6rem', color: '#1E293B', fontWeight: '900', marginBottom: '2rem' }}>New {activeTab.slice(0, -1)}</h2>

                        {activeTab === 'services' && (
                            <form onSubmit={handleAddService}>
                                <FormInput label="Service Title" value={serviceForm.title} onChange={e => setServiceForm({ ...serviceForm, title: e.target.value })} />
                                <FormInput label="Description" value={serviceForm.description} onChange={e => setServiceForm({ ...serviceForm, description: e.target.value })} />
                                <FormInput label="Icon Emoji" value={serviceForm.icon} onChange={e => setServiceForm({ ...serviceForm, icon: e.target.value })} />
                                <Button text="Publish Service" width="100%" colorScheme="blue" />
                            </form>
                        )}

                        {activeTab === 'branches' && (
                            <form onSubmit={handleAddBranch}>
                                <FormInput label="Branch Name" value={branchForm.name} onChange={e => setBranchForm({ ...branchForm, name: e.target.value })} placeholder="e.g. Wellmaid Wellness" />
                                <FormInput label="City" value={branchForm.city} onChange={e => setBranchForm({ ...branchForm, city: e.target.value })} placeholder="e.g. Colombo" />
                                <FormInput label="Address" value={branchForm.address} onChange={e => setBranchForm({ ...branchForm, address: e.target.value })} />
                                <FormInput label="Contact" value={branchForm.contact} onChange={e => setBranchForm({ ...branchForm, contact: e.target.value })} />
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '700', color: '#64748B' }}>Branch Image</label>
                                    <input type="file" onChange={handleFileChange} style={{ width: '100%', padding: '10px', backgroundColor: 'white', borderRadius: '12px', border: '1px solid #E2E8F0' }} />
                                </div>
                                <Button text={loading ? "Uploading..." : "Save Branch"} width="100%" colorScheme="blue" />
                            </form>
                        )}

                        {activeTab === 'doctors' && (
                            <form onSubmit={handleAddDoctor}>
                                <FormInput label="Doctor Name" value={doctorForm.name} onChange={e => setDoctorForm({ ...doctorForm, name: e.target.value })} />
                                <FormInput label="Specialty" value={doctorForm.specialty} onChange={e => setDoctorForm({ ...doctorForm, specialty: e.target.value })} />
                                <FormInput label="Contact Info" value={doctorForm.contact} onChange={e => setDoctorForm({ ...doctorForm, contact: e.target.value })} />
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '700', color: '#64748B' }}>Doctor Photo</label>
                                    <input type="file" onChange={handleFileChange} style={{ width: '100%', padding: '10px', backgroundColor: 'white', borderRadius: '12px', border: '1px solid #E2E8F0' }} />
                                </div>
                                <Button text={loading ? "Uploading..." : "Add to Staff"} width="100%" colorScheme="blue" />
                            </form>
                        )}
                    </div>

                    <div style={cardStyle}>
                        <h2 style={{ fontSize: '1.6rem', color: '#1E293B', fontWeight: '900', marginBottom: '2.5rem' }}>Active Records</h2>
                        <div style={{ display: 'grid', gap: '1.5rem', maxHeight: '600px', overflowY: 'auto' }}>
                            {activeTab === 'branches' && branches.map(b => (
                                <div key={b._id} style={{ padding: '1.5rem', borderRadius: '24px', backgroundColor: 'white', border: '1px solid #F1F5F9', display: 'flex', gap: '20px', alignItems: 'center' }}>
                                    <img src={b.image || 'https://via.placeholder.com/100'} style={{ width: '100px', height: '100px', borderRadius: '16px', objectFit: 'cover' }} />
                                    <div style={{ flex: 1 }}>
                                        <h4 style={{ fontWeight: '800', fontSize: '1.2rem', color: '#1E293B', margin: 0 }}>{b.name} <span style={{ color: '#FF9500', fontSize: '0.9rem' }}>({b.city})</span></h4>
                                        <p style={{ color: '#64748B', margin: '5px 0' }}>{b.address}</p>
                                        <span style={{ color: '#005AE2', fontWeight: '800' }}>📞 {b.contact}</span>
                                    </div>
                                    <button onClick={() => handleDelete('branches', b._id)} style={{ color: '#EF4444', border: 'none', background: 'none', cursor: 'pointer', fontWeight: '800' }}>Delete</button>
                                </div>
                            ))}
                            {/* ... similar mapping for services and doctors with image support ... */}
                            {activeTab === 'services' && services.map(s => (
                                <div key={s._id} style={{ padding: '1.5rem', borderRadius: '24px', backgroundColor: 'white', border: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                        <div style={{ fontSize: '30px', backgroundColor: '#F0F9FF', padding: '15px', borderRadius: '15px' }}>{s.icon}</div>
                                        <div>
                                            <h4 style={{ fontWeight: '800', fontSize: '1.2rem', color: '#1E293B', margin: 0 }}>{s.title}</h4>
                                            <p style={{ color: '#64748B', margin: '5px 0' }}>{s.description}</p>
                                        </div>
                                    </div>
                                    <button onClick={() => handleDelete('services', s._id)} style={{ color: '#EF4444', border: 'none', background: 'none', cursor: 'pointer', fontWeight: '800' }}>Delete</button>
                                </div>
                            ))}
                            {activeTab === 'doctors' && doctors.map(d => (
                                <div key={d._id} style={{ padding: '1.5rem', borderRadius: '24px', backgroundColor: 'white', border: '1px solid #F1F5F9', display: 'flex', gap: '20px', alignItems: 'center' }}>
                                    <img src={d.image || 'https://via.placeholder.com/80'} style={{ width: '80px', height: '80px', borderRadius: '20px', objectFit: 'cover' }} />
                                    <div style={{ flex: 1 }}>
                                        <h4 style={{ fontWeight: '800', fontSize: '1.2rem', color: '#1E293B', margin: 0 }}>{d.name}</h4>
                                        <p style={{ color: '#FF9500', margin: '2px 0', fontWeight: '700' }}>{d.specialty}</p>
                                        <span style={{ color: '#64748B', fontSize: '0.9rem' }}>{d.contact}</span>
                                    </div>
                                    <button onClick={() => handleDelete('doctors', d._id)} style={{ color: '#EF4444', border: 'none', background: 'none', cursor: 'pointer', fontWeight: '800' }}>Delete</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
