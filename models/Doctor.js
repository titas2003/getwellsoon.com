const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
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
    phone: {
        type: String,
        required: true,
        unique: true
    },
    caddress: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true,
    },
    fees: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    otp: {
        type: String
    }
}, { collection: 'Doctors' }); // Set collection name

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
