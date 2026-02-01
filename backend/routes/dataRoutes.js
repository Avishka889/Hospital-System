const express = require('express');
const router = express.Router();
const {
    addService, getServices, deleteService,
    addBranch, getBranches, deleteBranch,
    addDoctor, getDoctors, deleteDoctor
} = require('../controllers/dataController');

// Services
router.get('/services', getServices);
router.post('/services', addService);
router.delete('/services/:id', deleteService);

// Branches
router.get('/branches', getBranches);
router.post('/branches', addBranch);
router.delete('/branches/:id', deleteBranch);

// Doctors
router.get('/doctors', getDoctors);
router.post('/doctors', addDoctor);
router.delete('/doctors/:id', deleteDoctor);

module.exports = router;
