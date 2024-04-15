const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, { collection: 'Patients' }); // Set collection name

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
