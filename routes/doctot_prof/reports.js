const express = require('express');
const router = express.Router();
const Doctor = require('../../models/Doctor');
const Appointment = require('../../models/Appointment');

router.post('/report/:appoId', async (req, res) => {
    try {
        if (!req.session._id) {
            return res.status(401).json({ message: 'Unaothorized Doctor' });
        }
        const _id = req.session._id;
        const appoId = req.params.appoId;
        console.log(appoId);
        const appointment = await Appointment.findOne({ appoId });
        if (!appointment) {
            return res.status(404).json({ message: `Appointment ${appoId} not found` });
        }
        const { reports } = req.body;
        if (!reports || !Array.isArray(reports)) {
            return res.status(400).json({ message: 'Invalid or missing report data' });
        }
        appointment.reports = appointment.reports || [];
        appointment.reports.push(...reports);
        await appointment.save();

        res.status(200).json({ message: `Reports updated succesfully for ${appoId}` });
    } catch(error) {
        console.log('Error adding reports',error);
        res.status(500).json({ message: `Failed to add reports` });
    }
});

module.exports = router;