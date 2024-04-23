const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');
const Appointment = require('../models/Appointment');
const transporter = require('../controller/mailconf');
const { v4: uuidv4 } = require('uuid'); // Import UUID library

function generateShortUUID() {
    const uuid = uuidv4(); // Generate UUID
    return uuid.substring(0, 4); // Extract the first 4 characters
}

router.post('/book-doc', async (req, res) => {
    if (!req.session._id) {
        return res.status(401).json({ message: 'Unauthorized Patient' });
    }
    const appoId = generateShortUUID();
    const status = `pending`;
    const _id = req.session._id;
    const patient = await Patient.findOne({ _id });
    const pemail = req.session.email;
    const newAppo = new Appointment({
        pname: patient.username,
        pdob: req.body.dob,
        pphone: patient.phone,
        dname: req.body.dname,
        dept: req.body.dept,
        issue: req.body.issue,
        appotime: req.body.appotime,
        appoId: appoId,
        status: status
    })
    await newAppo.save();
    const mailOptions = {
        from: 'nomail02024@gmail.com',
        to: pemail,
        subject: `Appointment ID: ${appoId} | Appointment booked for ${patient.username}`,
        text: `Dear ${patient.username}.\n\nYour appointment have been successfully booked at ${req.body.appotime} under ${req.body.dname}.\n\nIssue: ${req.body.issue}.\nDoctor: ${req.body.dept}.\nDepartment: ${req.body.dname}.\n\nThank you,\nTitas Majumder.`
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Failed to send OTP');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('OTP sent successfully');
        }
    });
    res.status(200).json({ message: 'Appointment booked' });
})

module.exports = router;