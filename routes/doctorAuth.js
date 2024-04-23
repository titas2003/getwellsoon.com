const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Doctor = require('../models/Doctor');
const transporter = require('../controller/mailconf');
const Department = require('../models/Department');


router.post('/doctorReg', async (req, res) => {
    try {
        const { username, email, phone, caddress, department, fees, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const name = username;
        const existingUser = await Doctor.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ error: `Doctor ${name} already registered..` });
        }

        let dept = await Department.findOne({department: department});
        if(!dept) {
            dept = await Department.create({ department: department })
        }
        const doctor = new Doctor({ 
            username, 
            email,
            phone,
            caddress, 
            department: dept._id, 
            fees,
            password: hashedPassword
        });
        
        await doctor.save();
        const mailOptions = {
            from: 'nomail02024@gmail.com',
            to: email,
            subject: 'Welcome to Get Well Soon',
            text: `Dear ${name},\n\nThank you for registering to Get Well Soon.\nI am Titas.\nYou have been successfully secured your membership with getwellsoon.com.\n\nThanks and Regards\nTitas Majumder.`
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
        res.status(201).json({ message: 'Doctor created successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
