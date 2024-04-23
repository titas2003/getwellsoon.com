const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    test: {
        type: String
    },
    lab: {
        type: String
    },
    testdate: {
        type: String
    },
    status: {
        type: String
    }
})

const medSchema = new mongoose.Schema({
    medicine: {
        type: String,
    },
    date: {
        type: String
    },
    instruction: {
        type: String
    }
})

const appoSchema = new mongoose.Schema({
    pname: {
        type: String,
        require: true
    },
    pphone: {
        type: String,
        require: true
    },
    pdob: {
        type: String,
        require: true
    },
    dname: { //doctor name
        type: String,
        require: true
    },
    dept: {
        type: String,
        require: true
    },
    issue: {
        type: String,
    },
    appotime: {
        type: String,
        require: true
    },
    diagnose: {
        type: String
    },
    reports: reportSchema,
    medicine: medSchema,
    payStatus: {
        type: String
    },
    appoId: {
        type: String,
        unique: true,
        require: true
    },
    status: {
        type: String
    }
}, { collection: 'Appointments' });

const Appointment = mongoose.model('Appointment', appoSchema);

module.exports = Appointment;