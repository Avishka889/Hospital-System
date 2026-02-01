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

    const [activeTab, setActiveTab] = useState('services'); // services, branches, doctors

    // Form states
    const [serviceForm, setServiceForm] = useState({ title: '', description: '', icon: '🩺' });
    const [branchForm, setBranchForm] = useState({ name: '', address: '', contact: '' });
    const [doctorForm, setDoctorForm] = useState({ name: '', specialty: '', image: '', contact: '' });

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
        try {
            await axios.post('http://localhost:5001/api/data/branches', branchForm);
            setBranchForm({ name: '', address: '', contact: '' });
            fetchData();
        } catch (err) { alert('Error adding branch'); }
    };

    const handleAddDoctor = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5001/api/data/doctors', doctorForm);
            setDoctorForm({ name: '', specialty: '', image: '', contact: '' });
            fetchData();
        } catch (err) { alert('Error adding doctor'); }
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
                {/* Premium Header */}
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
                        <div style={{ textAlign: 'right' }}>
                            <p style={{ color: '#64748B', fontSize: '0.9rem', margin: 0 }}>Active Session</p>
                            <span style={{ color: '#1E293B', fontWeight: '800' }}>{admin.username.toUpperCase()}</span>
                        </div>
                        <Button text="Sign Out" variant="solid" colorScheme="orange" padding="12px 24px" fontSize="16px" onClick={onLogout} />
                    </div>
                </header>

                <div style={{ display: 'flex', gap: '15px', marginBottom: '3rem', backgroundColor: 'rgba(255,255,255,0.5)', padding: '12px', borderRadius: '24px', width: 'fit-content', backdropFilter: 'blur(5px)' }}>
                    <button style={tabStyle('services')} onClick={() => setActiveTab('services')}>
                        <span>🩺</span> Services
                    </button>
                    <button style={tabStyle('branches')} onClick={() => setActiveTab('branches')}>
                        <span>📍</span> Branches
                    </button>
                    <button style={tabStyle('doctors')} onClick={() => setActiveTab('doctors')}>
                        <span>👨‍⚕️</span> Doctors
                    </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(400px, 1fr) 2fr', gap: '3rem' }}>
                    {/* Add Form Section */}
                    <div style={cardStyle}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '2.5rem' }}>
                            <div style={{ width: '45px', height: '45px', backgroundColor: '#005AE2', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '20px' }}>+</div>
                            <h2 style={{ fontSize: '1.6rem', color: '#1E293B', fontWeight: '900', margin: 0 }}>New {activeTab.slice(0, -1)}</h2>
                        </div>

                        {activeTab === 'services' && (
                            <form onSubmit={handleAddService} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <FormInput label="Service Title" value={serviceForm.title} onChange={e => setServiceForm({ ...serviceForm, title: e.target.value })} placeholder="e.g. Dental Care" />
                                <FormInput label="Description" value={serviceForm.description} onChange={e => setServiceForm({ ...serviceForm, description: e.target.value })} placeholder="Service details..." />
                                <FormInput label="Icon Emoji" value={serviceForm.icon} onChange={e => setServiceForm({ ...serviceForm, icon: e.target.value })} placeholder="🩺" />
                                <div style={{ marginTop: '1rem' }}>
                                    <Button text="Publish Service" width="100%" colorScheme="blue" />
                                </div>
                            </form>
                        )}

                        {activeTab === 'branches' && (
                            <form onSubmit={handleAddBranch} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <FormInput label="Branch Name" value={branchForm.name} onChange={e => setBranchForm({ ...branchForm, name: e.target.value })} placeholder="e.g. Colombo 07" />
                                <FormInput label="Address" value={branchForm.address} onChange={e => setBranchForm({ ...branchForm, address: e.target.value })} placeholder="Full address..." />
                                <FormInput label="Contact" value={branchForm.contact} onChange={e => setBranchForm({ ...branchForm, contact: e.target.value })} placeholder="+94 ..." />
                                <div style={{ marginTop: '1rem' }}>
                                    <Button text="Register Branch" width="100%" colorScheme="blue" />
                                </div>
                            </form>
                        )}

                        {activeTab === 'doctors' && (
                            <form onSubmit={handleAddDoctor} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <FormInput label="Doctor Name" value={doctorForm.name} onChange={e => setDoctorForm({ ...doctorForm, name: e.target.value })} placeholder="Dr. John Doe" />
                                <FormInput label="Specialty" value={doctorForm.specialty} onChange={e => setDoctorForm({ ...doctorForm, specialty: e.target.value })} placeholder="e.g. Cardiologist" />
                                <FormInput label="Image URL" value={doctorForm.image} onChange={e => setDoctorForm({ ...doctorForm, image: e.target.value })} placeholder="Link to photo..." />
                                <FormInput label="Contact Info" value={doctorForm.contact} onChange={e => setDoctorForm({ ...doctorForm, contact: e.target.value })} placeholder="Email or Phone" />
                                <div style={{ marginTop: '1rem' }}>
                                    <Button text="Add to Staff" width="100%" colorScheme="blue" />
                                </div>
                            </form>
                        )}
                    </div>

                    {/* Content List Section */}
                    <div style={cardStyle}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                            <h2 style={{ fontSize: '1.6rem', color: '#1E293B', fontWeight: '900', margin: 0 }}>Active {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>
                            <span style={{ backgroundColor: '#005AE2', color: 'white', padding: '5px 15px', borderRadius: '20px', fontSize: '14px', fontWeight: '700' }}>
                                Total: {(activeTab === 'services' ? services : activeTab === 'branches' ? branches : doctors).length}
                            </span>
                        </div>

                        <div style={{ display: 'grid', gap: '1.5rem', maxHeight: '600px', overflowY: 'auto', paddingRight: '10px' }}>
                            {activeTab === 'services' && services.map(s => (
                                <div key={s._id} style={{
                                    padding: '1.5rem',
                                    borderRadius: '24px',
                                    backgroundColor: 'white',
                                    border: '1px solid #F1F5F9',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    transition: 'all 0.2s ease'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                        <div style={{ fontSize: '30px', backgroundColor: '#F0F9FF', padding: '15px', borderRadius: '15px' }}>{s.icon}</div>
                                        <div>
                                            <h4 style={{ fontWeight: '800', fontSize: '1.2rem', color: '#1E293B', margin: 0 }}>{s.title}</h4>
                                            <p style={{ color: '#64748B', margin: '5px 0 0 0', fontSize: '0.95rem' }}>{s.description}</p>
                                        </div>
                                    </div>
                                    <button onClick={() => handleDelete('services', s._id)} style={{ backgroundColor: '#FEE2E2', color: '#EF4444', border: 'none', padding: '10px 15px', borderRadius: '10px', cursor: 'pointer', fontWeight: '800' }}>Delete</button>
                                </div>
                            ))}

                            {activeTab === 'branches' && branches.map(b => (
                                <div key={b._id} style={{
                                    padding: '1.5rem',
                                    borderRadius: '24px',
                                    backgroundColor: 'white',
                                    border: '1px solid #F1F5F9',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                        <div style={{ fontSize: '25px', backgroundColor: '#FFF7ED', padding: '15px', borderRadius: '15px' }}>🏢</div>
                                        <div>
                                            <h4 style={{ fontWeight: '800', fontSize: '1.2rem', color: '#1E293B', margin: 0 }}>{b.name}</h4>
                                            <p style={{ color: '#64748B', margin: '5px 0 0 0' }}>{b.address}</p>
                                            <span style={{ color: '#005AE2', fontWeight: '700', fontSize: '0.9rem' }}>📞 {b.contact}</span>
                                        </div>
                                    </div>
                                    <button onClick={() => handleDelete('branches', b._id)} style={{ backgroundColor: '#FEE2E2', color: '#EF4444', border: 'none', padding: '10px 15px', borderRadius: '10px', cursor: 'pointer', fontWeight: '800' }}>Delete</button>
                                </div>
                            ))}

                            {activeTab === 'doctors' && doctors.map(d => (
                                <div key={d._id} style={{
                                    padding: '1.5rem',
                                    borderRadius: '24px',
                                    backgroundColor: 'white',
                                    border: '1px solid #F1F5F9',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                        <img src={d.image || 'https://via.placeholder.com/80'} style={{ width: '80px', height: '80px', borderRadius: '20px', objectFit: 'cover', border: '3px solid #F1F5F9' }} />
                                        <div>
                                            <h4 style={{ fontWeight: '800', fontSize: '1.2rem', color: '#1E293B', margin: 0 }}>{d.name}</h4>
                                            <p style={{ color: '#FF9500', margin: '2px 0 5px 0', fontWeight: '700' }}>{d.specialty}</p>
                                            <span style={{ color: '#64748B', fontSize: '0.9rem' }}>Contact: {d.contact}</span>
                                        </div>
                                    </div>
                                    <button onClick={() => handleDelete('doctors', d._id)} style={{ backgroundColor: '#FEE2E2', color: '#EF4444', border: 'none', padding: '10px 15px', borderRadius: '10px', cursor: 'pointer', fontWeight: '800' }}>Delete</button>
                                </div>
                            ))}

                            {(activeTab === 'services' ? services : activeTab === 'branches' ? branches : doctors).length === 0 && (
                                <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                                    <p style={{ fontSize: '4rem', margin: 0 }}>📂</p>
                                    <p style={{ color: '#94A3B8', fontWeight: '600', fontSize: '1.2rem' }}>No records found in the system.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
