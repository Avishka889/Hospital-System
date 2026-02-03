const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema({
    name: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    contact: { type: String, required: true },
    image: { type: String } // URL from Cloudinary
}, { timestamps: true });

module.exports = mongoose.model('Branch', branchSchema);
