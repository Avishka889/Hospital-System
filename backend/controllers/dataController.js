const Service = require('../models/Service');
const Branch = require('../models/Branch');
const Doctor = require('../models/Doctor');

// Services
exports.addService = async (req, res) => {
    try {
        const service = await Service.create(req.body);
        res.status(201).json(service);
    } catch (err) { res.status(400).json({ message: err.message }); }
};

exports.getServices = async (req, res) => {
    try {
        const services = await Service.find();
        res.json(services);
    } catch (err) { res.status(500).json({ message: err.message }); }
};

// Branches
exports.addBranch = async (req, res) => {
    try {
        const branch = await Branch.create(req.body);
        res.status(201).json(branch);
    } catch (err) { res.status(400).json({ message: err.message }); }
};

exports.getBranches = async (req, res) => {
    try {
        const branches = await Branch.find();
        res.json(branches);
    } catch (err) { res.status(500).json({ message: err.message }); }
};

// Doctors
exports.addDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.create(req.body);
        res.status(201).json(doctor);
    } catch (err) { res.status(400).json({ message: err.message }); }
};

exports.getDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.json(doctors);
    } catch (err) { res.status(500).json({ message: err.message }); }
};

// Delete routes (Admin only)
exports.deleteService = async (req, res) => {
    try {
        await Service.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted' });
    } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.deleteBranch = async (req, res) => {
    try {
        await Branch.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted' });
    } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.deleteDoctor = async (req, res) => {
    try {
        await Doctor.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted' });
    } catch (err) { res.status(500).json({ message: err.message }); }
};
