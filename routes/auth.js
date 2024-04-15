const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');

router.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const patient = new Patient({ username, email, password });
        await patient.save();
        res.status(201).json({ message: 'Patient created successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
