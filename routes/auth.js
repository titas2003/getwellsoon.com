const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Patient = require('../models/Patient');
const transporter = require('../controller/mailconf');


router.post('/signup', async (req, res) => {
    try {
        const { username, email, phone, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const name = username;
        const existingUser = await Patient.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ error: `Patient ${name} already registered..` });
        }
        const patient = new Patient({ 
            username, 
            email,
            phone,
            password: hashedPassword
        });
        
        await patient.save();
        const mailOptions = {
            from: 'nomail02024@gmail.com',
            to: email,
            subject: 'Welcome to Get Well Soon',
            text: `Dear ${name},\n\nThank you for registering to Get Well Soon.\nI am Titas.\nYou have been successfully secured your membership with http://34.105.1.56/getwellsoon.com/.\n\nThanks and Regards\nTitas Majumder.`
        };

        // Sending the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                res.status(500).send('Failed to send Register mail');
            } else {
                console.log('Email sent: ' + info.response);
                res.status(200).send('Register mail sent');
            }
        });
        res.status(201).json({ message: 'Patient created successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
